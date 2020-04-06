import React from "react";
import { connect } from "react-redux";
import ProgressBar from "../layouts/ProgressBar";
import {
  Results,
  SectionHeader,
  ResultsBody,
  HeadingOne,
  HeadingTwo,
  Name,
} from "../layouts/Styled";

function QuestionResults({ question, author, authedUser }) {
  const { name, avatarURL } = author;
  const image = require(`../../assets/${avatarURL}`);
  const { optionOne, optionTwo } = question;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const total = optionOneVotes + optionTwoVotes;

  const percentage = (chosen, total) => {
    const percent = (chosen / total) * 100;
    return percent.toFixed(2);
  };
  const optionOneChosen = optionOne.votes.includes(authedUser);
  const optionTwoChosen = optionTwo.votes.includes(authedUser);

  return (
    <Results>
      <SectionHeader>
        <img src={image} alt={`Avatar of ${name}`} width="100" />
        <Name>Asked by {name}</Name>
      </SectionHeader>
      <ResultsBody>
        <HeadingOne>Would You Rather...?</HeadingOne>
        <div className={optionOneChosen ? "votes selected" : null}>
          {optionOneChosen && <div>You voted for this!</div>}
          <HeadingTwo>...{optionOne.text}?</HeadingTwo>
          <div>
            <strong>Votes:</strong> {optionOneVotes}
          </div>
          <ProgressBar percent={percentage(optionOneVotes, total)} />
        </div>
        <p>OR</p>
        <div className={optionTwoChosen ? "votes selected" : null}>
          {optionTwoChosen && <div>You voted for this!</div>}
          <HeadingTwo>...{optionTwo.text}?</HeadingTwo>
          <div>
            <strong>Votes: </strong>
            {optionTwoVotes}
          </div>
          <ProgressBar percent={percentage(optionTwoVotes, total)} />
        </div>
      </ResultsBody>
    </Results>
  );
}

function mapStateToProps({ users, authedUser }, { question }) {
  const author = users[question.author];
  return {
    users,
    author,
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionResults);
