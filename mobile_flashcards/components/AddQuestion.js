import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { addCardToDeck } from "../utils/api";
import { addCardToStore } from "../actions";

function AddQuestion({ dispatch, navigation, route }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  console.log("route", route.params);
  submit = () => {
    // update local storage
    const title = route.params;
    const card = { question, answer };
    addCardToDeck({ card, title });
    // TODO: update redux
    dispatch(addCardToStore(card, title));
    // redirect to Deck page
    navigation.dispatch(CommonActions.goBack());

    setQuestion("");
    setAnswer("");
  };
  return (
    <View>
      <Text>Add Question</Text>
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
