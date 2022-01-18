import Blog from "./Blog";
import React from "react";
import blogService from "../services/blogs";

const Blogs = ({ blogs, setBlogs, user, onClick }) => {
  blogs.sort((b1, b2) => b2.likes - b1.likes);

  const sendLikes = (blog) => {
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
        setBlogs(blogs.map((bl) => (bl.id === blog.id ? updatedBlog : bl)));
      } catch (error) {
        console.log(error.message);
      }
    };
    return updateLikes;
  };

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.username} is logged in <button onClick={onClick}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogList={blogs}
          setBlogs={setBlogs}
          updateLikes={sendLikes(blog)}
        />
      ))}
    </>
  );
};

export default Blogs;
