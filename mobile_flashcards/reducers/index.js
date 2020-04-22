import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD_TO_DECK,
  DELETE_DECK,
} from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case ADD_CARD_TO_DECK:
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat([card]),
        },
      };
    case DELETE_DECK:
      // to avoid mutating state directly
      const decks = { ...state };
      delete decks[action.title];
      return {
        ...decks,
      };
    default:
      return state;
  }
}

export default decks;
