import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { QuestionCard, HighlightedName } from "../layouts/Styled";
function Question({ question, author }) {
  const { id, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;
  const image = require(`../../assets/${avatarURL}`);

  return (
    <QuestionCard>
      <img src={image} alt={`Avatar of ${name}`} width="100" />
      <div>
        <span>
          <HighlightedName>{name}</HighlightedName> asks:
        </span>
        <div>Would you rather...?</div>
        <div>
          ...{optionOne.text} or {optionTwo.text}?
        </div>
        <Link to={`/questions/${id}`}>View Poll</Link>
      </div>
    </QuestionCard>
  );
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    question,
    author,
  };
}

Question.propTypes = {
  question: PropTypes.object,
  author: PropTypes.object,
};
export default withRouter(connect(mapStateToProps)(Question));
