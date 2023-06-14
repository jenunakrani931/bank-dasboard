import axios from "axios";
import {
  SUCCESS_FETCHING_AUTHOR,
  FAIL_TO_FETCH_AUTHOR,
  ADD_AUTHOR_SUCCESS,
  DELETE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_SUCCESS,
} from "../types/actionsTypes";
axios.defaults.baseURL = "http://192.168.29.117:8000/";
const token = localStorage.getItem("token");

export const fetchauthor = () => {
  return (dispatch) => {
    if (token) {
      axios
        .get("api/v1/author/")
        .then((response) => {
          dispatch({
            type: SUCCESS_FETCHING_AUTHOR,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: FAIL_TO_FETCH_AUTHOR,
            error: error.message,
          });
        });
    }
  };
};

export const createauthor = (authorsData) => {
  return (dispatch) => {
    return axios
      .post("api/v1/author/create-author", authorsData)
      .then((response) => {
        dispatch({
          type: ADD_AUTHOR_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchauthor());
      });
  };
};

export const deleteauthor = (authorId) => {
  return (dispatch) => {
    axios
      .delete(`api/v1/author/delete-author/${authorId}`)
      .then(() => {
        dispatch({
          type: DELETE_AUTHOR_SUCCESS,
          payload: {
            authorId: authorId,
          },
        });
      });
  };
};
export const updateauthor = (authorData) => {
  return (dispatch) => {
    return axios
      .put(`api/v1/author/update-author/${authorData.id}`, authorData)
      .then((response) => {
        dispatch({
          type: UPDATE_AUTHOR_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchauthor());
      });
  };
};
