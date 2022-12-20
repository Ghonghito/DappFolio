import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alerts from 'components/Alerts'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { apiErrorFilter } from 'utils/Helpers'
import { getNFTImage } from 'utils/Helpers'

const Index = ({ data, chain, loaded }) => {
  return (
    <div>
      {!loaded ? (
        <div>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 && !data.data.hasOwnProperty('message') ? (
                <div>
                  <div className='mt-3'>
                    <Card>
                      <div className='p-3 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2 items-center'>
                          <img src={getNFTImage(data.data.normalized_metadata.image)} alt={data.data.name} className='rounded-lg w-[300px]' />
                          <div className='flex items-center gap-1'>
                            <Typography className='text-lg'>{data.data.name}</Typography>
                            <Typography className='text-lg truncate'>#{data.data.token_id}</Typography>
                          </div>
                          <Typography className='text-sm'>{data.data.contract_type}</Typography>
                        </div>
                        <div>
                          <div className='w-full md:w-[300px] border-2 border-lightBorder dark:border-darkBorder rounded-lg px-3 py-2'>
                            <table className='w-full text-left text-white'>
                              <tbody>
                                <tr className=''>
                                  <th>
                                    <Typography>მისამართი</Typography>
                                  </th>
                                  <td>
                                    <AddressComponent address={data.data.token_address} chain={chain} type='token' />
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <Typography>მფლობელი</Typography>
                                  </th>
                                  <td>
                                    <AddressComponent address={data.data.owner_of} chain={chain} type='wallet' />
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <Typography>ID</Typography>
                                  </th>
                                  <td>
                                    <p className='text-primary'>{data.data.token_id}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <Typography>სიმბოლო</Typography>
                                  </th>
                                  <td>
                                    <p className='text-primary'>{data.data.symbol}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <Typography>ქსელი</Typography>
                                  </th>
                                  <td>
                                    <p className='text-primary'>{String(chain).toUpperCase()}F</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {Object.keys(data.data.normalized_metadata.attributes).length > 0 && (
                        <div className='px-3 mb-3'>
                          <div className='border-2 border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3'>
                            {data.data.normalized_metadata.attributes.map((x) => (
                              <div key={x.trait_type} className='border-[1px] border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2'>
                                <div className='flex flex-col items-center justify-center'>
                                  <p className='text-zinc-700 dark:text-zinc-400 font-semibold text-xs'>{String(x.trait_type).toUpperCase()}</p>
                                  <Typography>{x.value}</Typography>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              ) : (
                <div>
                  {apiErrorFilter(data.data.message)}
                </div>
              )}
            </div>
          ) : (
            <div className='w-full mt-3'>
              <Alerts variant='warning' text='ვერ მოიძებნა!' />
            </div>
          )}
        </div>
      ) : (
        <div className='w-full mt-3'>
          <Alerts variant='info' text='დაელოდეთ' />
        </div>
      )}
    </div>
  )
}

export default Index