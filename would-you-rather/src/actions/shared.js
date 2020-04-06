import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer,
  verifyUser,
} from "../utils/api";
import { receiveUsers, updateUserAnswers, updateUserQuestions } from "./users";
import { receiveQuestions, addQuestion, updateQuestion } from "./questions";
import { logIn } from "./authedUser";
import { logInError, systemError } from "./errors";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData()
      .then(({ users, questions, errors }) => {
        dispatch(hideLoading());

        // handle errors from Promise.all
        if (errors) {
          dispatch(systemError(errors));
        } else {
          dispatch(receiveUsers(users));
          dispatch(receiveQuestions(questions));
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        dispatch(systemError(err));
      });
  };
}

export function handleLogin(info) {
  return (dispatch) => {
    dispatch(showLoading());

    return verifyUser(info)
      .then((user) => {
        dispatch(logInError(null));
        dispatch(logIn(user));
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(hideLoading());
        dispatch(logInError(err));
      });
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    const { optionOneText, optionTwoText } = question;
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(updateUserQuestions(question));
      })
      .then(dispatch(hideLoading()))
      .catch((err) => {
        dispatch(systemError(err));
        dispatch(hideLoading());
      });
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    // for optimistic update
    dispatch(updateQuestion(info));
    dispatch(updateUserAnswers(info));
    // for api/db
    return saveQuestionAnswer(info).catch((e) => {
      console.warn(`Error in saveQuestionAnswer: ${e}`);
      // undo answer in case of error => handled in the reducer
      dispatch(
        updateQuestion({ id: info.id, authedUser: info.authedUser, answer: "" })
      );
      dispatch(updateUserAnswers(info));

      alert("There was an error saving this answer");
    });
  };
}
