import Sidenav from './components/SideNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToastContainer from './components/Toast/ToastContainer';
import { ToastProvider } from './context/ToastContext';

import Dashboard from 'layout/Dashboard'
import Wallet from 'layout/Wallet/Tokens'
import Transactions from 'layout/Wallet/Transactions'
import NFTs from 'layout/Wallet/NFTs'
import AddressBook from 'layout/AddressBook'

function App() {
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
              </Routes>
            </Sidenav>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </div>
  );
}

export default App;
