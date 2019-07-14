import blogService from '../services/blogs';

export const BlogActionTypes = {
  CREATE: 'CREATE_BLOG',
  LIKE: 'LIKE_BLOG',
  REMOVE: 'REMOVE_BLOG',
  INITIALIZE: 'INIT_BLOGS',
  COMMENT: 'COMMENT_ON_BLOG',
};

const likeBlogAtId = (blogs, id) => {
  const blogToLike = blogs.find(blog => blog.id === id);
  const newBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
  return blogs.map(blog => (blog.id === newBlog.id ? newBlog : blog));
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case BlogActionTypes.LIKE:
      return likeBlogAtId(state, action.data.id);
    case BlogActionTypes.REMOVE:
      return state.filter(blog => blog.id !== action.data.id);
    case BlogActionTypes.CREATE:
      return [...state, action.data];
    case BlogActionTypes.INITIALIZE:
      return action.data;
    case BlogActionTypes.COMMENT:
      const updatedBlog = action.data;
      return state.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog));
    default:
      return state;
  }
};

export const commentOnBlog = (blog, comment) => async (dispatch) => {
  const responseData = await blogService.commentOnBlog(blog, comment);

  const commentData = {
    ...responseData,
  };

  delete commentData.blog;

  console.log(responseData);
  dispatch({
    type: BlogActionTypes.COMMENT,
    data: {
      ...blog,
      comments: blog.comments.concat(commentData),
    },
  });
};

export const createBlog = data => async (dispatch) => {
  await blogService.createBlog(data);
  dispatch({
    type: BlogActionTypes.CREATE,
    data,
  });
};


export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: BlogActionTypes.INITIALIZE,
    data: blogs,
  });
};

export const likeBlog = blog => async (dispatch) => {
  await blogService.likeBlog(blog);
  dispatch({
    type: BlogActionTypes.LIKE,
    data: {
      id: blog.id,
    },
  });
};

export const removeBlog = blog => async (dispatch) => {
  await removeBlog(blog);
  dispatch({
    type: BlogActionTypes.REMOVE,
    data: {
      id: blog.id,
    },
  });
};

export default blogReducer;
