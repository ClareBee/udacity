import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

function Quiz({ deck }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(deck.questions);
  }, []);
  return (
    <View>
      <Text>Quiz for {deck.title}</Text>
      <Text>
        {score}/{deck.questions.length}
      </Text>
      {progress < questions.length && <Text>Show question</Text>}
      {progress === questions.length && <Text>Show score</Text>}
    </View>
  );
}

function mapStateToProps(state, { route }) {
  const deck = state[route.params];
  console.log(deck);
  return {
    deck,
  };
}
export default connect(mapStateToProps)(Quiz);
