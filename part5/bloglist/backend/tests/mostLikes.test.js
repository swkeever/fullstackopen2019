const listHelper = require('../utils/list_helper');
const blogs = require('./mock/blogs');

describe('most likes', () => {
  test('most likes gives correct result', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    const actual = listHelper.mostLikes(blogs);
    expect(actual).toEqual(expected);
  });
});
