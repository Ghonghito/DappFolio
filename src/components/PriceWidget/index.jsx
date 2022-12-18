import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { BsArrowUpRight } from 'react-icons/bs'
import { getCoinData } from 'utils/APIs/CoinGeckoAPI'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

const Index = ({ coin }) => {
  const [data, setData] = useState([])


  const getCoin = async () => {
    const getData = await getCoinData(coin)
    setData(getData.data)
  }

  useEffect(() => {
    getCoin()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <Card className='p-3'>
          <div className='flex gap-2'>
            <div className='flex items-center justify-center duration-150 flex-shrink-0 bg-lightBorder dark:bg-darkBorder p-2 rounded-lg' >
              <img src={data.image.large} alt={coin} className='w-6 rounded-full' />
            </div>
            <div className='w-full flex justify-between'>
              <div>
                <Typography>{data.name}</Typography>
                <p className='duration-150 text-zinc-400 text-xs'>{String(data.symbol).toUpperCase()}</p>
              </div>
              <a href={`https://www.coingecko.com/en/coins/${data.id}`} target='_blank' rel='noreferrer'>
                <BsArrowUpRight className='text-zinc-400 dark:text-zinc-700 text-sm duration-150 hover:scale-105 cursor-pointer' />
              </a>
            </div>
          </div>
          <div className='mt-3'>
            <Typography className='text-2xl font-bold'>${Number(data.market_data.current_price.usd).toLocaleString('en-US')}</Typography>
          </div>
          <div className='flex w-full mt-1'>
            <p className={`text-white text-sm ${Number(data.market_data.price_change_percentage_24h) > 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 rounded-lg w-full flex justify-center`}>
              {Number(data.market_data.price_change_percentage_24h) > 0 ? (
                <span className='flex items-center gap-1'>
                  <AiOutlineArrowUp className='text-white font-bold' />
                  +{Number(data.market_data.price_change_percentage_24h).toFixed(2)}%
                </span>
              ) : (
                <span className='flex items-center gap-1'>
                  <AiOutlineArrowDown className='text-white font-bold' />
                  {Number(data.market_data.price_change_percentage_24h).toFixed(2)}%
                </span>
              )}
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Index