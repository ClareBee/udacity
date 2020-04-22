import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "MobileFlashcards:decks";

export const setDummyData = () => {
  const dummyData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces",
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
        },
      ],
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared.",
        },
      ],
    },
  };
  const data = JSON.stringify(dummyData);
  console.log("data", data);
  AsyncStorage.setItem(DECKS_STORAGE_KEY, data);

  return data;
};

function setDecks(decks) {
  return JSON.parse(decks);
}
export function formatDecks(results) {
  return results === null ? setDummyData() : setDecks(results);
}

// for testing purposes
function clearDecks() {
  AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}
