import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Results = styled.div`
  background: ${(props) => props.theme.whiteColor};
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 3px;
`;

function QuestionResults({ question, author }) {
  const { name, avatarURL } = author;
  const image = require(`../../assets/${avatarURL}`);
  const { optionOne, optionTwo } = question;

  const logError = (e) => {
    console.log("erroring", e);
  };
  return (
    <Results>
      <img
        src={image}
        alt={`Avatar of ${name}`}
        width="100"
        onError={logError}
      />
      <div>Asked by {name}</div>
      <div>
        Results:
        <div>Would you rather {optionOne.text}?</div>
        <div>Would you rather {optionTwo.text}</div>
      </div>
    </Results>
  );
}

function mapStateToProps({ users }, props) {
  const author = users[props.question.author];
  return {
    users,
    author,
  };
}

export default connect(mapStateToProps)(QuestionResults);
