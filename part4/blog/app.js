const blogsRouter = require("./controllers/blogs");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
