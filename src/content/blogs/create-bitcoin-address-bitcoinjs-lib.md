---
title: "How to Create a Bitcoin Address using bitcoinjs-lib"
date: "2025-06-18"
slug: "create-bitcoin-address-bitcoinjs-lib"
excerpt: "Learn how to generate Bitcoin addresses using bitcoinjs-lib and fetch balance via QuickNode. Explore various address types, setup instructions, and implementation steps."
tags: ["Bitcoin", "bitcoinjs-lib", "Web3", "JavaScript", "Blockchain Development"]
author: "Aditya Mishra"
---

## Bitcoin Address Creation

### Overview

Users and developers in Bitcoin may find themselves needing more than one keypair address to develop and test code. In this guide, we'll talk about the different Bitcoin addresses available today, show you how to create a Bitcoin address using bitcoinjs-lib, and demonstrate the process of fetching a Bitcoin address's balance using QuickNode.

### What You Will Do

- Learn about the types of Bitcoin addresses  
- Create a Bitcoin node endpoint on QuickNode  
- Generate a new Bitcoin address using bitcoinjs-lib  

### What You Will Need

Basic understanding of Bitcoin and programming concepts  
Node.js installed  

**Dependencies**:  
- bitcoinjs-lib ^6.1.5  
- ecpair ^2.1.0  
- tiny-secp256k1 ^2.2.3  

### What is bitcoinjs-lib?

bitcoinjs-lib is a JavaScript library for interacting with the Bitcoin blockchain via Node.js and your browser. The library provides a wide variety of features like creating Bitcoin wallets (i.e., addresses) and multisigs, as well as creating, fetching, and broadcasting transactions.

## Types of Bitcoin Addresses

In this section, we will dive into the different types of Bitcoin wallets and how they differ.

> **info**  
> SegWit (Segregated Witness) was an implemented soft-fork proposal (BIP141) that adjusted the transaction format used on Bitcoin

- **SegWit Address**: Beginning with `bc1`, SegWit addresses are generated through a process that separates signature data from transaction data. They are ideal for frequent, small transactions due to lower fees and are less prone to transaction malleability.  
- **SegWit P2SH**: These addresses start with `3` and combine SegWit with Pay-to-Script-Hash. They are created by wrapping a SegWit address in a P2SH format, making them suitable for users who require backward compatibility with systems that don't support native SegWit addresses, while still benefiting from SegWit features.  
- **SegWit P2PKH (Legacy)**: Starting with `1`, these addresses merge the traditional Pay-to-Public-Key-Hash format with the efficiencies of SegWit. They are generated in a manner similar to traditional Bitcoin addresses but are enhanced with SegWit's lower fees and reduced transaction size. This type is ideal for users seeking a balance between the familiarity of traditional Bitcoin addresses and the advantages of SegWit.  
- **SegWit 3-of-4 Multi-Sig**: Characterized by an address that is generated through a process involving multiple keys and a script defining multisig parameters, this wallet type is designed for high security and redundancy. It requires three out of four possible private keys to authorize a transaction, making it ideal for businesses or groups that need multiple approvals for transactions, such as corporations and DAOs.  

## Create a Bitcoin node endpoint on QuickNode

You're welcome to use public nodes or deploy and manage your own infrastructure; however, if you'd like 8x faster response times, you can leave the heavy lifting to us. Sign up for a free account here. Once logged in, click the **Create endpoint** button, then select the blockchain and network you want to deploy on.

For the purpose of this guide, we'll choose the **Bitcoin Testnet** blockchain. After creating your endpoint, keep the HTTP Provider URL handy, as we'll need it in the programming portion of this guide.

## Create a new Bitcoin address using bitcoinjs-lib

With our Bitcoin node endpoint created, let's move on to creating our new Bitcoin address. For this guide, we will be demonstrating how to create a Bitcoin address using the

### Step 1. Initialize Project

First, open a terminal or command prompt window and run the command below to initiate a new project folder and npm project.

```bash
mkdir BitcoinAddress && cd BitcoinAddress
npm init -y
```

### Step 2. Install Dependencies

Your code requires the bitcoinjs-lib library. Install it by running:

```bash
npm install bitcoinjs-lib ecpair tiny-secp256k1
```

### Step 3. Create Implementation

Create a new JavaScript file in your project directory, for example, index.js. After, copy the provided code below into this file:

```javascript
const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default;
const ecc = require('tiny-secp256k1');
const fs = require('fs');

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet; // Otherwise, bitcoin = mainnet and regnet = local

async function createP2PKHwallet() {
    try {
        const keyPair = ECPair.makeRandom({ network: network });
        const { address } = bitcoin.payments.p2pkh({
          pubkey: keyPair.publicKey,
          network: network,
        });
        const privateKey = keyPair.toWIF()

        console.log(`| Public Address | ${address} |`)
        console.log(`| Private Key | ${privateKey} |`)

        const wallet = {
            address: address,
            privateKey: privateKey
        };

        const walletJSON = JSON.stringify(wallet, null, 4);

        fs.writeFileSync('wallet.json', walletJSON);

        console.log(`Wallet created and saved to wallet.json`);
    } catch (error) {
        console.log(error)
    }
}

createP2PKHwallet();
```

### Step 4. Run the Script

Execute the script by running the command below:

```bash
node index.js
```

### Logs for Simplified Debugging

You can now access Logs for your RPC endpoints, helping you troubleshoot issues more effectively. If you encounter an issue with your RPC calls, simply check the logs in your QuickNode dashboard to identify and resolve problems quickly. Learn more about log history limits on our pricing page.