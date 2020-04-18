import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";

function Deck({ route, navigation }) {
  useEffect(() => {
    const deckId = route.params;
    getDeck(deckId);
  }, []);
  return (
    <View>
      <Text>Start Quiz or Add Question</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddQuestion", { deskId: route.params })
        }
      >
        <Text>Add Question</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Deck;
