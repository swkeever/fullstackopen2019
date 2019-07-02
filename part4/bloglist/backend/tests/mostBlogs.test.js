const listHelper = require('../utils/list_helper');
const blogs = require('./mock/blogs');

describe('most blogs', () => {
  test('check all blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    expect(result).toEqual(expected);
  });
});
