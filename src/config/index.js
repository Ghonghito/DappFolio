import BSC from 'assets/images/Blockchains/Binance.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'

export const DAPP_NAME = 'DappFolio'

export const dappNameGradient = () => {
  const name = <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-violet text-clip`}>
    DappFolio
  </p>
  return name
}

export const supportedChains = [
  {
    networkName: 'Ethereum',
    moralisId: 'eth',
    networkSymbol: 'eth',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: '0x1',
    wrappedTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    coingeckoId: 'ethereum',
    logo: ETH,
    logoSize: 'w-3'
  },
  {
    networkName: 'Polygon',
    moralisId: 'polygon',
    networkSymbol: 'matic',
    coinName: 'MATIC',
    tokenProtocol: 'ERC20',
    chainId: '0x89',
    wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    coingeckoId: 'matic-network',
    logo: Polygon,
    logoSize: 'w-4'
  },
  {
    networkName: 'Smart Chain',
    moralisId: 'bsc',
    networkSymbol: 'bsc',
    coinName: 'BNB',
    tokenProtocol: 'BEP20',
    chainId: '0x38',
    wrappedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    coingeckoId: 'binancecoin',
    logo: BSC,
    logoSize: 'w-4'
  },
  {
    networkName: 'Avalanche',
    moralisId: 'avalanche',
    networkSymbol: 'avax',
    coinName: 'AVAX',
    tokenProtocol: 'ERC20',
    chainId: '0xa86a',
    wrappedTokenAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    coingeckoId: 'avalanche-2',
    logo: AVAX,
    logoSize: 'w-4'
  },
  {
    networkName: 'Fantom',
    networkSymbol: 'ftm',
    moralisId: 'fantom',
    coinName: 'FTM',
    tokenProtocol: 'ERC20',
    chainId: '0xfa',
    wrappedTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingeckoId: 'fantom',
    logo: Fantom,
    logoSize: 'w-3'
  },
  {
    networkName: 'Cronos',
    networkSymbol: 'cro',
    moralisId: 'cronos',
    coinName: 'CRO',
    tokenProtocol: 'CRC20',
    chainId: '0x19',
    wrappedTokenAddress: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    coingeckoId: 'crypto-com-chain',
    logo: Cronos,
    logoSize: 'w-4'
  },
  {
    networkName: 'Arbitrum',
    moralisId: 'arbitrum',
    networkSymbol: 'arb',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: '0xa4b1',
    wrappedTokenAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    coingeckoId: 'ethereum',
    logo: Arbitrum,
    logoSize: 'w-4'

  }
]

export const supportedChainsList = {
  eth: {
    networkName: 'Ethereum',
    networkSymbol: 'eth',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: '0x1',
    wrappedTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    coingeckoId: 'ethereum',
    logo: ETH,
    logoSize: 'w-3'
  },
  bsc: {
    networkName: 'Binance',
    networkSymbol: 'bsc',
    coinName: 'BNB',
    tokenProtocol: 'BEP20',
    chainId: '0x38',
    wrappedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    coingeckoId: 'binancecoin',
    logo: BSC,
    logoSize: 'w-4'
  },
  matic: {
    networkName: 'Polygon',
    networkSymbol: 'matic',
    coinName: 'MATIC',
    tokenProtocol: 'ERC20',
    chainId: '0x89',
    wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    coingeckoId: 'matic-network',
    logo: Polygon,
    logoSize: 'w-4'
  },
  avax: {
    networkName: 'Avalanche',
    networkSymbol: 'avax',
    coinName: 'AVAX',
    tokenProtocol: 'ERC20',
    chainId: '0xa86a',
    wrappedTokenAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    coingeckoId: 'avalanche-2',
    logo: AVAX,
    logoSize: 'w-4'
  },
  ftm: {
    networkName: 'Fantom',
    networkSymbol: 'ftm',
    coinName: 'FTM',
    tokenProtocol: 'ERC20',
    chainId: '0xfa',
    wrappedTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingeckoId: 'fantom',
    logo: Fantom,
    logoSize: 'w-3'
  },
  cro: {
    networkName: 'Cronos',
    networkSymbol: 'cro',
    coinName: 'CRO',
    tokenProtocol: 'CRC20',
    chainId: '0x19',
    wrappedTokenAddress: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    coingeckoId: 'crypto-com-chain',
    logo: Cronos,
    logoSize: 'w-4'
  },
  arb: {
    networkName: 'Arbitrum',
    networkSymbol: 'arb',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: '0xa4b1',
    wrappedTokenAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    coingeckoId: 'ethereum',
    logo: Arbitrum,
    logoSize: 'w-4'
  }
}