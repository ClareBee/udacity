import { combineReducers } from "redux";
import authedUser from "./authedUser";
import questions from "./questions";
import users from "./users";
import errors from "./errors";

export default combineReducers({
  authedUser,
  users,
  questions,
  errors
});
