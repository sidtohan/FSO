const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");
const supertest = require("supertest");
const helper = require("../utils/api_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const PromiseArr = blogs.map((blog) => blog.save());
  await Promise.all(PromiseArr);
});

describe("blogs returned", () => {
  test("in json", async () => {
    const blogs = await api
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
  test("posting a blog works", async () => {
    const newBlog = {
      title: "pablo picasso is alive",
      author: "garry",
      url: "404notfound.com",
      likes: 69,
    };
    await api
      .post("/api/blogs")
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
    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    expect(response.body.likes).toBe(0);
  });

  test("missing url or title means failure", async () => {
    const newBlog = {
      likes: 499,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deleting blogs work", () => {
  test("if id is valid and returns 204", async () => {
    const id = helper.initialBlogs[0]._id;
    await api.delete(`/api/blogs/${id}`).expect(204);
    const updatedBlogs = await helper.blogsInDb();
    expect(updatedBlogs.length).toBe(helper.initialBlogs.length - 1);
  });
});

describe("updating content of blog", () => {
  test("changing everything using valid id", async () => {
    const id = helper.initialBlogs[0]._id;
    const newBlog = {
      title: "gonna get deleted",
      url: "goog.co",
      author: "popy",
      likes: 14,
    };
    const updatedBlog = await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200);
    expect(updatedBlog.body).toEqual({ ...newBlog, id });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
