import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { handleLogout } from "../../actions/authedUser";

const NavBar = styled.nav`
  border: 2px solid ${(props) => props.theme.secondary};
  border-radius: 3px;
  background: ${(props) => props.theme.main};

  ul {
    list-style: none;
    padding-inline-start: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;
  }
  li {
    margin: 1rem 2.5rem;
  }
  a {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 3px;
    color: ${(props) => props.theme.whiteColor};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    border: 1px solid ${(props) => props.theme.background};
  }
`;
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
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
