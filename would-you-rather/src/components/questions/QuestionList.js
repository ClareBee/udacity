import React from "react";
import PropTypes from "prop-types";

import Question from "./Question";
import { Questions } from "../layouts/Styled";

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

QuestionList.propTypes = {
  questionIds: PropTypes.array,
};

export default QuestionList;
