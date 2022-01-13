const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");

const app = require("../app");
const supertest = require("supertest");
const helper = require("../utils/api_helper");

const api = supertest(app);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const PromiseArr = blogs.map((blog) => blog.save());
  await Promise.all(PromiseArr);
});

describe("blogs returned", () => {
  test("in json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);
  test("with correct size", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body.length).toBe(helper.initialBlogs.length);
  }, 10000);
});

test("id exists", async () => {
  const blogs = await helper.blogsInDb();
  for (let blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

describe("posting blogs", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("topsecret", 10);
    const newUser = new User({
      username: "mr.admin",
      name: "xxx",
      passwordHash,
      blogs: [],
    });
    const finalUser = await newUser.save();
    const toBeSigned = {
      username: finalUser.username,
      id: finalUser._id,
    };
    token = jwt.sign(toBeSigned, process.env.SECRET);
  });

  test("posting a blog works", async () => {
    const newBlog = {
      title: "pablo picasso is alive",
      url: "404notfound.com",
      likes: 69,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedBlogs = await helper.blogsInDb();
    expect(updatedBlogs.length).toBe(helper.initialBlogs.length + 1);
  }, 10000);

  test("missing likes means 0 default", async () => {
    const newBlog = {
      title: "pablo picasso is ded",
      author: "nanny",
      url: "why.com",
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    expect(response.body.likes).toBe(0);
  });

  test("missing url or title means failure", async () => {
    const newBlog = {
      likes: 499,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
  test("no token = no saving :D", async () => {
    const newBlog = {
      title: "pablo picasso is ded",
      author: "nanny",
      url: "why.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer xxxillegalguy")
      .expect(401);
  });
});

describe("deleting blogs work", () => {
  let blogid;
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const passwordHash = await bcrypt.hash("topsecret", 10);
    const newUser = new User({
      username: "mr.admin",
      name: "xxx",
      passwordHash,
      blogs: [],
    });
    const savedUser = await newUser.save();
    const toBeSigned = {
      username: savedUser.username,
      id: savedUser._id,
    };
    token = jwt.sign(toBeSigned, process.env.SECRET);

    const newBlog = new Blog({
      ...helper.initialBlogs[0],
      user: savedUser._id,
    });
    const savedBlog = await newBlog.save();
    blogid = savedBlog._id.toString();
  });

  test("if id is valid and returns 204", async () => {
    const result = await api
      .delete(`/api/blogs/${blogid}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const updatedBlogs = await helper.blogsInDb();
    expect(updatedBlogs.length).toBe(0);
  });
});

describe("updating content of blog", () => {
  let token;
  let blogid;
  let userid;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const passwordHash = await bcrypt.hash("topsecret", 10);
    const newUser = new User({
      username: "mr.admin",
      name: "xxx",
      passwordHash,
      blogs: [],
    });
    const savedUser = await newUser.save();
    const toBeSigned = {
      username: savedUser.username,
      id: savedUser._id,
    };
    userid = savedUser._id.toString();
    token = jwt.sign(toBeSigned, process.env.SECRET);

    const newBlog = new Blog({
      ...helper.initialBlogs[0],
      user: savedUser._id,
    });
    const savedBlog = await newBlog.save();
    blogid = savedBlog._id.toString();
  });

  test("changing everything using valid id", async () => {
    const newBlog = {
      title: "gonna get changed",
      url: "goog.co",
      likes: 14,
      user: userid,
    };
    const updatedBlog = await api
      .put(`/api/blogs/${blogid}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200);

    expect(updatedBlog.body).toEqual({
      ...newBlog,
      author: "mr.admin",
      id: blogid,
      user: {
        blogs: [],
        id: userid,
        name: "xxx",
        username: "mr.admin",
      },
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
