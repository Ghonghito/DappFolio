import React from 'react'
import MetamaskIcon from 'assets/images/WalletIcons/MetamaskIcon.svg'
import TrustWalletIcon from 'assets/images/WalletIcons/TrustWalletIcon.svg'
import Avatar from '../Avatar'
import { useToast } from 'hooks/useToast'

const Index = ({ variant, address, symbol, decimal }) => {
  const toast = useToast()
  const wallet = localStorage.getItem('connectedWallet')

  if (symbol !== null) {
    if (symbol.length > 11) {
      symbol = symbol.slice(0, 11)
    }
  } else {
    symbol = 'ERR'
  }



  const addToken = async () => {
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: Number(decimal),
          },
        },
      })
      .then((success) => {
        if (success) {
          toast('success', `${symbol} დაემატა ${wallet === 'Metamask' ? 'Metamask' : 'Trust Wallet'}-ში`)
        } else {
          toast('error', 'Something went wrong')
        }
      })
      .catch((error) => {
        toast('error', error.message)
      });
  }

  return (
    <div>
      {variant === 'text' ? (
        <div onClick={() => addToken()} className='inline-flex items-center gap-2 cursor-pointer duration-200 hover:no-underline whitespace-nowrap'>
          <p className='text-lightText dark:text-darkText text-sm  font-light hover:underline'>საფულეში დამატება</p>
          <div className='flex-shrink-0'>
            <Avatar src={wallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} alt='metamask' className='w-5' />
          </div>
        </div>
      ) : null}
      {variant === null ? (
        <div onClick={() => addToken()} className='px-3 py-1.5 bg-primary rounded-lg inline-flex items-center gap-2 cursor-pointer duration-200 hover:bg-primaryDark'>
          <p className='text-white text-sm  font-light'>საფულეში დამატება</p>
          <div>
            <Avatar src={wallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} alt='metamask' className='w-5' />
          </div>
        </div>
      ) : null}
      {variant === 'icon' ? (
        <div onClick={() => addToken()} className='cursor-pointer duration-200 whitespace-nowrap'>
          <div className='flex-shrink-0'>
            <Avatar src={wallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} alt='metamask' className='w-4' />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Index