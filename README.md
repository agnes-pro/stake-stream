# StakeStream Protocol Documentation

## Overview

StakeStream is a Bitcoin-aligned DeFi primitive built on Stacks L2 that combines capital-efficient STX staking with decentralized governance. The protocol enables non-custodial participation in network security while earning dynamic yields through a tiered reward system. StakeStream maintains Bitcoin's security guarantees through Stacks' Proof of Transfer consensus mechanism.

## Key Features

### 1. Tiered Staking System

- **Multi-tier Architecture**:
  - Bronze: 1M STX minimum (1x multiplier)
  - Silver: 5M STX minimum (1.5x multiplier)
  - Gold: 10M STX minimum (2x multiplier)
- **Time-lock Multipliers**:
  - No lock: 1x
  - 1-month lock: 1.25x
  - 2-month lock: 1.5x

### 2. Governance Module

- Proposal creation threshold: 1M STX voting power
- Quadratic voting implementation
- 24-hour minimum voting period
- Automatic proposal execution

### 3. Security Framework

- Cooldown withdrawals (24-hour delay)
- Emergency mode activation
- Segregated safety vaults
- Multi-signature administrative controls

### 4. Compliance Features

- Built-in transaction monitoring hooks
- KYC/AML integration points
- Regulatory reporting endpoints
- Enterprise-grade audit trails

## Technical Specifications

### Core Components

- **STX Pool**: Central staking reserve (tracked in uSTX)
- **Reward Engine**:
  ```python
  rewards = (staked_amount * base_rate * multiplier * blocks_staked) / 14,400,000
  ```
- **Governance Proposals**:
  - Minimum 10-character descriptions
  - Maximum 256-character limit
  - 100-2880 block voting windows

### Contract Architecture

| Component        | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| UserPositions    | Data Map | Tracks staking positions and tiers |
| StakingPositions | Data Map | Records lock periods and rewards   |
| Proposals        | Data Map | Governance proposal storage        |
| TierLevels       | Data Map | Configuration for staking tiers    |

## Functions Reference

### Staking Operations

- **`stake-stx`**: Deposit STX with optional lock period

  - Parameters: `amount` (uSTX), `lock-period` (blocks)
  - Minimum: 1M uSTX
  - Lock periods: 0, 4320 (1mo), 8640 (2mo) blocks

- **`initiate-unstake`**: Start cooldown process

  - 1440 block (24h) withdrawal delay
  - Single active unstake request per user

- **`complete-unstake`**: Finalize withdrawal after cooldown

### Governance Functions

- **`create-proposal`**: Submit new governance measure

  - Requires 1M+ voting power
  - 100-2880 block voting period

- **`vote-on-proposal`**: Cast stake-weighted votes
  - Votes locked until proposal resolution

### Administrative Controls

- **`pause-contract`**: Freeze non-essential operations
- **`resume-contract`**: Restore normal functionality
- **`emergency-mode`**: Activate circuit-breakers

## Security Model

### Withdrawal Safeguards

1. Cooldown initiation
2. 24-hour waiting period
3. STX transfer execution
4. Position cleanup

### Emergency Protocols

- Immediate staking freeze
- Governance proposal suspension
- Withdrawal queue prioritization
- Security auditor alerts

## Compliance Framework

### Monitoring Features

1. Large transaction reporting
2. Suspicious activity flags
3. Address screening hooks
4. Travel rule integration

### Regulatory Components

- FATF-compliant architecture
- OFAC address checks
- Transaction limit controls
- Audit log preservation

## Installation & Usage

### Requirements

- Clarinet 2.0+
- Stacks.js 6.x
- Node.js 18.x

### Quick Start

```bash
clarinet contract new StakeStream
clarinet console
```

### Usage Examples

**Stake STX with 1-month lock:**

```clarity
(contract-call? .StakeStream stake-stx u5000000 u4320)
```

**Create Governance Proposal:**

```clarity
(contract-call? .StakeStream create-proposal "Increase base reward rate" u1440)
```

**Vote on Proposal:**

```clarity
(contract-call? .StakeStream vote-on-proposal u1 true)
```

## Reward Calculation

**Base Parameters**

- Base Rate: 5% (500 bps)
- Bronze Multiplier: 1x
- Silver Multiplier: 1.5x
- Gold Multiplier: 2x

**Example Calculation**

```
10M STX (Gold tier) × 2x multiplier × 2-month lock × 5% base rate
= 20% APY + 1.5× lock bonus = 30% total yield
```

## Governance Process

1. Proposal creation (1M STX threshold)
2. 24-hour voting period
3. Majority vote execution
4. Automatic parameter updates
5. Security auditor notification

## Error Reference

| Code     | Description                 |
| -------- | --------------------------- |
| ERR-1000 | Unauthorized access         |
| ERR-1001 | Invalid protocol parameters |
| ERR-1002 | Invalid amount specified    |
| ERR-1003 | Insufficient STX balance    |
| ERR-1004 | Active cooldown period      |
| ERR-1005 | No active stake position    |
| ERR-1006 | Below minimum requirement   |
| ERR-1007 | Contract paused             |
