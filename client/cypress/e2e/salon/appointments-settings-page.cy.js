beforeEach(() => {
  cy.visit('http://localhost:5173');
  cy.contains('Login').click();
  cy.get('.switch').click()
  cy.get('input[name="email"]').type('test@test.com');
  cy.get('input[name="password"]').type('123456');
  cy.get('.modal-content form').submit();
  cy.contains('Settings').click();
})

describe('Appointments Settings Page', () => {
  beforeEach(() => {
    cy.contains('Appointments').click()
  })

  it('Should be able to add schedule for one day', () => {
    cy.contains('bulk add schedule').click()
    cy.get('.small-calendar-day')
      .not('.working')
      .not('.empty')
      .then(($days) => {
        const randomIndex = Math.floor(Math.random() * $days.length);
        cy.wrap($days[randomIndex]).click();
      });

    cy.get('input[name="open_time"]').type('08:00')
    cy.get('input[name="close_time"]').type('17:00')
    cy.get('input[name="break_start"]').type('12:00')
    cy.get('input[name="break_end"]').type('12:30')

    cy.get('button.custom-button').click();
    cy.get('.notification.success').should('contain', 'Schedule added successfully, please re-load the page!');
  })

  it('Should be able to add schedule for multiple days', () => {
    cy.contains('bulk add schedule').click();

    cy.wait(1000)
    cy.get('.small-calendar-day').then(($allDays) => {
      const validDays = [];

      $allDays.each((index, el) => {
        const classAttr = el.getAttribute('class') || '';

        if (
          !classAttr.includes('working') &&
          !classAttr.includes('empty') &&
          !classAttr.includes('past')
        ) {
          validDays.push(el);
        }
      });

      expect(validDays.length).to.be.greaterThan(0);

      const numToClick = Math.min(3, validDays.length);
      const chosen = [];

      while (chosen.length < numToClick) {
        const index = Math.floor(Math.random() * validDays.length);
        if (!chosen.includes(index)) {
          chosen.push(index);
          cy.wrap(validDays[index]).click();
        }
      }
    });

    cy.get('input[name="open_time"]').type('08:00');
    cy.get('input[name="close_time"]').type('17:00');
    cy.get('input[name="break_start"]').type('12:00');
    cy.get('input[name="break_end"]').type('12:30');

    cy.get('button.custom-button').click();
    cy.get('.notification.success').should('contain', 'Schedule added successfully, please re-load the page!');
  });

  it('should open edit form for the first non-past day and update hours', () => {
    cy.get('.calendar-day-card').each(($el) => {
      if (!$el.hasClass('past')) {
        cy.wrap($el).within(() => {
          cy.get('[data-testid="edit-schedule-icon"]').click();
        });
        return false;
      }
    });

    cy.get('.modal-content').should('be.visible');

    cy.get('input[name="open_time"]').clear().type('10:00');
    cy.get('input[name="close_time"]').clear().type('18:00');

    cy.get('.modal-content form').should('be.visible').submit();

    cy.get('.calendar-day-card')
      .not('.past')
      .first()
      .within(() => {
        cy.contains('10:00 - 18:00').should('exist');
      });
  });

  it('should show confirmation window when trying to delete schedule', () => {
    cy.get('.calendar-day-card').each(($el) => {
      if (!$el.hasClass('past') && !$el.hasClass('unavailable')) {
        cy.wrap($el).within(() => {
          cy.get('[data-testid="delete-schedule-icon"]').click();
          cy.get('.confirm-button')
          cy.get('.confirm-body h2').invoke('text').should('match', /delete schedule/i)
        });
        return false;
      }
    });
  });

  it('should not be able to edit/delete schedule for past dates', () => {
    cy.get('.calendar-day-card').each(($el) => {
      if ($el.hasClass('past')) {
        cy.wrap($el).within(() => {
          cy.get('[data-testid="delete-schedule-icon"]').should('have.css', 'cursor', 'not-allowed');
          cy.get('[data-testid="edit-schedule-icon"]').should('have.css', 'cursor', 'not-allowed');
        });
        return false;
      }
    });
  })
})