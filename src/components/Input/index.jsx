import React from 'react'

const index = ({ className = '', ...rest }) => {
  return (
    <input
      {...rest}
      className={`duration-150 dark:bg-darkHover border border-lightBorder dark:border-darkBorder rounded-lg p-2 w-full text-lightText dark:text-darkText focus:outline-none placeholder:text-[#727274]' ${className}`} />
  )
}

export default index