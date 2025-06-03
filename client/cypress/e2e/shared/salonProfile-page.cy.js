const { describe } = require("mocha");

let salonDetails

beforeEach(() => {
    cy.visit('http://localhost:5173/salon/40');
    cy.request('/api/shared/details?id=40').then((response) => {
        expect(response.status).to.eq(200)
        salonDetails = response.body.data
    })
})

describe('Header', () => {
    describe('Should show correct header information', () => {
        it('Should show correct salon details', () => {
            cy.get('.salon-contact-details').within(() => {
                cy.get('h1').should('have.text', salonDetails.salonDetails.name);
                cy.get('h4').should('contain.text', `${salonDetails.salonDetails.address}, ${salonDetails.salonDetails.city} ${salonDetails.salonDetails.state}`);
            });
        })

        it('Should show correct reviews count', () => {
            cy.get('.salon-review-stars').within(() => {
                cy.get('h3').should('contain.text', `( ${salonDetails.reviews.length} reviews )`);
            })
        })

        it('Should show correct colored stars and exact length of starts which is 5', () => {
            const rating = salonDetails.averageRating

            cy.get('.salon-review-stars')
                .find('h2')
                .find('div')
                .find('span')
                .should('have.length', 5)
                .each(($span, index) => {
                    cy.wrap($span)
                        .find('svg')
                        .should('have.css', 'color')
                        .then((color) => {
                            if (index < rating) {
                                expect(color).to.equal('rgb(255, 215, 0)');
                            } else {
                                expect(color).to.equal('rgb(128, 128, 128)');
                            }
                        });
                });
        })
    })

})

describe('Services', () => {
    it('Should display correct service details', () => {
        const services = salonDetails.services

        services.forEach((service, index) => {
            cy.get('.service-container').eq(index).within(() => {
                cy.get('h2').eq(0).should('have.text', service.name);
                cy.get('h2').eq(1).should('have.text', `${service.duration} minutes`);
                cy.get('h2').eq(2).should('have.text', `${service.price}$`);
                cy.get('svg').should('exist');
            });
        });
    });

    it('Should display calendar on service click', () => {
        cy.get('.service-container').first().click()
        cy.get('.calendar-container').should('exist').and('be.visible')
    });
})

describe('About us', () => {
    it('Should show team members', () => {
        const team = salonDetails.team

        cy.get('.salon-team').find('h1').should('have.text', 'Meet Our Team')

        if (team.length > 0) {
            team.forEach((member, index) => {
                cy.get('.team-members .team-member').eq(index).within(() => {
                    cy.get('h3').should('have.text', member.name);
                    cy.get('img').should('have.attr', 'src').should('include', member.image || 'image.png')
                });

            })
        }
    })

    it('Should show description', () => {
        cy.get('.salon-about-us').find('h1').should('have.text', 'About us')
        cy.get('.salon-about-us').find('p').should('have.text', salonDetails.salonDetails.description)
    })
})

describe('Reviews', () => {
    it('Should show no reviews label if there are no reviews', () => {
        if (salonDetails.reviews.length < 1) {
            cy.get('.salon-reviews').find('p').should('have.text', `There are no reviews for this salon!`)
        }
    })

    it('Should show correct reviews if there are any', () => {
        if (salonDetails.reviews.length > 0) {
            cy.get('.salon-reviews').should('have.length', salonDetails.reviews.length)

            salonDetails.reviews.forEach((review, index) => {
                cy.get('.review-container').eq(index).within(() => {
                    cy.get('p').should('have.text', review.comment);
                    cy.get('h2').should('have.text', `${review.first_name} ${review.last_name}`)
                    cy.get('h3').should('have.text', review.created_at)

                    const rating = review.rating

                    cy.get('h1')
                        .find('div')
                        .find('span')
                        .should('have.length', 5)
                        .each(($span, index) => {
                            cy.wrap($span)
                                .find('svg')
                                .should('have.css', 'color')
                                .then((color) => {
                                    if (index < rating) {
                                        expect(color).to.equal('rgb(255, 215, 0)');
                                    } else {
                                        expect(color).to.equal('rgb(128, 128, 128)');
                                    }
                                });
                        });
                });
            });
        }
    })

})

describe('Calendar', () => {
    beforeEach(() => {
        cy.get('.service-container').first().click()
        cy.get('.calendar-container').should('exist').and('be.visible')
    })

    it('should render calendar with correct heading and days', () => {
        cy.get('.calendar-heading').should('contain.text', 'Week of');
        cy.get('.calendar-buttons').find('button').should('have.length', 2);
        cy.get('.calendar-day-card').should('have.length', 7);
    });

    it('should navigate to next and previous weeks', () => {
        cy.get('.calendar-buttons button').eq(1).click();
        cy.get('.calendar-heading').should('contain.text', 'Week of');

        cy.get('.calendar-buttons button').eq(0).click();
    });

    it('should display time slots for each day', () => {
        cy.get('.calendar-day-card').each(($day) => {
            cy.wrap($day).find('.day-slots .slot').should('exist');
        });
    });

    it('should show booking modal when a free slot is clicked', () => {
        cy.get('.slot.customer-free').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-content').should('contain.text', 'Confirm appointment reservation');
    });

    it('should close modal on deny', () => {
        cy.get('.slot.customer-free').first().click();
        cy.get('.modal-backdrop:visible').should('exist');
        cy.get('.modal-close:visible').click();
        cy.get('.modal-backdrop:visible').should('not.exist');
    });

    it('should show error when customer trying to book without being logged in', () => {
        cy.get('.slot.customer-free').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-backdrop:visible .confirm-button').click()
        cy.get('.notification').should('be.visible')
        cy.get('.notification-header').find('p').should('contain.text', 'error')
        cy.get('.notification-text').should('contain.text', 'Only customers can book')
    });

    it('should show success when customer is booking appointment from their account', () => {
        cy.contains('.custom-button', 'Login').click();
        cy.get('input[name=email]').type('test@test.com')
        cy.get('input[name=password]').type('123456')
        cy.get('.login').submit()
        cy.wait(5000)

        cy.get('.slot.customer-free').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-backdrop:visible .confirm-button').click()
        cy.get('.notification').should('be.visible')
        cy.get('.notification-header').find('p').should('contain.text', 'success')
        cy.get('.notification-text').should('contain.text', 'Booking successful!')
    });
})