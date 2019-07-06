import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const title = 'Blog Title';
const author = 'Sam Simpson';
const likes = 8;
const url = 'https://reactjs.org/blog/38473895';
const user = {
  token: '23948723985798235',
  name: 'Joe Johnson',
  username: 'tester123',
  id: '234987239478234',
}
const id = '23957823985723523';

const blog = {
  title,
  likes,
  author,
  url,
  user,
  id,
};

const dummyFunction = () => true;

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        setNotification={dummyFunction}
      />,
    );
  });

  test('by default only name and author is shown', () => {
    component.getByText(title, { exact: false });
    component.getByText(author, { exact: false });

    const blogDiv = component.container.querySelector('.blog');
    expect(blogDiv).toBeDefined();

    const likesDiv = component.container.querySelector('.likes');
    expect(likesDiv).toBeNull();
  });

  test('when blog post is clicked, other information becomes visible', () => {
    const button = component.container.querySelector('.blog-title-and-author');

    fireEvent.click(button);

    component.getByText(`${likes} likes`);
    component.getByText(title);
    component.getByText(url);
    component.getByText(`by ${author}`);
    component.getByText(`Added by ${user.name}`, { exact: false });
  });

  test('able to toggle blog info', () => {
    let button = component.container.querySelector('.blog-title-and-author');

    fireEvent.click(button);

    let likesDiv = component.container.querySelector('.likes');
    expect(likesDiv).toBeDefined();

    button = component.container.querySelector('.blog-title-and-author');
    fireEvent.click(button);

    likesDiv = component.container.querySelector('.likes');
    expect(likesDiv).toBeNull();
  });
});
