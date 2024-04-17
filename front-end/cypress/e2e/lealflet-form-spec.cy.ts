describe('LeafletForm', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow the user to search for medication', () => {
    cy.get('input[name="medicine"]').type('medicine name');
    cy.get('input[name="id"]').type('medicine id');
    cy.get('input[name="company"]').type('medicine company');

    cy.get('button.submit').click();

    cy.url().should('include', '/bulario/');
  });

  it('should allow the user to clear all inputs', () => {
    cy.get('input[name="medicine"]').type('medicine name');
    cy.get('input[name="id"]').type('medicine id');
    cy.get('input[name="company"]').type('medicine Compania');

    cy.contains('Limpar').click();

    cy.get('input[name="medicine"]').should('have.value', '');
    cy.get('input[name="id"]').should('have.value', '');
    cy.get('input[name="company"]').should('have.value', '');
  });
});