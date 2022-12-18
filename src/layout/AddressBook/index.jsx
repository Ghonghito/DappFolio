import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Button from 'components/Button'
import Typography from 'components/Typography'
import Input from 'components/Input'
import AddressesTable from './AddressesTable'
import { supportedChains } from 'config'

const Index = () => {
  document.title = 'DappFolio - მისამართების წიგნი'
  const [isUpdated, setIsUpdated] = useState(0)

  const saveAddress = () => {
    var existingAddresses = JSON.parse(localStorage.getItem('addressBook'))
    if (existingAddresses === null) existingAddresses = []

    const getWalletChain = document.getElementById('addressChain').value
    const getWalletName = document.getElementById('walletName').value
    const getWalletAddress = document.getElementById('walletAddress').value
    const result = { chain: String(getWalletChain).toUpperCase(), walletName: getWalletName, walletAddress: getWalletAddress }

    localStorage.setItem('entry', JSON.stringify(result))
    existingAddresses.push(result)
    localStorage.setItem('addressBook', JSON.stringify(existingAddresses))
    setIsUpdated(isUpdated + 1)
  }

  return (
    <div className='flex flex-col md:flex-row justify-center gap-2'>
      <div className='w-full md:w-[350px]'>
        <Card title='საფულის დამათება წიგნაკში'>
          <div className='p-3'>
            <div>
              <Typography>ქსელი:</Typography>
              <select id="addressChain" defaultValue='აირჩიეთ ქსელი' className='duration-150 py-2 dark:bg-darkHover border dark-lightBorder dark:border-darkBorder rounded-lg p-2 w-full text-lightText dark:text-darkText focus:outline-none'>
                {supportedChains.map((x) => (
                  <option key={x.networkName} value={x.networkSymbol}>{x.networkName}</option>
                ))}
              </select>
            </div>
            <div className='mt-3'>
              <Typography>სახელი:</Typography>
              <Input id='walletName' placeholder='სახელი' />
            </div>
            <div className='mt-3'>
              <Typography>მისამართი:</Typography>
              <Input id='walletAddress' placeholder='საფულის მისამართი' />
            </div>
            <div className='mt-2'>
              <Button onClick={() => saveAddress()}>დამატება</Button>
            </div>
          </div>
        </Card>
      </div>
      <AddressesTable updated={isUpdated} />
    </div>
  )
}

export default Index