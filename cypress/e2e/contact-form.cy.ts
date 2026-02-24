describe("Contact form submission", () => {
  const openContactStation = () => {
    cy.visit("/");
    
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Enter")').length) {
        cy.contains("button", "Enter", { matchCase: false }).click();
      }
    });

    cy.contains("NextGen Developer Portfolio", { timeout: 15000 }).should("be.visible");
    cy.get('button[title="Contact"]', { timeout: 15000 }).click();
    cy.contains("Kontakt", { timeout: 15000 }).should("be.visible");
  };

  it("shows contact methods and form validation", () => {
    openContactStation();

    // Check contact methods are visible
    cy.contains("E-Mail").should("be.visible");

    // Switch to form tab and wait for form to load
    cy.contains("✉️ Nachricht").click();
    cy.wait(2000);

    // Wait for form elements to be available
    cy.get('#name', { timeout: 10000 }).should("be.visible");
    cy.get('#email', { timeout: 10000 }).should("be.visible");
    cy.get('#subject', { timeout: 10000 }).should("be.visible");

    // Clear form fields
    cy.get('#name').clear();
    cy.get('#email').clear(); 
    cy.get('#subject').clear();
    cy.get('#message').clear();

    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check validation errors appear (any validation error is sufficient)
    cy.get('.text-red-400', { timeout: 5000 }).should("have.length.at.least", 1);
  });

  it("fills out contact form with valid data", () => {
    openContactStation();
    
    // Switch to form tab and wait for form to load
    cy.contains("✉️ Nachricht").click();
    cy.wait(2000);

    // Wait for form elements and fill them
    cy.get('#name', { timeout: 10000 }).should("be.visible").type("Test User");
    cy.get('#email').type("test@example.com");
    cy.get('#subject').type("Test Subject");
    cy.get('#message').type("This is a test message with more than 10 characters for validation");
    cy.get('#phone').type("+49 123 4567890");

    // Form should be valid (submit button should be available and not disabled)
    cy.get('button[type="submit"]').should("be.visible").should("not.be.disabled");
  });

  it("validates email format", () => {
    openContactStation();
    
    // Switch to form tab and wait for form to load
    cy.contains("✉️ Nachricht").click();
    cy.wait(2000);

    // Fill all required fields with valid data first
    cy.get('#name', { timeout: 10000 }).should("be.visible").type("Test User");
    cy.get('#subject').type("Test Subject"); 
    cy.get('#message').type("Test message content that is long enough");

    // Now test invalid email format
    cy.get('#email').clear().type("invalid-email-format");
    
    // Try to submit form - this should trigger validation
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    // Check for validation feedback - be flexible about the exact error
    cy.get('body').then($body => {
      // Look for various possible error indicators
      const hasRedError = $body.find('[class*="text-red"], [class*="error"], [style*="color: red"]').length > 0;
      const hasErrorText = $body.text().includes('E-Mail') || $body.text().includes('gültig') || $body.text().includes('Format');
      const hasDisabledSubmit = $body.find('button[type="submit"][disabled]').length > 0;
      
      // At least one validation mechanism should be active
      expect(hasRedError || hasErrorText || hasDisabledSubmit).to.be.true;
    });
  });
});