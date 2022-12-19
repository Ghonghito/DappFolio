import React from 'react'
import Avatar from 'components/Avatar'

const WalletItem = ({ name, icon }) => {
  return (
    <li>
      <a href='#/' className='group flex items-center p-3 text-base font-bold bg-lightBorder dark:bg-darkBorder rounded-lg duration-200 hover:bg-lightHover dark:hover:bg-darkHover'>
        <Avatar src={icon} alt='' className='w-5' />
        <div className='flex-1 ml-3 text-lightText dark:text-darkText dark:group-hover:text-white'>{name}</div>
        {name === 'Metamask' ? (<span className='inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs text-white  font-medium bg-primary rounded-md shadow shadow-primary'>პოპულარული</span>) : null}
      </a>
    </li>
  )
}

export default WalletItem