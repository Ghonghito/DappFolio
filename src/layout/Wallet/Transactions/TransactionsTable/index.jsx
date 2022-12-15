import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { getChainId, getExplorerURL, shortAddress } from 'utils/WalletHelpers'
import { useWeb3React } from '@web3-react/core'
import { supportedChainsList } from 'config'

const Index = ({ nativeTransactions, tokenTransactions, chain }) => {
  const [isNative, setIsNative] = useState(true)
  const { account } = useWeb3React()

  const itsMe = (address) => {
    const me = String(address).toLocaleLowerCase() === String(account).toLocaleLowerCase() ? 'შენ' : shortAddress(address, 5)
    return me
  }

  const formatTimestamp = (timestamp) => {
    const result = String(timestamp).replace('T', ' ').replace('Z', '').replace('.000', '')
    return result
  }

  return (
    <div>
      <div>
        <div className='mb-3'>
          <Card>
            <div className='flex flex-col md:flex-row md:items-center gap-3 p-2'>
              <p onClick={() => setIsNative(true)} className={`text-md cursor-pointer ${isNative ? 'text-primary underline underline-offset-2' : 'text-zinc-700 dark:text-white'} `}>
                Native Transactions ({nativeTransactions.total})
              </p>
              <p onClick={() => setIsNative(false)} className={`text-md cursor-pointer ${!isNative ? 'text-primary underline underline-offset-2' : 'text-zinc-700 dark:text-white'} `}>
                {supportedChainsList[chain].tokenProtocol} Transactions ({tokenTransactions.total})
              </p>
            </div>
          </Card>
        </div>
        <div>
          {isNative === false && (
            <div>
              {Object.keys(tokenTransactions).length > 0 ? (
                <div>
                  <Card>
                    <div className='overflow-y-auto'>
                      <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
                        <thead className='text-gray-500 text-xs'>
                          <tr>
                            <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                              ჰეში
                            </th>
                            <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                              ბლოკის N
                            </th>
                            <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                              თარიღი
                            </th>
                            <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                              საიდან
                            </th>
                            <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                              სად
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tokenTransactions.result.map((x, Index) => (
                            <tr key={Index} className='w-full cursor-pointer duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900'>
                              <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                                <a href={getExplorerURL('tx', x.transaction_hash, getChainId(chain))} target='_blank' rel='noreferrer'>
                                  <Typography className='hover:underline' color='text-primary'>{shortAddress(x.transaction_hash, 5)}</Typography>
                                </a>
                              </th>
                              <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                                <a href={getExplorerURL('block', x.block_number, getChainId(chain))} target='_blank' rel='noreferrer'>
                                  <Typography className='hover:underline' color='text-primary'>{x.block_number}</Typography>
                                </a>
                              </th>
                              <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                                <Typography>{formatTimestamp(x.block_timestamp)}</Typography>
                              </th>
                              <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                                <a href={getExplorerURL('wallet', x.from_address, getChainId(chain))} target='_blank' rel='noreferrer'>
                                  <Typography className='hover:underline' color={`${itsMe(x.from_address) === 'შენ' ? '' : 'text-primary'}`}>
                                    {shortAddress(x.from_address, 5)}
                                  </Typography>
                                </a>
                              </th>
                              <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                                <a href={getExplorerURL('wallet', x.to_address, getChainId(chain))} target='_blank' rel='noreferrer'>
                                  <Typography className='hover:underline' color={`${itsMe(x.to_address) === 'შენ' ? '' : 'text-primary'}`}>
                                    {shortAddress(x.to_address, 5)}
                                  </Typography>
                                </a>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div>
          {isNative === true ? (
            <div>
              {Object.keys(nativeTransactions).length > 0 ? (
                <Card>
                  <div className='overflow-y-auto'>
                    <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
                      <thead className='text-gray-500 text-xs'>
                        <tr>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            ჰეში
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            ბლოკის N
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            თარიღი
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            საიდან
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            სად
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                            საკომისიო
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nativeTransactions.result.map((x, Index) => (
                          <tr key={Index} className='w-full cursor-pointer duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900'>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <a href={getExplorerURL('tx', x.hash, getChainId(chain))} target='_blank' rel='noreferrer'>
                                <Typography className='hover:underline' color='text-primary'>{shortAddress(x.hash, 5)}</Typography>
                              </a>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <a href={getExplorerURL('block', x.block_number, getChainId(chain))} target='_blank' rel='noreferrer'>
                                <Typography className='hover:underline' color='text-primary'>{x.block_number}</Typography>
                              </a>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <Typography>{formatTimestamp(x.block_timestamp)}</Typography>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <a href={getExplorerURL('wallet', x.from_address, getChainId(chain))} target='_blank' rel='noreferrer'>
                                <Typography className='hover:underline' color={`${itsMe(x.from_address) === 'შენ' ? '' : 'text-primary'}`}>
                                  {shortAddress(x.from_address, 5)}
                                </Typography>
                              </a>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <a href={getExplorerURL('wallet', x.to_address, getChainId(chain))} target='_blank' rel='noreferrer'>
                                <Typography className='hover:underline' color={`${itsMe(x.to_address) === 'შენ' ? '' : 'text-primary'}`}>
                                  {shortAddress(x.to_address, 5)}
                                </Typography>
                              </a>
                            </th>
                            <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                              <Typography className='text-sm'>
                                {Number(Number(x.gas_price) * Number(x.receipt_gas_used)) / 1e18} {supportedChainsList[chain].coinName}
                              </Typography>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ) : null}
            </div>
          ) : null}
        </div>
      </div></div>
  )
}

export default Index