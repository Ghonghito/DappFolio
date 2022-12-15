import React from 'react'

const index = ({ children, color, className = '', ...rest }) => {
  return (
    <p {...rest} className={`duration-200 ${color ? color : 'text-zinc-800 dark:text-gray-400'} font-light ${className}`}>
      {children}
    </p>
  )
}

export default index