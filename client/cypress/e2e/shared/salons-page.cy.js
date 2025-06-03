beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('select[name="state"]').select('California')
    cy.get('select[name="city"]').select('San Diego')
    cy.get('select[name="service"]').select('Full Grooming Package')
})

it('Should navigate to salons page and show correct salons for selected filters', () => {
    cy.get('form').submit();
    cy.url().should('include', `/salons`);
})