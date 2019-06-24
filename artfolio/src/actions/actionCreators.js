import axiosAuth from "../axios";
import * as types from "./actionTypes";

export const loginUser = (URL, payload) => dispatch => {
  axiosAuth().post(URL, payload)
    .then((res) => {
      dispatch({ type: types.AUTHENTICATE, payload: res.data });
    })
    .catch(err => {
      console.log(err.message);
      dispatch({ type: types.AUTH_FAIL, payload: err });
    });
};

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


export const addPost = (URL, payload) => (dispatch) => {
  return null;
};

export const deletePost = URL => (dispatch) => {
  return null;
};
