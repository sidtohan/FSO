const helper = require("../utils/api_helper");
// Dummy
const dummy = require("../utils/list_helper").dummy;

test("dummy returns one", () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});

// Total Likes
const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    expect(totalLikes(blogs)).toBe(0);
  });

  test("when list has only one blog equals to the likes of that", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(totalLikes(blogs)).toBe(blogs[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = helper.initialBlogs;
    const likesSum = blogs.reduce((sum, item) => {
      return sum + item.likes;
    }, 0);
    // set initial value to 0 like this, so it doesnt become undefined for
    // the first element
    expect(totalLikes(blogs)).toBe(likesSum);
  });
});

// Favourite Blog
const favouriteBlog = require("../utils/list_helper").favouriteBlog;
describe("favourite blog", () => {
  test("when list has only one blog is that blog", () => {
    const blogs = [
      {
        title: "Mecha",
        author: "Nohan",
        likes: 4,
      },
    ];
    expect(favouriteBlog(blogs)).toEqual(blogs[0]);
  });

  test("when multiple blogs is correct", () => {
    const blogs = helper.initialBlogs;

    const ans = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    expect(favouriteBlog(blogs)).toEqual(ans);
  });
});

const mostBlogs = require("../utils/list_helper").mostBlogs;
describe("the most blogs", () => {
  test("is correct for single blog", () => {
    const blog = [helper.initialBlogs[0]];
    const ans = mostBlogs(blog);
    expect(ans).toEqual({
      author: helper.initialBlogs[0].author,
      count: 1,
    });
  });
  test("is correct for multiple blogs", () => {
    const blogs = helper.initialBlogs;
    const ans = mostBlogs(blogs);
    expect(ans).toEqual({
      author: "Edsger W. Dijkstra",
      count: 2,
    });
  });
});

const mostLikes = require("../utils/list_helper").mostLikes;
describe("the most liked author", () => {
  test("is correct for single blog", () => {
    const blog = [helper.initialBlogs[0]];
    const ans = mostLikes(blog);
    expect(ans).toEqual({
      author: blog[0].author,
      likes: blog[0].likes,
    });
  });
  test("is correct for multiple blogs", () => {
    const blogs = helper.initialBlogs;
    const ans = mostLikes(blogs);
    expect(ans).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
