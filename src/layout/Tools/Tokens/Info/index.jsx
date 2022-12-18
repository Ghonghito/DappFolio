import React from 'react'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import { getTransactionsByContract } from 'utils/APIs/MoralisAPI'

const index = () => {

  const getData = async () => {
    const data = await getTransactionsByContract()
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full md:w-[450px]'>
        <Card title='ტოკენის ძებნა'>
          <div className='px-2 mb-2'>
            <Input disabled={true} id='tokenContractAddressInput' onKeyDown={e => e.key === 'Enter' && getData()} placeholder='ტოკენის კონტრაქტის მისამართი' className='mt-2' />
            <Button onClick={() => getData()} className='mt-2' disabled={true}>ძებნა</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default index