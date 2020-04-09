import React, { Component } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";

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
  render() {
    return <View>{getMetricMetaInfo("bike").getIcon()}</View>;
  }
}
