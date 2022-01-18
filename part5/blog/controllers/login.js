const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!(body.username && body.password)) {
    return response.status(401).json({ error: "missing username or password" });
  }
  const user = await User.findOne({ username: body.username });
  const decision = await bcrypt.compare(body.password, user.passwordHash);

  if (!decision)
    return response.status(401).json({ error: "invalid password" });

  const objForSigning = {
    username: body.username,
    id: user._id,
  };
  const token = jwt.sign(objForSigning, process.env.SECRET);
  return response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
