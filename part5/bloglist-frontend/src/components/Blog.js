import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };
  const updateLikes = async () => {
    try {
      await blogService.update({
        author: blog.author,
        likes: likes + 1,
        title: blog.title,
        url: blog.url,
        id: blog.id,
        user: blog.user,
      });
      setLikes(likes + 1);
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
          likes: {likes} <button onClick={updateLikes}>like</button> <br />
          {blog.user.username}
          <br />
        </div>
      )}
    </>
  );
};

export default Blog;
