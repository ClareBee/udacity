import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";

function Quiz({ deck }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuestions(deck.questions);
    setLoading(false);
  }, []);

  if (loading === true) {
    return <AppLoading />;
  }

  if (questions.length === 0) {
    return (
      <View>
        <Text>No Questions</Text>
      </View>
    );
  }

  const markCorrect = () => {
    setProgress(progress + 1);
    setScore(score + 1);
  };

  const markIncorrect = () => {
    setProgress(progress + 1);
    setScore(score);
  };

  const questionView = () => {
    return (
      <View>
        <Text>{questions[progress].question}</Text>
        <Button title={"Correct"} onPress={markCorrect} />
        <Button title={"Incorrect"} onPress={markIncorrect} />
      </View>
    );
  };

  return (
    <View>
      <Text>Quiz for {deck.title}</Text>
      <Text>
        {score}/{deck.questions.length}
      </Text>
      {progress < questions.length && questionView()}
      {progress === questions.length && (
        <Text>
          You scored {score} / {questions.length}
        </Text>
      )}
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
