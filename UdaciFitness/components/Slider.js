import React from "react";
import { View, Text, Slider as NativeSlider } from "react-native";

function Slider({ max, unit, step, value, onChange }) {
  return (
    <View>
      <NativeSlider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}

export default Slider;
