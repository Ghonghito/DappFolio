import React from 'react'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import AddtoWallet from 'components/AddToWallet'
import Send from './ERC20TokenActions/Send'
import Receive from './ERC20TokenActions/Receive'
import Card from 'components/Cards/Card'
import { BiCopy } from 'react-icons/bi'
import { getChainId, getExplorerURL, shortAddress } from 'utils/WalletHelpers'
import { noTokenLogo } from 'utils/TokenHelpers'
import { useToast } from 'hooks/useToast'

const TokenBalancesTable = ({ data, chain, loaded }) => {
  const toast = useToast()

  const copyAddress = (contractAddress) => {
    navigator.clipboard.writeText(contractAddress);
    toast('success', 'დაკოპირდა')
  }

  return (
    <div>
      {!loaded ? (
        <div>
          {Object.keys(data).length > 0 ? (
            <Card>
              <div className='overflow-y-auto'>
                <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
                  <thead className='text-gray-500 text-xs'>
                    <tr>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                        სახელი
                      </th>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                        ბალანსი
                      </th>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>

                      </th>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, index) => (
                      <tr key={x.token_address} className='w-full cursor-pointer duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900'>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <img src={x.logo === null ? noTokenLogo(chain) : x.logo} alt='bsc' className='w-9 rounded-full' />
                            <div className='flex flex-col'>
                              <div className='flex items-center gap-2'>
                                <Typography className=''>{x.symbol}</Typography>
                                {/*  <AddtoWallet variant='icon' address={x.token_address} symbol={x.symbol} decimal={x.decimals} /> */}
                              </div>
                              <div className='flex items-center gap-1'>
                                <a href={getExplorerURL('token', x.token_address, getChainId(chain))} target='_blank' rel='noreferrer'>
                                  <Typography className='hover:underline text-xs'>
                                    {shortAddress(x.token_address, 4)}
                                  </Typography>
                                </a>
                                <BiCopy onClick={() => copyAddress(x.token_address)} className='text-zinc-900 dark:text-gray-400 text-xs' />
                              </div>
                            </div>
                          </div>
                        </th>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <Typography>
                            {Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}
                          </Typography>
                        </th>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <AddtoWallet variant='text' address={x.token_address} symbol={x.symbol} decimal={x.decimals} />
                        </th>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4 flex items-center gap-2'>
                          <Send data={x} chain={chain} />
                          <Receive data={x} chain={chain} />
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div>
              <Alert variant='warning' text={`${String(chain).toUpperCase()} ქსელზე ტოკენები არ გაქვთ!`} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Alert variant='info' text='იტვირთება, დაელოდეთ.' />
        </div>
      )}
    </div>
  )
}

export default TokenBalancesTable