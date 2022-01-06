const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) return response.status(400).end();
  if (!body.likes) body.likes = 0;
  const blog = new Blog(body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newLikes = request.body.likes;
  const newTitle = request.body.title;
  const newAuthor = request.body.author;
  const newUrl = request.body.url;

  const toBeChanged = {
    likes: newLikes,
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, toBeChanged, {
    new: true,
  });
  // not returning 204 here to ensure i can get the updated blog
  response.json(updatedBlog);
});
module.exports = blogRouter;
