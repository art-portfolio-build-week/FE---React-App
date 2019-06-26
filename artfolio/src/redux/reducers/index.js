import { combineReducers } from "redux";
import {
  postReducer,
  postIdReducer,
  authReducer,
  editPostReducer,
} from "./reducers";

export default combineReducers({
  postState: postReducer,
  authState: authReducer,
  editState: editPostReducer,
  postIdState: postIdReducer,
});
