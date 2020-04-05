import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import QuestionList from "../questions/QuestionList";
import Page from "../layouts/Page";

function Homepage({ answered, unanswered, errors }) {
  const [activeTab, setActiveTab] = useState("unanswered");

  const handleTabChange = (_e, tabType) => {
    setActiveTab(tabType);
  };
  return (
    <Page>
      <h2>Questions</h2>
      {errors && <p>{errors}</p>}
      {!errors && (
        <div>
          <div>
            <div onClick={e => handleTabChange(e, "unanswered")}>
              Unanswered
            </div>
            <div onClick={e => handleTabChange(e, "answered")}>Answered</div>
          </div>
          {activeTab === "unanswered" ? (
            <QuestionList questionIds={unanswered} />
          ) : (
            <QuestionList questionIds={answered} />
          )}
        </div>
      )}
    </Page>
  );
}

function mapStateToProps({ questions, errors }) {
  const questionKeys = Object.keys(questions);
  const sortedQuestionKeys = questionKeys.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
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
