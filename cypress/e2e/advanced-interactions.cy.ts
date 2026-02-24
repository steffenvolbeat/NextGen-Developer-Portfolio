describe("Advanced interactions and edge cases", () => {
  const openPortfolio = () => {
    cy.visit("/");
    
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should("be.visible");
  };

  it("explores Testimonials station with dynamic content", () => {
    openPortfolio();

    // Open Testimonials station
    cy.get('button[title="Testimonials"]', { timeout: 15000 }).click();
    cy.contains("⭐ Testimonials", { timeout: 15000 }).should("be.visible");

    // Check testimonial content (coming soon message)
    cy.contains("Meine ersten Kunden-Referenzen entstehen gerade", { timeout: 10000 }).should("be.visible");
    cy.contains("hier die erste sein").should("be.visible");
  });

  it("tests rapid station switching and overlay stability", () => {
    openPortfolio();

    // Rapid navigation test - ensure overlays handle fast switching
    const quickSwitchStations = ["Skills", "Works", "About Me", "Experience"];
    
    quickSwitchStations.forEach((station, index) => {
      // Close any open overlays first
      cy.get("body").type("{esc}");
      cy.wait(500);
      
      // Click station button with force to bypass overlay coverage
      cy.get(`button[title="${station}"]`, { timeout: 10000 }).click({force: true});
      cy.wait(1000); // Allow overlay to open
    });

    // Verify final overlay is stable and close it properly
    cy.contains("Berufserfahrung", { timeout: 10000 }).should("be.visible");
    cy.get("body").type("{esc}"); // Close with escape key
    cy.wait(500);
    
    // Verify we're back to portfolio view
    cy.contains("NextGen Developer Portfolio").should("be.visible");
  });

  it("verifies mobile-like responsiveness behaviors", () => {
    openPortfolio();
    
    // Simulate smaller viewport behavior
    cy.viewport(768, 1024);
    cy.wait(1000);

    // Check if layout adapts
    cy.get('[data-testid="3d-canvas"]').should("be.visible");
    cy.contains("NextGen Developer Portfolio").should("be.visible");

    // Try navigation on smaller screen
    cy.get('button[title="Skills"]').click();
    cy.contains("Technische Skills", { timeout: 10000 }).should("be.visible");

    // Check that overlay is displayed properly (content is visible)
    cy.get('.fixed.inset-0').should("be.visible"); // Look for overlay container

    // Close overlay
    cy.get("body").type("{esc}");
    cy.wait(500);

    // Restore desktop viewport
    cy.viewport(1920, 1080);
  });

  it("tests error resilience and recovery scenarios", () => {
    openPortfolio();

    // Test multiple overlays in sequence without proper closing
    cy.get('button[title="About Me"]').click();
    cy.wait(1000);
    
    // Try to click another station while overlay is open (should replace overlay)
    cy.get('button[title="Skills"]').click({force: true});
    cy.wait(1000);
    
    cy.get('button[title="Contact"]').click({force: true});
    cy.wait(1000);
    
    // Should show the latest overlay (Contact)
    cy.contains("Kontakt", { timeout: 10000 }).should("be.visible");

    // Clear all overlays
    cy.get("body").type("{esc}");
    cy.wait(500);

    // Verify scene is still functional
    cy.contains("NextGen Developer Portfolio").should("be.visible");
    cy.get('[data-testid="3d-canvas"]').should("be.visible");
  });

  it("validates portfolio data consistency across stations", () => {
    openPortfolio();

    // Check Skills station content
    cy.get('button[title="Skills"]').click({force: true});
    cy.contains("Technische Skills", { timeout: 10000 }).should("be.visible");
    cy.contains("Frontend").should("be.visible");
    cy.get("body").type("{esc}");
    cy.wait(1000);

    // Check Works station has project content
    cy.get('button[title="Works"]').click({force: true});
    cy.contains("🎨 Portfolio & Projekte", { timeout: 10000 }).should("be.visible");
    cy.get("body").type("{esc}");
    cy.wait(1000);

    // Check Experience station content
    cy.get('button[title="Experience"]').click({force: true});
    cy.contains("Berufserfahrung", { timeout: 10000 }).should("be.visible");
    cy.get("body").type("{esc}");
    cy.wait(1000);

    // Verify all stations are accessible and consistent
    cy.contains("NextGen Developer Portfolio").should("be.visible");
  });

  it("tests animation completions and timing", () => {
    openPortfolio();

    // Test loading sequence completion
    cy.get('[data-testid="3d-canvas"]', { timeout: 20000 }).should("be.visible");
    
    // Test overlay open/close animations
    cy.get('button[title="Resume"]').click();
    cy.contains("Lebenslauf", { timeout: 15000 }).should("be.visible");
    
    // Wait for animation to complete before closing
    cy.wait(2000);
    cy.get("body").type("{esc}");
    
    // Wait for close animation
    cy.wait(1000);
    
    // Verify scene is ready for next interaction
    cy.get('button[title="Skills"]').should("be.enabled");
    cy.get('button[title="Works"]').should("be.enabled");
  });
});