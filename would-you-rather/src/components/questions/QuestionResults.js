import React from "react";

function QuestionResults({ question }) {
  return (
    <div>
      <div>Asked by {question.author}</div>
      <div>
        Results:
        <div>Would you rather {question.optionOne.text}?</div>
        <div>Would you rather {question.optionTwo.text}</div>
      </div>
    </div>
  );
}

export default QuestionResults;
