import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import CardFlip from "react-native-card-flip";
import { CommonActions } from "@react-navigation/native";
import {
  clearLocalNotification,
  registerForPushNotifications,
} from "../utils/helpers";
import {
  redColour,
  primaryColour,
  secondaryColour,
  accentColour,
  lightColour,
} from "../utils/colours";
function Quiz({ deck, navigation }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuestions(deck.questions);

    setLoading(false);
    // cancel local notification if quiz completed
    if (progress > 0 && progress === questions.length) {
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
    if (card.state.side === 1) {
      card.flip();
    }
  };
  const scoreView = () => {
    return (
      <View style={{ padding: 20 }}>
        <Text style={styles.result}>
          You scored {score} / {questions.length}
        </Text>
        <Button
          title={"Retake Quiz"}
          onPress={handleRestart}
          color={secondaryColour}
        />
        <Button
          title={"Back to Deck"}
          onPress={() => navigation.dispatch(CommonActions.goBack())}
          color={primaryColour}
        />
      </View>
    );
  };
  const questionView = () => {
    const card = questions[progress];
    return (
      <View style={{ padding: 20 }}>
        <Text style={styles.score}>
          {score}/{deck.questions.length}
        </Text>
        <Text>Tap the card to show the answer!</Text>
        <CardFlip
          style={styles.cardContainer}
          ref={(card) => (this.card = card)}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.flip()}
            value="question"
          >
            <Text style={styles.question}>Question: {card.question}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardAnswer}
            onPress={() => this.card.flip()}
            value="answer"
          >
            <Text style={styles.answer}>Answer: {card.answer}</Text>
          </TouchableOpacity>
        </CardFlip>
        <Button title={"Correct"} onPress={markCorrect} color={accentColour} />
        <Button title={"Incorrect"} onPress={markIncorrect} color={redColour} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.heading}>Quiz for {deck.title}</Text>

      {progress < questions.length && questionView()}
      {progress === questions.length && scoreView()}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
  },
  score: {
    padding: 20,
    borderColor: redColour,
    borderRadius: 3,
    borderWidth: 1,
  },
  result: {
    padding: 20,
    borderColor: accentColour,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 20,
  },
  question: {
    color: lightColour,
  },
  answer: {
    color: primaryColour,
  },
  card: {
    height: 150,
    padding: 8,
    backgroundColor: primaryColour,
    alignItems: "center",
    justifyContent: "center",
  },
  cardAnswer: {
    height: 150,
    padding: 8,
    backgroundColor: accentColour,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    height: 150,
    backgroundColor: secondaryColour,
    marginBottom: 20,
  },
});

function mapStateToProps(state, { route }) {
  const deck = state[route.params];
  return {
    deck,
  };
}
export default connect(mapStateToProps)(Quiz);
