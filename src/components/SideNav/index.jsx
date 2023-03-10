import React, { useState } from 'react'
import Logo from 'assets/images/logo.svg'
import SidenavItem from './SidenavItem'
import Navbar from 'components/WalletConnection'
import Avatar from '../Avatar'
import { Transition } from '@headlessui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { menuItem } from '../../routes'
import { dappNameGradient } from 'config'

const Index = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Transition show={isOpen}
				className='fixed h-screen flex md:hidden mt-12 z-50'
				enter='transition ease-in-out duration-300 transform'
				enterFrom='-translate-x-full'
				enterTo='translate-x-0'
				leave='transition ease-in-out duration-300 transform'
				leaveFrom='translate-x-0'
				leaveTo='-translate-x-full'>
				<div className='z-10 inset-0 w-[250px] h-screen overflow-y-auto p-3 mt-[-50px] bg-lightBackground dark:bg-darkModal rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 shadow'>
					<div className='flex items-center justify-between'>
						<a href='/'>
							<div className='flex items-center space-x-3 cursor-pointer'>
								<Avatar src={Logo} alt='DappFolio ლოგო' className='w-9' />
								{dappNameGradient()}
							</div>
						</a>
						<div className='group duration-75 hover:bg-primary rounded-lg p-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
							<AiOutlineClose className='text-lightText dark:text-white group-hover:text-white text-xl' />
						</div>
					</div>
					<div className='h-screen mt-5'>
						<div>
							<SidenavItem menuItem={menuItem} />
						</div>
					</div>
				</div>
			</Transition>
			<div className='md:flex'>
				<div className='hidden md:flex h-screen sticky overflow-y-auto top-0 flex-col p-4 duration-150 border-r border-lightHover dark:border-darkCard min-h-screen w-[300px]'>
					<a href='/'>
						<div className='flex items-center gap-3 cursor-pointer'>
							<Avatar src={Logo} alt='DappFolio ლოგო' className='w-9' />
							{dappNameGradient()}
						</div>
					</a>
					<div className='h-screen mt-5'>
						<div>
							<SidenavItem menuItem={menuItem} />
						</div>
					</div>
				</div>
				<main className='w-full'>
					<div className='flex justify-between md:justify-end'>
						<div className='flex items-center md:hidden px-2'>
							{isOpen ? (
								<div className='duration-150 hover:bg-primary rounded-lg p-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
									<AiOutlineClose className='text-lightText dark:text-darkText text-xl ' />
								</div>
							) : (
								<div className='duration-150 hover:bg-primary rounded-lg group p-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
									<GiHamburgerMenu className='group group-hover:text-white text-lightText dark:text-white text-xl' />
								</div>
							)}
						</div>
						<div className='flex items-center'>
							<Navbar />
						</div>
					</div>
					<div className='p-3'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default Index