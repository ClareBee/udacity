import {
  RECEIVE_USERS,
  UPDATE_USER_ANSWERS,
  UPDATE_USER_QUESTIONS
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case UPDATE_USER_QUESTIONS:
      const { author, id } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      };
    case UPDATE_USER_ANSWERS:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser]["answers"],
            [qid]: [answer]
          }
        }
      };
    default:
      return state;
  }
}
