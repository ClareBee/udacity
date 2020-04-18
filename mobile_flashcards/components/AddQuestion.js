import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";
// import { addQuestion } from "../actions";

function AddQuestion({ dispatch, navigation }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  submit = () => {
    // update local storage
    addCardToDeck({ question, answer });
    // TODO: update redux
    // redirect to Deck page
    // navigation.navigate("Deck");

    setQuestion("");
    setAnswer("");
  };
  return (
    <View>
      <Text>Add Deck</Text>
      <TextInput
        value={question}
        onChangeText={(question) => setQuestion(question)}
        placeholder={"Question"}
      />
      <TextInput
        value={answer}
        onChangeText={(answer) => setAnswer(answer)}
        placeholder={"Answer"}
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
export default connect(mapStateToProps)(AddQuestion);
