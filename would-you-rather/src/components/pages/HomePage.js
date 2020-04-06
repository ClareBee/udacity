import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import QuestionList from "../questions/QuestionList";
import Page from "../layouts/Page";
import { HeadingOne, Tab, QuestionContainer } from "../layouts/Styled";

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

Homepage.propTypes = {
  answered: PropTypes.array,
  unanswered: PropTypes.array,
  errors: PropTypes.string,
};
export default connect(mapStateToProps)(Homepage);
