import React, { useEffect, useState } from "react";

function LogIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    // automatic redirect to homepage when logged in check storage
  });

  const handleSubmit = e => {
    e.preventDefault();
    //TODO validate input, authenticate user and redirect to homepage
  };

  // TODO refactor into generic
  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const missingValues = () => {
    return name === "" || email === "";
  };
  console.log(missingValues);

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input name="name" id="name" value={name} onChange={handleNameChange} />
        <input
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" disabled={missingValues()}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogIn;
