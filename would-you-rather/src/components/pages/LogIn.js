import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/shared";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Page from "../layouts/Page";

const Error = styled.div`
  padding: 1.5rem 0rem;
  width: 100%;
  color: ${(props) => props.theme.errorColor};
  font-weight: bold;
  font-size: 1.25rem;
`;
const HeadingOne = styled.h1`
  font-weight: bold;
  letter-spacing: 1.5px;
`;

function LogIn({ dispatch, authedUser, location, errors }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    // override previous uncleared errors on route change
    setMessage(null);

    // capture message from any redirects from protected routes
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }

    // clear error notification after 3 seconds
    const errorMsg = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(errorMsg);
  }, [location.state, authedUser]);

  // TODO refactor into generic
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const missingValues = () => {
    return password === "" || email === "";
  };

  if (authedUser) {
    return <Redirect to="/" />;
  }
  return (
    <Page>
      <HeadingOne>Login</HeadingOne>
      <Error>{message || errors}</Error>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" disabled={missingValues()}>
          Log In
        </button>
      </form>
    </Page>
  );
}

function mapStateToProps({ authedUser, errors }) {
  return {
    authedUser,
    errors,
  };
}

export default connect(mapStateToProps)(LogIn);
