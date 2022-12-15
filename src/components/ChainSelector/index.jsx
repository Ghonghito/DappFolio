import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import { getChainFullName } from 'utils/WalletHelpers'

import BSC from 'assets/images/Blockchains/Binance.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'

import ItemList from './ItemList'
import { useWeb3React } from '@web3-react/core'
import { AvalancheChain, BNBChain, ETHChain, PolygonChain, FantomChain, CronosChain, ArbitrumChain } from 'utils/Networks'

const ChainSelector = () => {
	const { chainId } = useWeb3React()
	return (
		<Menu as='div' className='inline-block text-left'>
			<Menu.Button className='p-2 w-full rounded-md bg-primary hover:bg-primaryDark font-medium text-white duration-150 hover:scale-95'>
				<div className='flex items-center justify-between gap-2'>
					<div>
						{getChainFullName(chainId)}
					</div>
					<FiChevronDown className='h-5 w-5' aria-hidden='true' />
				</div>
			</Menu.Button>
			<Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
				<Menu.Items className='origin-top-center absolute center-1 mt-2 w-36 rounded-md shadow-lg z-50 bg-white dark:bg-darkCard focus:outline-none'>
					<ul className='p-1'>
						<li onClick={() => BNBChain()}>
							<ItemList name='Smart Chain' logo={BSC} logoWidth='w-5' color='primary' />
						</li>
						<li onClick={() => ETHChain()}>
							<ItemList name='Ethereum' logo={ETH} logoWidth='w-3' color='primary' />
						</li>
						<li onClick={() => AvalancheChain()}>
							<ItemList name='Avalanche' logo={AVAX} logoWidth='w-4' color='primary' />
						</li>
						<li onClick={() => PolygonChain()}>
							<ItemList name='Polygon' logo={Polygon} logoWidth='w-4' color='primary' />
						</li>
						<li onClick={() => FantomChain()}>
							<ItemList name='Fantom' logo={Fantom} logoWidth='w-3' color='primary' />
						</li>
						<li onClick={() => CronosChain()}>
							<ItemList name='Cronos' logo={Cronos} logoWidth='w-4' color='primary' />
						</li>
						<li onClick={() => ArbitrumChain()}>
							<ItemList name='Arbitrum' logo={Arbitrum} logoWidth='w-4' color='primary' />
						</li>
					</ul>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default ChainSelector