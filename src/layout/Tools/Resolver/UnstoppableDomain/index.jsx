import React, { useState } from 'react'
import { resolveUDName } from 'utils/APIs/MoralisAPI'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Input from 'components/Input'
import Button from 'components/Button'
import Alert from 'components/Alerts'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { apiErrorFilter } from 'utils/Helpers'
import { useToast } from 'hooks/useToast'
import { BiCopy } from 'react-icons/bi'
import { getExplorerURL } from 'utils/WalletHelpers'

const Index = () => {
  document.title = 'DappFolio - UD Name'
  const [isLoading, setIsLoading] = useState(Boolean)
  const [data, setData] = useState([])
  const toast = useToast()

  const getData = async () => {
    setData([])
    const nameToResolve = document.getElementById('name').value
    if (nameToResolve !== '') {
      setIsLoading(true)
      const getAddress = await resolveUDName(nameToResolve)
      setData(getAddress)
      setIsLoading(false)
    } else {
      toast('error', 'შეიყვანეთ მისამართი!')
    }
  }

  const copyData = (contractAddress) => {
    navigator.clipboard.writeText(contractAddress);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full md:w-[450px]'>
        <Card title='UD მისამართის ძებნა სახელით'>
          <div className='px-2 mb-2'>
            <Input id='name' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='სახელი (მაგ: brad.crypto)' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2'>ძებნა</Button>
          </div>
        </Card>
        {!isLoading ? (
          <div className='mt-3'>
            {Object.keys(data).length > 0 && (
              <div>
                {data.status === 200 && data.data.hasOwnProperty('address') ? (
                  <div>
                    <Card>
                      <div className='p-2'>
                        <div className='flex items-center gap-1'>
                          <Typography>მისამართი: </Typography>
                          <AddressComponent address={data.data.address} type='wallet' chain={'ETH'} />
                        </div>
                        <div className='flex items-center gap-1'>
                          <Typography>სახელი: </Typography>
                          <a href={getExplorerURL('wallet', data.data.address, 1)} target='_blank' rel='noreferrer'>
                            <Typography className='hover:underline'>{document.getElementById('name').value}</Typography>
                          </a>
                          <Typography onClick={() => copyData(document.getElementById('name').value)} className='cursor-pointer'>
                            <BiCopy />
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className='mt-2'>
                    {apiErrorFilter(data.data.message)}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className='mt-2'>
            <Alert variant='info' text='დაელოდეთ' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Index