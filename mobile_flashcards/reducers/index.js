import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      console.log(action, state);
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
      console.log("title and card", title, card);
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat([card]),
        },
      };
    default:
      return state;
  }
}

export default decks;
