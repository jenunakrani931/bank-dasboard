import {
  SUCCESS_FEATCHING_DATA,
  FAIL_TO_FATCH_DATA,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  SET_SEARCH_QUERY,
} from "../types/actionsTypes";
const initialState = {
  data: [],
  error: null,
  searchQuery: "",
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_FEATCHING_DATA:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FAIL_TO_FATCH_DATA:
      return {
        ...state,
        error: action.error,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        data: action.payload,
        ...state,
        error: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      const updatedData = state.data.filter(
        (element) => element.id !== action.payload.productId
      );
      return {
        ...state,
        data: updatedData,
        error: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productData: state.data.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        productError: null,
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
export default productReducer;
