import {
  SUCCESS_FETCHING_BOOK,
  FAIL_TO_FETCH_BOOK,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  SET_SEARCH_QUERY,
} from "../types/actionsTypes";
const initialState = {
  bookData: [],
  error: null,
  searchQuery: "",
};
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_FETCHING_BOOK:
      return {
        ...state,
        bookData: action.payload,
        error: null,
      };
    case FAIL_TO_FETCH_BOOK:
      return {
        ...state,
        error: action.error,
      };
    case ADD_BOOK_SUCCESS:
      return {
        bookData: action.payload,
        ...state,
        error: null,
      };
    case DELETE_BOOK_SUCCESS:
      const updatedData = state.bookData.filter(
        (element) => element.id !== action.payload.bookId
      );
      return {
        ...state,
        bookData: updatedData,
        error: null,
      };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        bookData: state.bookData.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
        bookError: null,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};
export default bookReducer;
