export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const setAuthedUser = id => ({
  type: SET_AUTHED_USER,
  id
});

export const logIn = (name, email) => ({
  type: LOG_IN,
  name,
  email
});

export const logOut = authedUser => ({
  type: LOG_IN,
  authedUser
});
