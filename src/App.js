import React from 'react';
import Buttons from './Buttons';
import { useGlobalContext } from './context';
import SearchForm from './SearchForm';
import Stories from './Stories';

function App() {
  const { toggleTheme } = useGlobalContext();

  return (
    <>
      <nav>
        <div className='nav-center'>
          <button className='btn' onClick={toggleTheme}>
            toggle theme
          </button>
        </div>
      </nav>
      <SearchForm />
      <Stories />
      <Buttons />
    </>
  );
}

export default App;
