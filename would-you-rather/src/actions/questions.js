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

export const updateQuestion = input => {
  const { qid, authedUser, answer } = input;
  return {
    type: UPDATE_QUESTION,
    qid,
    authedUser,
    answer
  };
};
