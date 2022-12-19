import { useEffect } from 'react';
import Sidenav from './components/SideNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToastContainer from './components/Toast/ToastContainer';
import { ToastProvider } from './context/ToastContext';

import Dashboard from 'layout/Dashboard'
import Wallet from 'layout/Wallet/Tokens'
import Transactions from 'layout/Wallet/Transactions'
import NFTs from 'layout/Wallet/NFTs'
import AddressBook from 'layout/AddressBook'
import TokenSearch from 'layout/Tools/Tokens/Search'
import OwnerFinder from 'layout/Tools/NFT/OwnerFinder'
import ENSName from 'layout/Tools/Resolver/ENS'
import UDName from 'layout/Tools/Resolver/UnstoppableDomain'

function App() {

  useEffect(() => {
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
  }, [])

  return (
    <div>
      <div className='duration-200 min-h-screen bg-lightBackground dark:bg-darkBackground'>
        <ToastProvider>
          <ToastContainer />
          <BrowserRouter>
            <Sidenav>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/nft' element={<NFTs />} />
                <Route path='/addressbook' element={<AddressBook />} />
                <Route path='/token/search' element={<TokenSearch />} />
                <Route path='/nfts/owner' element={<OwnerFinder />} />
                <Route path='/res/ens-name' element={<ENSName />} />
                <Route path='/res/ud-name' element={<UDName />} />
              </Routes>
            </Sidenav>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </div>
  );
}

export default App;
