import * as types from "../actions/actionTypes";

const initalState = {
  postList: [],
  isFetching: true,
  errorMessage: null,
};

export function postReducer(state = initalState, action) {
  switch (action.type) {
    case types.FETCH_API:
      return { ...state, isFetching: action.payload };
    case types.FETCHING_OK:
      return { ...state, postList: action.payload };
    case types.FETCHING_FAIL:
      return { ...state, errorMessage: action.payload };
    case types.FETCH_BY_ID:
      return { ...state, postById: action.payload };
    default:
      return state;
  }
}

const idState = {
  postById: null,
  isFetchingId: true,
  errorMessageId: null,
};

export function postIdReducer(state = idState, action) {
  switch (action.type) {
    case types.FETCH_BY_ID:
      return { ...state, isFetchingId: action.payload };
    case types.FETCH_BY_ID_OK:
      return { ...state, postById: action.payload };
    case types.FETCH_BY_ID_FAIL:
      return { ...state, errorMessageId: action.payload };
    default:
      return state;
  }
}

const authState = {
  token: null,
  authMessage: null,
  loggedUser: null,
  loggedUserID: null,
};

export function authReducer(state = authState, action) {
  switch (action.type) {
    case types.AUTHENTICATE:
      return { ...state, token: action.payload };
    case types.AUTH_MESSAGE:
      return { ...state, authMessage: action.payload };
    case types.LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    case types.LOGGED_USER_ID:
      return { ...state, loggedUserID: action.payload };
    default:
      return state;
  }
}

const userState = {
  toBeEdited: null,
  userInfo: null,
  isFetching: true,
  errorMessage: null,
  message: null,
};

export function userReducer(state = userState, action) {
  switch (action.type) {
    case types.POST_TO_EDIT:
      return { ...state, toBeEdited: action.payload };
    case types.GET_USER_BY_ID_OK:
      return { ...state, userInfo: action.payload, isFetching: true };
    case types.GET_USER_BY_ID_FAIL:
      return { ...state, errorMessage: action.payload };
    case types.GET_USER_BY_ID:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
}
