import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

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
  if (question === undefined) {
    return (
      <Redirect
        to={{
          pathname: "/404",
          state: { message: "That poll does not exist" },
        }}
      />
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
  // guard against questions that don't exist
  if (question === undefined) {
    return {
      question,
    };
  }
  const isAnswered =
    question.optionOne.votes.length !== 0 ||
    question.optionTwo.votes.length !== 0;

  return {
    question,
    isAnswered,
    authedUser,
  };
}

QuestionPage.propTypes = {
  question: PropTypes.object,
  isAnswered: PropTypes.bool,
  authedUser: PropTypes.string,
};
export default connect(mapStateToProps)(QuestionPage);
