import React from "react";
import { useParams } from "react-router-dom";
function Question() {
  let { questionId } = useParams();
  return <h3>Requested question ID: {questionId}</h3>;
}

export default Question;
