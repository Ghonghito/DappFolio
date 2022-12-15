import React, { useRef, useEffect } from 'react'
import DisconnectButton from './DisconnectButton'
import ConnectButton from './ConnectButton'
import { useToast } from 'hooks/useToast';
import { injected } from './connectors';
import { useWeb3React } from '@web3-react/core'
import WrongNetwork from './WrongNetwork';

export default function Modal() {
	const mountedRef = useRef(true);
	const { active, activate, chainId } = useWeb3React();
	const toast = useToast()
	const provider = window.ethereum;
	const isConnected = localStorage.getItem('isWalletConnected');

	useEffect(() => {
		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem('isWalletConnected') === 'true') {
				try {
					if (typeof provider !== 'undefined') {
						await activate(injected);
						localStorage.setItem('isWalletConnected', true);
					} else {
						toast('error', 'საფულის დასაკავშირებლად საჭიროა Metamask!')
					}
				} catch (ex) {
					toast('error', 'დაფიქსირდა შეცდომა!', ex)
				}
			}
		};

		connectWalletOnPageLoad()

		return () => {
			mountedRef.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='p-3 flex items-center'>
			{active === true && isConnected === 'true' ? (
				<div>
					{chainId === 1 || chainId === 56 || chainId === 43114 || chainId === 250 || chainId === 137 || chainId === 25 || chainId === 42161 ? <DisconnectButton /> : <WrongNetwork changeTo='BSC' text='არასწორი ქსელი' />}
				</div>
			) : <ConnectButton />}
		</div>
	);
}