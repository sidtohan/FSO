import React, { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateNew from "./components/CreateNew";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  const blogFormRef = useRef(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (err) {
      setMessage("Invalid credentials");
      setNotifType("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };
  const handleNew = async ({ author, url, title }) => {
    try {
      const blog = await blogService.create({
        author,
        url,
        title,
      });
      setBlogs(blogs.concat(blog));
      setMessage(`a new blog ${title} by ${author} has been added`);
      setNotifType("success");
      setTimeout(() => setMessage(null), 3000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setMessage(error.response.data.error);
      setNotifType("error");
      setTimeout(() => setMessage(null), 3000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };
  useEffect(() => {
    if (user !== null) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const jsonLoggedIn = window.localStorage.getItem("loggedInUser");
    if (jsonLoggedIn) {
      const user = JSON.parse(jsonLoggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {user === null ? (
        <>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <Notification message={message} notifType={notifType} />
        </>
      ) : (
        <>
          <Notification message={message} notifType={notifType} />
          <Blogs
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            onClick={handleLogout}
          />
          <Togglable ref={blogFormRef}>
            <CreateNew createBlog={handleNew} />
          </Togglable>
        </>
      )}
    </div>
  );
};

export default App;
