import React from 'react'

const index = ({ className = '', ...rest }) => {
  return (
    <input {...rest} className={`dark:bg-[#181818] border border-[#e3e3e6] dark:border-[#303031] rounded-lg p-2 w-full text-lightText dark:text-[#868687] focus:border focus:outline-none placeholder:text-[#4c4c4d] autofill:bg-yellow-200' ${className}`} />
  )
}

export default index