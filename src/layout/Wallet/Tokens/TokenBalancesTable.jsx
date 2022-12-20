import React from 'react'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import AddtoWallet from 'components/AddToWallet'
import Send from './ERC20TokenActions/Send'
import Receive from './ERC20TokenActions/Receive'
import Card from 'components/Cards/Card'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { apiErrorFilter, noTokenLogo } from 'utils/Helpers'

const TokenBalancesTable = ({ data, chain, loaded }) => {
  return (
    <div>
      {!loaded ? (
        <div>
          {data.status === 200 ? (
            <div>
              {Object.keys(data.data).length > 0 ? (
                <Card>
                  <div className='overflow-y-auto'>
                    <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
                      <thead className='text-gray-500 text-xs'>
                        <tr>
                          <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>
                            სახელი
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>
                            ბალანსი
                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>

                          </th>
                          <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.map((x, index) => (
                          <tr key={x.token_address} className='w-full cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
                            <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <img src={x.logo === null ? noTokenLogo(chain) : x.logo} alt='bsc' className='w-9 rounded-full' />
                                <div className='flex flex-col'>
                                  <div className='flex items-center gap-2'>
                                    <Typography className=''>{x.symbol}</Typography>
                                    {/*  <AddtoWallet variant='icon' address={x.token_address} symbol={x.symbol} decimal={x.decimals} /> */}
                                  </div>
                                  <AddressComponent address={x.token_address} type='token' chain={chain} />
                                </div>
                              </div>
                            </th>
                            <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                              <Typography>
                                {Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}
                              </Typography>
                            </th>
                            <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                              <AddtoWallet variant='text' address={x.token_address} symbol={x.symbol} decimal={x.decimals} />
                            </th>
                            <th className='duration-150 border-b dark:border-darkBorder px-6 py-4 flex items-center gap-2'>
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
              {apiErrorFilter(404)}
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