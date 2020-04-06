export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const updateUserQuestions = ({ author, id }) => ({
  type: UPDATE_USER_QUESTIONS,
  author,
  id
});

export const updateUserAnswers = ({ authedUser, qid, answer }) => ({
  type: UPDATE_USER_ANSWERS,
  authedUser,
  qid,
  answer
});
