import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const QuestionCard = styled.div`
  background: ${(props) => props.theme.whiteColor};
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 3px;
`;
function Question({ question, author }) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;
  return (
    <QuestionCard>
      <img src={avatarURL} alt={`Avatar of ${name}`} width="100" />
      <div>
        <span>{name} asks:</span>
        <div>{timestamp}</div>
        <div>Would you rather?</div>
        <div>
          {optionOne.text} or {optionTwo.text}?
        </div>
        <Link to={`/questions/${id}`}>View Poll</Link>
      </div>
    </QuestionCard>
  );
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    authedUser,
    question,
    author,
  };
}
export default withRouter(connect(mapStateToProps)(Question));
