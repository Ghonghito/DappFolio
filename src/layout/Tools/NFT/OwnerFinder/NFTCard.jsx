import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alerts from 'components/Alerts'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { getNFTImage } from 'utils/Helpers'
import { getChainId, getExplorerURL, shortAddress } from 'utils/WalletHelpers'

const Index = ({data, chain, loaded}) => {

  return (
    <div>
      {!loaded ? (
        <div>
          {Object.keys(data).length > 1 ? (
            <div className='w-full md:w-[550px] mb-3'>
              <Card>
                <div className='p-3 flex flex-col md:flex-row gap-2'>
                  <div className='flex flex-col gap-2 items-center'>
                    <img src={getNFTImage(data.normalized_metadata.image)} alt={data.name} className='rounded-lg w-[250px]' />
                    <div className='flex items-center gap-1'>
                      <Typography className='text-lg'>{data.name}</Typography>
                      <Typography className='text-lg truncate'>#{data.token_id}</Typography>
                    </div>
                    <Typography className='text-sm'>{data.contract_type}</Typography>
                  </div>
                  <div>
                    <div className='w-full md:w-[300px] border-2 border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2'>
                      <table className='w-full text-left text-white'>
                        <tbody>
                          <tr className=''>
                            <th>
                              <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>მისამართი</p>
                            </th>
                            <td>
                              <a href={getExplorerURL('wallet', data.token_address, getChainId(chain))} target='_blank' rel='noreferrer' className='flex items-center gap-1'>
                                <p className='text-md text-primary'>{shortAddress(data.token_address, 4)}</p>
                                <MdOutlineOpenInNew className='text-md text-primary' />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>მფლობელი</p>
                            </th>
                            <td>
                              <a href={getExplorerURL('wallet', data.owner_of, getChainId(chain))} target='_blank' rel='noreferrer' className='flex items-center gap-1'>
                                <p className='text-md text-primary'>{shortAddress(data.owner_of, 4)}</p>
                                <MdOutlineOpenInNew className='text-md text-primary' />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>ID</p>
                            </th>
                            <td>
                              <p className='text-primary'>{data.token_id}</p>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>სიმბოლო</p>
                            </th>
                            <td>
                              <p className='text-primary'>{data.symbol}</p>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>ქსელი</p>
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
                {Object.keys(data.normalized_metadata.attributes).length > 0 && (
                  <div className='px-3 mb-3'>
                    <div className='border-2 border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3'>
                      {data.normalized_metadata.attributes.map((x) => (
                        <div key={x.trait_type} className='border-[1px] border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2'>
                          <div className='flex flex-col items-center justify-center'>
                            <p className='text-zinc-700 dark:text-zinc-400 font-semibold text-xs'>{String(x.trait_type).toUpperCase()}</p>
                            <p className='text-zinc-700 dark:text-zinc-400 font-semibold'>{x.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Alerts variant='warning' text='ვერ მოიძებნა!' />
          )}
        </div>
      ) : (
        <Alerts variant='info' text='დაელოდეთ' />
      )}
    </div>
  )
}

export default Index