import { combineReducers } from "redux";
import { postReducer, authReducer, editPostReducer } from "./reducers";

export default combineReducers({
  postState: postReducer,
  authState: authReducer,
  editState: editPostReducer,
});
