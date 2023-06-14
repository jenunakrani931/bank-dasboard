import axios from "axios";
import {
  SUCCESS_FEATCHING_DATA,
  FAIL_TO_FATCH_DATA,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  SET_CATEGORY_QUERY,
  SET_SEARCH_QUERY,
} from "../types/actionsTypes";
axios.defaults.baseURL = "http://192.168.29.117:8000/";

export const fetchData = (page, limit, categoryId, search) => {
  return (dispatch) => {
    const categoryQuery = categoryId ? categoryId : "";
    const url = `api/v1/product?page=${page}&limit=${limit}&search=${search}&category=${categoryQuery}`;
    return axios
      .get(url)
      .then((response) => {
        dispatch({
          type: SUCCESS_FEATCHING_DATA,
          payload: response.data.data.docs,
        });
        return response.data.data; 
      })
      .catch((error) => {
        dispatch({
          type: FAIL_TO_FATCH_DATA,
          error: error.message,
        });
        throw error;
      });
  };
};
export const createProduct = (productData) => {
  return (dispatch) => {
    axios
      .post(
        "api/v1/product/create-product",
        productData
      )
      .then((response) => {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: response.data,
        });
      });
  };
};
export const deleteProduct = (productId) => {
  return (dispatch) => {
    axios
      .delete(
        `api/v1/product/remove-product/${productId}`
      )
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: {
            productId:productId,
          },
        });
      });
  };
};
export const updatePRODUCT = (productData) => {
  return (dispatch) => {
    return axios
      .put(
        `api/v1/product/update-product/${productData.id}`,
        productData
      )
      .then((response) => {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: response.data,
        });
      });
  };
};
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
export const setCategoryQuery = (query) => ({
  type: SET_CATEGORY_QUERY,
  payload: query,
});
