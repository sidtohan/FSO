import React from "react";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <>
      <h2>login in to application</h2>
      <form onSubmit={handleLogin}>
        username{" "}
        <input
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <br />
        password{" "}
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
