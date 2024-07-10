describe('Smoke Tests', () => {
  before(() => {
    cy.request(`${Cypress.env('apiUrl')}/primes/2`)
      .its('status')
      .should('eq', 200);
  });
  beforeEach(() => {
    cy.visit('/');
  });

  it('should generate a prime number for valid input', () => {
    cy.get('input[type="text"]').type('ab');
    cy.get('textarea', { timeout: 20000 }).should($textarea => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
      expect(primeNumber.length).to.be.eq(2);
    });
  });
});
