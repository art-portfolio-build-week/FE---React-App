import axiosAuth from "../../axios";
import * as types from "./actionTypes";
import * as URL from "../../constants";

// Authentication
export const loginUser = payload => dispatch => {
  axiosAuth().post(URL.login, payload)
    .then((res) => {
      dispatch({ type: types.AUTHENTICATE, payload: res.data.token });
    })
    .catch(err => {
      console.log(err.message);
      dispatch({ type: types.AUTH_FAIL, payload: err });
    });
};

export const registerUser = payload => dispatch => {
  axiosAuth().post(URL.register, payload)
    .then((res) => {
      console.log(res)
      dispatch({ type: types.AUTHENTICATE, payload: res.data.token });
    })
    .catch(err => {
      console.log(err.message);
      dispatch({ type: types.AUTH_FAIL, payload: err });
    });
};

// Post
export const fetchApi = URL => dispatch => {
  axiosAuth().get(URL)
    .then((res) => {
      dispatch({ type: types.FETCHING_OK, payload: res.data });
    })
    .catch(err => {
      console.log(err.message);
      dispatch({ type: types.FETCHING_FAIL, payload: err });
    })
    .finally(() => {
      dispatch({ type: types.FETCH_API, payload: false });
    });
};


export const addPost = payload => (dispatch) => {
  return null;
};

export const deletePost = () => (dispatch) => {
  return null;
};
