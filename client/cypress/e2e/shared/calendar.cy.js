describe('Calendar schedule test', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/api/schedule/schedule*',
        }, (req) => {
            req.headers['cache-control'] = 'no-cache';
        }).as('getSchedule');

        cy.visit('http://localhost:5173/salon/40');
        cy.get('.service-container').first().should('be.visible').click();
    });

    let schedule

it('Fetches schedule and checks calendar status classes', () => {
  const today = new Date().toISOString().split('T')[0];

  cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
    const schedule = interception.response.body.data;

    // Изчакай DOM-а да се обнови след зареждането
    cy.get('.calendar-day-card').should('have.length.greaterThan', 0);

    cy.get('.calendar-day-card').each(($card) => {
      cy.wrap($card)
        .find('.calendar-day-heading p')
        .last()
        .invoke('text')
        .then((dateText) => {
          const formattedDate = dateText.trim();

          if (formattedDate < today) {
            cy.wrap($card).should('have.class', 'past');
          } else if (formattedDate === today) {
            cy.wrap($card).should('have.class', 'today');
          } else if (schedule.hasOwnProperty(formattedDate)) {
            cy.wrap($card).should('not.have.class', 'unavailable');
            cy.wrap($card).should('not.have.class', 'past');
          } else {
            cy.wrap($card).should('have.class', 'unavailable');
          }
        });
    });
  });
});





});
