import { verifyUser } from "../utils/api";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const logIn = ({ authedUser }) => ({
  type: LOG_IN,
  authedUser
});

export const logOut = ({ authedUser }) => ({
  type: LOG_OUT,
  authedUser
});

export function handleLogout(info) {
  return dispatch => {
    dispatch(logOut(info));
  };
}

export function handleLogin(info) {
  return dispatch => {
    return verifyUser(info)
      .then(user => {
        if (user) {
          return dispatch(logIn(user));
        }
      })
      .catch(err => console.log("error", err));
  };
}
