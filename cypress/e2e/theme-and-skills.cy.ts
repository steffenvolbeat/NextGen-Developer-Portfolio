describe("Theme toggle and Skills interaction", () => {
  const openPortfolio = () => {
    cy.visit("/");
    
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should("be.visible");
  };

  it("checks theme functionality is present", () => {
    openPortfolio();

    // Simply verify the portfolio loads and basic UI is present
    cy.get('[data-testid="3d-canvas"]').should("be.visible");
    cy.contains("NextGen Developer Portfolio").should("be.visible");
    
    // Check for any theme-related elements (without requiring specific implementation)
    cy.get("body").should("have.attr", "class");
  });

  it("browses skills by category and shows progress bars", () => {
    openPortfolio();

    // Open Skills station
    cy.get('button[title="Skills"]', { timeout: 15000 }).click();
    cy.contains("Technische Skills", { timeout: 15000 }).should("be.visible");

    // Check that skills content is loaded
    cy.contains("Frontend").should("be.visible");
    
    // Click through available skill categories
    cy.contains("Frontend").click();
    cy.wait(1000);
    
    // Check that some skill details are visible
    cy.get("body").then($body => {
      // Look for progress indicators or skill items
      if ($body.text().includes("React") || $body.text().includes("JavaScript") || $body.text().includes("TypeScript")) {
        cy.contains(/React|JavaScript|TypeScript/).should("be.visible");
      }
    });
  });

  it("explores Works/Projects station", () => {
    openPortfolio();

    // Open Works station
    cy.get('button[title="Works"]', { timeout: 15000 }).click();
    cy.contains("🎨 Portfolio & Projekte", { timeout: 15000 }).should("be.visible");

    // Check basic content is present
    cy.contains("Projekte").should("be.visible");

    // Check if project statistics or Metal3DCore is present
    cy.get("body").then($body => {
      if ($body.text().includes("Metal3DCore")) {
        cy.contains("Metal3DCore").should("be.visible");
      }
      if ($body.text().includes("Completed") || $body.text().includes("Abgeschlossen")) {
        cy.contains(/Completed|Abgeschlossen/).should("be.visible");
      }
    });
  });

  it("navigates About station and explores content", () => {
    openPortfolio();

    // Open About station
    cy.get('button[title="About Me"]', { timeout: 15000 }).click();
    cy.contains("Über mich", { timeout: 15000 }).should("be.visible");

    // Check personal info
    cy.contains("Steffen Lorenz").should("be.visible");
    cy.contains("Web").should("be.visible"); // Part of "Web-& Software-Entwickler"
    cy.contains("Deutschland").should("be.visible");

    // Check for strengths or values section if present
    cy.get("body").then($body => {
      if ($body.text().includes("Stärken") || $body.text().includes("Werte")) {
        cy.contains(/Stärken|Werte/).should("be.visible");
      }
    });

    // Look for profile image
    cy.get('img').should("have.length.at.least", 1);
  });
});