import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { handleLogout } from "../../actions/authedUser";

const NavBar = styled.nav`
  border: 2px solid ${props => props.theme.secondary};
  color: ${props => props.theme.fontColor};
  ul {
    list-style: none;
    padding-inline-start: 0;
    display: flex;
    justify-content: space-between;
  }
  li {
    margin: 1rem 2.5rem;
  }
`;
function Nav({ dispatch, authedUser }) {
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleLogout(authedUser));
  };

  return (
    <NavBar>
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
    </NavBar>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);
