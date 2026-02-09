
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("example tests", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  // it("shows an example", () => {
  //   const { result } = simnet.callReadOnlyFn("counter", "get-counter", [], address1);
  //   expect(result).toBeUint(0);
  // });
  it("allows a user to claim rewards after staking", async () => {
    // Step 1: Stake STX first
    const stakeAmount = 1000000; // 1M uSTX
    const lockPeriod = 0;         // no lock
    await simnet.mineBlock([
      simnet.tx.contractCall({
        contractAddress: address1,
        contractName: "stakestream",
        functionName: "stake-stx",
        functionArgs: [
          simnet.types.uint(stakeAmount),
          simnet.types.uint(lockPeriod),
        ],
        sender: address1,
      }),
    ]);

    // Step 2: Move forward some blocks to accumulate rewards
    await simnet.mineEmptyBlock(100); // simulate 100 blocks

    // Step 3: Claim rewards
    const claimResult = await simnet.tx.contractCall({
      contractAddress: address1,
      contractName: "stakestream",
      functionName: "claim-rewards",
      functionArgs: [],
      sender: address1,
    });

    // Step 4: Check that claim succeeded
    expect(claimResult.success).toBe(true);

    // Optional: check that staking position updated
    const position = await simnet.callReadOnlyFn(
      "stakestream",
      "get-user-position",
      [simnet.types.principal(address1)],
      address1
    );

    expect(position.value["last-claim"]).toBeDefined();
    expect(position.value["stx-staked"]).toBe(stakeAmount);
  });
});
