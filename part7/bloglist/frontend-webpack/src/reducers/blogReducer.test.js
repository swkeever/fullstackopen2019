import deepFreeze from 'deep-freeze';
import blogReducer, {
  BlogActionTypes,
} from './blogReducer';

describe('blogReducer', () => {
  const mockBlog = {
    likes: 1,
    title: 'mock',
    author: 'mocker',
    url: 'mock.com',
    user: {
      name: 'sean',
      username: 'swk',
      id: '2',
    },
    id: '1',
  };

  test('able to create new blog', () => {
    const state = [];
    const action = {
      type: BlogActionTypes.CREATE,
      data: { ...mockBlog },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState.length).toBe(1);
    expect(newState).toContainEqual(action.data);
  });

  test('able to like blogs', () => {
    const state = [{ ...mockBlog }];
    const action = {
      type: BlogActionTypes.LIKE,
      data: { id: '1' },
    };
    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState.length).toBe(1);
    expect(newState).toContainEqual({ ...mockBlog, likes: mockBlog.likes + 1 });
  });

  test('able to remove blogs', () => {
    const state = [{ ...mockBlog }];
    const action = {
      type: BlogActionTypes.REMOVE,
      data: { id: '1' },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState.length).toBe(0);
  });
});
