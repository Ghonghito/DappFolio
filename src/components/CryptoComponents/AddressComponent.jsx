import React from 'react'
import { getExplorerURL, shortAddress, getChainId } from 'utils/WalletHelpers'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { BiCopy } from 'react-icons/bi'
import { useToast } from 'hooks/useToast'

const AddressComponent = ({ address, type, chain }) => {

  const toast = useToast()

  const copyData = () => {
    let addressType = ''
    if (type === 'wallet') {
      addressType = 'საფულის მისამართი:'
    } else if (type === 'token') {
      addressType = 'კონტრაქტის მისამართი:'
    } else if (type === 'tx') {
      addressType = 'ტრანზაქციის ჰეში:'
    } else {
      addressType = ''
    }

    try {
      navigator.clipboard.writeText(address)
      toast('success', 'დაკოპირდა', `${addressType} ${shortAddress(address, 12)}`)
    } catch (error) {
      toast('error', 'კოპირება ვერ მოხერხდა')
    }
  }

  return (
    <div className='flex items-center gap-1'>
      <a href={getExplorerURL(type, address, getChainId(chain))} target='_blank' rel='noreferrer' className='flex items-center gap-1'>
        <p className='text-md text-primary font-light'>{shortAddress(address, 4)}</p>
        <MdOutlineOpenInNew className='text-md text-primary' />
      </a>
      <div onClick={() => copyData()} className='flex'>
        <BiCopy className='text-md text-primary cursor-pointer' />
      </div>
    </div>
  )
}

export default AddressComponent