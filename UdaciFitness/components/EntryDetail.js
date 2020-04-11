import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import { white } from "../utils/colours";

class EntryDetail extends Component {
  render() {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId],
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});
export default connect(mapStateToProps)(EntryDetail);
