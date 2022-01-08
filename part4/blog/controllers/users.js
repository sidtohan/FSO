const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  });
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const body = request.body;
  const password = body.password;
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be atleast 3 characters" });
  }
  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const createdUser = await newUser.save();
  response.status(201).json(createdUser);
});

module.exports = userRouter;
