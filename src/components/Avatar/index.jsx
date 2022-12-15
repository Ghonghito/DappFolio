import React from 'react'

const index = ({ src, alt, ...rest }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = ''
  }

  return (
    <img onError={addDefaultSrc} src={src} alt={alt} {...rest} />
  )
}

export default index