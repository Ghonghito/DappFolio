import React from 'react'
import LoadingAnimation from 'components/LoadingAnimation'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { getNFTImage } from 'utils/Helpers'

const Index = ({ data, loaded, chain }) => {

  return (
    <div>
      {!loaded ? (
        <div>
          {Object.keys(data).length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
              {data.result.map((x, index) => (
                <Card key={index}>
                  <div className='flex flex-col p-2'>
                    {String(x.normalized_metadata.image).includes('.mp4') ? (
                      <div>
                        <video className='rounded-lg h-full w-full md:h-[250px] md:w-[300px] object-fill' controls>
                          <source src={x.normalized_metadata.image} type="video/mp4" autoPlay={true} />
                        </video>
                      </div>
                    ) : (
                      <img src={x.normalized_metadata.image === null ? getNFTImage(x.token_uri) : x.normalized_metadata.image} alt={x.name} className='rounded-lg h-[200px] w-[250px] md:h-[250px] md:w-[300px] object-fill' />
                    )}
                    <div className='mt-2'>
                      <Typography className='truncate '>{x.name} {x.symbol !== 'ENS' ? `#${x.token_id}` : ''}</Typography>
                      <p className='text-zinc-600 truncate'>{x.name}</p>
                      <AddressComponent address={x.token_address} type='token' chain={chain} />
                    </div>
                  </div>

                </Card>
              ))}
            </div>
          ) : (
            <div>
              <Alert variant='warning' text={`${String(chain).toUpperCase()} ქსელზე NFT არ გაქვთ!`} />
            </div>
          )}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  )
}

export default Index