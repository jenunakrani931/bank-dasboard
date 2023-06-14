import {
  SIGN_UP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../types/actionsTypes";
const initialState = {
  user: null,
  error: null,
  data: { name: null, email: null },
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case PROFILE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
