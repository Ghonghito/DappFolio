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
