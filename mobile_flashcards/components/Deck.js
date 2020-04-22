import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getDeck, deleteDeck } from "../utils/api";
import {
  secondaryColour,
  redColour,
  accentColour,
  lightColour,
} from "../utils/colours";
import { deleteDeckFromStore } from "../actions";
import { AppLoading } from "expo";

// if using Redux rather than getDeck, deck would be passed in as a prop here:
function Deck({ route, navigation, dispatch }) {
  const [title, setTitle] = React.useState("");
  const [deck, setDeck] = React.useState(null);

  useEffect(() => {
    const deckId = route.params;
    setTitle(deckId);
    getDeck(deckId).then((deck) => setDeck(deck));
  }, []);

  const handleDelete = () => {
    navigation.navigate("Decks");

    deleteDeck(title);
    dispatch(deleteDeckFromStore(title));
  };
  if (!deck) {
    return <AppLoading />;
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.heading}>
        Start Quiz or Add Question to {deck.title}
      </Text>
      <Text>
        {deck.title} currently has: {deck.questions.length}{" "}
        {deck.questions.length === 1 ? "question" : "questions"}
      </Text>
      <TouchableOpacity
        style={[styles.btn, styles.quizBtn]}
        onPress={() => navigation.navigate("Quiz", title)}
      >
        <Text style={styles.text}>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.addBtn]}
        onPress={() => navigation.navigate("AddQuestion", title)}
      >
        <Text style={styles.text}>Add Question</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.deleteBtn]}
        onPress={handleDelete}
      >
        <Text style={styles.text}>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
  },
  btn: {
    color: lightColour,
    padding: 20,
    textAlign: "center",
    textTransform: "uppercase",
    borderRadius: 5,
    fontWeight: "bold",
    margin: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  text: {
    color: lightColour,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteBtn: {
    backgroundColor: redColour,
  },
  addBtn: {
    backgroundColor: accentColour,
  },
  quizBtn: {
    backgroundColor: secondaryColour,
  },
});

// this is an alternative/quicker way to access deck from Redux store rather than api
// function mapStateToProps(state, { route }) {
//   const deck = state[route.params];
//   return {
//     deck,
//   };
// }
// export default connect(mapStateToProps)(Deck);
export default connect()(Deck);
