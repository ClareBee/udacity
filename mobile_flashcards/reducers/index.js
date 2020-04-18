import { RECEIVE_DECKS, ADD_DECK } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      const title = action.title;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    default:
      return state;
  }
}

export default decks;
