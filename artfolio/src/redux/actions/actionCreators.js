import axiosAuth from "../../axios";
import * as types from "./actionTypes";
import * as URL from "../../constants";

// Authentication
export const authenticate = token => ({
  type: types.AUTHENTICATE,
  payload: token,
});

export const setLoggedUser = username => {
  const user = username.split(" ");
  return {
    type: types.LOGGED_USER,
    payload: `${user[0]} ${user[1].charAt(0)}.`,
  };
};

const setAuthMessageToState = message => ({
  type: types.AUTH_MESSAGE,
  payload: message,
});

export const loginUser = payload => dispatch => {
  axiosAuth().post(URL.login, payload)
    .then(res => {
      dispatch(authenticate(res.data.token));
      dispatch(setAuthMessageToState(res.data.message));
      dispatch(setLoggedUser(res.data.username));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
    })
    .catch(err => {
      dispatch(setAuthMessageToState(err.message));
    });
};

export const registerUser = payload => dispatch => {
  axiosAuth().post(URL.register, payload)
    .then(res => {
      dispatch(authenticate(res.data.token));
      dispatch(setAuthMessageToState(res.data.message));
      dispatch(setLoggedUser(res.data.username));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
    })
    .catch(err => {
      dispatch(setAuthMessageToState(err.message));
    });
};

// Post
export const fetchApi = URL => dispatch => {
  axiosAuth().get(URL)
    .then(res => {
      dispatch({ type: types.FETCHING_OK, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: types.FETCHING_FAIL, payload: err });
    })
    .finally(() => {
      dispatch({ type: types.FETCH_API, payload: false });
    });
};

export const fetchById = URL => dispatch => {
  axiosAuth().get(URL)
    .then(res => {
      dispatch({ type: types.FETCH_BY_ID, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: types.FETCHING_FAIL, payload: err });
    })
    .finally(() => {
      dispatch({ type: types.FETCH_API, payload: false });
    });
};

export const addPost = payload => dispatch => {
  axiosAuth().post(URL.addPost, payload)
    .then(() => {
      dispatch(fetchApi(URL.fetchAll));
    })
    .catch(err => {
      dispatch({ type: types.FETCHING_FAIL, payload: err });
    })
    .finally(() => {
      dispatch({ type: types.FETCH_API, payload: false });
    });
};

export const editPost = (URL, payload) => dispatch => {
  axiosAuth().put(URL, payload)
    .then(() => {
      dispatch(fetchApi(URL.fetchAll));
    })
    .catch(err => {
      dispatch({ type: types.FETCHING_FAIL, payload: err });
    })
    .finally(() => {
      dispatch({ type: types.FETCH_API, payload: false });
    });
};

export const postToEdit = post => ({
  type: types.POST_TO_EDIT,
  payload: post,
});

// export const deletePost = () => dispatch => null;
