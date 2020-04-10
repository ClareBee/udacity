import React, { Component } from "react";
import {
  ScrollView,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from "../utils/helpers";
import DateHeader from "./DateHeader";
import Slider from "./Slider";
import Stepper from "./Stepper";
import TextButton from "./TextButton";
import { Ionicons } from "@expo/vector-icons";
import { submitEntry, removeEntry } from "../utils/api";
import { addEntry } from "../actions";
import { white, purple } from "../utils/colours";

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === "ios"
          ? styles.iosSubmitButton
          : styles.androidSubmitButton
      }
    >
      <Text style={styles.submitButtonText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}
class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    eat: 0,
    sleep: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((currentState) => {
      const count = currentState[metric] + step;
      return {
        ...currentState,
        [metric]: count > max ? max : count,
      };
    });
  };

  decrement = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((currentState) => {
      const count = currentState[metric] - step;
      return {
        ...currentState,
        [metric]: count === 0 ? 0 : count,
      };
    });
  };

  slide = (metric, newValue) => {
    this.setState(() => ({
      [metric]: newValue,
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;
    submitEntry({ key, entry });
    //update redux
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );
    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      eat: 0,
      sleep: 0,
    }));
  };

  reset = () => {
    const key = timeToString();
    // update redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );
    removeEntry(key);
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    console.log("meta", metaInfo);

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
            size={100}
          />
          <Text>You already logged your info for today</Text>
          <TextButton onPress={this.reset}>RESET</TextButton>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />

        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === "slider" ? (
                <Slider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitButton onPress={this.submit} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  iosSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}
export default connect(mapStateToProps)(AddEntry);
