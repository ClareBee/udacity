import React from "react";
import { connect } from "react-redux";
import QuestionForm from "../questions/QuestionForm";
import QuestionResults from "../questions/QuestionResults";
function QuestionPage({ question, isAnswered }) {
  if (isAnswered) {
    return <QuestionResults question={question} />;
  }
  return <QuestionForm question={question} />;
}

function mapStateToProps({ questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const isAnswered =
    question.optionOne.votes.length !== 0 ||
    question.optionTwo.votes.length !== 0;
  return {
    question,
    isAnswered
  };
}
export default connect(mapStateToProps)(QuestionPage);
