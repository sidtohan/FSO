const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let blog of blogs) {
    likes += blog.likes;
  }
  return likes;
};

const favouriteBlog = (blogs) => {
  let ans = {
    title: "none",
    likes: 0,
  };
  for (let blog of blogs) {
    if (blog.likes > ans.likes) {
      ans = { author: blog.author, title: blog.title, likes: blog.likes };
    }
  }
  return ans;
};

const mostBlogs = (blogs) => {
  const blogByAuthor = _.groupBy(blogs, (blog) => blog.author);
  let maxAuthor;
  let maxCount = 0;
  for (let author of Object.keys(blogByAuthor)) {
    if (blogByAuthor[author].length > maxCount) {
      maxAuthor = author;
      maxCount = blogByAuthor[author].length;
    }
  }
  return { author: maxAuthor, count: maxCount };
};

const mostLikes = (blogs) => {
  const likesOfAuthor = _.groupBy(blogs, (blog) => blog.author);
  let maxLikes = 0;
  let maxAuthor;

  for (let author of Object.keys(likesOfAuthor)) {
    const likes = likesOfAuthor[author].reduce(
      (sum, blog) => sum + blog.likes,
      0
    );
    if (likes > maxLikes) {
      maxLikes = likes;
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, likes: maxLikes };
};
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
