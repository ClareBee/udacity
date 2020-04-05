import React from "react";
import { connect } from "react-redux";
import QuestionList from "../questions/QuestionList";

function Homepage({ answered, unanswered, errors }) {
  return (
    <div>
      <h2>Questions</h2>
      {errors && <p>{errors}</p>}
      {!errors && (
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
      )}
    </div>
  );
}

function mapStateToProps({ questions, errors }) {
  // TODO: sort by date NB
  const questionKeys = Object.keys(questions);
  const sortedQuestionKeys = questionKeys.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  console.log(sortedQuestionKeys);
  const answered = sortedQuestionKeys
    .map(question => {
      if (
        questions[question]["optionOne"]["votes"].length !== 0 ||
        questions[question]["optionTwo"]["votes"].length !== 0
      ) {
        return question;
      }
      return null;
    })
    .filter(questionId => !!questionId);
  const unanswered = sortedQuestionKeys.filter(questionKey => {
    if (answered.includes(questionKey)) return null;
    return questionKey;
  });
  return {
    answered,
    unanswered,
    errors
  };
}
export default connect(mapStateToProps)(Homepage);
