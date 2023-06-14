import {
    SUCCESS_FETCHING_CATEGORY,
    FAIL_TO_FETCH_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
  } from "../types/actionsTypes";
const initialState = {
    categoryData: null,
    categoryError: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUCCESS_FETCHING_CATEGORY:
        return {
          ...state,
          categoryData: action.payload,
          categoryError: null,
        };
      case FAIL_TO_FETCH_CATEGORY:
        return {
          ...state,
          categoryData: null,
          categoryError: action.error,
        };
      case ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          categoryData: [...state.categoryData, action.payload],
          categoryError: null,
        };
  
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          categoryData: state.categoryData.filter(
            (category) => category._id !== action.payload.categoryId
          ),
          categoryError: null,
        };
  
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          categoryData: state.categoryData.map((category) =>
            category._id === action.payload._id ? action.payload : category
          ),
          categoryError: null,
        };
  
      default:
        return state;
    }
  };
  export default categoryReducer