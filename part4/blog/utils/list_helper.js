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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
