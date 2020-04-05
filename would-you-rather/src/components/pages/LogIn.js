import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/authedUser";
import { Redirect } from "react-router-dom";

function LogIn({ dispatch, authedUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

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

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(LogIn);
