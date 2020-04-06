import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import QuestionList from "../questions/QuestionList";
import Page from "../layouts/Page";

const HeadingOne = styled.h1`
  font-weight: bold;
  letter-spacing: 1.5px;
`;

const QuestionContainer = styled.div`
  padding: 1rem 2.5rem;
`;

const Tab = styled.div`
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  border: 3px solid ${(props) => props.theme.main};
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

function Homepage({ answered, unanswered, errors }) {
  const [activeTab, setActiveTab] = useState("unanswered");

  const handleTabChange = (_e, tabType) => {
    setActiveTab(tabType);
  };
  return (
    <Page>
      <HeadingOne>Questions</HeadingOne>
      {errors && <p>{errors}</p>}
      {!errors && (
        <QuestionContainer>
          <div>
            <Tab
              onClick={(e) => handleTabChange(e, "unanswered")}
              className={
                activeTab === "unanswered" ? "tab active" : "tab inactive"
              }
            >
              Unanswered
            </Tab>
            <Tab
              onClick={(e) => handleTabChange(e, "answered")}
              className={
                activeTab === "answered" ? "tab active" : "tab inactive"
              }
            >
              Answered
            </Tab>
          </div>
          {activeTab === "unanswered" ? (
            <QuestionList questionIds={unanswered} />
          ) : (
            <QuestionList questionIds={answered} />
          )}
        </QuestionContainer>
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
    .map((question) => {
      if (
        questions[question]["optionOne"]["votes"].length !== 0 ||
        questions[question]["optionTwo"]["votes"].length !== 0
      ) {
        return question;
      }
      return null;
    })
    .filter((questionId) => !!questionId);
  const unanswered = sortedQuestionKeys.filter((questionKey) => {
    if (answered.includes(questionKey)) return null;
    return questionKey;
  });
  return {
    answered,
    unanswered,
    errors,
  };
}
export default connect(mapStateToProps)(Homepage);
