describe('Login Functionality', () => {
    it('successfully logs in with valid credentials', () => {
      // Replace 'http://localhost:3000/login' with the URL of your login page
      cy.visit('http://localhost:3000/login');
  
      // Replace the selectors below with the actual selectors for your input fields and login button
      cy.get('OutlinedInput[id="username"]').type('hrUser');
      cy.get('TestField[name="password"]').type('password');
      cy.get('form').submit(); // or cy.get('button[type="submit"]').click();
  
      // Check for a successful login indicator (e.g., redirection, presence of a logout button)
      // Adjust the assertion to match something expected in your app upon successful login
      cy.url().should('include', '/dashboard'); // Assuming successful login redirects to '/dashboard'
      cy.get('button').contains('Logout').should('exist'); // Assuming a 'Logout' button is present upon login
    });
  
    it('displays an error for invalid credentials', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="username"]').type('invalidUsername');
      cy.get('input[name="password"]').type('invalidPassword');
      cy.get('form').submit(); // or cy.get('button[type="submit"]').click();
  
      // Adjust the assertion to check for login failure (e.g., error message)
      cy.get('.error').should('contain', 'Invalid username or password'); // Assuming an error message is shown
    });
  });
  