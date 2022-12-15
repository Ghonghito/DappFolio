import { CiGrid41 } from 'react-icons/ci'
import { BiReceipt, BiWallet } from 'react-icons/bi'

export const menuItem = [
  {
    type: 'noncollapsible',
    path: '/',
    key: 'home',
    name: 'მთავარი',
    icon: <CiGrid41 className='font-light' />
  },
  {
    type: 'noncollapsible',
    path: '/wallet',
    key: 'wallet',
    name: 'საფულე',
    icon: <BiWallet />
  },
  {
    type: 'noncollapsible',
    path: '/transactions',
    key: 'transactions',
    name: 'ტრანზაქციები',
    icon: <BiReceipt />
  },
]