import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";
import Page from "../layouts/Page";
import { HeadingOne, Button, StyledForm, FormControl } from "../layouts/Styled";

function NewQuestion({ dispatch, authedUser }) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
    setToHome(true);
  };

  const handleOptionOne = (e) => {
    setOptionOneText(e.target.value);
  };

  const handleOptionTwo = (e) => {
    setOptionTwoText(e.target.value);
  };

  const missingValues = () => {
    return optionOneText === "" || optionTwoText === "";
  };

  if (!authedUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { message: "You must be logged in to make a new poll" },
        }}
      />
    );
  }
  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <HeadingOne>Would You Rather....?</HeadingOne>
      <StyledForm onSubmit={handleSubmit}>
        <FormControl>
          <label>Option One Text: </label>
          <input
            type="text"
            name="optionOne"
            id="optionOne"
            value={optionOneText}
            onChange={handleOptionOne}
          />
        </FormControl>
        <p>OR</p>
        <FormControl>
          <label>Option Two Text: </label>
          <input
            type="text"
            name="optionTwo"
            id="optionTwo"
            value={optionTwoText}
            onChange={handleOptionTwo}
          />
        </FormControl>
        <Button type="submit" disabled={missingValues()}>
          Add New Question
        </Button>
      </StyledForm>
    </Page>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
