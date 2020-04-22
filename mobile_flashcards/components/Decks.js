import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  InteractionManager,
} from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";

import { getDecks } from "../utils/api";
import { accentColour, primaryColour } from "../utils/colours";
import { receiveDecks } from "../actions";

const ANIMATED_DURATION = 1000;

function Decks({ navigation, dispatch, decks }) {
  const [ready, setReady] = useState(false);
  const [slideItems] = useState(new Animated.Value(0));
  const [fadeEffect] = useState(new Animated.Value(1));
  useEffect(() => {
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => setReady(true));
  }, []);

  if (ready === false || decks === undefined) {
    return <AppLoading />;
  }

  const handleClick = (_e, deck) => {
    Animated.parallel([
      Animated.timing(slideItems, {
        toValue: 1000,
        duration: ANIMATED_DURATION,
      }),
      Animated.timing(fadeEffect, {
        toValue: 0,
        duration: ANIMATED_DURATION,
      }),
    ]).start();

    InteractionManager.runAfterInteractions(() => {
      navigation.navigate("Deck", deck);
      slideItems.setValue(0);
      fadeEffect.setValue(1);
    });
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {decks &&
        Object.keys(decks).map((deck) => (
          <TouchableOpacity onPress={(e) => handleClick(e, deck)} key={deck}>
            <Animated.Text
              style={[
                styles.deck,
                {
                  transform: [{ translateY: slideItems }],
                  opacity: fadeEffect,
                },
              ]}
            >
              {deck} ({decks[deck].questions.length} cards)
            </Animated.Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  deck: {
    backgroundColor: accentColour,
    color: primaryColour,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(Decks);
