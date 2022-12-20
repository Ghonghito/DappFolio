import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { getCGTrendingCoins } from 'utils/APIs/CoinGeckoAPI'
import { apiErrorFilter } from 'utils/Helpers'

const Index = () => {
  const [trendingCoins, setTrendingCoins] = useState([])

  const getData = async () => {
    const data = await getCGTrendingCoins()
    setTrendingCoins(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {Object.keys(trendingCoins).length > 0 && (
        <Card title='ტრენდული ქოინები'>
          <div className='p-2'>
            {trendingCoins.status === 200 ? (
              <div>
                {trendingCoins.data.coins.map((x) => (
                  <a key={x.item.coin_id} href={`https://www.coingecko.com/en/coins/${x.item.id}`} target='_blank' rel='noreferrer'>
                    <div className='py-2 duration-150 hover:bg-lightHover dark:hover:bg-darkHover px-2 rounded-lg cursor-pointer'>
                      <div className='flex items-center gap-2'>
                        <div className='duration-150 bg-lightBorder dark:bg-darkBorder p-2 rounded-lg'>
                          <img src={x.item.large} alt={x.item.name} className='w-7 rounded-full' />
                        </div>
                        <div>
                          <Typography>{x.item.name}</Typography>
                          <Typography className='text-zinc-400 dark:text-zinc-700 text-sm'>{x.item.symbol} - #{x.item.market_cap_rank}</Typography>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div>
                {apiErrorFilter(400)}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Index