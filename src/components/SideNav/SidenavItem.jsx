import React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import SidenavItemCollapse from './SidenavItemCollapse';

const SidenavItem = ({ menuItem }) => {
	const location = useLocation();
	const { pathname } = location;

	const renderRoutes = menuItem.map(({ type, path, name, icon, key, collapse }) => {
		let returnValue;
		const active = path === pathname
		if (type === 'noncollapsible') {
			returnValue = (
				<div key={key} className='mt-1'>
					<NavLink exact='true' to={path}>
						<div className={`${active ? 'bg-gradient-to-r from-blue-900 to-violet shadow-md' : ''} group flex items-center space-x-2 cursor-pointer duration-150 hover:bg-gradient-to-r hover:from-blue-900 hover:to-violet dark:hover:bg-darkCard w-full h-[50px] px-2 rounded-md`}>
							<div className={`${active ? 'text-white' : 'text-zinc-700 dark:text-darkText'} duration-150 group-hover:text-white text-xl`}>
								{icon}
							</div>
							<h1 className={`${active ? 'text-white' : 'text-black dark:text-darkText'} group-hover:text-white duration-150 text-sm`}>{name}</h1>
						</div>
					</NavLink>
				</div>
			);
		} else if (type === 'title') {
			returnValue = (
				<p key={key} className='text-lightText dark:text-darkText font-bold px-2 py-3'>{name}</p>
			);
		} else if (type === 'collapsible') {
			returnValue = (
				<SidenavItemCollapse name={name} icon={icon} key={key} path={path} pathname={pathname} collapse={collapse} />
			)
		}
		return returnValue;
	});

	return renderRoutes
}

export default SidenavItem