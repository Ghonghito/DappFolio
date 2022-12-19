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
      <div onClick={() => setDarkMode()} className='flex items-center justify-center font-bold gap-2 p-2 w-full rounded-md bg-white dark:bg-darkBorder hover:bg-lightHover dark:hover:bg-darkHover shadow-md duration-150 hover:scale-[0.98] cursor-pointer'>
        {darkModeSet === 'light' ? <MdDarkMode className='text-2xl text-primary dark:text-zinc-300 ' /> : <MdDarkMode className='text-2xl text-primary dark:text-zinc-300 ' />}
      </div>
    </div>
  )
}

export default Index