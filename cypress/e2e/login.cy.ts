describe('Login Page', () => {
  it('should create the login page', () => {
    cy.visit('/'); 

    cy.get('app-login').should('exist');

    cy.get('ion-card-title').should('contain.text', 'Inicia sesion'); // Ajusta según tu estructura HTML
  });
});
