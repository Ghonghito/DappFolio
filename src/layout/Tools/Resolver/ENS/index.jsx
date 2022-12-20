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
  document.title = 'DappFolio - ENS Name'
  const [isLoading, setIsLoading] = useState(Boolean)
  const [data, setData] = useState([])
  const toast = useToast()

  const getData = async () => {
    const addressToResolve = document.getElementById('address').value
    if (addressToResolve !== '') {
      setData([])
      setIsLoading(true)
      const getName = await resolveENSAddress(addressToResolve)
      setData(getName)
      setIsLoading(false)
    } else {
      toast('error', 'შეიყვანეთ მისამართი')
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
        {isLoading === false ? (
          <div className='mt-3'>
            {Object.keys(data).length > 0 && (
              <div>
                {data.status === 200 ? (
                  <div>
                    {data.data.name !== null && String(data.data.name).includes('.eth') ? (
                      <Card>
                        <div className='p-2'>
                          <div className='flex items-center gap-1'>
                            <Typography>სახელი: </Typography>
                            <a href={getExplorerURL('wallet', document.getElementById('address').value, 1)} target='_blank' rel='noreferrer'>
                              <Typography className='hover:underline'>{data.data.name}</Typography>
                            </a>
                            <Typography onClick={() => copyData(data.data.name)} className='cursor-pointer'>
                              <BiCopy />
                            </Typography>

                          </div>
                          <div className='flex items-center gap-1'>
                            <Typography>მისამართი: </Typography>
                            <AddressComponent address={document.getElementById('address').value} type='wallet' chain={'ETH'} />
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <Alert variant='warning' text='სახელი რეგისტრირებული არაა' />
                    )}
                  </div>
                ) : (
                  <div>
                    <Alert variant='error' text='API კავშირი ვერ მოხერხდა.' />
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