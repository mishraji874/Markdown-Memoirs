---
title: "Understanding CREATE, CREATE2, and CREATE3 in Solidity"
date: "2025-06-18"
slug: "create-opcodes-solidity"
excerpt: "Explore the evolution of contract deployment in Solidity through CREATE, CREATE2, and CREATE3 with a focus on address predictability and deployment strategies."
tags: ["Solidity", "Smart Contracts", "Ethereum", "CREATE2", "CREATE3"]
author: "Aditya Mishra"
---

## CREATE, CREATE2, CREATE3 in Solidity

Smart contract deployment on Ethereum has evolved significantly since its inception, with different opcodes providing various ways to deploy contracts.

This article explores the CREATE, CREATE2, and CREATE3 opcodes, their use cases, and their differences.

### The Original CREATE Opcode

The CREATE opcode is the original method for deploying smart contracts on Ethereum. When using CREATE, the address of the deployed contract is determined by:

```plaintext
new_address = keccak256(rlp.encode([deployer_address, nonce]))
```

Where:

- `deployer_address` is the address of the contract or EOA deploying the new contract.  
- `nonce` is the deployer’s nonce (number of transactions/deployments).

### Limitations of CREATE

- **Non-deterministic addresses**: Since the address depends on the nonce, it’s impossible to know the contract address before deployment.  
- **Sequential dependency**: Contract addresses change based on deployment order.  
- **Limited predictability**: Makes it difficult to coordinate complex contract systems.

### The CREATE2 Innovation

CREATE2 was introduced in the Constantinople hard fork (EIP-1014) to allow for deterministic contract addresses. The address is calculated using:

```plaintext
new_address = keccak256(0xff ++ deployer_address ++ salt ++ keccak256(init_code))[12:]
```

Where:

- `0xff` is a constant prefix.  
- `deployer_address` is the address of the deploying contract/EOA.  
- `salt` is a 32-byte value chosen by the deployer.  
- `init_code` is the contract creation code.

### Advantages of CREATE2

- **Deterministic addresses**: Contract addresses can be known before deployment.  
- **Salt-based uniqueness**: Same code can be deployed to different addresses using different salts.  
- **Better coordination**: Enables complex contract systems with predetermined addresses.  
- **Counterfactual instantiation**: Enables interactions with contracts before they are deployed.

### The CREATE3 Pattern

CREATE3 is not an actual opcode but rather a pattern built on top of CREATE2. It provides even more predictability and consistency in contract deployment.

A PR was opened to add CREATE3 as EIP 3171 (link), but due to a lack of meaningful progress over a long period, it was eventually closed for inactivity. Discussions around the EIP lasted from its proposal in December 2020 until September 2024. In the meantime, a great workaround was developed: Sequence's CREATE3 library.

### How CREATE3 Works

- Deploy a standardized proxy contract using CREATE2.  
- The proxy contract deploys the actual implementation using CREATE.  
- The final contract address only depends on the salt and the deployer, not the implementation code.

### CREATE3 Factory

![CREATE3 Factory](https://miro.medium.com/v2/resize:fit:640/format:webp/1*Flc4LwDXcMQS5LDTvWJpNA.png "CREATE3 Factory")

### Advantages of CREATE3

- **Ultra-predictable addresses**: The final contract address only depends on the deployer address and the salt value, not the implementation code or initialization parameters.  
- **Code independence**: You can deploy different implementations to the same predetermined address (after destroying the previous one).  
- **Simplified deployment coordination**: Makes it easier to coordinate complex systems of contracts across different networks.

### Use Cases for CREATE3

- Cross-chain deployments with identical addresses.  
- Upgradeable contracts with predictable addresses.  
- Complex contract systems requiring predetermined addresses.  
- Testing and development environments.

### Comparing the Three Approaches

While each method has its advantages, CREATE3 offers the most predictability, albeit at the cost of increased complexity and gas usage.

## Best Practices and Considerations

### Security Considerations

- Always verify the deployed code matches expected bytecode.  
- Be cautious with `selfdestruct` in CREATE2/CREATE3 contracts.  
- Consider front-running risks in deployment transactions.

### Gas Optimization

- CREATE3 involves more gas overhead due to proxy deployment.  
- Balance predictability needs with gas costs.  
- Consider batching deployments when possible.

### Implementation Guidelines

- Use standardized factory contracts.  
- Implement proper access controls.  
- Include thorough verification steps.  
- Document salt generation and management.

### Conclusion

The evolution from CREATE to CREATE2 and CREATE3 represents the blockchain community’s innovative approach to solving contract deployment challenges. While CREATE3 offers the most predictability, each method has its place in the Ethereum ecosystem. The choice between them should be based on specific project requirements, considering factors like gas costs, address predictability, and deployment flexibility.

Remember that CREATE3 is not an actual opcode but a pattern that builds upon CREATE2, offering additional features at the cost of increased complexity and gas usage. Understanding these tradeoffs is crucial for selecting the right deployment method for your smart contract system.
