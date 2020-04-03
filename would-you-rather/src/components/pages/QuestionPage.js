import React from "react";
import Question from "../questions/Question";
import { useParams } from "react-router-dom";

function QuestionPage() {
  let { id } = useParams();
  console.log("questionId", id);
  console.log("whaddup");
  return <div>QuestionPage</div>;
}

export default QuestionPage;
