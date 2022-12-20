import Alerts from 'components/Alerts'

export const noTokenLogo = (chain) => {
  switch (chain) {
    case 'BSC':
      return 'https://bscscan.com/images/main/empty-token.png'
    case 'ETH':
      return 'https://etherscan.io/images/main/empty-token.png'
    case 'AVAX':
      return 'https://snowtrace.io/images/main/empty-token.png'
    case 'FTM':
      return 'https://ftmscan.com/images/main/empty-token.png'
    case 'MATIC':
      return 'https://polygonscan.com/images/main/empty-token.png'
    case 'CRO':
      return 'https://cronoscan.com/images/main/empty-token.png'
    case 'ARB':
      return 'https://arbiscan.io/images/main/empty-token.png?v=1'
    default:
      return ''
  }
}

export const moralisIdToSymbol = (id) => {
  switch (id) {
    case 'eth':
      return 'ETH'
    case 'bsc':
      return 'BSC'
    case 'polygon':
      return 'MATIC'
    case 'avalanche':
      return 'AVAX'
    case 'fantom':
      return 'FTM'
    case 'cronos':
      return 'CRO'
    case 'arbitrum':
      return 'ARB'
    default:
      return ''
  }
}

export const getNFTImage = (url) => {
  if (url !== null) {
    if (String(url).includes('https://meta.space.id/')) {
      const result = String(url).replace('https://meta.space.id/', 'https://meta.image.space.id/image/mainnet/') + '.svg'
      return result
    } else if (String(url).includes('ipfs://')) {
      const result = String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
      return result
    } else {
      return 'https://react.semantic-ui.com/images/wireframe/image.png'
    }
  } else {
    return 'https://react.semantic-ui.com/images/wireframe/image.png'
  }
}

export const apiErrorFilter = (error) => {
  if (String(error).includes('is not a valid hex address')) {
    return <div className='w-full mt-3'>
      <Alerts variant='warning' text='შეყვანილი მისამართი არასწორია!' />
    </div>
  } else if (error === 'No metadata found! Try again later') {
    return <div className='w-full mt-3'>
      <Alerts variant='warning' text='ვერ მოიძებნა!' />
    </div>
  } else if (String(error).includes('is not registered') && String(error).includes('Domain')) {
    return <div className='w-full mt-3'>
      <Alerts variant='warning' text='სახელი რეგისტრირებული არაა!' />
    </div>
  } else if (error === 404) {
    return <div className='w-full mt-3'>
      <Alerts variant='warning' text='API კავშირი ვერ მოხერხდა! სცადეთ მოგვიანებით!' />
    </div>
  }
}