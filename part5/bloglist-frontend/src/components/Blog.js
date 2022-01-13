import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogList }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const checkUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
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
  const updateLikes = async () => {
    try {
      const updatedBlog = await blogService.update({
        author: blog.author,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
        id: blog.id,
        user: blog.user,
      });
      setBlogs(blogList.map((bl) => (bl.id === blog.id ? updatedBlog : bl)));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      {viewDetails === false ? (
        <div style={blogStyle}>
          {blog.title} : {blog.author}{" "}
          <button onClick={toggleDetails}>view</button>
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} : {blog.author}{" "}
          <button onClick={toggleDetails}>hide</button>
          <br></br>
          {blog.url} <br />
          likes: {blog.likes} <button onClick={updateLikes}>like</button> <br />
          {blog.user.username}
          <br />
          {checkUser() === true ? (
            <button onClick={deleteBlog}>remove</button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Blog;
