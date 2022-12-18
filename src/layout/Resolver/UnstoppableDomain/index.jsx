import React, { useState } from 'react'
import { resolveUDName } from 'utils/APIs/MoralisAPI'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Input from 'components/Input'
import Button from 'components/Button'
import Alert from 'components/Alerts'
import { useToast } from 'hooks/useToast'
import { BiCopy } from 'react-icons/bi'
import { getExplorerURL, shortAddress } from 'utils/WalletHelpers'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [data, setData] = useState([])
  const toast = useToast()

  const getData = async () => {
    setData([])
    const nameToResolve = document.getElementById('name').value
    if (nameToResolve !== '') {
      setIsLoading(true)
      const getAddress = await resolveUDName(nameToResolve)
      if (getAddress.name === null) {
        setData({ status: 404, address: null })
        setIsLoading(false)
      } else if ('message' in getAddress) {
        if (String(getAddress.message).includes('not registered')) {
          setData({ status: 404, address: 'not_registered' })
          setIsLoading(false)
        }
      } else {
        setData({ status: 200, getAddress })
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
                {data.status === 200 ? (
                  <div>
                    <Card>
                      <div className='p-2'>
                        <div className='flex items-center gap-1'>
                          <Typography>მისამართი: </Typography>
                          <a href={getExplorerURL('wallet', data.getAddress.address, 1)} target='_blank' rel='noreferrer'>
                            <Typography className='hover:underline'>{shortAddress(data.getAddress.address, 5)}</Typography>
                          </a>
                          <Typography onClick={() => copyData(data.getAddress.address)} className='cursor-pointer'>
                            <BiCopy />
                          </Typography>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Typography>სახელი: </Typography>
                          <a href={getExplorerURL('wallet', data.getAddress.address, 1)} target='_blank' rel='noreferrer'>
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
                    {data.status === 404 && data.address === 'not_registered' && (
                      <div>
                        <Alert variant='error' text='სახელი რეგისტრირებული არაა!' />
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