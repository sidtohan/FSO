import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogList, updateLikes }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const checkUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return false;
    return loggedInUser.username === blog.user.username;
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return;
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogList.filter((bl) => bl.id !== blog.id));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };
  return (
    <>
      {viewDetails === false ? (
        <div style={blogStyle} className="blog">
          <span className="blog-title">{blog.title} </span> :{" "}
          <span className="blog-author"> {blog.author}</span>
          <button onClick={toggleDetails}>view</button>
        </div>
      ) : (
        <div style={blogStyle} className="blog">
          <span className="blog-title">{blog.title} </span> :{" "}
          <span className="blog-author"> {blog.author}</span>
          <button onClick={toggleDetails}>hide</button>
          <br></br>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes: {blog.likes} <button onClick={updateLikes}>like</button>{" "}
            <br />
          </p>
          <p className="blog-username">{blog.user.username}</p>
          {checkUser() === true ? (
            <button onClick={deleteBlog}>remove</button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Blog;
