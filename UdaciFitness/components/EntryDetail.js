import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import TextButton from "./TextButton";

import { white } from "../utils/colours";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { removeEntry } from "../utils/api";
import { addEntry } from "../actions";

class EntryDetail extends Component {
  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }
  render() {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{ margin: 20 }} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch, { route, navigation }) {
  const { entryId } = route.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => navigation.goBack(),
  };
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
export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
