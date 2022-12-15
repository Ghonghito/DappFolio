import Web3 from 'web3'
import { getSimpleCoinPrice } from './APIs/CoinGeckoAPI';
import Avatar from '../components/Avatar'
import BSC from '../assets/images/Blockchains/Binance.svg'
import ETH from '../assets/images/Blockchains/Ethereum.svg'
import AVAX from '../assets/images/Blockchains/Avalanche.svg'
import FANTOM from '../assets/images/Blockchains/Fantom.svg'
import MATIC from '../assets/images/Blockchains/Matic.svg'
import Cronos from '../assets/images/Blockchains/Cronos.svg'
import Arbitrum from '../assets/images/Blockchains/Arbitrum.svg'

const web3 = new Web3(window.ethereum);

const web3BSC = new Web3('https://bsc-dataseed1.binance.org/');
const web3ETH = new Web3('https://rpc.ankr.com/eth');
const web3AVAX = new Web3('https://api.avax.network/ext/bc/C/rpc');

const explorerURLS = {
  56: 'https://bscscan.com',
  1: 'https://etherscan.io',
  43114: 'https://snowtrace.io',
  137: 'https://polygonscan.com',
  250: 'https://ftmscan.com',
  25: 'https://cronoscan.com',
  42161: 'https://arbiscan.io'
};

export const getExplorerNames = (chain) => {
  switch (chain) {
    case 1:
      return 'EtherScan'
    case 56:
      return 'BSCScan'
    case 43114:
      return 'SnowTrace'
    case 250:
      return 'FTMScan'
    case 137:
      return 'PolygonScan'
    case 25:
      return 'CronoScan'
    case 42161:
      return 'ArbiScan'
    default:
      return 'Wrong Network'
  }
}

export const getChainName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return 'eth'
    case 56:
      return 'bsc'
    case 43114:
      return 'avax'
    case 250:
      return 'ftm'
    case 137:
      return 'matic'
    case 25:
      return 'cro'
    case 42161:
      return 'arb'
    default:
      return 'Wrong Network'
  }
}

export const getChainId = (chainName) => {
  // eslint-disable-next-line
  switch (chainName) {
    case 'eth':
      return 1
    case 'bsc':
      return 56
    case 'avax':
      return 43114
    case 'ftm':
      return 250
    case 'matic':
      return 137
    case 'cro':
      return 25
    case 'arb':
      return 42161
    default:
      return 'Wrong Network'
  }
}

export const getChainFullName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={ETH} alt='eth' className='w-3' />
        <p className='font-semibold text-sm hidden md:flex'>ETH</p>
        <p className='font-semibold text-sm flex md:hidden'>ETH</p>
      </div>
    case 56:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={BSC} alt='bsc' className='w-4' />
        <p className='font-semibold text-sm hidden md:flex'>Smart Chain</p>
        <p className='font-semibold text-sm flex md:hidden'>BSC</p>
      </div>
    case 43114:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={AVAX} alt='avax' className='w-4' />
        <p className='font-semibold text-sm hidden md:flex'>Avalanche</p>
        <p className='font-semibold text-sm flex md:hidden'>AVAX</p>
      </div>
    case 250:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={FANTOM} alt='fantom' className='w-3' />
        <p className='font-semibold text-sm hidden md:flex'>Fantom</p>
        <p className='font-semibold text-sm flex md:hidden'>FTM</p>
      </div>
    case 137:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={MATIC} alt='matic' className='w-3' />
        <p className='font-semibold text-sm hidden md:flex'>Polygon</p>
        <p className='font-semibold text-sm flex md:hidden'>MATIC</p>
      </div>
    case 25:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={Cronos} alt='matic' className='w-3' />
        <p className='font-semibold text-sm hidden md:flex'>Cronos</p>
        <p className='font-semibold text-sm flex md:hidden'>CRO</p>
      </div>
    case 42161:
      return <div className='flex flex-row items-center gap-1'>
        <Avatar src={Arbitrum} alt='matic' className='w-3' />
        <p className='font-semibold text-sm hidden md:flex'>Arbitrum</p>
        <p className='font-semibold text-sm flex md:hidden'>ARB</p>
      </div>
  }
}

export const shortAddress = (address, length) => {
  try {
    return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
  } catch (error) {
    console.log(error)
  }
}

export const getExplorerURL = (type, data, chain) => {
  switch (type) {
    case 'wallet':
      return `${explorerURLS[chain]}/address/${data}`;
    case 'tx':
      return `${explorerURLS[chain]}/tx/${data}`;
    case 'token':
      return `${explorerURLS[chain]}/token/${data}`;
    case 'block':
      return `${explorerURLS[chain]}/block/${data}`;
    default:
      return `${explorerURLS[chain]}/`;
  }
}

export const getNativeBalance = async (account) => {
  const nativeBalance = await web3.eth.getBalance(account);
  return web3.utils.fromWei(nativeBalance, 'ether');
}

export const getBalancesOnSupportedChains = async (account) => {
  const BNBPrice = await getSimpleCoinPrice('binancecoin')
  const ETHPrice = await getSimpleCoinPrice('ethereum')
  const AVAXPrice = await getSimpleCoinPrice('avalanche-2')

  const balanceBSC = await web3BSC.eth.getBalance(account);
  const balanceETH = await web3ETH.eth.getBalance(account);
  const balanceAVAX = await web3AVAX.eth.getBalance(account);

  return {
    bsc: { bal: web3BSC.utils.fromWei(balanceBSC, 'ether'), usd: Number(BNBPrice) * Number(web3BSC.utils.fromWei(balanceBSC, 'ether')) },
    eth: { bal: web3ETH.utils.fromWei(balanceETH, 'ether'), usd: Number(ETHPrice) * Number(web3ETH.utils.fromWei(balanceETH, 'ether')) },
    avax: { bal: web3AVAX.utils.fromWei(balanceAVAX, 'ether'), usd: Number(AVAXPrice) * Number(web3AVAX.utils.fromWei(balanceAVAX, 'ether')) }
  }
}