const listHelper = require('../utils/list_helper');
const blogs = require('./mock/blogs');

describe('total likes', () => {
  test('number of likes when blogs.length === 1', () => {
    const sizeOneArr = blogs.slice(0, 1);
    const result = listHelper.totalLikes(sizeOneArr);
    expect(result).toBe(blogs[0].likes);
  });

  test('mock blog list has correct sum of likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('where sum of likes is 0', () => {
    const noLikes = blogs.slice(-2, -1);
    const result = listHelper.totalLikes(noLikes);
    expect(result).toBe(0);
  });
});
