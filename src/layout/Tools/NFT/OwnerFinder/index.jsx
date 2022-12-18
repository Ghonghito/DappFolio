import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { supportedChains } from 'config'
import { getNFTOwner } from 'utils/APIs/MoralisAPI'
import NFTCard from './NFTCard'

const Index = () => {
  document.title = 'DappFolio - NFT მფლობელის ძებნა'
  const [isLoading, setIsLoading] = useState(true)
  const [nftData, setNftData] = useState([])
  const toast = useToast()

  const getData = async () => {
    setIsLoading(true)
    const getSelectedChain = document.getElementById('addressChain').value
    const getNftContractAddress = document.getElementById('nftContractAddressInput').value
    const getNftId = document.getElementById('nftIdInput').value
    if (getSelectedChain !== 'selectChain') {
      if (getNftContractAddress !== '') {
        if (getNftId !== '') {
          const data = await getNFTOwner(getNftContractAddress, getNftId, getSelectedChain)
          setNftData(data)
          setIsLoading(false)
        } else {
          toast('error', 'შეიყვანეთ NFT-ის ID')
        }
      } else {
        toast('error', 'შეიყვანეთ NFT-ის კონტრაქტის მისამართი')
      }
    } else {
      toast('error', 'აირჩიეთ ქსელი')
    }
    
  }

  return (
    <div className='flex flex-col-reverse items-center justify-center'>
      <div className='w-full md:w-[450px]'>
        <Card title='NFT მფლობელის ძებნა'>
          <div className='p-2'>
            <div>
              <Typography>ქსელი:</Typography>
              <select id='addressChain' defaultValue='აირჩიეთ ქსელი' className='duration-150 py-2 dark:bg-darkHover border dark-lightBorder dark:border-darkBorder rounded-lg p-2 w-full text-lightText dark:text-darkText focus:outline-none'>
                <option key='selectChain' value='selectChain'>აირჩიეთ ქსელი</option>
                {supportedChains.map((x) => (
                  <option key={x.moralisId} value={x.moralisId}>{x.networkName}</option>
                ))}
              </select>
            </div>
            <Input id='nftContractAddressInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='NFT-ის კონტრაქტის მისამართი' className='mt-2' />
            <Input id='nftIdInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='NFT-ის ID' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2'>ძებნა</Button>
          </div>
        </Card>
      </div>
      {!isLoading ? (
        <NFTCard data={nftData} chain={document.getElementById('addressChain').value} loaded={isLoading} />
      ) : null}
    </div>
  )
}

export default Index