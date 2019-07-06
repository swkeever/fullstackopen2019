import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
import localStorageHelper from './utils/local_storage';

describe('<App />', () => {
  test('if no user logged in, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(
      () => component.container.querySelector('.login-form'),
    );

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(0);
  });

  test('if user is logged in, blog posts are rendered', async () => {
    const user = {
      username: 'tester',
      token: '123412341234',
      name: 'Donald Tester',
    };

    localStorage.setItem(localStorageHelper.LOCAL_STORAGE_KEY, JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(
      () => component.container.querySelector('.blogs'),
    );

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);

    blogs.forEach((blog, index) => {
      const blogNumber = index + 1;
      component.getByText(`Blog ${blogNumber}`);
      component.getByText(`by Author ${blogNumber}`);
    });

    const loginForm = component.container.querySelector('.login-form');
    expect(loginForm).toBeNull();
  });
});
