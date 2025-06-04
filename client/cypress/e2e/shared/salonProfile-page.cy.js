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