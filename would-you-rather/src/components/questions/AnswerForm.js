import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../../actions/shared";
import Page from "../layouts/Page";
import { StyledForm, Button, FormControl, HeadingOne } from "../layouts/Styled";

const AnswerForm = ({ question, author, dispatch, authedUser }) => {
  const [answer, setAnswer] = useState("optionOne");
  const image = require(`../../assets/${author.avatarURL}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAnswerQuestion({ authedUser, qid: question.id, answer }));
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  return (
    <Page>
      <HeadingOne>Would You Rather...?</HeadingOne>
      <img src={image} alt={`Avatar of ${author.name}`} width="100" />
      <StyledForm onSubmit={handleSubmit}>
        <FormControl>
          <label>...{question.optionOne.text}?</label>
          <input
            type="radio"
            name="answer"
            value="optionOne"
            checked={answer === "optionOne"}
            onChange={handleChange}
          />
        </FormControl>
        <p>OR</p>
        <FormControl className="form-check">
          <label>...{question.optionTwo.text}?</label>
          <input
            type="radio"
            name="answer"
            value="optionTwo"
            checked={answer === "optionTwo"}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </StyledForm>
    </Page>
  );
};

function mapStateToProps({ authedUser, users }, { question }) {
  const author = users[question.author];
  return {
    authedUser,
    author,
  };
}
export default connect(mapStateToProps)(AnswerForm);
