import React from 'react'
import Logo from 'assets/images/logo.svg'
import Typography from 'components/Typography'

const index = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={Logo} alt='DappFolio Logo' className='w-[100px] animate-spin' />
      <div className='mt-3'>
        <Typography className='animate-pulse'>იტვირთება</Typography>
      </div>
    </div>
  )
}

export default index