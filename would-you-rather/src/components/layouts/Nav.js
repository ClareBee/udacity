import React from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to="/add">New Poll</NavLink>
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
            <NavLink to="/login">Login</NavLink>
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
