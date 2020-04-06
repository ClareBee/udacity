import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Page from "../layouts/Page";
import AnswerForm from "../questions/AnswerForm";
import QuestionResults from "../questions/QuestionResults";
function QuestionPage({ question, isAnswered, authedUser }) {
  if (isAnswered) {
    return (
      <Page>
        <QuestionResults question={question} />
      </Page>
    );
  }
  if (!authedUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { message: "You must be logged in to reply to a poll" },
        }}
      />
    );
  }
  return (
    <Page>
      <AnswerForm question={question} />
    </Page>
  );
}

function mapStateToProps({ questions, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const isAnswered =
    question.optionOne.votes.length !== 0 ||
    question.optionTwo.votes.length !== 0;
  return {
    question,
    isAnswered,
    authedUser,
  };
}
export default connect(mapStateToProps)(QuestionPage);
