import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESIION";

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

function updateQuestion({ qid, authedUser, answer }) {
  return {
    type: UPDATE_QUESTION,
    qid,
    authedUser,
    answer
  };
}

export function handleAnswerQuestion(info) {
  return dispatch => {
    // for optimistic update
    dispatch(updateQuestion(info));
    // for api/db
    return saveQuestionAnswer(info).catch(e => {
      console.warn(`Error in saveQuestionAnswer: ${e}`);
      // undo answer in case of error => handled in the reducer
      dispatch(
        updateQuestion({ id: info.id, authedUser: info.authedUser, answer: "" })
      );
      alert("There was an error saving this answer");
    });
  };
}
