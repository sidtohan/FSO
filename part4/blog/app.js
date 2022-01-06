require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected successfully"))
  .catch((err) => logger.error(err));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
