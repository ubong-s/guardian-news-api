import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        results: action.payload.results,
        pages: action.payload.pages,
      };

    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 };

    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.currentPage + 1;
        if (nextPage > state.pages - 1) {
          nextPage = 0;
        }
        return { ...state, currentPage: nextPage };
      }
      if (action.payload === 'dec') {
        let prevPage = state.currentPage - 1;
        if (prevPage < 0) {
          prevPage = state.pages - 1;
        }
        return { ...state, currentPage: prevPage };
      }
      break;
    default:
      throw Error(`no matching '${action.type}' action type`);
  }
};

export default reducer;
