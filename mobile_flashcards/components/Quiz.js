import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import CardFlip from "react-native-card-flip";

function Quiz({ deck }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("answer");
  const [flipCard] = useState(new Animated.Value(0));

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

  const toggleView = () => {
    if (view === "question") {
      setView("answer");
    } else {
      setView("question");
    }
  };

  const questionView = () => {
    const card = questions[progress];
    return (
      <View>
        <Text>Tap the card to show the answer!</Text>
        <CardFlip
          style={styles.cardContainer}
          ref={(card) => (this.card = card)}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.flip()}
          >
            <Text>Question: {card.question}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.flip()}
          >
            <Text>Answer: {card.answer}</Text>
          </TouchableOpacity>
        </CardFlip>
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

const styles = StyleSheet.create({
  card: {
    height: 80,
    backgroundColor: "blue",
  },
  cardContainer: {
    height: 100,
    backgroundColor: "red",
  },
});

function mapStateToProps(state, { route }) {
  const deck = state[route.params];
  console.log(deck);
  return {
    deck,
  };
}
export default connect(mapStateToProps)(Quiz);
