import { combineReducers } from "redux";
import {
  postReducer,
  postIdReducer,
  authReducer,
  userReducer,
} from "./reducers";

export default combineReducers({
  postState: postReducer,
  authState: authReducer,
  editState: userReducer,
  postIdState: postIdReducer,
});
