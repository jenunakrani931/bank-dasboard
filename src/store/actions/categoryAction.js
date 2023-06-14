import axios from "axios";
import {
  SUCCESS_FETCHING_CATEGORY,
  FAIL_TO_FETCH_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from "../types/actionsTypes";
axios.defaults.baseURL = "http://192.168.29.117:8000/";

export const fetchCategory = () => {
  return (dispatch) => {
    axios
      .get("api/v1/category/")
      .then((response) => {
        dispatch({
          type: SUCCESS_FETCHING_CATEGORY,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAIL_TO_FETCH_CATEGORY,
          error: error.message,
        });
      });
  };
};

export const createCategory = (categoryData) => {
  return (dispatch) => {
    return axios
      .post(
        "api/v1/category/create-category",
        categoryData
      )
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchCategory());
      });
  };
};

export const deleteCategory = (categoryId) => {
  return (dispatch) => {
    axios
      .delete(
        `api/v1/category/remove-category/${categoryId}`
      )
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: {
            categoryId: categoryId,
          },
        });
        console.log(categoryId);
      });
  };
};
export const updateCategory = (categoryData) => {
  return (dispatch) => {
    return axios
      .put(
        `api/v1/category/update-category/${categoryData.id}`,
        categoryData
      )
      .then((response) => {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchCategory());
      });
  };
}; 

