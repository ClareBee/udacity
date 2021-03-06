import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleLogin } from "../../actions/shared";
import { Redirect } from "react-router-dom";
import Page from "../layouts/Page";
import {
  Button,
  StyledForm,
  FormControl,
  HeadingOne,
  Error,
} from "../layouts/Styled";

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
      <StyledForm onSubmit={handleSubmit}>
        <FormControl>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button type="submit" disabled={missingValues()}>
          Log In
        </Button>
      </StyledForm>
    </Page>
  );
}

function mapStateToProps({ authedUser, errors }) {
  return {
    authedUser,
    errors,
  };
}

LogIn.propTypes = {
  authedUser: PropTypes.string,
  errors: PropTypes.string,
};

export default connect(mapStateToProps)(LogIn);
