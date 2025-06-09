beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.contains('Login').click();
    cy.get('.switch').click()
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('.modal-content form').submit();
    cy.contains('Settings').click();
})

describe('Team Settings Page', () => {
    beforeEach(() => {
        cy.contains('Team').click()
    })

    it('Should be able to add new team member', () => {
        cy.get('input[name="name"]').type('Test1')
        cy.get('input[name="image"]').selectFile('cypress/fixtures/image.png', { force: true });
        cy.get('button.custom-button').click();

        cy.get('.notification.success').should('contain', 'Successfully added');
    })

    it('Should be able to delete team member', () => {
        cy.get('.team-member-info h4').invoke('text').should('match', /Test1/i)
        cy.get('.team-member-info svg').click();

        cy.get('.notification.success').should('contain', 'Successfully removed team member!');
    })
})