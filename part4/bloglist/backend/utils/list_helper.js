const _ = require('lodash');

const dummy = blogs => 1;

const totalLikes = (blogs) => {
  const reducer = (acc, cur) => acc + cur.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return {};
  }

  const likes = blogs.map(blog => blog.likes);
  const maxIndex = likes.indexOf(Math.max(...likes));
  const favBlog = blogs[maxIndex];
  const favBlogCopy = JSON.parse(JSON.stringify(favBlog));

  delete favBlogCopy._id;
  delete favBlogCopy.__v;
  delete favBlogCopy.url;

  return favBlogCopy;
};

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, 'author');

  // get max blog count
  const counts = Object.values(authorCount);
  const maxBlogs = Math.max(...counts);

  // get author with max blog count
  const authorCountInverted = _.invert(authorCount);
  const author = authorCountInverted[maxBlogs];

  return { author, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  let maxAuthor;
  let maxLikes = 0;

  const groupByAuthor = _.groupBy(blogs, 'author');
  _.forEach(groupByAuthor, (authorsBlogs, author) => {
    const likes = _.sumBy(authorsBlogs, 'likes');

    if (likes > maxLikes || !maxAuthor) {
      maxLikes = likes;
      maxAuthor = author;
    }
  });

  return { author: maxAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
