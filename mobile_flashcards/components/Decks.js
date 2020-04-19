import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";

import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";

function Decks({ navigation, dispatch, decks }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    console.log("hi there");
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      // .then(({ decks }) => {
      //   if (!entries[timeToString()]) {
      //     dispatch(
      //       addEntry({
      //         [timeToString()]: getDailyReminderValue(),
      //       })
      //     );
      //   }
      // })
      .then(() => setReady(true));
  }, []);

  if (ready === false) {
    return <AppLoading />;
  }
  console.log("decks", decks);
  return (
    <View>
      {decks &&
        Object.keys(decks).map((deck) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Deck", deck)}
            key={deck}
          >
            <Text>
              {deck} ({decks[deck].questions.length} cards)
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(Decks);
