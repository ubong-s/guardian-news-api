import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { isLoading, currentPage, pages, handlePage } = useGlobalContext();

  return (
    <div className='btn-container'>
      <button disabled={isLoading} onClick={() => handlePage('dec')}>
        prev
      </button>
      <p>
        {currentPage} of {pages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage('inc')}>
        next
      </button>
    </div>
  );
};

export default Buttons;
