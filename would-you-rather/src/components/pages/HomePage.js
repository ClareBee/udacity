import React from "react";
import { connect } from "react-redux";
import QuestionList from "../questions/QuestionList";

function Homepage({ answered, unanswered }) {
  return (
    <div>
      <h2>Questions</h2>
      <div>
        <div>
          Unanswered
          <QuestionList questionIds={unanswered} />
        </div>
        <div>
          Answered
          <QuestionList questionIds={answered} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ questions }) {
  const questionKeys = Object.keys(questions);
  const answered = questionKeys
    .map(question => {
      if (
        questions[question]["optionOne"]["votes"].length !== 0 ||
        questions[question]["optionTwo"]["votes"].length !== 0
      ) {
        return question;
      }
    })
    .filter(questionId => questionId !== undefined);
  const unanswered = questionKeys.filter(questionKey => {
    if (answered.includes(questionKey)) return;
    return questionKey;
  });
  return {
    answered,
    unanswered
  };
}
export default connect(mapStateToProps)(Homepage);
