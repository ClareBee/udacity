import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../../actions/shared";

const AnswerForm = ({ question, dispatch, authedUser }) => {
  const [answer, setAnswer] = useState("optionOne");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleAnswerQuestion({ authedUser, qid: question.id, answer }));
  };

  const handleChange = e => {
    console.log("event", e.target.value);
    setAnswer(e.target.value);
  };
  return (
    <div>
      QuestionForm
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="answer"
              value="optionOne"
              checked={answer === "optionOne"}
              onChange={handleChange}
            />
            {question.optionOne.text}
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="answer"
              value="optionTwo"
              checked={answer === "optionTwo"}
              onChange={handleChange}
            />
            {question.optionTwo.text}
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

function mapStateToProps({ authedUser }, { question }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(AnswerForm);
