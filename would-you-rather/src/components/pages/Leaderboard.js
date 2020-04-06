import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Page from "../layouts/Page";
import UserProfile from "../UserProfile";

function Leaderboard({ userIds, authedUser }) {
  if (!authedUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { message: "You must be logged in to see the leaderboard" },
        }}
      />
    );
  }
  if (userIds.length === 0) return <div>No users</div>;
  return (
    <Page>
      <ul>
        {userIds.map((userId, index) => (
          <UserProfile id={userId} key={userId} rank={index + 1} />
        ))}
      </ul>{" "}
    </Page>
  );
}

function mapStateToProps({ users, authedUser }) {
  const sumUp = (user) => {
    return user.questions.length + Object.keys(user.answers).length;
  };
  return {
    userIds: Object.keys(users).sort(
      (a, b) => sumUp(users[b]) - sumUp(users[a])
    ),
    authedUser,
  };
}
export default connect(mapStateToProps)(Leaderboard);
