require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected successfully"))
  .catch((err) => logger.error(err));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.getToken);
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  console.log("Running in test mode");
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
