import Blog from "./Blog";

const Blogs = ({ blogs, user, onClick }) => {
  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.username} is logged in <button onClick={onClick}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
