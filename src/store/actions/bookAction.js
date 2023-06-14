import axios from "axios";
import {
  SUCCESS_FETCHING_BOOK,
  FAIL_TO_FETCH_BOOK,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
} from "../types/actionsTypes";

axios.defaults.baseURL = "http://192.168.29.117:8000/";
const token = localStorage.getItem("token");

export const fetchBook = (page, limit, AuthorId, search) => {
  const url = `api/v1/book?page=${page}&limit=${limit}&search=${search}&author=${AuthorId}`;
  console.log(AuthorId);
  return (dispatch) => {
    if (token) {
    return  axios
        .get(url)
        .then((response) => {
          dispatch({
            type: SUCCESS_FETCHING_BOOK,
            payload: response.data.data.docs,
          });
            return response;  
        })  
        .catch((error) => {
          dispatch({
            type: FAIL_TO_FETCH_BOOK,
            error: error.message,
          });
        });
    }
  };
};

export const createBook = (booksData) => {
  return (dispatch) => {
    if (token) {
      return axios
        .post("api/v1/book/create-book", booksData)
        .then((response) => {
          dispatch({
            type: ADD_BOOK_SUCCESS,
            payload: response.data,
          });
        });
    }
  };
};

export const deleteBook = (bookId) => {
  return (dispatch) => {
    if (token) {
      axios.delete(`api/v1/book/delete-book/${bookId}`).then(() => {
        console.log(bookId);
        dispatch({
          type: DELETE_BOOK_SUCCESS,
          payload: {
            bookId: bookId,
          },
        });
      });
    }
  };
};
export const updateBook = (bookData) => {
  return (dispatch) => {
    if (token) {
      return axios
        .put(`api/v1/book/update-book/${bookData.id}`, bookData)
        .then((response) => {
          dispatch({
            type: UPDATE_BOOK_SUCCESS,
            payload: response.data,
          });
        });
    }
  };
};
export const searchBook = (search) => {
  return (dispatch) => {
    if (token) {
      axios
        .get(`api/v1/book/get-book-list?search=${search}`)
        .then((response) => {
          dispatch({
            type: SUCCESS_FETCHING_BOOK,
            payload: response.data.data,
          });
        });
    }
  };
};
