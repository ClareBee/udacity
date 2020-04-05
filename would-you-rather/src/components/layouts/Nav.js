import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authedUser";

function Nav({ dispatch, authedUser }) {
  const handleSubmit = e => {
    e.preventDefault();
    //dispatch logout action and redirect to signin page
    dispatch(handleLogout(authedUser));
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        <li>
          {authedUser ? (
            <>
              <span>{authedUser}</span>
              <form onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
              </form>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);
