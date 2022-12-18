import React, { useState, useEffect } from 'react'
import BSC from 'assets/images/Blockchains/Binance.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import LoadingAnimation from 'components/LoadingAnimation'
import ConnectWalletAlert from 'components/ConnectWalletAlert'
import { Tab } from '@headlessui/react'
import NFTCards from './NFTCards'
import { supportedChainsList } from 'config'
import { getWalletNFTsBalance } from 'utils/APIs/MoralisAPI'
import { useWeb3React } from '@web3-react/core'

const Index = () => {
  const { active } = useWeb3React()
  const [isLoading, setIsLoading] = useState(Boolean)
  const [ethNFTs, setEthNFTs] = useState([])
  const [bscNFTs, setBscNFTs] = useState([])
  const [maticNFTs, setMaticNFTs] = useState([])
  const [avaxNFTs, setAvaxNFTs] = useState([])
  const [ftmNFTs, setFtmNFTs] = useState([])
  const [croNFTs, setCroNFTs] = useState([])
  const [arbNFTs, setArbNFTs] = useState([])

  const getNFTs = async () => {
    setIsLoading(true)
    setEthNFTs([])
    setBscNFTs([])
    setMaticNFTs([])
    setAvaxNFTs([])
    setFtmNFTs([])
    setCroNFTs([])
    setArbNFTs([])
    const ethData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'eth')
    const bscData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'bsc')
    const maticData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'polygon')
    const avaxData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'avalanche')
    const ftmData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'fantom')
    const croData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'cronos')
    const arbData = await getWalletNFTsBalance('0xe1dbD2c71ded411DB6Ce029785E9bA9c1Ae0c801', 'arbitrum')
    setEthNFTs(ethData)
    setBscNFTs(bscData)
    setMaticNFTs(maticData)
    setAvaxNFTs(avaxData)
    setFtmNFTs(ftmData)
    setCroNFTs(croData)
    setArbNFTs(arbData)
    setIsLoading(false)
  }

  useEffect(() => {
    getNFTs()
    // eslint-disable-next-line
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const chains = [
    {
      name: 'Smart Chain',
      symbol: 'BSC',
      image: BSC,
      logoWidth: 'w-4',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      image: ETH,
      logoWidth: 'w-3',
    },
    {
      name: 'Avalanche',
      symbol: 'AVAX',
      image: AVAX,
      logoWidth: 'w-4',
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      image: Polygon,
      logoWidth: 'w-4',
    },
    {
      name: 'Fantom',
      symbol: 'FTM',
      image: Fantom,
      logoWidth: 'w-3',
    },
    {
      name: 'Cronos',
      symbol: 'CRO',
      image: Cronos,
      logoWidth: 'w-4',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARB',
      image: Arbitrum,
      logoWidth: 'w-4',
    },
  ]

  return (
    <div>
      {active ? (
        <div>
          {!isLoading ? (
            <div>
              <div className='flex flex-col md:items-center md:justify-center '>
                <Tab.Group>
                  <div className=''>
                    <div className=''>
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
                            </span>
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={bscNFTs} chain={supportedChainsList.bsc.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={ethNFTs} chain={supportedChainsList.eth.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={avaxNFTs} chain={supportedChainsList.avax.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={maticNFTs} chain={supportedChainsList.matic.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={ftmNFTs} chain={supportedChainsList.ftm.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={croNFTs} chain={supportedChainsList.cro.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <NFTCards data={arbNFTs} chain={supportedChainsList.arb.networkSymbol} loaded={isLoading} />
                      </Tab.Panel>
                    </Tab.Panels>
                  </div>
                </Tab.Group>
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