import React from "react";
import { connect } from "react-redux";
import UserProfile from "../UserProfile";

function Leaderboard({ userIds }) {
  if (userIds.length === 0) return <div>No users</div>;
  return (
    <div>
      <ul>
        {userIds.map(userId => (
          <UserProfile id={userId} key={userId} />
        ))}
      </ul>{" "}
    </div>
  );
}

function mapStateToProps({ users }) {
  const sumUp = user => {
    return user.questions.length + Object.keys(user.answers).length;
  };
  return {
    userIds: Object.keys(users).sort(
      (a, b) => sumUp(users[b]) - sumUp(users[a])
    )
  };
}
export default connect(mapStateToProps)(Leaderboard);
