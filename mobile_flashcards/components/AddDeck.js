import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";

function AddDeck({ dispatch, navigation }) {
  const [title, setTitle] = useState("");
  submit = () => {
    // update local storage
    saveDeckTitle({ title });
    // update redux
    dispatch(
      addDeck({
        title,
      })
    );
    // redirect to Decks page
    navigation.navigate("Decks");

    // TODO: clearLocalNotification().then(setLocalNotification);
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

function mapStateToProps(state, { navigation }) {
  // const key = timeToString();
  return {
    // alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}
export default connect(mapStateToProps)(AddDeck);
