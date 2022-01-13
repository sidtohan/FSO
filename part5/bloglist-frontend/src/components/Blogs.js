import Blog from "./Blog";

const Blogs = ({ blogs, setBlogs, user, onClick }) => {
  blogs.sort((b1, b2) => b2.likes - b1.likes);
  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.username} is logged in <button onClick={onClick}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogList={blogs} setBlogs={setBlogs} />
      ))}
    </>
  );
};

export default Blogs;
