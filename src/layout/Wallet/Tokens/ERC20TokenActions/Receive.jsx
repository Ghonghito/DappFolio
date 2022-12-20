import React, { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import Card from 'components/Cards/Card'
import { supportedChainsList } from 'config'
import { useWeb3React } from '@web3-react/core'
import { MdContentCopy, MdOutlineOpenInNew } from 'react-icons/md'
import { useToast } from 'hooks/useToast'
import { getChainName, getExplorerNames, getExplorerURL, getChainId } from 'utils/WalletHelpers'

const Send = ({ chain }) => {
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React()
  const toast = useToast()
  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    toast('success', 'დაკოპირდა')
  }

  return (
    <div>
      <button disabled={chainId === getChainId(chain) ? false : true} onClick={() => setOpen(!open)} className='bg-primary px-5 py-2 group rounded-lg text-white flex items-center gap-1 duration-150 hover:scale-95 hover:bg-primaryDark font-light disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100'>
        <HiPaperAirplane className='text-white text-lg group-disabled:text-gray-700 rotate-180' />
        მიღება
      </button>
      <Modal open={open} close={() => setOpen(!open)} hideHeader={true}>
        <div className='p-3'>
          <div className='flex items-center justify-center'>
            <img src='https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg' alt='QRCODE' className='w-full md:w-[250px] rounded-lg' />
          </div>
          <div className='mt-3'>
            <Card onClick={() => copyAddress()} className='p-2 w-full'>
              <Typography className='overflow-y-auto'>{account}</Typography>
            </Card>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <Typography onClick={() => copyAddress()} className='text-sm mt-3 flex items-center gap-1 cursor-pointer hover:underline'>კოპირება <MdContentCopy /></Typography>
            </div>
            <div>
              <a href={getExplorerURL('wallet', account, chainId)} target='_blank' rel='noreferrer'>
                <Typography className='text-sm mt-3 flex items-center gap-1 cursor-pointer hover:underline'>ნახე {getExplorerNames(chainId)}-ზე <MdOutlineOpenInNew /></Typography>
              </a>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm text-red-500'>1) გამოაგზავნეთ მხოლოდ {supportedChainsList[chain].tokenProtocol} ტოკენები.</p>
            <p className='text-sm text-red-500 mt-1'>2) დარწმუნდით, რომ გამოსაგზავნი ტოკენი {String(getChainName(chainId)).toUpperCase()} ქსელზეა.</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Send