import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";

function AddDeck({ dispatch, navigation }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  submit = () => {
    // prevent empty submission
    if (title.trim() === "") {
      return setError("Title cannot be empty");
    }
    // update local storage
    saveDeckTitle({ title });
    // update redux
    dispatch(addDeck(title));
    // redirect to Decks page
    navigation.navigate("Decks");
    setTitle("");
  };

  const handleChange = (title) => {
    setTitle(title);
    // clear error message if needed
    setError(null);
  };

  return (
    <View>
      <Text>Add Deck</Text>
      {error && <Text>{error}</Text>}
      <TextInput
        value={title}
        onChangeText={(title) => handleChange(title)}
        placeholder={"Deck Title"}
        maxLength={40}
      />
      <Button title={"Submit"} onPress={submit} />
    </View>
  );
}

export default connect()(AddDeck);
