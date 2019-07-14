/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */

describe('Blog App', function () {
  const testUser = {
    name: 'Sean Keever',
    username: 'swk',
    password: 'secret123',
  };

  const backendUrl = 'http://localhost:3003';
  const frontendUrl = 'http://localhost:3000';

  beforeEach(function () {
    cy.request('POST', `${backendUrl}/api/testing/reset`);
    cy.request('POST', `${backendUrl}/api/users`, { ...testUser });
    cy.visit(frontendUrl);
  });

  it('login page opened first', function () {
    cy.contains('Login');
  });

  it('user can login', function () {
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('button').click();
    cy.contains('Blog App');
  });

  describe('when logged in', function () {
    beforeEach(() => {
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.get('button').click();
    });

    it('contains users name', function () {
      cy.contains(testUser.name);
    });

    it('can logout', function () {
      cy.get('#menu-logout').click();
      cy.contains('Login');
    });

    describe('create blog form', function () {
      const title = 'test title';

      beforeEach(function () {
        cy.get('#togglable-shower-button').click();
        cy.get('#new-blog-title').type(title);
        cy.get('#new-blog-author').type('test-author');
        cy.get('#new-blog-url').type('test.com');
      });

      it('new blog can be created', function () {
        cy.get('#create-blog-button').click();
        cy.contains('Success!');
        cy.contains(testUser.username);
        cy.contains(title);
      });

      it('new blog data can be reset', function () {
        cy.get('#reset-blog-button').click();
        cy.get('#new-blog-title').should('be.empty');
        cy.get('#new-blog-author').should('be.empty');
        cy.get('#new-blog-url').should('be.empty');
      });

      describe('users page', function () {
        beforeEach(function () {
          cy.get('#create-blog-button').click();
          cy.get('#menu-users').click();
        });
  
        it('shows user name', function () {
          cy.contains(testUser.name);
        });
  
        it('shows how many blogs created', function () {
          cy.contains('Blogs Created');
          cy.contains('1');
        });

        it('can click on user profile', function () {
          cy.contains(testUser.name).click();
          cy.contains(title);
        })

        it('can click on profile in menu', function () {
          cy.get('#menu-my-profile').click();
          cy.contains(testUser.name);
          cy.contains(title);
        })
      });
    });
  });
});
