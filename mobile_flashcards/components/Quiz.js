import React, { useState, useEffect, useRef } from "react";
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
import { CommonActions } from "@react-navigation/native";
import {
  clearLocalNotification,
  registerForPushNotifications,
} from "../utils/helpers";
function Quiz({ deck, navigation }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const questionCard = useRef(null);

  useEffect(() => {
    setQuestions(deck.questions);

    setLoading(false);
    // cancel local notification if quiz completed
    if (progress > 0 && progress === questions.length) {
      console.log("yooooo", progress, questions.length);
      clearLocalNotification().then(registerForPushNotifications);
    }
  }, [progress]);

  if (loading === true) {
    return <AppLoading />;
  }

  if (questions.length === 0) {
    return (
      <View>
        <Text>No Questions Available</Text>
      </View>
    );
  }

  const markCorrect = () => {
    setProgress(progress + 1);
    setScore(score + 1);
    showNextQuestion();
  };

  const markIncorrect = () => {
    setProgress(progress + 1);
    setScore(score);
    showNextQuestion();
  };

  const handleRestart = () => {
    setProgress(0);
    setScore(0);
  };

  const showNextQuestion = () => {
    // reset card to show question
    card.flip();
  };
  const scoreView = () => {
    return (
      <View>
        <Text>
          You scored {score} / {questions.length}
        </Text>
        <Button title={"Retake Quiz"} onPress={handleRestart} />
        <Button
          title={"Back to Deck"}
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      </View>
    );
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
      {progress === questions.length && scoreView()}
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
