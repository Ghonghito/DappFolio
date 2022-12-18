import React, { useEffect } from 'react'
import { MdDarkMode } from 'react-icons/md'

const Index = () => {
  const darkModeSet = localStorage.getItem('darkMode')

  function setDarkMode() {
    const darkModeSet = localStorage.getItem('darkMode')
    if (darkModeSet === null) {
      localStorage.setItem('darkMode', 'dark')
      document.documentElement.classList.add('dark')
    } else if (darkModeSet === 'light') {
      localStorage.setItem('darkMode', 'dark')
      document.documentElement.classList.add('dark')
    } else if (darkModeSet === 'dark') {
      localStorage.setItem('darkMode', 'light')
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    setDarkMode()
    // eslint-disable-next-line
  }, [])


  return (
    <div className='flex'>
      <div onClick={() => setDarkMode()} className='duration-150 hover:scale-95 bg-primary shadow-md hover:bg-primaryDark p-2 rounded-lg cursor-pointer'>
        {darkModeSet === 'light' ? <MdDarkMode className='text-2xl text-white' /> : <MdDarkMode className='text-2xl text-white' />}
      </div>
    </div>
  )
}

export default Index