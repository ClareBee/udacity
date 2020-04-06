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
