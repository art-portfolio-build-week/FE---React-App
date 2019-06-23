import axios from "axios";
import * as types from "./actionTypes";

export const fetchApi = URL => dispatch => {
  axios.get(URL)
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

};

export const deletePost = URL => (dispatch) => {

};
