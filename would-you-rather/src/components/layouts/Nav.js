import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authedUser";
import { Button, NavBar } from "./Styled";

function Nav({ dispatch, authedUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogout(authedUser));
  };

  return (
    <NavBar>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
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
              <span>
                <h3>Hello, {authedUser}!</h3>
              </span>
              <form onSubmit={handleSubmit}>
                <Button type="submit">Logout</Button>
              </form>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
      </ul>
    </NavBar>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
