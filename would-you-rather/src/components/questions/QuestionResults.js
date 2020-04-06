import React from "react";
import styled from "styled-components";

const Results = styled.div`
  background: ${(props) => props.theme.whiteColor};
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 3px;
`;

function QuestionResults({ question }) {
  return (
    <Results>
      <div>Asked by {question.author}</div>
      <div>
        Results:
        <div>Would you rather {question.optionOne.text}?</div>
        <div>Would you rather {question.optionTwo.text}</div>
      </div>
    </Results>
  );
}

export default QuestionResults;
