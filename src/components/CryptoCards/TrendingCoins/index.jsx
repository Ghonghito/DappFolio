import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import { getCGTrendingCoins } from 'utils/APIs/CoinGeckoAPI'

const Index = () => {
  const [trendingCoins, setTrendingCoins] = useState([])

  const getData = async () => {
    const data = await getCGTrendingCoins()
    console.log(data.data.coins)
    setTrendingCoins(data.data.coins)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className=''>
      {Object.keys(trendingCoins).length > 0 && (
        <Card title='ტრენდული ქოინები'>
          <div className='p-2'>
            {trendingCoins.map((x) => (
              <a key={x.item.coin_id} href={`https://www.coingecko.com/en/coins/${x.item.id}`} target='_blank' rel='noreferrer'>
                <div className='py-2 duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900 px-2 rounded-lg cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <div className='duration-150 bg-zinc-200 dark:bg-zinc-800 p-2 rounded-lg'>
                      <img src={x.item.large} alt={x.item.name} className='w-7 rounded-full' />
                    </div>
                    <div>
                      <p className='text-black dark:text-white'>{x.item.name}</p>
                      <p className='text-zinc-400 dark:text-zinc-700 text-sm'>{x.item.symbol} - #{x.item.market_cap_rank}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Index