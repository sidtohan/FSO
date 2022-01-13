import React, { useState } from "react";
const CreateNew = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      await createBlog({
        author,
        title,
        url,
      });
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {}
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title{" "}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author{" "}
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />{" "}
        <br />
        url{" "}
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />{" "}
        <br />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNew;
