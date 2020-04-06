import React from "react";
import Question from "./Question";
import { Questions } from "../layouts/Shared";

function QuestionList({ questionIds }) {
  if (questionIds.length === 0) {
    return <div>Nothing here yet!</div>;
  }
  return (
    <Questions>
      {questionIds.map((id) => (
        <Question id={id} key={id} />
      ))}
    </Questions>
  );
}

export default QuestionList;
