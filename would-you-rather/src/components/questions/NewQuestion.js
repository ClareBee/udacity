import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";

function NewQuestion({ dispatch, authedUser }) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
  };

  // TODO: refactor to be generic and use in other form too
  const handleOptionOne = e => {
    setOptionOneText(e.target.value);
  };

  const handleOptionTwo = e => {
    setOptionTwoText(e.target.value);
  };

  const missingValues = () => {
    return optionOneText === "" || optionTwoText === "";
  };

  if (!authedUser) {
    console.log("should be here");
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { message: "You must be logged in to make a new poll" }
        }}
      />
    );
  }

  return (
    <div>
      <h3>New Question</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="optionOne"
          id="optionOne"
          value={optionOneText}
          onChange={handleOptionOne}
        />
        <input
          type="text"
          name="optionTwo"
          id="optionTwo"
          value={optionTwoText}
          onChange={handleOptionTwo}
        />
        <button type="submit">Add New Question</button>
      </form>
    </div>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
