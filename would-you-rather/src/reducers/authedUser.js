import { LOG_IN, LOG_OUT } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOG_IN:
      console.log("login", action);
      // TODO fake verification and set authedUser id
      return action.authedUser;
    case LOG_OUT:
      console.log(action.authedUser);
      return null;
    default:
      return state;
  }
}
