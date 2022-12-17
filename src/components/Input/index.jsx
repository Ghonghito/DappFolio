import React from 'react'

const index = ({ className = '', ...rest }) => {
  return (
    <input
      {...rest}
      className={`dark:bg-[#181818] border border-[#e3e3e6] dark:border-[#303031] rounded-lg p-2 w-full text-lightText dark:text-[#868687] focus:outline-none placeholder:text-[#727274]' ${className}`} />
  )
}

export default index