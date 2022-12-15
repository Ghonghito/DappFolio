import React from 'react'
import Avatar from '../Avatar'

const ItemList = ({ name, logo, color, logoWidth }) => {
	return (
		<div className='flex items-center duration-75 p-2 hover:bg-lightHover dark:hover:bg-darkHover rounded-lg cursor-pointer'>
			<div className={`bg-${color} w-[30px] h-[30px] mr-2 rounded-lg flex justify-center items-center`}>
				<Avatar src={logo} alt={name} className={`${logoWidth}`} />
			</div>
			<a href='#/' className='text-lightText dark:text-darkText text-sm'>
				{name}
			</a>
		</div>
	)
}

export default ItemList