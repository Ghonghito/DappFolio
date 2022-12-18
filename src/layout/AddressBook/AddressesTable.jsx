import React, { useEffect, useState } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Input from 'components/Input'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { supportedChains } from 'config'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { shortAddress } from 'utils/WalletHelpers'

const AddressesTable = ({ updated }) => {
  const [open, setOpen] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [addressToEdit, setAddresToEdit] = useState([])

  const getSavedAddresses = () => {
    var addressesList = JSON.parse(localStorage.getItem('addressBook'))
    if (addressesList === null) {
      addressesList = []
    } else {
      setAddresses(addressesList)
    }
  }

  const deleteAddress = (index) => {
    const addressesList = JSON.parse(localStorage.getItem('addressBook'))
    addressesList.splice(index, 1)
    localStorage.setItem('addressBook', JSON.stringify(addressesList))
    getSavedAddresses()
  }

  const openEditModal = (index) => {
    const addressesList = JSON.parse(localStorage.getItem('addressBook'))
    setAddresToEdit([addressesList[index], index])
    setOpen(!open)
  }

  const editAddress = (index) => {
    const addressesList = JSON.parse(localStorage.getItem('addressBook'))

    const getEditedChain = document.getElementById('editedAddressChain').value
    const getWalletName = document.getElementById('editedWalletName').value
    const getWalletAddress = document.getElementById('editedWalletAddress').value

    addressesList[index].chain = String(getEditedChain).toUpperCase()
    addressesList[index].walletName = getWalletName
    addressesList[index].walletAddress = getWalletAddress
    localStorage.setItem('addressBook', JSON.stringify(addressesList))

    getSavedAddresses()
    setOpen(!open)
  }

  useEffect(() => {
    getSavedAddresses()
  }, [updated])

  return (
    <div>
      {Object.keys(addresses).length > 0 ? (
        <Card>
          <div className='overflow-y-auto'>
            <table className='border-collapse table-auto w-full text-sm text-left duration-150 bg-white dark:bg-darkCard rounded-lg'>
              <thead className='text-gray-500 text-xs'>
                <tr>
                  <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>
                    ქსელი
                  </th>
                  <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>
                    სახელი
                  </th>
                  <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>
                    მისამართი
                  </th>
                  <th scope='col' className='duration-150 border-b dark:border-darkBorder px-6 py-3'>

                  </th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((x, index) => (
                  <tr key={index} className='w-full cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
                    <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                      <Typography className='font-light'>{x.chain}</Typography>
                    </th>
                    <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                      <Typography className='font-light'>{x.walletName}</Typography>
                    </th>
                    <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                      <Typography className='font-light'>{shortAddress(x.walletAddress, 5)}</Typography>
                    </th>
                    <th className='duration-150 border-b dark:border-darkBorder px-6 py-4'>
                      <div className='flex flex-row items-center gap-2'>
                        <AiFillEdit onClick={() => openEditModal(index)} className='text-yellow-400 duration-150 hover:scale-110 text-xl' />
                        <AiFillDelete onClick={() => deleteAddress(index)} className='text-red-500 duration-150 hover:scale-110 text-xl' />
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
      <Modal title='მისამართის ჩასწორება' open={open} close={() => setOpen(!open)}>
        <div className='px-3 py-3'>
          {Object.keys(addressToEdit).length > 0 && (
            <div>
              <div>
                <div>
                  <Typography>ქსელი:</Typography>
                  <select id="editedAddressChain" defaultValue={addressToEdit[0].chain} className="duration-150 py-2 dark:bg-darkHover border border-lightBorder dark:border-darkBorder rounded-lg p-2 w-full text-lightText dark:text-darkText focus:outline-none">
                    {supportedChains.map((x) => (
                      <option key={x.networkName} value={x.networkSymbol}>{x.networkName} </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='mt-3'>
                <Typography>სახელი:</Typography>
                <Input type='text' id='editedWalletName' placeholder='სახელი' defaultValue={addressToEdit[0].walletName} />
              </div>
              <div className='mt-3'>
                <Typography>მისამართი:</Typography>
                <Input type='text' id='editedWalletAddress' placeholder='საფულის მისამართი' defaultValue={addressToEdit[0].walletAddress} />
              </div>
              <div className='mt-2'>
                <Button onClick={() => editAddress(addressToEdit[1])}>ჩასწორება</Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AddressesTable