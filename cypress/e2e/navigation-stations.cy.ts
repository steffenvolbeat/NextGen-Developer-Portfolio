describe("Station navigation", () => {
  const openPortfolio = () => {
    cy.visit("/");

    // In CI (Cypress env) we skip landing automatically, but click Enter when visible locally
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    // Allow extra time for the loading sequence and 3D scene to mount
    cy.contains("NextGen Developer Portfolio", { timeout: 30000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="3d-canvas"]', { timeout: 30000 }).should(
      "be.visible"
    );

    cy.contains("NAV", { timeout: 30000 }).should("be.visible");
  };

  it("opens every station overlay from the HUD", () => {
    openPortfolio();

    const stations = [
      { title: "Testimonials", heading: "Testimonials" },
      { title: "Backstage", heading: "Backstage" },
      { title: "Works", heading: "Portfolio & Projekte" },
      { title: "Contact", heading: "Kontakt & CV" },
      { title: "Resume", heading: "Lebenslauf & CV" },
      { title: "Experience", heading: "Berufserfahrung" },
      { title: "Skills", heading: "Technische Skills" },
      { title: "About Me", heading: "Über mich" },
    ];

    stations.forEach(({ title, heading }) => {
      cy.get(`button[title="${title}"]`, { timeout: 15000 }).click();

      cy.contains(heading, { timeout: 15000 }).should("be.visible");

      cy.contains("button", "Schließen", { matchCase: false })
        .should("be.visible")
        .click();
    });
  });
});
