import { CiGrid41 } from 'react-icons/ci'
import { BiReceipt, BiWallet, BiImages } from 'react-icons/bi'
import { TbAddressBook } from 'react-icons/tb'
import { MdOutlineGeneratingTokens } from 'react-icons/md'
import { SiJpeg } from 'react-icons/si'

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
    type: 'collapsible',
    path: '/token',
    key: 'token',
    name: 'ტოკენი',
    icon: <MdOutlineGeneratingTokens />,
    collapse: [
      {
        name: 'ტოკენის ძებნა',
        key: 'search',
        path: '/token/search'
      },
      {
        name: 'ტოკენზე ინფო',
        key: 'info',
        path: '/token/info'
      },
    ]
  },
  {
    type: 'collapsible',
    path: '/nfts',
    key: 'nfts',
    name: 'NFT',
    icon: <SiJpeg />,
    collapse: [
      /* {
        name: 'NFT-ები კონტრაქტით',
        key: 'nftscontract',
        path: '/nfts/nftscontract'
      }, */
      {
        name: 'მფლობელის ძებნა',
        key: 'owner',
        path: '/nfts/owner'
      },
    ]
  },
]