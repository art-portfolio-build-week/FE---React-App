import * as types from "../actions/actionTypes";

const initalState = {
  postsArray: [],
  isFetching: true,
  errorMessage: null,
};

const authState = {
  token: null,
  authFail: null,
};

export function postReducer(state = initalState, action) {
  switch (action.type) {
    case types.FETCH_API:
      return { ...state, isFetching: action.payload };
    case types.FETCHING_OK:
      return { ...state, postsArray: action.payload };
    case types.FETCHING_FAIL:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export function authReducer(state = authState, action) {
  switch (action.type) {
    case types.AUTHENTICATE:
      return { ...state, token: action.payload };
    case types.AUTH_FAIL:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
