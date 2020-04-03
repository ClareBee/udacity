import React from "react";
import { connect } from "react-redux";
import Question from "./Question";

function QuestionList({ questionIds }) {
  console.log("heya", questionIds);
  return (
    <div>
      {questionIds.map(id => (
        <Question id={id} key={id} />
      ))}
    </div>
  );
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}
export default connect(mapStateToProps)(QuestionList);
