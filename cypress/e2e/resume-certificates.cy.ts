describe("Resume certifications", () => {
  it("opens Resume station and shows certificate links", () => {
    cy.visit("/");
    
    // In CI (Cypress env) we skip landing automatically, but click Enter when visible locally
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    // wait for portfolio HUD to show
    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should(
      "be.visible"
    );

    // open Resume overlay (label rendered as Html in scene)
    cy.contains("RESUME", { timeout: 15000 }).click({ force: true });

    // certification tab
    cy.contains("Zertifikate").click();

    cy.contains("Web- & Softwareentwickler Zertifikat").should("be.visible");
    cy.contains("Zertifikat öffnen (PDF)", { matchCase: false }).should(
      "have.attr",
      "href"
    );

    cy.contains("PC-Service Zertifikat").should("be.visible");
  });
});
