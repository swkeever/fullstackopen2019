import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const title = 'Blog Title';
const author = 'Sam Simpson';
const likes = 8;
const blog = {
  title,
  likes,
  author,
};

describe('<SimpleBlog />', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();

    component = render(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />,
    );
  });

  test('renders title, author, and amounts of likes for blog post', () => {
    component.getByText(title, { exact: false });
    component.getByText(author, { exact: false });
    component.getByText(String(likes), { exact: false });
  });

  test('when like button is pressed twice, the event handler is called twice', () => {
    const button = component.getByText('like');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
