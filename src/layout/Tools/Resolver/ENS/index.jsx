import React, { useState } from 'react'
import { resolveENSAddress } from 'utils/APIs/MoralisAPI'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Input from 'components/Input'
import Button from 'components/Button'
import Alert from 'components/Alerts'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { useToast } from 'hooks/useToast'
import { BiCopy } from 'react-icons/bi'
import { getExplorerURL } from 'utils/WalletHelpers'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [data, setData] = useState([])
  const toast = useToast()

  const getData = async () => {
    setData([])
    const addressToResolve = document.getElementById('address').value
    if (addressToResolve !== '') {
      setIsLoading(true)
      const getName = await resolveENSAddress(addressToResolve)
      if (getName.name === null) {
        setData({ status: 404, name: null })
        setIsLoading(false)
      } else if ('reason' in getName) {
        setData({ status: 404, name: 'invalid_address' })
        setIsLoading(false)
      } else {
        setData({ status: 200, getName })
        setIsLoading(false)
      }
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
        <Card title='ENS სახელის ძებნა მისამართით'>
          <div className='px-2 mb-2'>
            <Input id='address' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='მისამართი' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2'>ძებნა</Button>
          </div>
        </Card>
        {!isLoading ? (
          <div className='mt-3'>
            {Object.keys(data).length > 0 && (
              <div>
                {data.status === 200 ? (
                  <div>
                    <Card>
                      <div className='p-2'>
                        <div className='flex items-center gap-1'>
                          <Typography>სახელი: </Typography>
                          <a href={getExplorerURL('wallet', document.getElementById('address').value, 1)} target='_blank' rel='noreferrer'>
                            <Typography className='hover:underline'>{data.getName.name}</Typography>
                          </a>
                          <Typography onClick={() => copyData(data.getName.name)} className='cursor-pointer'>
                            <BiCopy />
                          </Typography>

                        </div>
                        <div className='flex items-center gap-1'>
                          <Typography>მისამართი: </Typography>
                          <AddressComponent address={document.getElementById('address').value} type='wallet' chain={'ETH'} />
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className='mt-2'>
                    {data.status === 404 && data.name === null && (
                      <div>
                        <Alert variant='error' text='სახელი რეგისტრირებული არაა!' />
                      </div>
                    )}
                    {data.status === 404 && data.name === 'invalid_address' && (
                      <div>
                        <Alert variant='error' text='მისამართი არასოწორია!' />
                      </div>
                    )}
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