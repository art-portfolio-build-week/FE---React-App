import * as types from "../actions/actionTypes";

const initalState = {
  postList: [],
  isFetching: true,
  errorMessage: null,
};

const authState = {
  token: null,
  authMessage: null,
  loggedUser: null,
};

const postToEdit = {
  toBeEdited: null,
};

export function postReducer(state = initalState, action) {
  switch (action.type) {
    case types.FETCH_API:
      return { ...state, isFetching: action.payload };
    case types.FETCHING_OK:
      return { ...state, postList: action.payload };
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
    case types.AUTH_MESSAGE:
      return { ...state, authMessage: action.payload };
    case types.LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
}

export function editPostReducer(state = postToEdit, action) {
  switch (action.type) {
    case types.POST_TO_EDIT:
      return { ...state, toBeEdited: action.payload };
    default:
      return state;
  }
}
