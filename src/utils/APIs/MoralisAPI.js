import { supportedChains } from "config";

const web3ApiKey = 'l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': web3ApiKey
  }
};

export const getWalletNativeBalance = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/balance?chain=${chain}`, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => 'error')
  return json;
};

export const getWalletTokensBalance = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}`, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error))
  return json;
};

export const getWalletNativeCrossChainBalance = async (walletAddress) => {
  const nativeBalanceList = []
  supportedChains.forEach(async (x) => {
    await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/balance?chain=${x.chainId}`, options)
      .then((response) => response.json())
      .then((data) => nativeBalanceList.push({ networkData: x, balance: data.balance / 1e18 }))
      .catch((error) => console.log(error))
  })
  return nativeBalanceList;
};