describe('Prime e2e Tests', () => {
  before(() => {
    cy.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    cy.request(`${Cypress.env('apiUrl')}/primes/2`)
      .its('status')
      .should('eq', 200);
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle rapid input changes', () => {
    cy.get('input[type="text"]').type('a').type('b').type('c');
    cy.get('textarea').should('not.contain', 'Failed');
  });

  it('should handle frequent deletion and re-entry of input', () => {
    cy.get('input[type="text"]').type('abc').clear().type('def');
    cy.get('textarea').should($textarea => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
    });
  });

  it('should handle long input', () => {
    const longInput = 'a'.repeat(50);
    cy.get('input[type="text"]').type(longInput);
    cy.get('textarea').should('not.contain', 'Failed');
  });

  it('should maintain functionality after saving draft', () => {
    cy.get('button').click();
    cy.get('input[type="text"]').type('ab');
    cy.get('textarea', { timeout: 10000 }).should($textarea => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
      expect(primeNumber.length).to.be.eq(2);
    });
  });
});
