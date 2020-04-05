import React from "react";
import Question from "./Question";

function QuestionList({ questionIds }) {
  if (questionIds.length === 0) {
    return <div>Nothing here yet!</div>;
  }
  return (
    <div>
      {questionIds.map(id => (
        <Question id={id} key={id} />
      ))}
    </div>
  );
}

export default QuestionList;
