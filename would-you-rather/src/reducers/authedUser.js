import { SET_AUTHED_USER, LOG_IN, LOG_OUT } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case LOG_IN:
      const user = {
        email: action.email,
        name: action.name,
        password: action.password
      };
      return {
        ...state,
        user
      };
    case LOG_OUT:
      console.log(action.authedUser);
      return {
        ...state,
        authedUser: {}
      };
    default:
      return state;
  }
}
