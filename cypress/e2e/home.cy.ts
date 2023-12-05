describe('HomePage', () => {
  it('should create the home page', () => {
    cy.visit('/home');

    cy.get('app-home').should('exist');

    cy.get('ion-button').should('contain.text', 'Home');
  });
});
