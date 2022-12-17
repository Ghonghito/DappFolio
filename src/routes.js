import { CiGrid41 } from 'react-icons/ci'
import { BiReceipt, BiWallet, BiImages } from 'react-icons/bi'
import { TbAddressBook } from 'react-icons/tb'
import { MdOutlineGeneratingTokens } from 'react-icons/md'

export const menuItem = [
  {
    type: 'noncollapsible',
    path: '/',
    key: 'home',
    name: 'მთავარი',
    icon: <CiGrid41 className='font-light' />
  },
  {
    type: 'title',
    name: 'საფულე'
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
  {
    type: 'noncollapsible',
    path: '/nft',
    key: 'nft',
    name: 'NFT',
    icon: <BiImages />
  },
  {
    type: 'title',
    name: 'ხელსაწყოები'
  },
  {
    type: 'noncollapsible',
    path: '/addressbook',
    key: 'addressbook',
    name: 'მისამართების წიგნი',
    icon: <TbAddressBook />
  },
  {
    type: 'noncollapsible',
    path: '/token',
    key: 'token',
    name: 'ტოკენი',
    icon: <MdOutlineGeneratingTokens />
  },
]