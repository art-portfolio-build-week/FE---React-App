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
  userState: userReducer,
  postIdState: postIdReducer,
});
