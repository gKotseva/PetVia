describe('Calendar schedule test', () => {
    describe('Customer calendar', () => {
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

        it('Fetches schedule and checks calendar status day classes', () => {
            const today = new Date().toISOString().split('T')[0];

            cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
                const schedule = interception.response.body.data;

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
                                cy.wrap($card).should('not.have.class', 'today');
                            } else {
                                cy.wrap($card).should('have.class', 'unavailable');
                            }
                        });
                });
            });
        });

        it('Changes weeks correctly using navigation buttons', () => {
            let initialFirstDate = '';

            cy.wait('@getSchedule');

            cy.get('.calendar-day-card').first().find('p').eq(1).invoke('text').then((text) => {
                initialFirstDate = text.trim();

                cy.get('.calendar-buttons button').last().click();

                cy.get('.calendar-day-card').first().find('p').eq(1).invoke('text').then((newDate) => {
                    expect(newDate.trim()).to.not.equal(initialFirstDate);
                });

                cy.get('.calendar-buttons button').first().click();

                cy.get('.calendar-day-card').first().find('p').eq(1).invoke('text').then((backToInitial) => {
                    expect(backToInitial.trim()).to.equal(initialFirstDate);
                });
            });
        });

        it('Renders slots based on schedule or defaults', () => {
            const defaultSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

            cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
                const schedule = interception.response.body.data;
                expect(schedule).to.exist;

                cy.get('.slot.customer-free', { timeout: 5000 }).should('exist');

                cy.get('.calendar-day-card').each(($card) => {
                    cy.wrap($card).find('p').eq(1).invoke('text').then((dateText) => {
                        const formattedDate = dateText.trim();

                        cy.wrap($card).find('.day-slots .slot').then(($slots) => {
                            const renderedSlotTimes = [...$slots].map((el) => el.innerText.trim());

                            if (schedule.hasOwnProperty(formattedDate)) {
                                const expectedSlots = schedule[formattedDate].slots.map(s => s.slot);
                                expect(renderedSlotTimes).to.deep.equal(expectedSlots);
                            } else {
                                expect(renderedSlotTimes).to.deep.equal(defaultSlots);
                            }
                        });
                    });
                });
            });
        });

        it('Fetches schedule and checks calendar status slot classes', () => {
            cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
                const schedule = interception.response.body.data;
                expect(schedule).to.exist;

                cy.get('.slot.customer-free', { timeout: 5000 }).should('exist');

                cy.get('.calendar-day-card').each(($card) => {
                    cy.wrap($card).find('p').eq(1).invoke('text').then((dateText) => {
                        const formattedDate = dateText.trim();

                        cy.wrap($card).find('.day-slots div').each(($slot) => {
                            cy.wrap($slot).invoke('text').then((slotTime) => {
                                const slotText = slotTime.trim();

                                if (schedule.hasOwnProperty(formattedDate)) {
                                    const daySchedule = schedule[formattedDate];
                                    const matchedSlot = daySchedule.slots.find(s => s.slot === slotText);

                                    if (matchedSlot) {
                                        const expectedClass = `customer-${matchedSlot.status}`;
                                        cy.wrap($slot).should('have.class', expectedClass);
                                    } else {
                                        cy.wrap($slot).should('have.class', 'customer-unavailable');
                                    }
                                } else {
                                    cy.wrap($slot).should('have.class', 'customer-unavailable');
                                }
                            });
                        });
                    });
                });
            });
        });

        it('Shows an error when booking without being logged in', () => {
            cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
                cy.get('.calendar-day-card:not(.past):not(.unavailable)')
                    .find('.slot.customer.customer-free ')
                    .first()
                    .click()

                cy.get('.confirm-button').filter(':visible').click();

                cy.get('.notification-header').should('contain.text', 'error')
                cy.get('.notification-text').should('contain.text', 'Only customers can book appointments.')
            });
        });

        it('Successfully bookes an appointment and shows success notification when customer is logged in', () => {

            cy.get('.custom-button').first().click()
            cy.get('input[name=email]').type('test@test.com')
            cy.get('input[name=password]').type('123456')
            cy.get('form').submit()

            cy.wait('@getSchedule', { timeout: 10000 }).then((interception) => {
                cy.get('.calendar-day-card:not(.past):not(.unavailable)')
                    .find('.slot.customer.customer-free ')
                    .first()
                    .click()

                cy.get('.confirm-button').filter(':visible').click();

                cy.get('.notification-header').should('contain.text', 'success')
                cy.get('.notification-text').should('contain.text', 'Booking successful')
            });
        });
    })
});
