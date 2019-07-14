const blogs = [
  {
    title: 'Blog 1',
    likes: 1,
    author: 'Author 1',
    url: 'https://www.blog1.com',
    user:
    {
      username: 'username1',
      name: 'Name 1',
      id: 'u1',

    },
    id: 'b1',
  },
  {
    title: 'Blog 2',
    likes: 2,
    author: 'Author 2',
    url: 'https://www.blog2.com',
    user:
    {
      username: 'username2',
      name: 'Name 2',
      id: 'u2',

    },
    id: 'b2',
  },
  {
    title: 'Blog 3',
    likes: 3,
    author: 'Author 3',
    url: 'https://www.blog3.com',
    user:
    {
      username: 'username3',
      name: 'Name 3',
      id: 'u3',

    },
    id: 'b3',
  },
];

const getAll = () => Promise.resolve(blogs);

export default {
  getAll,
};
