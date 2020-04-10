import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import DateHeader from "./DateHeader";
import Slider from "./Slider";
import Stepper from "./Stepper";
import TextButton from "./TextButton";
import { Ionicons } from "@expo/vector-icons";
import { submitEntry, removeEntry } from "../utils/api";

function Button({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}
export default class AddEntry extends Component {
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
    // TODO update Redux, nav to home, update db, clear local notifications
    submitEntry({ key, entry });
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
    // TODO: updateRedux, route to home, update db
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
      <View>
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
        <Button onPress={this.submit} />
      </View>
    );
  }
}
