const { expect } = require("chai");
const { describe } = require("mocha");

beforeEach(() => {
    cy.visit('http://localhost:5173');
})

describe('Header container', () => {
    it('Should show correct heading', () => {
        cy.contains('Book your appointment today').should('exist')
    })

    it('Should show correct form', () => {
        cy.get('form').should('exist')
        cy.get('select#state').should('exist')
        cy.get('select#city').should('exist')
        cy.get('select#service').should('exist')
    })

    it('Should display correct header background image', () => {
        cy.get('.home-heading-container').should('have.css', 'background-image').and('include', '14.jpg')
    })

    it('Should fetch all salons and update select options with accurate options', () => {
        cy.request('/api/shared/salons')
            .then((salonsResponse) => {
                expect(salonsResponse.status).to.eq(200)
                const salons = salonsResponse.body.result
                const uniqueStates = [...new Set(salons.map(salon => salon.state))].sort();

                cy.get('select[name="state"]').should('exist').find('option').should('have.length.greaterThan', 2)
                    .then(options => {
                        const actualStates = [...options].map(s => s.value).filter(v => v !== '')
                        expect(actualStates).to.deep.eq(uniqueStates);
                    })

                const firstState = uniqueStates[0];
                cy.get('select[name="state"]').select(firstState);

                const citiesInState = [...new Set(salons.filter(s => s.state === firstState).map(s => s.city))].sort();

                cy.get('select[name="city"]', { timeout: 10000 })
                    .should('exist')
                    .find('option')
                    .should('have.length.greaterThan', 1)
                    .then(options => {
                        const actualCities = [...options].map(o => o.value).filter(v => v !== '');
                        expect(actualCities).to.deep.eq(citiesInState);
                    });

                const firstCity = citiesInState[0];
                cy.get('select[name="city"]').select(firstCity);

                cy.request(`/api/shared/services-per-details?city=${firstCity}&state=${firstState}`).then(servicesResponse => {
                    expect(servicesResponse.status).to.eq(200);
                    const serviceNames = servicesResponse.body.data.map(s => s.name);
                    cy.wait(500)

                    cy.get('select[name="service"]', { timeout: 10000 })
                        .should('exist')
                        .find('option')
                        .should('have.length.greaterThan', 1)
                        .then(options => {
                            const actualServices = [...options].map(o => o.value).filter(v => v !== '')
                            expect(actualServices).to.deep.eq(serviceNames);
                        });
                });
            })
    })

    it('Should navigate to salons page and show correct salons for selected filters', () => {
        cy.request('/api/shared/salons').then((response) => {
            const allSalons = response.body.result;

            const uniqueStates = [...new Set(allSalons.map(s => s.state))].sort();
            const selectedState = uniqueStates[0];

            const citiesInState = [...new Set(allSalons.filter(s => s.state === selectedState).map(s => s.city))].sort();
            const selectedCity = citiesInState[0];
            cy.request(`/api/shared/services-per-details?city=${selectedCity}&state=${selectedState}`).then(({ body }) => {
                const services = body.data;
                expect(services).to.have.length.greaterThan(0);
                const selectedService = services[0].name;

                cy.get('select[name="state"]').select(selectedState);
                cy.get('select[name="city"]').select(selectedCity);
                cy.get('select[name="service"]').select(selectedService);

                cy.get('form').submit();

                cy.url().should('include', `/salons`);
            });
        });
    });

})

describe('Information container', () => {

    let counts

    it('Should fetch counts', () => {
        cy.request('/api/shared/count')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('customers', 'appointments', 'salons');
                counts = response.body
            })
    })

    it('Should display customer, appointment and salon cards', () => {
        cy.get('.home-information-container > div').should('have.length', 3);
        cy.get('.home-information-card1-container span').should('not.be.empty');
        cy.get('.home-information-card2-container span').should('not.be.empty');
        cy.get('.home-information-card3-container span').should('not.be.empty');
    });

    it('Should populate correct count or display 0', () => {
        cy.get('.home-information-card1-container').within(() => {
            cy.get('span').should('have.text', String(counts.customers));
            cy.get('p').should('have.text', 'Customers');
        });

        cy.get('.home-information-card2-container').within(() => {
            cy.get('span').should('have.text', String(counts.appointments));
            cy.get('p').should('have.text', 'Appointments Booked');
        });

        cy.get('.home-information-card3-container').within(() => {
            cy.get('span').should('have.text', String(counts.salons));
            cy.get('p').should('have.text', 'Salons');
        });

    });
})

describe('Gallery container', () => {
    let salons =

        it('Should display the gallery heading', () => {
            cy.get('h5')
                .should('be.visible')
                .and('contain.text', 'Book your appointment today')
                .and('contain.text', 'deserve!');
        });

    it('Should fetch salons', () => {
        cy.request('/api/shared/salons').as('getSalons')
            .then((response) => {
                expect(response.status).to.eq(200);
                salons = response.body.result;
            })
    })

    it('Should show "No salons to show!" message when there are no salons', () => {
        cy.intercept('/api/salons', { statusCode: 200, body: { result: [] } });
        cy.get('.no-salons').should('be.visible');
        cy.get('.no-salons p').should('have.text', 'No salons to show!');
    });

    it('Should show gallery with correct salon details', () => {
        cy.get('.salon-card').should('have.length.at.most', 5)
            .then(($cards) => {
                const cardsArray = $cards.toArray();

                cardsArray.forEach(($card, index) => {
                    cy.wrap($card)
                        .should('have.css', 'background-image')
                        .then((bg) => {
                            const salonImage = salons[index]?.image;
                            if (salonImage) {
                                expect(bg).to.include(salonImage);
                            } else {
                                expect(bg).to.include('image.png');
                            }
                        });

                    cy.wrap($card).find('h3').should('have.text', salons[index].name);
                    cy.wrap($card).find('h4').should('have.text', salons[index].state);
                    cy.wrap($card).find('p').should('have.text', salons[index].address);
                });
            });
    });

    it('Gallery should rotate the salon cards over time', () => {
        cy.get('.salon-card h3')
            .then(($cards) => {
                const initialNames = [...$cards].map(card => card.innerText);

                cy.wait(2500);

                cy.get('.salon-card h3')
                    .then(($newCards) => {
                        const newNames = [...$newCards].map(card => card.innerText);

                        expect(newNames).to.not.deep.equal(initialNames);
                    });
            });
    });

})