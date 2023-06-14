import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../types/actionsTypes";
axios.defaults.baseURL = "http://192.168.29.117:8000/";

export const signUpUser = (userData) => {
  return (dispatch) => {
    try {
      const response = axios.post("api/v1/user/signup", userData);
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
      Navigate("/");
    } catch (error) {
      dispatch({ type: SIGN_UP_ERROR, payload: error.message });
    }
  };
};
export const loginUser = (loginData) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post("api/v1/user/login", loginData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      Navigate("/product");
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const fetchProfile = () => {
  return (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["authorization"] = token;
      if (token) {
        axios.get("api/v1/user/get-profile").then(function (response) {
          dispatch({
            type: PROFILE_SUCCESS,
            payload: {
              name: response.data.data.name,
              email: response.data.data.email,
            },
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
