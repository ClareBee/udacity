// import AsyncStorage from "@react-native-community/async-storage";
// import AsyncStorage from "react-native";
import { AsyncStorage } from "react-native";

import {
  CALENDAR_STORAGE_KEY,
  formtCalendarResults,
  formatCalendarResults,
} from "./_calendar";

export async function submitEntry({ entry, key }) {
  try {
    await AsyncStorage.setItem(
      CALENDAR_STORAGE_KEY,
      JSON.stringify({
        [key]: entry,
      })
    );
  } catch (e) {
    // saving error
    console.log("oops", e);
  }
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}

export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) =>
    formatCalendarResults(results)
  );
}
