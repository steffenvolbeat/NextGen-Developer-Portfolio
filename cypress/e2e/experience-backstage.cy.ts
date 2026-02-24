describe("Experience and Backstage exploration", () => {
  const openPortfolio = () => {
    cy.visit("/");
    
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should("be.visible");
  };

  it("explores Experience station timeline and details", () => {
    openPortfolio();

    // Open Experience station
    cy.get('button[title="Experience"]', { timeout: 15000 }).click();
    cy.contains("Berufserfahrung", { timeout: 15000 }).should("be.visible");

    // Check view toggle (Timeline/Details)
    cy.contains("Timeline").should("be.visible");
    cy.contains("Details").should("be.visible");

    // Check career summary stats
    cy.contains("Karriere-Übersicht").should("be.visible");
    cy.contains("Stationen").should("be.visible");
    cy.contains("Jahre Erfahrung").should("be.visible");

    // Check timeline elements
    cy.get('[class*="timeline"], [class*="relative"]').should("exist");

    // Look for experience entries
    cy.contains("Mercedes Benz").should("be.visible");
    cy.contains("Produktionsmitarbeiter").should("be.visible");

    // Switch to detailed view
    cy.contains("Details").click();
    cy.wait(500);

    // Check detailed experience information
    cy.contains("Technologien").should("be.visible");
  });

  it("browses Backstage station tabs and technical details", () => {
    openPortfolio();

    // Open Backstage station
    cy.get('button[title="Backstage"]', { timeout: 15000 }).click();
    cy.contains("Backstage", { timeout: 15000 }).should("be.visible");

    // Check tab navigation
    const backstageTabs = ["⚙️ Tech Stack", "🛠️ Workflow", "🗺️ Roadmap", "🧪 Experimente", "📚 Learnings"];
    
    backstageTabs.forEach(tabName => {
      cy.get("body").then($body => {
        if ($body.text().includes(tabName)) {
          cy.contains(tabName).click();
          cy.wait(1000);
        }
      });
    });

    // Check Tech Stack content
    cy.contains("⚙️ Tech Stack").click();
    cy.contains("Stack & Architektur").should("be.visible");
    cy.contains("Next.js").should("be.visible");
    cy.contains("TypeScript").should("be.visible");
    cy.contains("React").should("be.visible");

    // Check Workflow content
    cy.contains("🛠️ Workflow").click();
    cy.contains("Dev-Setup").should("be.visible");
    cy.contains("Testing").should("be.visible");

    // Check Roadmap
    cy.contains("🗺️ Roadmap").click();
    cy.contains("geplant").should("be.visible");
  });

  it("verifies 3D scene interactions and responsiveness", () => {
    openPortfolio();

    // Check 3D canvas exists and is interactive
    cy.get('[data-testid="3d-canvas"]', { timeout: 15000 }).should("be.visible");

    // Check HUD navigation is accessible
    cy.contains("NAV").should("be.visible");
    cy.contains("CONTROLS").should("be.visible");

    // Test multiple station switches to verify scene stability
    const stations = ["Skills", "Experience", "Contact", "Works"];
    
    stations.forEach((station, index) => {
      cy.get(`button[title="${station}"]`).click();
      cy.wait(2000); // Wait for overlay animations
      
      // Close the overlay for next iteration
      cy.contains("button", "Schließen", { matchCase: false }).click();
      cy.wait(1000);
    });

    // Verify scene is still functional
    cy.get('[data-testid="3d-canvas"]').should("be.visible");
    cy.contains("NextGen Developer Portfolio").should("be.visible");
  });

  it("tests keyboard controls and accessibility", () => {
    openPortfolio();

    // Check escape key closes overlays
    cy.get('button[title="About Me"]').click();
    cy.contains("Über mich", { timeout: 10000 }).should("be.visible");
    
    // Test escape key functionality
    cy.get("body").type("{esc}");
    cy.wait(2000);
    
    // Verify we're back to portfolio view
    cy.contains("NextGen Developer Portfolio").should("be.visible");
    
    // Test keyboard navigation - ensure no overlays are present first
    cy.get('body').then($body => {
      // Make sure no overlays are blocking before clicking
      if ($body.find('.fixed.inset-0').length === 0) {
        cy.get('button[title="Skills"]').should("be.visible").click();
        cy.contains("Technische Skills", { timeout: 10000 }).should("be.visible");
      } else {
        // If overlay still present, close it first
        cy.get("body").type("{esc}");
        cy.wait(1000);
        cy.get('button[title="Skills"]').click({force: true});
        cy.contains("Technische Skills", { timeout: 10000 }).should("be.visible");
      }
    });
    
    // Test escape key again  
    cy.get("body").type("{esc}");
    cy.wait(1000);
    
    // Final verify - scene should be functional
    cy.contains("NextGen Developer Portfolio").should("be.visible");
    cy.get('[data-testid="3d-canvas"]').should("be.visible");
  });
});