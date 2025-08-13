---
title: "Interacting with Uniswap v3 Smart Contracts for Real-Time Price Discovery Using Web3.py"
date: "2025-08-13"
slug: "uniswap-v3-price-discovery-web3-py"
excerpt: "A guide on how to fetch real-time token prices and compute swap prices for Uniswap v3 liquidity pools using Web3.py and on-chain data."
tags: ["Uniswap", "Web3.py", "DeFi", "Python", "Smart Contracts", "Ethereum", "Etherscan", "Blockchain"]
author: "Aditya Mishra"
---

This article is a guide on how to fetch real-time token prices and compute swap prices for Uniswap v3 liquidity pools using Web3.py and on-chain data.
Disclaimer: The information provided here is for informational purposes only and is not intended to be personal financial, investment, or other advice.
This article shows you how to obtain real-time Uniswap v3 liquidity pool token pricing data for a chosen pair using Web3.py. We will also calculate swap prices from on-chain data. To obtain this data, we use Web3.py to interact directly with Uniswap's Ethereum smart contracts. This gives us access to on-chain pricing information. Etherscan's API allows us to retrieve ABIs for the necessary contracts. This guarantees a smooth integration with Ethereum contracts and precise data retrieval.

Familiarity with fundamental Python is required.

## Setup

### Prerequsites
You need an API key for Etherscan and a provider for the Web3.py library. They're both free. This code uses Alchemy's provider. You can learn more about providers here.

### Python Libraries
You can find details on the needed Python libraries in my previous articles (see Further Reading).

### Import Libraries
```python
from web3 import Web3
# To read environment property file
import os
from dotenv import load_dotenv
from pathlib import Path
# To load ABI
import json
import requests
# For processing large numbers
from decimal import Decimal
```

### Constants

```python
# Uniswap v3 Factory address
UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
# Etherscan endpoint
ETHERSCAN_ENDPOINT = '[https://api.etherscan.io/api](https://api.etherscan.io/api)'
# Token0 (USDC) token contract
TOKEN0 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
# Token1 (WETH) token contract
TOKEN1 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
# Fees 0.05% == 500
FEES = 500
# Uniswap v3 Pool ABI path
POOL_ABI = 'abi/uniswap_pool_abi.json'
# Path to the ERC20 ABI
ERC20_ABI = 'abi/erc20.json'
UNISWAP_V3_FACTORY — Uniswap v3 Factory address
ETHERSCAN_ENDPOINT — the endpoint for the Etherscan API
TOKEN0, TOKEN1 — Addresses for Token 0 and 1
FEES — Fees for the pool
POOL_ABI — path to the pool ABI; this only contains partial functions such as slot0, token0, token1 and a Swap event.
ERC20_ABI — path to the ERC20 ABI. Similar to POOL_ABI, ERC20_ABI only contains the common methods of all ERC20 tokens such as decimals and symbol.
```

### Load environment variables

```python
dotenv_path = Path('.env/price')
load_dotenv(dotenv_path=dotenv_path)
PROVIDER_URL = os.getenv('PROVIDER_URL')
ETHERSCAN_API_KEY = os.getenv('ETHERSCAN_API_KEY')
The dotenv library loads the above property values from the .env/price file.
PROVIDER_URL — as stated under Prerequisites, this is the provider from Alchemy
ETHERSCAN_API_KEY — holds the Etherscan API key
```

### Current Token Prices

Let's get the ABIs and contracts set up first.

```python
factory_abi = get_univ3_factory_abi()
assert factory_abi != None, 'Factory ABI not available'
# Load the previously downloaded pool ABI
with open(POOL_ABI) as f:
    pool_abi = json.load(f)
assert pool_abi != None, 'Pool ABI not available'
# Load ERC20 ABIs to get decimails for token0 and token1
with open(ERC20_ABI) as f:
    erc20_abi = json.load(f)
assert erc20_abi != None, 'ERC20 ABI not available'
# Create factory contract
web3 = Web3(Web3.HTTPProvider(PROVIDER_URL))
factory_contract = web3.eth.contract(address=web3.to_checksum_address(value=UNISWAP_V3_FACTORY), abi=factory_abi)
assert factory_contract != None, 'Factory contract does not exist'
# Get pool contract for token0 and token1
pool_address = factory_contract.functions.getPool(TOKEN1, TOKEN0, FEES).call()
pool_contract = web3.eth.contract(address=pool_address, abi=pool_abi)
assert pool_contract != None, 'Pool contract does not exist for token0 and token1'
```

The factory ABI is obtained through a utility method, details of which are in the notebook. We use the Etherscan API to get the ABI for the Uniswap v3 Factory address (UNISWAP_V3_FACTORY). The assertion statement confirms the factory ABI's necessity.

The next step is to load the pool and ERC20 token ABIs. Like the factory ABI, these two ABIs are also necessary.

The factory address and ABI are used to generate the factory contract, which then retrieves the pool address using the token pair and fees. Here, the address refers to the ETH/USDC v3 0.05% pool. Using the pool address and ABI, a pool contract is generated.

With the pool contract in hand, let's determine the current price of one token relative to the other. The following method leverages the example code in A Primer on Uniswap v3 Math: As Easy As 1, 2, v3 to determine a token's price relative to other.

```python
def get_price(sqrt_price_x96:int, decimal0:int, decimal1:int):
    """ Returns Get the two token prices of the pool
    Parameters:
    sqrt_price_x96 : int
        from the pool's slot0 call
    decimal0: int
        number of decimals for token0
    decimal1: int
        number of decimals for token1

    Returns:
    tuple
        A tuple consisting of token0 and token1 prices
    """
    buy_one_of_token0 = round(((sqrt_price_x96 / Decimal(2)**96)**2) /
                              (Decimal(10)**decimal1 / Decimal(10)**decimal0), decimal1)
    buy_one_of_token1 = round((1 / buy_one_of_token0), decimal0)

    return (buy_one_of_token0, buy_one_of_token1)
```

So, the get_price method needs three inputs: sqrtPriceX96, and the token pair's decimal values. The pool contract provides access to all three inputs, as illustrated below.

```python
def display_current_price() -> None:
    """ Displays the current token0 and token1 prices for the pool. This
    pool has two tokens: TOKEN0 and TOKEN1 with FEES
    """
    token0_address = pool_contract.functions.token0().call()
    token0_contract = web3.eth.contract(address=token0_address, abi=erc20_abi)
    decimal0 = token0_contract.functions.decimals().call()

    token1_address = pool_contract.functions.token1().call()
    token1_contract = web3.eth.contract(address=token1_address, abi=erc20_abi)
    decimal1 = token1_contract.functions.decimals().call()

    sqrtx96 = pool_contract.functions.slot0().call()[0]

    token0_sym = token0_contract.functions.symbol.call()
    token1_sym = token1_contract.functions.symbol.call()

    # We have all the data ready to call get_price
    token0_price, token1_price = get_price(sqrt_price_x96=sqrtx96,
                                           decimal0=decimal0, decimal1=decimal1)
    print('price of {token0} in value of {token1} : {price}'.format(
        token0=token0_sym, token1=token1_sym, price=token0_price))
    print('price of {token1} in value of {token0} : {price}'.format(
        token1=token1_sym, token0=token0_sym, price=token1_price))
```

We can obtain token0 and token1 addresses from the pool contract. Using these addresses, we'll generate contracts to retrieve token decimals and symbol. Pool contracts' slot0 response provides sqrtPriceX96 as its first element. The current token prices, obtained from the get_price method.

### Swapped Prices

We looked at how to get current pool token prices in the last section. The same concept works for Swap events. A couple of options are available. Let's start with the first method, using the sqrtPriceX96 value obtained from the Swap event as input for our get_price method.

#### Approach 1
First, let's examine how to invoke the method for retrieving the swapped prices before we delve into the specifics.

```python
tran_hash='0x8bab544f6f87449d25b9e4cef8e2d59f1771050b10cae2c17af1f35eceeffdf9'
receipt = web3.eth.get_transaction_receipt(tran_hash)
log = [x for x in receipt.logs if x['logIndex'] == 59][0]
processed_log = pool_contract.events['Swap']().process_log(log)
display_swap_price_1(processed_log=processed_log, pool_abi=pool_abi, erc20_abi=erc20_abi)
```

Because this is a swap event, the log entry is processed as such, yielding a dictionary of parsed items. The dictionary, including pool and ERC20 ABIs, provides data to display swap prices.

```python
def display_swap_price_1(processed_log:dict, pool_abi:str, erc20_abi:str) -> None:
    """ Displays swap price - method 1
    Parameters:
    processed_log : dict
        A dictionary containing processed log items
    pool_abi:
        Pool ABI
    erc20_abi:
        ERC20 ABI
    """
    # print(processed_log)
    pool_address = processed_log['address']
    pool_contract = web3.eth.contract(address=pool_address, abi=pool_abi)
    assert pool_contract != None, 'Pool contract must exist'

    sqrt_priceX96 = processed_log['args']['sqrtPriceX96']

    # Get decimals from token contracts
    token0_address = pool_contract.functions.token0().call()
    token0_contract = web3.eth.contract(address=token0_address, abi=erc20_abi)
    decimal0 = token0_contract.functions.decimals().call()
    token0_sym = token0_contract.functions.symbol.call()

    token1_address = pool_contract.functions.token1().call()
    token1_contract = web3.eth.contract(address=token1_address, abi=erc20_abi)
    decimal1 = token1_contract.functions.decimals().call()
    token1_sym = token1_contract.functions.symbol.call()

    # We have all the data ready to call get_price
    token0_price, token1_price = get_price(sqrt_price_x96=sqrt_priceX96, decimal0=decimal0, decimal1=decimal1)
    print('price of {token0} in value of {token1} : {price}'.format(
        token0=token0_sym, token1=token1_sym, price=token0_price))
    print('price of {token1} in value of {token0} : {price}'.format(
        token1=token1_sym, token0=token0_sym, price=token1_price))
```

In summary:

- We construct a pool contract from the pool address and pool ABI. Note that this example being a Uniswap swap means we use the Uniswap pool ABI for the contract.
- Get the sqrtpriceX96 from the processed log (see the blue rectangle above from Etherscan).
- A token's decimals and symbol come from its contract.
- The method concludes by obtaining token prices via a get_price call, utilizing sqrtpriceX96 and token decimal values.

### Approach 2

Approach 2 employs a method outlined in Track Uniswap V4 DEX Trades. This is how to display the swap price with this method:

```python
def display_swap_price_2(processed_log:dict, pool_abi:str, erc20_abi:str) -> None:
    """ Displays swap price - method 1
    Parameters:
    processed_log : dict
        A dictionary containing processed log items
    pool_abi:
        Pool ABI
    erc20_abi:
        ERC20 ABI
    """
    # print(processed_log)
    pool_address = processed_log['address']
    pool_contract = web3.eth.contract(address=pool_address, abi=pool_abi)
    assert pool_contract != None, 'Pool contract must exist'

    # Get decimals from token contracts
    token0_address = pool_contract.functions.token0().call()
    token0_contract = web3.eth.contract(address=token0_address, abi=erc20_abi)
    decimal0 = token0_contract.functions.decimals().call()
    token0_sym = token0_contract.functions.symbol.call()

    token1_address = pool_contract.functions.token1().call()
    token1_contract = web3.eth.contract(address=token1_address, abi=erc20_abi)
    decimal1 = token1_contract.functions.decimals().call()
    token1_sym = token1_contract.functions.symbol.call()

    amount0 = processed_log['args']['amount0']/pow(10, decimal0)
    amount1 = processed_log['args']['amount1']/pow(10, decimal1)

    if amount0 < 0:
        print('Sell {amount1} {symbol1} for {amount0} {symbol0} at {price}'.format(
            amount1=amount1, symbol1=token1_sym, amount0=(amount0 * -1), symbol0=token0_sym,
            price=((amount0 * -1) / amount1)))
    else:
        print('Buy {amount1} {symbol1} for {amount0} {symbol0} at {price}'.format(
            amount1=(amount1 * -1), symbol1=token1_sym, amount0=amount0, symbol0=token0_sym,
            price=((amount1 * -1) / amount0)))
```

The pool contract's construction, token decimals, and symbol are similar to approach 1, so we'll skip those details. This approach differs from the earlier one by using the quantities (see blue rectangle below) exchanged between pairs of tokens.

The code below reuses the transaction and log index from approach 1.

```python
tran_hash='0x8bab544f6f87449d25b9e4cef8e2d59f1771050b10cae2c17af1f35eceeffdf9'
receipt = web3.eth.get_transaction_receipt(tran_hash)
log = [x for x in receipt.logs if x['logIndex'] == 59][0]
processed_log = pool_contract.events['Swap']().process_log(log)
display_swap_price_2(processed_log=processed_log, pool_abi=pool_abi, erc20_abi=erc20_abi)
```

The two pricing approaches are extremely close with only slight variations.

Let's call the display_swap_price_2 method to confirm our assumption:

```python
tran_hash='0x6704da4b05ed0e8d2ed2cd428777a11383994019427e46dc32af4bc81bdc87c2'
receipt = web3.eth.get_transaction_receipt(tran_hash)
log = [x for x in receipt.logs if x['logIndex'] == 166][0]
processed_log = pool_contract.events['Swap']().process_log(log)
display_swap_price_2(processed_log=processed_log, pool_abi=pool_abi, erc20_abi=erc20_abi)
```

The output verifies the swap involved USDT and USDC. Let's try with the Log Index 169:

```python
tran_hash='0x6704da4b05ed0e8d2ed2cd428777a11383994019427e46dc32cd428777a11383994019427e46dc32af4bc81bdc87c2'
receipt = web3.eth.get_transaction_receipt(tran_hash)
log = [x for x in receipt.logs if x['logIndex'] == 169][0]
processed_log = pool_contract.events['Swap']().process_log(log)
display_swap_price_2(processed_log=processed_log, pool_abi=pool_abi, erc20_abi=erc20_abi)
```

As the results show, the final swap was WETH for USDT, proving our assumption correct.

### Conclusion

This article provided a detailed walkthrough on leveraging Web3.py to retrieve real-time token prices from a Uniswap V3 liquidity pool and compute swap prices using on-chain data. It demonstrated how to interact directly with Uniswap's smart contracts on the Ethereum blockchain, ensuring accurate and decentralized price retrieval.

Additionally, the article explored two distinct methods for calculating swap rates, offering flexibility based on specific use cases and developer preferences. By applying these techniques, users can gain deeper insights into liquidity dynamics, slippage, and trade execution mechanics in a decentralized finance (DeFi) environment.

If you found this guide helpful, a comment or an applause would be greatly appreciated — it helps support the creation of more in-depth educational content for the Web3 community!

Thank you!
