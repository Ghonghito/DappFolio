import React, { useEffect, useState } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { getTopCoins } from 'utils/APIs/CoinGeckoAPI'
import { apiErrorFilter } from 'utils/Helpers'

const Index = () => {
  const [topCoins, setTopCoins] = useState([])

  const getData = async () => {
    const data = await getTopCoins()
    setTopCoins(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {Object.keys(topCoins).length > 0 && (
        <div>
          {topCoins.status === 200 ? (
            <div>
              <Card title='TOP კრიპტოვალუტები' variant='collapsible'>
                <div>
                  <div className='flex flex-col overflow-y-auto'>
                    <table className='text-sm text-left'>
                      <thead className='text-gray-500 text-xs'>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            #
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            ქოინი
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            ფასი
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            24სთ
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            24სთ ნავაჭრი
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            კაპიტალიზაცია
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCoins.data.map((coin) => (
                          <tr key={coin.name} className='w-full cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
                            <th className='px-4 py-4'>
                              <Typography>{coin.market_cap_rank}</Typography>
                            </th>
                            <th className='px-4 py-4 flex items-center gap-2'>
                              <div className='flex-shrink-0'>
                                <img src={coin.image} alt='btc' className='w-6 rounded-full' />
                              </div>
                              <a href={`https://coingecko.com/en/coins/${coin.id}`} target='_blank' rel='noreferrer'>
                                <Typography className='font-bold hidden md:flex'>{coin.name}</Typography>
                                <Typography className='text-xs flex md:hidden'>{String(coin.symbol).toUpperCase()}</Typography>
                              </a>
                            </th>
                            <th className='px-4 py-4'>
                              <p className='text-gray-500'>{coin.current_price < 0.001 ?
                                `$${Number(coin.current_price).toFixed(8)}`
                                :
                                `$${Number(coin.current_price).toLocaleString('en-US')}`}</p>
                            </th>
                            <th className='px-4 py-4'>
                              <p className={`${Number(coin.price_change_percentage_24h) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {`${Number(coin.price_change_percentage_24h).toFixed(2)}%`}
                              </p>
                            </th>
                            <th className='px-4 py-4'>
                              <Typography>${Number(coin.total_volume).toLocaleString('en-US')}</Typography>
                            </th>
                            <th className='px-4 py-4'>
                              <Typography>${Number(coin.market_cap).toLocaleString('en-US')}</Typography>
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
              {apiErrorFilter(404)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Index