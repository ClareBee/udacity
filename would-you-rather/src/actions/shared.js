import { getInitialData } from "../utils/api";
import { receiveUsers, updateUserAnswers, updateUserQuestions } from "./users";
import { receiveQuestions, addQuestion, updateQuestion } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

// hard-coded for demo purposes
const AUTHED_ID = "sarahedo";
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());

    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
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
      author: authedUser
    })
      .then(question => {
        console.log("question added", question);
        dispatch(addQuestion(question));
        dispatch(updateUserQuestions(question));
      })
      .then(dispatch(hideLoading()));
  };
}

export function handleAnswerQuestion(info) {
  return dispatch => {
    // for optimistic update
    dispatch(updateQuestion(info));
    dispatch(updateUserAnswers(info));
    // for api/db
    return saveQuestionAnswer(info).catch(e => {
      console.warn(`Error in saveQuestionAnswer: ${e}`);
      // undo answer in case of error => handled in the reducer
      dispatch(
        updateQuestion({ id: info.id, authedUser: info.authedUser, answer: "" })
      );
      // TODO: handle in reducer
      dispatch(updateUserAnswers(info));

      alert("There was an error saving this answer");
    });
  };
}
