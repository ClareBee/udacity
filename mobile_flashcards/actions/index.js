export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const DELETE_DECK = "DELETE_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function addCardToStore(card, title) {
  return {
    type: ADD_CARD_TO_DECK,
    card,
    title,
  };
}

export function deleteDeckFromStore(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}
