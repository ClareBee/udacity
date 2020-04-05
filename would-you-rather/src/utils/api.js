import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _verifyUser
} from "./_DATA.js";
export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()])
    .then(([users, questions]) => ({
      users,
      questions
    }))
    .catch(err => err);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function verifyUser(info) {
  return _verifyUser(info);
}
