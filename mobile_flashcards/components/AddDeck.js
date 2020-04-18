import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { saveDeckTitle } from "../utils/api";

function AddDeck({ navigation }) {
  const [title, setTitle] = useState("");
  submit = () => {
    saveDeckTitle({ title });
    navigation.navigate("Decks");

    // clearLocalNotification().then(setLocalNotification);
    //update redux

    setTitle("");
  };
  return (
    <View>
      <Text>Add Deck</Text>
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        placeholder={"Deck Title"}
      />
      <Button title={"Submit"} onPress={submit} />
    </View>
  );
}

export default AddDeck;
