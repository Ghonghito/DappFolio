import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Alert from 'components/Alerts'
import { useToast } from 'hooks/useToast'
import { supportedChains } from 'config'
import { searchTokenBySymbol, searchTokenByContractAddress } from 'utils/APIs/MoralisAPI'
import { getChainId, getExplorerURL, shortAddress } from 'utils/WalletHelpers'
import { noTokenLogo } from 'utils/Helpers'
import AddtoWallet from 'components/AddToWallet'

const Index = () => {
  document.title = 'DappFolio - ტოკენის ძენა'
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const toast = useToast()

  const getData = async () => {
    setIsLoading(true)
    const selectedChain = document.getElementById('addressChain').value
    const tokenValue = document.getElementById('tokenInput').value

    if (selectedChain !== 'selectChain') {
      if (tokenValue !== '') {
        if (String(tokenValue).slice(0, 2) !== '0x') {
          const getTokens = await searchTokenBySymbol(String(tokenValue).toUpperCase(), selectedChain)
          setData(getTokens)
          setIsLoading(false)
        } else {
          const getTokens = await searchTokenByContractAddress(String(tokenValue), selectedChain)
          setData(getTokens)
          setIsLoading(false)
        }
      } else {
        toast('error', 'შეიყვანეთ ტოკენის სიმბოლო ან კონტრაქტის მისამართი')
      }
    } else {
      toast('error', 'აირჩიეთ ქსელი')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex flex-col md:items-center md:justify-center space-y-3'>
      <div className='w-full md:w-[450px]'>
        <Card title='ტოკენის ძებნა'>
          <div className='p-2'>
            <div>
              <Typography>ქსელი:</Typography>
              <select id='addressChain' defaultValue='აირჩიეთ ქსელი' className='py-2 dark:bg-[#181818] border border-[#e3e3e6] dark:border-[#303031] rounded-lg p-2 w-full text-lightText dark:text-[#868687] focus:outline-none'>
                <option key='selectChain' value='selectChain'>აირჩიეთ ქსელი</option>
                {supportedChains.map((x) => (
                  <option key={x.moralisId} value={x.moralisId}>{x.networkName}</option>
                ))}
              </select>
            </div>
            <Input id='tokenInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='ტოკენის სიმბოლო ან კონტრაქტის მისამართი' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2'>ძებნა</Button>
          </div>
        </Card>
      </div>
      {!isLoading ? (
        <div>
          {Object.keys(data).length > 0 ? (
            <div>
              <Card>
                <div className='px-3 py-2'>
                  <Typography>ნაპონვია {data.length} ტოკენი</Typography>
                </div>
                <div>
                  <div className='overflow-y-auto'>
                    <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
                      <thead className='text-gray-500 text-xs'>
                        <tr>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            სახელი
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            სიმბოლო
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            კონტრაქტი
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            Decimal
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((x, index) => (
                          <tr key={index} className='w-full cursor-pointer duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900'>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <img src={x.logo === null ? noTokenLogo('bsc') : x.logo} alt='bsc' className='w-7 rounded-full' />
                                <Typography>{x.name}</Typography>
                              </div>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <Typography>{x.symbol}</Typography>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <a href={getExplorerURL('token', x.address, getChainId('bsc'))} target='_blank' rel='noreferrer'>
                                <Typography className='hover:underline'>{shortAddress(x.address, 5)}</Typography>
                              </a>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <Typography>{x.decimals}</Typography>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <AddtoWallet variant='text' address={x.address} symbol={x.symbol} decimal={x.decimals} />
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <Alert variant='warning' /* text='ვერ მოიძებნა' */ text={`${String(document.getElementById('addressChain').value).toUpperCase()} ქსელზე ${String(document.getElementById('tokenInput').value).toUpperCase()} ტოკენი ვერ მოიძებნა!`} />
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Index