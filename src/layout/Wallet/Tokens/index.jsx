import React, { useState, useEffect } from 'react'
import BSC from 'assets/images/Blockchains/Binance.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import TokenBalancesTable from './TokenBalancesTable'
import NativeBalances from '../NativeBalances'
import LoadingAnimation from 'components/LoadingAnimation'
import { supportedChainsList } from 'config'
import { Tab } from '@headlessui/react'
import ConnectWalletAlert from 'components/ConnectWalletAlert'
import { getWalletTokensBalance } from 'utils/APIs/MoralisAPI'
import { useWeb3React } from '@web3-react/core'

const Index = () => {
  document.title = 'DappFolio - საფულე'
  const { account, active } = useWeb3React()
  const [isLoading, setIsLoading] = useState(Boolean)
  const [ethTokensBalance, setEthTokensBalance] = useState([])
  const [maticTokensBalance, setMaticTokensBalance] = useState([])
  const [bscTokensBalance, setBscTokensBalance] = useState([])
  const [avaxTokensBalance, setAvaxTokensBalance] = useState([])
  const [ftmTokensBalance, setFtmTokensBalance] = useState([])
  const [croTokensBalance, setcroTokensBalance] = useState([])
  const [arbitrumTokensBalance, setArbitrumTokensBalance] = useState([])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getData = async () => {
    setIsLoading(true)
    setEthTokensBalance([])
    setMaticTokensBalance([])
    setBscTokensBalance([])
    setAvaxTokensBalance([])
    setFtmTokensBalance([])
    setcroTokensBalance([])
    setArbitrumTokensBalance([])
    const ethData = await getWalletTokensBalance(account, 'eth')
    const maticData = await getWalletTokensBalance(account, 'polygon')
    const bscData = await getWalletTokensBalance(account, 'bsc')
    const avaxData = await getWalletTokensBalance(account, 'avalanche')
    const ftmData = await getWalletTokensBalance(account, 'fantom')
    const croData = await getWalletTokensBalance(account, 'cronos')
    const arbitrumData = await getWalletTokensBalance(account, 'arbitrum')
    setEthTokensBalance(ethData)
    setMaticTokensBalance(maticData)
    setBscTokensBalance(bscData)
    setAvaxTokensBalance(avaxData)
    setFtmTokensBalance(ftmData)
    setcroTokensBalance(croData)
    setArbitrumTokensBalance(arbitrumData)
    setIsLoading(false)
  }

  useEffect(() => {
    if (active) {
      getData()
    }
    // eslint-disable-next-line
  }, [active])

  const chains = [
    {
      name: 'Smart Chain',
      symbol: 'BSC',
      image: BSC,
      logoWidth: 'w-4',
      tokens: Object.keys(bscTokensBalance).length > 0 ? Object.keys(bscTokensBalance.data).length : 0
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      image: ETH,
      logoWidth: 'w-3',
      tokens: Object.keys(ethTokensBalance).length > 0 ? Object.keys(ethTokensBalance.data).length : 0
    },
    {
      name: 'Avalanche',
      symbol: 'AVAX',
      image: AVAX,
      logoWidth: 'w-4',
      tokens: Object.keys(avaxTokensBalance).length > 0 ? Object.keys(avaxTokensBalance.data).length : 0
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      image: Polygon,
      logoWidth: 'w-4',
      tokens: Object.keys(maticTokensBalance).length > 0 ? Object.keys(maticTokensBalance.data).length : 0
    },
    {
      name: 'Fantom',
      symbol: 'FTM',
      image: Fantom,
      logoWidth: 'w-3',
      tokens: Object.keys(ftmTokensBalance).length > 0 ? Object.keys(ftmTokensBalance.data).length : 0
    },
    {
      name: 'Cronos',
      symbol: 'CRO',
      image: Cronos,
      logoWidth: 'w-4',
      tokens: Object.keys(croTokensBalance).length > 0 ? Object.keys(croTokensBalance.data).length : 0
    },
    {
      name: 'Arbitrum',
      symbol: 'ARB',
      image: Arbitrum,
      logoWidth: 'w-4',
      tokens: Object.keys(arbitrumTokensBalance).length > 0 ? Object.keys(arbitrumTokensBalance.data).length : 0
    },
  ]

  return (
    <div>
      <NativeBalances />
      {active ? (
        <div>
          {!isLoading ? (
            <div>
              <div>
                <div className='flex flex-col md:items-center md:justify-center '>
                  <Tab.Group>
                    <div className=''>
                      <div className='md:flex'>
                        <Tab.List className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 overflow-y-auto space-x-1 rounded-xl duration-150 bg-lightHover dark:bg-darkCard p-1'>
                          {chains.map((x, index) => (
                            <Tab key={index} className={({ selected }) => classNames('flex items-center gap-2 md:justify-center w-full rounded-lg py-1 px-2 md:px-4 text-sm font-medium leading-5 focus:outline-none',
                              selected ? 'duration-150 bg-white dark:bg-primaryDark text-primary dark:text-white font-bold shadow' : 'text-zinc-500 font-bold hover:bg-white hover:text-primary')}>
                              <div className='bg-primary p-1 rounded-lg w-[30px] h-[30px] flex items-center justify-center flex-shrink-0'>
                                <img src={x.image} className={`${x.logoWidth}`} alt={x.name} />
                              </div>
                              <span className='whitespace-nowrap flex items-center gap-2'>
                                <span className='hidden md:flex'>{x.symbol}</span>
                                <span className='flex md:hidden'>{x.symbol}</span>
                                {isLoading ? null : `(${x.tokens})`}
                              </span>
                            </Tab>
                          ))}
                        </Tab.List>
                      </div>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={bscTokensBalance} chain={supportedChainsList.BSC.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={ethTokensBalance} chain={supportedChainsList.ETH.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={avaxTokensBalance} chain={supportedChainsList.AVAX.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={maticTokensBalance} chain={supportedChainsList.MATIC.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={ftmTokensBalance} chain={supportedChainsList.FTM.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={croTokensBalance} chain={supportedChainsList.CRO.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>
                          <TokenBalancesTable data={arbitrumTokensBalance} chain={supportedChainsList.ARB.networkSymbol} loaded={isLoading} />
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </div>
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </div>
      ) : (
        <ConnectWalletAlert />
      )}
    </div>
  )
}

export default Index