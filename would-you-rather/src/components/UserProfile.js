import React from "react";
import { connect } from "react-redux";
import { HeadingOne, HeadingTwo, SectionHeader } from "./layouts/Styled";
function UserProfile({ user, rank }) {
  const { name, avatarURL, questions, answers } = user;
  const image = require(`../assets/${avatarURL}`);

  const numOfAnswers = Object.keys(answers).length;
  return (
    <div>
      <HeadingOne>{rank}</HeadingOne>
      <SectionHeader>
        <img src={image} alt={`avatar of ${name}`} width="100" />
        <div>
          <HeadingTwo>User profile: {name}</HeadingTwo>
          <div>Questions Asked: {questions.length}</div>
          <div>Questions Answered: {numOfAnswers} </div>
        </div>
        <HeadingTwo>Total Score: {questions.length + numOfAnswers}</HeadingTwo>
      </SectionHeader>
    </div>
  );
}

function mapStateToProps({ users }, { id, rank }) {
  const user = users[id];
  return {
    user,
    rank,
  };
}
export default connect(mapStateToProps)(UserProfile);
