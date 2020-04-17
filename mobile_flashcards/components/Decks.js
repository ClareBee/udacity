import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Deck from "./Deck";
import { getDecks } from "../utils/api";

function Decks({ navigation }) {
  const [decks, setDecks] = useState({});
  useEffect(() => {
    console.log("hi there");
    getDecks().then((decks) => setDecks(decks));
  }, []);
  return (
    <View>
      {decks &&
        Object.keys(decks).map((deck) => (
          <TouchableOpacity onPress={() => navigation.navigate("Deck", deck)}>
            <Deck deck={deck} key={deck} />
          </TouchableOpacity>
        ))}
    </View>
  );
}

export default Decks;
