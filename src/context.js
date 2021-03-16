import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const clientID = `&api-key=${process.env.REACT_APP_ACCESS_KEY}`;
const API_ENDPOINT = 'https://content.guardianapis.com/search?';

const initialState = {
  isLoading: true,
  theme: 'light-theme',
  results: [],
  query: 'pep guardiola',
  currentPage: 1,
  pages: 0,
};

const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }

  return theme;
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(getStorageTheme());

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      // console.log(data.response);
      dispatch({
        type: SET_STORIES,
        payload: { results: data.response.results, pages: data.response.pages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    fetchStories(
      `${API_ENDPOINT}page=${state.currentPage}&q=${state.query}${clientID}`
    );
  }, [state.query, state.currentPage]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{ ...state, handleSearch, handlePage, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
