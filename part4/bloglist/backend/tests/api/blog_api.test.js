/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const Blog = require('../../models/blog');
const blogs = require('../mock/blogs');
const testHelper = require('../test_helper');

beforeEach(async () => {
  await testHelper.setupUserDB();
  await testHelper.loginAsRoot();

  await Blog.deleteMany({});

  const blogObjects = blogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

const newBlog = {
  title: 'hello world',
  author: 'sally anne',
  url: 'https://www.blogger.com/myblog',
  likes: 3,
};

describe('GET route', () => {
  test('able to get notes in correct format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('able to get right amount of notes', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(blogs.length);
  });

  test('unique identifier property of blog posts is named "id"', async () => {
    const blogsInDB = await testHelper.blogsInDB();
    blogsInDB.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('_id and __v are not included in the response', async () => {
    const blogsInDB = await testHelper.blogsInDB();
    blogsInDB.forEach((blog) => {
      expect(blog._id).not.toBeDefined();
      expect(blog.__v).not.toBeDefined();
    });
  });
});

describe('POST route', () => {
  describe('successful requests', () => {
    test('returns correct header info', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', testHelper.getToken())
        .expect(201)
        .expect('Content-Type', /application\/json/);
    });

    test('database contains new blog', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', testHelper.getToken());

      const blogsInDB = await testHelper.blogsInDB();
      expect(blogsInDB.length).toBe(blogs.length + 1);

      const titles = blogsInDB.map(blog => blog.title);
      expect(titles).toContainEqual(newBlog.title);
    });

    test('blog without likes defaults to 0', async () => {
      const blogWithoutLikes = {
        title: 'no likes',
        author: 'joe barnes',
        url: 'https://www.myspace.com/myblog',
      };

      await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .set('Authorization', testHelper.getToken());

      const blogsInDB = await testHelper.blogsInDB();

      const likes = blogsInDB.map(blog => blog.likes);

      expect(likes).toContain(0);
    });
  });

  describe('post requests that expect 400 Bad Requests', () => {
    test('title is missing', async () => {
      const badBlog = {
        author: 'bad boy',
        url: 'https://mywebsite.com/myblog',
        likes: 2,
      };

      await api
        .post('/api/blogs')
        .send(badBlog)
        .set('Authorization', testHelper.getToken())
        .expect(400);
    });

    test('url is missing', async () => {
      const badBlog = {
        title: 'hello title',
        author: 'mr. no url',
        likes: 0,
      };

      await api
        .post('/api/blogs')
        .send(badBlog)
        .set('Authorization', testHelper.getToken())
        .expect(400);
    });
  });

  describe('delete requests', () => {
    test('able to delete blog', async () => {
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', testHelper.getToken())
        .expect(201);

      const { id } = response.body;
      const blogsAtStart = await testHelper.blogsInDB();

      expect(blogsAtStart.length).toBe(blogs.length + 1);

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', testHelper.getToken())
        .expect(200);

      const blogsAtEnd = await testHelper.blogsInDB();

      expect(blogsAtEnd.length).toBe(blogs.length);

      const titles = blogsAtEnd.map(blog => blog.title);
      expect(titles).not.toContain(newBlog.title);
    });


    test('not able to delete blog that does not belong to you', async () => {
      const blogsAtStart = await testHelper.blogsInDB();
      const blog = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blog.id}`)
        .send(blog)
        .set('Authorization', testHelper.getToken())
        .expect(401);

      const blogsAtEnd = await testHelper.blogsInDB();

      expect(blogsAtStart.length).toBe(blogsAtEnd.length);
    });
  });

  describe('put requests', () => {
    test('able to update information of individual blog post', async () => {
      let blogsInDB = await testHelper.blogsInDB();

      const originalBlog = blogsInDB[0];
      const blog = {
        ...originalBlog,
        likes: originalBlog.likes + 1,
      };

      await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .set('Authorization', testHelper.getToken())
        .expect(200);

      blogsInDB = await testHelper.blogsInDB();

      expect(blogsInDB).toContainEqual(blog);
      expect(blogsInDB).not.toContainEqual(originalBlog);
    });
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});
