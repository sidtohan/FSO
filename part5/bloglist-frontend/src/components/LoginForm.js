import React from "react";
import propTypes from "prop-types";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        username{" "}
        <input
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          id="username"
        />
        <br />
        password{" "}
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          id="password"
        />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  setUsername: propTypes.func.isRequired,
  setPassword: propTypes.func.isRequired,
  handleLogin: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
};
export default LoginForm;
