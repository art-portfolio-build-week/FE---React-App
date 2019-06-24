import * as types from "../actions/actionTypes";

const initalState = {
  postsArray: [],
  isFetching: true,
  errorMessage: null,
};

export default function postReducer(state = initalState, action) {
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
