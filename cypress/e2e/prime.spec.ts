describe("Prime e2e Tests", () => {
  before(() => {
    cy.request(`${Cypress.env("apiUrl")}/primes/2`)
      .its("status")
      .should("eq", 200);
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should generate a prime number for valid input", () => {
    cy.get('input[type="text"]').type("ab");
    cy.get("textarea").then(($textarea) => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
      expect(primeNumber.length).to.be.eq(2);
    });
  });

  it("should handle rapid input changes", () => {
    cy.get('input[type="text"]').type("a").type("b").type("c");
    cy.get("textarea").should("not.contain", "Failed");
  });

  it("should handle frequent deletion and re-entry of input", () => {
    cy.get('input[type="text"]').type("abc").clear().type("def");
    cy.get("textarea").then(($textarea) => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
    });
  });

  it("should handle long input", () => {
    const longInput = "a".repeat(100);
    cy.get('input[type="text"]').type(longInput);
    cy.get("textarea").should("not.contain", "Failed");
  });

  it("should maintain functionality after saving draft", () => {
    cy.get("button").click();
    cy.get('input[type="text"]').type("ab");
    cy.get("textarea").then(($textarea) => {
      const primeNumber = $textarea.text();
      expect(primeNumber).to.be.match(/^\d+$/);
      expect(primeNumber.length).to.be.eq(2);
    });
  });
});
