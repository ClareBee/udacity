import React from "react";
import { View, Text } from "react-native";

function Deck({ deck }) {
  console.log("inside the deck", deck);
  return (
    <View>
      <Text>Deck</Text>
    </View>
  );
}

export default Deck;
