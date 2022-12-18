import React, { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import Input from 'components/Input'
import AddressBookButton from 'components/AddresBookButton'
import { useWeb3React } from '@web3-react/core'
import { getChainId } from 'utils/WalletHelpers'

const Send = ({ data, chain, ...rest }) => {
  const [open, setOpen] = useState(false)
  const { chainId } = useWeb3React()

  return (
    <div>
      <button
        disabled={chainId === getChainId(chain) ? false : true}
        {...rest}
        id='sendModalBtn'
        onClick={() => setOpen(!open)}
        className='bg-primary px-5 py-2 group rounded-lg text-white flex items-center gap-1 duration-150 hover:scale-95 hover:bg-primaryDark font-light disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100'>
        <HiPaperAirplane className='text-white text-lg group-disabled:text-gray-700' />
        გაგზავნა
      </button>
      <Modal open={open} close={() => setOpen(!open)} hideHeader={true}>
        <div className='p-3'>
          <div className='flex flex-col items-center justify-center'>
            <div className='bg-lightBorder dark:bg-darkBorder p-2 rounded-md flex items-center justify-center'>
              <img src='https://bscscan.com/images/main/empty-token.png' alt='test' className='w-12' />
            </div>
            <div className='text-center mt-1'>
              <Typography className='font-light'>{data.name}</Typography>
              <Typography className='font-light'>{data.symbol}</Typography>
            </div>
          </div>
          <div className='mt-3'>
            <div className='text-left'>
              <Typography className='font-light text-sm'>ბალანსი: {Number(data.balance / 10 ** data.decimals).toLocaleString('en-US')}</Typography>
              <Input placeholder='რაოდენობა' className='w-full md:w-[250px]w-[250px] mt-1 placeholder:text-zinc-400' />
            </div>
            <div className='mt-2'>
              <div className='flex items-center gap-2'>
                <Input id='reciverAddress' placeholder='მიმღების მისამართი' className='w-full md:w-[250px] placeholder:text-zinc-400' />
                <AddressBookButton inputId='reciverAddress' />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2 gap-2'>
            <button onClick={() => setOpen(!open)} className='w-full bg-red-500 px-5 py-1.5 text-s rounded-lg text-white text-center duration-150 hover:scale-95 hover:bg-red-800 font-light disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100'>
              დახურვა
            </button>
            <button className='w-full bg-primary px-5 py-1.5 rounded-lg text-white text-center duration-150 hover:scale-95 hover:bg-primaryDark font-light disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100'>
              გაგზავნა
            </button>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default Send