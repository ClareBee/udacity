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

export function getDeck(deckKey) {
  console.log("getting deck", deckKey);
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    return data[deckKey];
  });
}

// saveDeckTitle
export async function saveDeckTitle({ title }) {
  const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const decks = JSON.parse(data);
  try {
    await AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        ...decks,
        [title]: {
          title: title,
          questions: [],
        },
      })
    );
  } catch (e) {
    // saving error
    console.log("oops", e);
  }
}

// addCardToDeck
export async function addCardToDeck({ card, title }) {
  console.log("adding card to deck", card, title);
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const data = JSON.parse(decks);
  try {
    await AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        ...data,
        [title]: {
          ...data[title],
          questions: data[title].questions.concat([card]),
        },
      })
    );
  } catch (e) {
    console.log("oh noes", e);
  }
}
