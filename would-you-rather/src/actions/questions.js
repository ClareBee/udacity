import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});

export const addQuestion = question => ({
  type: ADD_QUESTION,
  question
});

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log("user", authedUser);
    dispatch(showLoading());
    const { optionOneText, optionTwoText } = question;
    console.log("info", authedUser, optionOneText);
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
      .then(dispatch(hideLoading()));
  };
}
