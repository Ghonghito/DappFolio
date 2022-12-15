import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { getWalletNativeCrossChainBalance } from 'utils/APIs/MoralisAPI'
import { useWeb3React } from '@web3-react/core'

const NativeBalances = () => {
  const { account, active } = useWeb3React()
  const [nativeCrossChainBalance, setNativeCrossChainBalance] = useState([])
  const [isLoading, setIsLoading] = useState([])

  const getData = async () => {
    setIsLoading(true)
    setNativeCrossChainBalance([])
    const balances = await getWalletNativeCrossChainBalance(account)
    setNativeCrossChainBalance(balances)
    setIsLoading(false)
  }

  useEffect(() => {
    if (active) {
      getData()
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div>
      {active && (
        <div>
          {!isLoading && (
            <div>
              {Object.keys(nativeCrossChainBalance).length > 0 && (
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 mb-3'>
                  {nativeCrossChainBalance.map((x, index) => (
                    <div key={index} >
                      <Card>
                        <div className='p-3'>
                          <div className='flex items-center gap-1'>
                            <div className='bg-primary p-1 rounded-lg w-[30px] h-[30px] flex items-center justify-center flex-shrink-0'>
                              <img src={x.networkData.logo} alt={x.networkData.networkName} className={`${x.networkData.logoSize}`} />
                            </div>
                            <Typography>{x.networkData.networkName}</Typography>
                          </div>
                          <div className='mt-2'>
                            <Typography className='text-sm'>ბალანსი</Typography>
                            <Typography className='text-lg'><span className='font-bold'>{Number(x.balance).toFixed(4)}</span> {x.networkData.coinName}</Typography>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NativeBalances