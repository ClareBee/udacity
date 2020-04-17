import { AsyncStorage } from "react-native";

import { DECKS_STORAGE_KEY, formatDecks } from "./_decks";

// getDecks
export function getDecks() {
  console.log("getting decks", DECKS_STORAGE_KEY);
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return formatDecks(results);
    })
    .catch((err) => console.log("error", err));
}
// getDeck by id

// saveDeckTitle

// addCardToDeck
