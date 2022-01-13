const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUser = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    request.user = null;
  } else {
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }
  next();
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", getUser, async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.url)
    return response.status(400).send({ error: "missing url or title" });
  if (!body.likes) body.likes = 0;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  };

  const blog = new Blog(newBlog);
  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);
  await user.save();

  result.user = user;
  response.status(201).json(result);
});

blogRouter.delete("/:id", getUser, async (request, response) => {
  const id = request.params.id;

  const blogToBeRemoved = await Blog.findById(id);

  if (!blogToBeRemoved) {
    return response.status(400).json({ error: "blog doesn't exist" });
  }
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "missing or invalid token" });
  }
  if (blogToBeRemoved.user.toString() != user._id.toString()) {
    return response
      .status(401)
      .json({ error: "cannot remove a blog created by another user" });
  }

  await blogToBeRemoved.delete();
  user.blogs = user.blogs.filter(
    (blog) => blog.id.toString() !== user.id.toString()
  );
  response.status(204).end();
});

blogRouter.put("/:id", getUser, async (request, response) => {
  const id = request.params.id;
  const newLikes = request.body.likes;
  const newTitle = request.body.title;
  const newAuthor = request.user.username;
  const newUrl = request.body.url;
  const user = request.body.user;

  const toBeChanged = {
    likes: newLikes,
    title: newTitle,
    author: newAuthor,
    user: user.id,
    url: newUrl,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, toBeChanged, {
    new: true,
  });
  // not returning 204 here to ensure i can get the updated blog
  const blogUser = await User.findById(user);
  updatedBlog.user = blogUser;
  response.json(updatedBlog);
});
module.exports = blogRouter;
