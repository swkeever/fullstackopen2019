const listHelper = require('../utils/list_helper');
const blogs = require('./mock/blogs');

describe('favorite blog', () => {
  test('blog with most likes is returned', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    const actual = listHelper.favoriteBlog(blogs);
    expect(actual).toEqual(expected);
  });

  test('empty blog list returns empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('blog list with one blog will return that blog', () => {
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    };
    const actual = listHelper.favoriteBlog(blogs.slice(0, 1));
    expect(actual).toEqual(expected);
  });
});
