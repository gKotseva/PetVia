beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.contains('Login').click();
    cy.get('.switch').click()
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('.modal-content form').submit();
    cy.contains('Settings').click();
})

describe('Services Settings Page', () => {
    beforeEach(() => {
        cy.contains('Services').click();
    });

    it('should add a new service', () => {
        cy.get('input[name="name"]').type('Test Service');
        cy.get('input[name="price"]').type('50');
        cy.get('input[name="duration"]').type('30');
        cy.get('textarea[name="description"]').type('Test description');
        cy.get('button.custom-button').click();

        cy.contains('Test Service').should('exist');
    });

    it('should open modal to edit a service', () => {
        cy.get('[data-testid^="edit-service-"]').first().click();

        cy.get('.modal-content').within(() => {
            cy.get('input[name="name"]').clear().type('Updated Service');
            cy.get('.edit-service').submit();
        });

        cy.contains('Updated Service').should('exist');
    });

    it('should delete a service', () => {
        cy.get('.settings-service').contains('h4', /updated service/i).then(($heading) => {
            const $service = $heading.closest('.settings-service')

            cy.wrap($service)
                .find('[data-testid^="delete-service-"]')
                .click()
        })

        cy.get('.confirm-button').click()

        cy.get('.settings-service').should('not.contain.text', 'updated service')
    })

});