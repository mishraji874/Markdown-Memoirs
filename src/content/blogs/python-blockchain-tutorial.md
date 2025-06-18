---
title: "Building Your First Blockchain in Python"
date: "2025-06-18"
slug: "python-blockchain-tutorial"
excerpt: "Learn how to build a simple blockchain from scratch in Python and explore the core mechanisms that make blockchain technology secure and immutable."
tags: ["Blockchain", "Python", "Tutorial", "Crypto", "Development"]
author: "Aditya Mishra"
---

## Building a Blockchain in Python

Have you ever wondered how blockchain technology actually works under the hood?

Beyond the hype about cryptocurrencies and NFTs lies an elegant data structure that has revolutionized how we think about trust in digital systems. In this article, I’ll guide you through creating your very own blockchain from scratch using Python.

By the end of this journey, you’ll understand the core concepts that make blockchain technology so revolutionary, and you’ll have built a working prototype yourself!

### The Essence of Blockchain

At its heart, a blockchain is simply a linked list of blocks, where each block contains data and is cryptographically connected to the previous block. This structure creates an immutable chain where altering any block would break the entire chain — a property that gives blockchain its powerful integrity guarantees.

Let’s break down the key components we’ll build:

- **Block**: The fundamental unit containing data (transactions in our case).  
- **Blockchain**: The chain of blocks, with rules for adding new blocks.  
- **Hash Functions**: Cryptographic functions that create digital fingerprints.

### Building Our Blockchain Step by Step

Let’s start coding! First, we’ll need a few imports:

```python
import hashlib
import json
import time
from datetime import datetime
```

### The Block Class

```python
class Block:
    def __init__(self, index, timestamp, transactions, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.transactions = transactions
        self.previous_hash = previous_hash
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_string = json.dumps({
            "index": self.index,
            "timestamp": str(self.timestamp),
            "transactions": self.transactions,
            "previous_hash": self.previous_hash
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()

    def __str__(self):
        return (f"Block #{self.index}\n"
                f"Timestamp: {self.timestamp}\n"
                f"Transactions: {self.transactions}\n"
                f"Previous Hash: {self.previous_hash}\n"
                f"Hash: {self.hash}\n")
```

### The Blockchain Class

```python
class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, datetime.now(), ["Genesis Block"], "0")
        self.chain.append(genesis_block)
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, transactions):
        latest_block = self.get_latest_block()
        new_block = Block(
            index=latest_block.index + 1,
            timestamp=datetime.now(),
            transactions=transactions,
            previous_hash=latest_block.hash
        )
        self.chain.append(new_block)
        return new_block

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i-1]
            if current_block.hash != current_block.compute_hash():
                print(f"Block #{current_block.index} hash is invalid!")
                return False
            if current_block.previous_hash != previous_block.hash:
                print(f"Block #{current_block.index} has broken the chain!")
                return False
        return True

    def __str__(self):
        blockchain_str = "Blockchain:\n"
        for block in self.chain:
            blockchain_str += str(block) + "\n"
        return blockchain_str
```

### Understanding the Code

#### The Block Class

Let’s examine our Block class to understand what’s happening:

- **Initialization:** Each block has four main properties: index, timestamp, transactions, and previous_hash.
- **Hash Computation:** The compute_hash() method creates a unique fingerprint of the block using SHA-256.

#### The Blockchain Class

Our Blockchain class manages the collection of blocks:

- **Genesis Block:** Every blockchain begins with a special first block called the “genesis block.”
- **Adding Blocks:** The add_block() method adds new blocks to the chain.
- **Validation:** The is_chain_valid() method verifies the integrity of the entire blockchain.

### Why This Matters: The Power of Immutability

The beauty of this design becomes apparent when we run our test code. When we try to tamper with a transaction in block #1, the validation function immediately detects it. This immutability is what enables trust in an otherwise trustless environment.

### Extending Our Implementation

While our blockchain demonstrates the core concepts, a production blockchain would include:

- **Proof of Work:** A mechanism that makes adding blocks computationally expensive.
- **Distributed Consensus:** Rules for multiple nodes to agree on the valid chain.
- **Mining Rewards:** Incentives for nodes to participate in validation.
- **Advanced Cryptography:** For digital signatures, address generation, etc.

### Conclusion

By building this simple blockchain in Python, you’ve gained a fundamental understanding of how blockchains work. The concept of cryptographically linked blocks forms the foundation for revolutionary technologies like Bitcoin, Ethereum, and countless other blockchain applications.

Now that you understand the basics, you’re ready to explore more advanced blockchain concepts and perhaps even contribute to this groundbreaking technology!