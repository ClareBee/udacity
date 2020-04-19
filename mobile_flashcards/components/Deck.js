import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getDeck } from "../utils/api";

function Deck({ route, navigation, deck }) {
  const [title, setTitle] = React.useState("");
  useEffect(() => {
    const deckId = route.params;
    setTitle(deckId);
    getDeck(deckId);
  }, []);
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
