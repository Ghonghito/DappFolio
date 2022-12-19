import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Button from 'components/Button'
import { Select, Option } from 'components/Select'
import { useToast } from 'hooks/useToast'
import { supportedChains } from 'config'
import { getNFTOwner } from 'utils/APIs/MoralisAPI'
import NFTCard from './NFTCard'
import { moralisIdToSymbol } from 'utils/Helpers'

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
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full md:w-[450px]'>
        <Card title='NFT მფლობელის ძებნა'>
          <div className='p-2'>
            <div>
              <Select id='addressChain' defaultValue='აირჩიეთ ქსელი'>
                <Option value='selectChain'>აირჩიეთ ქსელი</Option>
                {supportedChains.map((x) => (
                  <Option key={x.moralisId} value={x.moralisId}>{x.networkName}</Option>
                ))}
              </Select>
            </div>
            <Input id='nftContractAddressInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='NFT-ის კონტრაქტის მისამართი' className='mt-2' />
            <Input id='nftIdInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='NFT-ის ID' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2'>ძებნა</Button>
          </div>
        </Card>
      </div>
      {!isLoading ? (
        <NFTCard data={nftData} chain={moralisIdToSymbol(document.getElementById('addressChain').value)} loaded={isLoading} />
      ) : null}
    </div>
  )
}

export default Index