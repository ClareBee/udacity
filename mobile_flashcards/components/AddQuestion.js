import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { addCardToDeck } from "../utils/api";
import { secondaryColour } from "../utils/colours";
import { addCardToStore } from "../actions";

function AddQuestion({ dispatch, navigation, route }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  submit = () => {
    // update local storage
    const title = route.params;
    const card = { question, answer };
    addCardToDeck({ card, title });
    // update redux
    dispatch(addCardToStore(card, title));
    // redirect to Deck page
    navigation.dispatch(CommonActions.goBack());

    setQuestion("");
    setAnswer("");
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.heading}>Add Question to {route.params} </Text>
      <TextInput
        style={styles.textInput}
        value={question}
        onChangeText={(question) => setQuestion(question)}
        placeholder={"Question"}
      />
      <TextInput
        style={styles.textInput}
        value={answer}
        onChangeText={(answer) => setAnswer(answer)}
        placeholder={"Answer"}
      />
      <Button title={"Submit"} onPress={submit} color={secondaryColour} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default connect()(AddQuestion);
