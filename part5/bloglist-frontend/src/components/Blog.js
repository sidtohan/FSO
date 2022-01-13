import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
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
          likes: {blog.likes} <button>like</button> <br />
          {blog.user.username}
          <br />
        </div>
      )}
    </>
  );
};

export default Blog;
