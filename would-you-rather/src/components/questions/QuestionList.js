import React from "react";
import styled from "styled-components";
import Question from "./Question";

const Questions = styled.div`
  padding: 2rem 1rem 1rem;
`;

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
