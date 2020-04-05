export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USERS = "UPDATE_USERS";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});
