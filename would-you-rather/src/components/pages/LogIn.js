import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/shared";
import { Redirect } from "react-router-dom";

function LogIn({ dispatch, authedUser, location, errors }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (authedUser) {
      return <Redirect to="/" />;
    }
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
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const missingValues = () => {
    return password === "" || email === "";
  };
  console.log(missingValues);

  if (authedUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      Login
      <div>{message || errors}</div>
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
    </div>
  );
}

function mapStateToProps({ authedUser, errors }) {
  return {
    authedUser,
    errors
  };
}

export default connect(mapStateToProps)(LogIn);
