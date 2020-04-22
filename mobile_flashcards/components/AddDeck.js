import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { redColour, secondaryColour } from "../utils/colours";
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.heading}>Add Deck</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        value={title}
        onChangeText={(title) => handleChange(title)}
        placeholder={"Deck Title"}
        maxLength={40}
        style={{ height: 40 }}
      />
      <Button title={"Submit"} onPress={submit} color={secondaryColour} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: redColour,
  },
});
export default connect()(AddDeck);
