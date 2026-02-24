describe("Landing to portfolio smoke", () => {
  it("shows landing, enters portfolio and renders canvas", () => {
    cy.visit("/");

    cy.get("body").then(($body) => {
      const hasLanding = $body.text().includes("NEXTGEN");

      if (hasLanding) {
        const enterBtn = $body.find('button:contains("Enter")');
        if (enterBtn.length) {
          cy.wrap(enterBtn.first()).click({ force: true });
        }
      }
    });

    // Wait for loading sequence to finish and portfolio to appear
    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="3d-canvas"]', { timeout: 15000 }).should(
      "be.visible"
    );
  });
});
