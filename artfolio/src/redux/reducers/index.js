import { combineReducers } from "redux";
import { postReducer, authReducer } from "./reducers";

export default combineReducers({
  postState: postReducer,
  authState: authReducer,
});