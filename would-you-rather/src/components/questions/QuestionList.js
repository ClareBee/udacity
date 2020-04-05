import React from "react";
import Question from "./Question";

function QuestionList({ questionIds }) {
  return (
    <div>
      {questionIds.map(id => (
        <Question id={id} key={id} />
      ))}
    </div>
  );
}

export default QuestionList;
