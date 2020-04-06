export const LOG_IN_ERROR = "LOG_IN_ERROR";
export const SYSTEM_ERROR = "SYSTEM_ERROR";

export const logInError = error => ({
  type: LOG_IN_ERROR,
  error
});

export const systemError = error => ({
  type: SYSTEM_ERROR,
  error
});
