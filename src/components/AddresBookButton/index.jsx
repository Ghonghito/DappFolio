import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import { TbAddressBook } from 'react-icons/tb'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import { shortAddress } from 'utils/WalletHelpers'
import { HiUserAdd } from 'react-icons/hi'

const Index = ({ inputId }) => {
  const [open, setOpen] = useState(false)
  const [savedAddresses, setSavedAddresses] = useState([])

  const getSavedAddresses = () => {
    var addressesList = JSON.parse(localStorage.getItem('addressBook'))
    if (addressesList === null) {
      setSavedAddresses([])
    } else {
      console.log(savedAddresses)
      setSavedAddresses(addressesList)
    }
  }

  /* const useAddress = (walletAddress) => {
    document.getElementById('walletName').value = walletAddress
    setOpen(!open)
  } */

  useEffect(() => {
    getSavedAddresses()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className='flex'>
        <div onClick={() => setOpen(!open)} className='cursor-pointer duration-150 hover:scale-105'>
          <Card>
            <div className='flex items-center justify-center p-2'>
              <TbAddressBook className='text-2xl text-primary' />
            </div>
          </Card>
        </div>
      </div>
      <Modal title='შენახული მისამართები' open={open} close={() => setOpen(!open)}>
        <div className='px-2'>
          {savedAddresses.length > 0 ? (
            <div>
              <div className='overflow-y-auto'>
                <table className='border-collapse table-auto w-full text-sm text-left '>
                  <thead className='text-gray-500 text-xs'>
                    <tr>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                        ქსელი
                      </th>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                        სახელი
                      </th>
                      <th scope='col' className='duration-150 border-b dark:border-zinc-800 px-6 py-3'>
                        მისამართი
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedAddresses.map((x, index) => (
                      <tr onClick={() => document.getElementById(inputId).value = x.walletAddress} on key={index} className='w-full cursor-pointer duration-150 hover:bg-blue-50 dark:hover:bg-zinc-900 hover:scale-95'>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <Typography>{x.chain}</Typography>
                        </th>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <Typography>{x.walletName}</Typography>
                        </th>
                        <th className='duration-150 border-b dark:border-zinc-800 px-6 py-4'>
                          <Typography>{shortAddress(x.walletAddress, 5)}</Typography>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className='p-3 py-6 flex items-center justify-center'>
              <a href='/addressbook' target='_blank' rel='noreferrer' >
                <Typography className='text-primary flex items-center gap-3'>
                  <HiUserAdd className='text-xl' />
                  დაამატე მისამართი
                </Typography>
              </a>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Index