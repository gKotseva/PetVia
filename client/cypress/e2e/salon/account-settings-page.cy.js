    beforeEach(() => {
        cy.visit('http://localhost:5173');
        cy.contains('Login').click();
        cy.get('.switch').click()
        cy.get('input[name="email"]').type('test@test.com');
        cy.get('input[name="password"]').type('123456');
        cy.get('.modal-content form').submit();
        cy.contains('Settings').click();
    })

    describe('Account Settings Page', () => {
        it('Should edit salon contact information', () => {
            cy.get('input[name="email"]').should('exist');

            cy.get('input[name="name"]').invoke('val').should('not.be.empty');
            cy.get('input[name="email"]').invoke('val').should('not.be.empty');

            cy.get('input[name="name"]').clear().type('Updated Salon Name');
            cy.get('input[name="phone_number"]').clear().type('123456789');

            cy.get('button.custom-button').click();

            cy.get('.notification.success').should('contain', 'Salon data updated successfully');
        })
    })