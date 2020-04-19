import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getDeck, deleteDeck } from "../utils/api";
import { deleteDeckFromStore } from "../actions";
import { AppLoading } from "expo";

function Deck({ route, navigation, deck, dispatch }) {
  const [title, setTitle] = React.useState("");
  useEffect(() => {
    const deckId = route.params;
    setTitle(deckId);
    getDeck(deckId);
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
    <View>
      <Text>Start Quiz or Add Question to {deck.title}</Text>
      <Text>{deck.questions.length} questions</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz", title)}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddQuestion", title)}
      >
        <Text>Add Question</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Text>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps(state, { route }) {
  const deck = state[route.params];
  return {
    deck,
  };
}
export default connect(mapStateToProps)(Deck);
