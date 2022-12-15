import React from 'react'
import ConnectButton from 'components/WalletConnection/ConnectButton'
import Typography from 'components/Typography'
import { AiFillWarning } from 'react-icons/ai'

const index = () => {
  return (
    <div>
      <div className='flex justify-center'>
        <div className='duration-150 bg-blue-100 dark:bg-blue-900/20 border-[1px] border-blue-600 p-3 rounded-lg'>
          <div className='flex gap-2 mb-3'>
            <div className='flex-shrink-0'>
              <AiFillWarning className='text-primary text-xl' />
            </div>
            <Typography>გასაგრძელებად დააკავშირეთ საფულე.</Typography>
          </div>
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export default index