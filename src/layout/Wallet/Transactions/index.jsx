import React, { useEffect, useState } from 'react'
import BSC from 'assets/images/Blockchains/Binance.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import TransactionsTable from './TransactionsTable'
import { supportedChainsList } from 'config'
import { Tab } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { getWalletNativeTransactions, getWalletTokenTransactions } from 'utils/APIs/MoralisAPI'

const Index = () => {
  const { account, active } = useWeb3React()
  const [isLoading, setIsLoading] = useState(Boolean)
  const [bscNativeTransactions, setBscNativeTransactions] = useState([])
  const [bscTokenTransactions, setBscTokenTransactions] = useState([])

  const [ethNativeTransactions, setEthNativeTransactions] = useState([])
  const [ethTokenTransactions, setEthTokenTransactions] = useState([])

  const [avaxNativeTransactions, setAvaxNativeTransactions] = useState([])
  const [avaxTokenTransactions, setAvaxTokenTransactions] = useState([])

  const [maticNativeTransactions, setMaticNativeTransactions] = useState([])
  const [maticTokenTransactions, setMaticTokenTransactions] = useState([])

  const [ftmNativeTransactions, setFtmNativeTransactions] = useState([])
  const [ftmTokenTransactions, setFtmTokenTransactions] = useState([])

  const [croNativeTransactions, setCroNativeTransactions] = useState([])
  const [croTokenTransactions, setCroTokenTransactions] = useState([])

  const [arbNativeTransactions, setArbNativeTransactions] = useState([])
  const [arbTokenTransactions, setArbTokenTransactions] = useState([])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getData = async () => {
    setIsLoading(true)

    setBscNativeTransactions([])
    setBscTokenTransactions([])
    setEthNativeTransactions([])
    setEthTokenTransactions([])
    setAvaxNativeTransactions([])
    setAvaxTokenTransactions([])
    setMaticNativeTransactions([])
    setMaticTokenTransactions([])
    setFtmNativeTransactions([])
    setFtmTokenTransactions([])
    setCroNativeTransactions([])
    setCroTokenTransactions([])
    setArbNativeTransactions([])
    setArbTokenTransactions([])


    const bscNative = await getWalletNativeTransactions(account, 'bsc')
    const bscToken = await getWalletTokenTransactions(account, 'bsc')
    setBscNativeTransactions(bscNative)
    setBscTokenTransactions(bscToken)

    const ethNative = await getWalletNativeTransactions(account, 'eth')
    const ethToken = await getWalletTokenTransactions(account, 'eth')
    setEthNativeTransactions(ethNative)
    setEthTokenTransactions(ethToken)

    const avaxNative = await getWalletNativeTransactions(account, 'avalanche')
    const avaxToken = await getWalletTokenTransactions(account, 'avalanche')
    setAvaxNativeTransactions(avaxNative)
    setAvaxTokenTransactions(avaxToken)

    const maticNative = await getWalletNativeTransactions(account, 'polygon')
    const maticToken = await getWalletTokenTransactions(account, 'polygon')
    setMaticNativeTransactions(maticNative)
    setMaticTokenTransactions(maticToken)

    const ftmNative = await getWalletNativeTransactions(account, 'fantom')
    const ftmToken = await getWalletTokenTransactions(account, 'fantom')
    setFtmNativeTransactions(ftmNative)
    setFtmTokenTransactions(ftmToken)

    const croNative = await getWalletNativeTransactions(account, 'cronos')
    const croToken = await getWalletTokenTransactions(account, 'cronos')
    setCroNativeTransactions(croNative)
    setCroTokenTransactions(croToken)

    const arbNative = await getWalletNativeTransactions(account, 'arbitrum')
    const arbToken = await getWalletTokenTransactions(account, 'arbitrum')
    setArbNativeTransactions(arbNative)
    setArbTokenTransactions(arbToken)

    setIsLoading(false)
  }

  const chains = [
    {
      name: 'Smart Chain',
      symbol: 'BSC',
      image: BSC,
      logoWidth: 'w-4'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      image: ETH,
      logoWidth: 'w-3'
    },
    {
      name: 'Avalanche',
      symbol: 'AVAX',
      image: AVAX,
      logoWidth: 'w-4'
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      image: Polygon,
      logoWidth: 'w-4'
    },
    {
      name: 'Fantom',
      symbol: 'FTM',
      image: Fantom,
      logoWidth: 'w-3'
    },
    {
      name: 'Cronos',
      symbol: 'CRO',
      image: Cronos,
      logoWidth: 'w-4'
    },
    {
      name: 'Arbitrum',
      symbol: 'ARB',
      image: Arbitrum,
      logoWidth: 'w-4'
    },
  ]

  useEffect(() => {
    if (active) {
      getData()
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div>
      {!isLoading ? (
        <div>
          <div>
            <div className='flex flex-col md:items-center md:justify-center '>
              <Tab.Group>
                <div>
                  <div>
                    <Tab.List className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 overflow-y-auto space-x-1 rounded-xl duration-150 bg-blue-100 dark:bg-darkCard p-1'>
                      {chains.map((x, index) => (
                        <Tab key={index} className={({ selected }) => classNames('flex items-center gap-2 md:justify-center w-full rounded-lg py-1 px-2 md:px-4 text-sm font-medium leading-5 focus:outline-none',
                          selected ? 'duration-150 bg-white dark:bg-primaryDark text-primary dark:text-white font-bold shadow' : 'text-zinc-500 font-bold hover:bg-white hover:text-primary')}>
                          <div className='bg-primary p-1 rounded-lg w-[30px] h-[30px] flex items-center justify-center flex-shrink-0'>
                            <img src={x.image} className={`${x.logoWidth}`} alt={x.name} />
                          </div>
                          <span className='whitespace-nowrap flex items-center gap-2'>
                            <span className='hidden md:flex'>{x.symbol}</span>
                            <span className='flex md:hidden'>{x.symbol}</span>
                          </span>
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={bscNativeTransactions} tokenTransactions={bscTokenTransactions} chain={supportedChainsList.bsc.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={ethNativeTransactions} tokenTransactions={ethTokenTransactions} chain={supportedChainsList.eth.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={avaxNativeTransactions} tokenTransactions={avaxTokenTransactions} chain={supportedChainsList.avax.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={maticNativeTransactions} tokenTransactions={maticTokenTransactions} chain={supportedChainsList.matic.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={ftmNativeTransactions} tokenTransactions={ftmTokenTransactions} chain={supportedChainsList.ftm.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={croNativeTransactions} tokenTransactions={croTokenTransactions} chain={supportedChainsList.cro.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <TransactionsTable nativeTransactions={arbNativeTransactions} tokenTransactions={arbTokenTransactions} chain={supportedChainsList.arb.networkSymbol} />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Index