import React from 'react'
import PriceWidget from 'components/PriceWidget'
import TradingCoins from 'components/CryptoCards/TrendingCoins'
import TopCoins from 'components/CryptoCards/TopTen'

const index = () => {
  document.title = 'DappFolio - მთავარი'
  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-3'>
        <PriceWidget coin='bitcoin' />
        <PriceWidget coin='ethereum' />
        <PriceWidget coin='tether' />
        <PriceWidget coin='binancecoin' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <TradingCoins />
        <TopCoins />
      </div>
    </div>
  )
}

export default index