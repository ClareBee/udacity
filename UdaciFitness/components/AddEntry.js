import React, { Component } from "react";
import {
  ScrollView,
  FlatList,
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

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
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
    this.propsdispatch(
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
        <View>
          <Ionicons name="ios-happy" size={100} />
          <Text>You already logged your info for today</Text>
          <TextButton onPress={this.reset}>RESET</TextButton>
        </View>
      );
    }
    return (
      <ScrollView>
        <DateHeader date={new Date().toLocaleDateString()} />

        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
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

function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}
export default connect(mapStateToProps)(AddEntry);
