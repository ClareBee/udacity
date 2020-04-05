import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";

function NewQuestion({ dispatch }) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // send option1 and option2 text in object
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
    // redirect to home page
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

export default connect()(NewQuestion);
