import {
    SUCCESS_FETCHING_AUTHOR,
    FAIL_TO_FETCH_AUTHOR ,
    ADD_AUTHOR_SUCCESS,
    DELETE_AUTHOR_SUCCESS,
    UPDATE_AUTHOR_SUCCESS,
  } from "../types/actionsTypes";
  const initialState = {
    author: [],
    error: null,
    searchQuery: "",
  };
  const authorReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUCCESS_FETCHING_AUTHOR:
        return {
          ...state,
          author: action.payload,
          error: null,
        };
      case FAIL_TO_FETCH_AUTHOR:
        return {
          ...state,
          error: action.error,
        };
  
      case ADD_AUTHOR_SUCCESS:
        return {
          author: action.payload,
          ...state,
          error: null,
        };
  
      case DELETE_AUTHOR_SUCCESS:
        const updatedauthor = state.author.filter(
          (element) => element.id !== action.payload.authorId
        );
        return {
          ...state,
          author: updatedauthor,
          error: null,
        };
  
      case UPDATE_AUTHOR_SUCCESS:
        return {
          ...state,
         author: state.author.map((author) =>
            author._id === action.payload._id ? action.payload : author
          ),
          authorError: null,
        };
  
      default:
        return state;
    }
  };
  export default authorReducer;
  