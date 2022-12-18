import { useWeb3React } from '@web3-react/core';
import { useToastDispatchContext } from 'context/ToastContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillClockCircle } from 'react-icons/ai'
import { getExplorerURL } from 'utils/WalletHelpers';
import { shortAddress } from 'utils/WalletHelpers'

export default function Toast({ type, title, message, txHash, id }) {
  const { active, chainId } = useWeb3React()
  const dispatch = useToastDispatchContext();
  return (
    <>
      <div className='max-w-md w-full bg-white dark:bg-darkBorder shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mt-2 border dark-lightBorder dark:border-darkBorder'>
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            {type === 'success' ? (<AiFillCheckCircle className='text-green-500 text-[20px]' />) : null}
            {type === 'error' ? (<AiFillCloseCircle className='text-red-500 text-[20px]' />) : null}
            {type === 'loading' ? (<AiFillClockCircle className='text-yellow-500 text-[20px]' />) : null}
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-gray-900 dark:text-darkText'>
                {title}
              </p>
              {message && (
                <p className='mt-1 text-sm text-gray-500'>
                  {message}
                </p>
              )}
              {txHash && (
                <a href={`${getExplorerURL('tx', txHash, active ? chainId : null)}`} target='_blank' rel="noreferrer" className='mt-1 text-sm text-gray-500'>ნახე: {shortAddress(txHash, 5)}</a>
              )}
            </div>
          </div>
        </div>
        <div className='flex'>
          <button onClick={() => {
            dispatch({ type: 'DELETE_TOAST', id: id });
          }} className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            X
          </button>
        </div>
      </div>
    </>
  );
}