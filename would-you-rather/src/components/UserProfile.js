import React from "react";
import { connect } from "react-redux";

function UserProfile({ user }) {
  console.log("user", user);
  const { id, name, avatarURL, questions, answers } = user;
  const numOfAnswers = Object.keys(answers).length;
  return (
    <div>
      <img src={avatarURL} alt={`avatar of ${name}`} width="100" />
      User profile: {name}
      <span>Questions Asked: {questions.length}</span>
      <span>Questions Answered: {numOfAnswers} </span>
      <span>{questions.length + numOfAnswers}</span>
    </div>
  );
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user
  };
}
export default connect(mapStateToProps)(UserProfile);
