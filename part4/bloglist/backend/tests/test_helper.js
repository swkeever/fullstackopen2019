const Blog = require('../models/blog');

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const removeIds = (blogs) => {
  const blogsWithoutIds = blogs.map((blog) => {
    const withoutId = { ...blog };
    delete withoutId.id;
    return withoutId;
  });

  return blogsWithoutIds;
};


module.exports = {
  blogsInDB,
  removeIds,
};
