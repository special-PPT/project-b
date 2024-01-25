describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/login');
  });

  it('successfully logs in with valid credentials', () => {
    // Fill in the username and password fields
    cy.get('input#username').type('hrUser');
    cy.get('input#password').type('password');

    // Click the login button
    cy.get('button').contains('Login').click();

    // Assert successful login by checking if the URL changed to the expected page
    // Adjust the URL based on your application's routing upon successful login
    cy.url().should('include', '/hr/home');
    // You can also check for the presence of elements that are only visible upon successful login
  });

  it('displays an error for invalid credentials', () => {
    // Fill in the username and password fields with invalid credentials
    cy.get('input#username').type('invalidUsername');
    cy.get('input#password').type('invalidPassword');

    // Click the login button
    cy.get('button').contains('Login').click();

    // Assert failed login, for example, by checking for the presence of an error message
    // This assumes your application shows an error message upon failed login attempts
    // You may need to adjust the selector based on your actual implementation
    // cy.contains('Login failed').should('be.visible');
  });

  // Add more tests as needed to cover other scenarios, such as form validation
});
