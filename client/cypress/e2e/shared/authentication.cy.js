import { beforeEach } from "mocha"

describe('Authentication Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    describe('Register', () => {
        beforeEach(() => {
            cy.contains('Register').click()
        })

        describe('Register view', () => {
            describe('Customer view', () => {
                it('should show switch to Salon option', () => {
                    cy.get('.switch').invoke('text').should('match', /switch to salon/i);
                });

                it('should render correct heading', () => {
                    cy.get('.form-heading').invoke('text').should('match', /register as customer/i);
                });

                it('should render login form with all fields, labels', () => {
                    cy.get('input[name="email"]').should('be.visible')
                    cy.get('input[name="password"]').should('be.visible')
                    cy.get('input[name="confirm-password"]').should('be.visible')
                    cy.get('input[name="first_name"]').should('be.visible')
                    cy.get('input[name="last_name"]').should('be.visible')
                    cy.get('input[name="phone_number"]').should('be.visible')
                    cy.get('.modal-content form').should('be.visible').and('contain', 'submit');
                })

                it('should show "Already have an account? Log in" text', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Already have an account?")
                        .and('contain', 'Log In');
                });
            })

            describe('Salon view', () => {
                beforeEach(() => {
                    cy.get('.switch').click()
                })

                it('should show switch to Customer option', () => {
                    cy.get('.switch').invoke('text').should('match', /switch to customer/i);
                });

                it('should render correct heading', () => {
                    cy.get('.form-heading').invoke('text').should('match', /register as salon/i);
                });

                it('should render login form with all fields, labels', () => {
                    cy.get('input[name="email"]').should('be.visible')
                    cy.get('input[name="password"]').should('be.visible')
                    cy.get('input[name="confirm-password"]').should('be.visible')
                    cy.get('input[name="name"]').should('be.visible')
                    cy.get('input[name="phone_number"]').should('be.visible')
                    cy.get('input[name="state"]').should('be.visible')
                    cy.get('input[name="city"]').should('be.visible')
                    cy.get('input[name="address"]').should('be.visible')
                    cy.get('.modal-content form').should('be.visible').and('contain', 'submit');
                })

                it('should show "Already have an account? Log in" text', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Already have an account?")
                        .and('contain', 'Log In');
                });
            })
        })

        describe('Register Functionality', () => {
            const uniqueEmail = `test${Date.now()}@example.com`;

            describe('Customer registration', () => {
                it('should show notification if fields are empty', () => {
                    cy.get('input[name="email"]').clear();
                    cy.get('input[name="password"]').clear();
                    cy.get('input[name="confirm-password"]').clear();
                    cy.get('input[name="first_name"]').clear();
                    cy.get('input[name="last_name"]').clear();
                    cy.get('input[name="phone_number"]').clear();

                    cy.get('.modal-content form').submit();

                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'This field is required')
                })

                it('should show notification if email is already registered', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('testPassword');
                    cy.get('input[name="first_name"]').type('John');
                    cy.get('input[name="last_name"]').type('Doe');
                    cy.get('input[name="phone_number"]').type('123456789');

                    cy.get('.modal-content form').submit();
                    cy.get('.notification.error').should('contain', 'Email is already in use.');
                })

                it("should show notification if passwords don't match", () => {
                    cy.get('input[name="email"]').type(uniqueEmail);
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('test');
                    cy.get('input[name="first_name"]').type('John');
                    cy.get('input[name="last_name"]').type('Doe');
                    cy.get('input[name="phone_number"]').type('123456789');

                    cy.get('.modal-content form').submit();

                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'Passwords do not match.')
                })

                it('should register a new customer, show a notification and show login modal', () => {
                    cy.get('input[name="email"]').type(uniqueEmail);
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('testPassword');
                    cy.get('input[name="first_name"]').type('John');
                    cy.get('input[name="last_name"]').type('Doe');
                    cy.get('input[name="phone_number"]').type('123456789');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.success').should('contain', 'Registration successful');
                    cy.get('.form-heading').should('contain', 'login as customer');
                });

                it('should switch to login if user has an account', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Already have an account?")
                        .and('contain', 'Log In')
                        .find('a')
                        .click()

                    cy.get('.form-heading')
                        .should('be.visible')
                        .and('contain', 'login as customer');
                });

                afterEach(() => {
                    cy.request('POST', 'http://localhost:8888/api/test/delete-user', {
                        email: uniqueEmail,
                        accountType: 'customer'
                    });
                });
            })

            describe('Salon registration', () => {
                beforeEach(() => {
                    cy.get('.switch').click()
                })

                it('should show notification if fields are empty', () => {
                    cy.get('input[name="email"]').clear();
                    cy.get('input[name="password"]').clear();
                    cy.get('input[name="confirm-password"]').clear();
                    cy.get('input[name="name"]').clear();
                    cy.get('input[name="phone_number"]').clear();
                    cy.get('input[name="state"]').clear();
                    cy.get('input[name="city"]').clear();
                    cy.get('input[name="address"]').clear();

                    cy.get('.modal-content form').submit();

                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'This field is required')
                })

                it('should show notification if email is already registered', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('testPassword');
                    cy.get('input[name="name"]').type('fluffy');
                    cy.get('input[name="phone_number"]').type('123456789');
                    cy.get('input[name="state"]').type('test');
                    cy.get('input[name="city"]').type('test');
                    cy.get('input[name="address"]').type('test');

                    cy.get('.modal-content form').submit();
                    cy.get('.notification.error').should('contain', 'Email is already in use.');
                })

                it("should show notification if passwords don't match", () => {
                    cy.get('input[name="email"]').type(uniqueEmail);
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('test');
                    cy.get('input[name="name"]').type('fluffy');
                    cy.get('input[name="phone_number"]').type('123456789');
                    cy.get('input[name="state"]').type('test');
                    cy.get('input[name="city"]').type('test');
                    cy.get('input[name="address"]').type('test');

                    cy.get('.modal-content form').submit();
                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'Passwords do not match')
                })

                it('should register a new salon, show a notification and show login modal', () => {
                    cy.get('input[name="email"]').type(uniqueEmail);
                    cy.get('input[name="password"]').type('testPassword');
                    cy.get('input[name="confirm-password"]').type('testPassword');
                    cy.get('input[name="name"]').type('fluffy');
                    cy.get('input[name="phone_number"]').type('123456789');
                    cy.get('input[name="state"]').type('test');
                    cy.get('input[name="city"]').type('test');
                    cy.get('input[name="address"]').type('test');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.success').should('contain', 'Registration successful');
                    cy.get('.form-heading').should('contain', 'login as salon');
                });

                it('should switch to login if salon has an account', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Already have an account?")
                        .and('contain', 'Log In')
                        .find('a')
                        .click()

                    cy.get('.form-heading')
                        .should('be.visible')
                        .and('contain', 'login as salon');
                });

                afterEach(() => {
                    cy.request('POST', 'http://localhost:8888/api/test/delete-user', {
                        email: uniqueEmail,
                        accountType: 'salon'
                    });
                });
            })
        });

    })

    describe('Login', () => {
        beforeEach(() => {
            cy.contains('Login').click()
        })

        describe('Login view', () => {
            describe('Customer view', () => {
                it('should show switch to Salon option', () => {
                    cy.get('.switch').invoke('text').should('match', /switch to salon/i);
                });

                it('should render correct heading', () => {
                    cy.get('.form-heading').invoke('text').should('match', /login as customer/i);
                });

                it('should render login form with all fields, labels', () => {
                    cy.get('input[name="email"]').should('be.visible')
                    cy.get('input[name="password"]').should('be.visible')
                    cy.get('.modal-content').find('form .custom-button').should('have.text', 'submit');
                })

                it('should show "Don\'t have an account? Register" text', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Don't have an account?")
                        .and('contain', 'Register');
                });
            })

            describe('Salon view', () => {
                beforeEach(() => {
                    cy.get('.switch').click()
                })

                it('should show switch to Customer option', () => {
                    cy.get('.switch').invoke('text').should('match', /switch to customer/i);
                });

                it('should render correct heading', () => {
                    cy.get('.form-heading').invoke('text').should('match', /login as salon/i);
                });

                it('should render login form with all fields, labels', () => {
                    cy.get('input[name="email"]').should('be.visible')
                    cy.get('input[name="password"]').should('be.visible')
                    cy.get('.modal-content').find('form .custom-button').should('have.text', 'submit');
                })

                it('should show "Don\'t have an account? Register" text', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Don't have an account?")
                        .and('contain', 'Register');
                });
            })
        })

        describe('Login Functionality', () => {
            it('should switch between customer and salon accounts', () => {
                cy.get('.form-heading').invoke('text').should('match', /login as customer/i);
                cy.get('.switch').invoke('text').should('match', /switch to salon/i);
                cy.get('.switch').click();
                cy.get('.form-heading').invoke('text').should('match', /login as salon/i);
                cy.get('.switch').invoke('text').should('match', /switch to customer/i);
            });

            describe('Customer login', () => {
                it('should show error if fields are empty', () => {
                    cy.get('input[name="email"]').clear()
                    cy.get('input[name="password"]').clear()
                    cy.get('.modal-content form').submit()

                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'This field is required')
                });

                it('should render success notification after successful user login and update localStorage', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('123456');
                    cy.get('.modal-content form').submit()

                    cy.get('.notification.success')
                        .should('be.visible')
                        .and('contain', 'Login successful!')

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('user');
                        expect(localStorageData).to.exist;
                        const parsedData = JSON.parse(localStorageData);

                        expect(parsedData).to.have.property('first_name');
                        expect(parsedData.first_name).to.equal('test');
                        expect(parsedData).to.have.property('last_name');
                        expect(parsedData.last_name).to.equal('test');
                        expect(parsedData).to.have.property('id');
                        expect(parsedData.id).to.equal(45);
                    })
                })

                it('should render error notification when login fails with incorrect email and not update localStorage', () => {
                    cy.get('input[name="email"]').type('nonexistent@example.com');
                    cy.get('input[name="password"]').type('wrongpassword');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.error')
                        .should('be.visible')
                        .and('contain', 'User does not exist!');

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('user');
                        expect(localStorageData).to.be.null;
                    });
                });

                it('should render error notification when login fails with incorrect password and not update localStorage', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('wrongpassword');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.error')
                        .should('be.visible')
                        .and('contain', 'Wrong email or password!');

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('user');
                        expect(localStorageData).to.be.null;
                    });
                });

                it('should switch to register if user doesnt have an account', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Don't have an account?")
                        .and('contain', 'Register')
                        .find('a')
                        .click()

                    cy.get('.form-heading')
                        .should('be.visible')
                        .and('contain', 'register as customer');
                });
            })

            describe('Salon login', () => {
                beforeEach(() => {
                    cy.get('.switch').click()
                })

                it('should show error if fields are empty', () => {
                    cy.get('input[name="email"]').clear()
                    cy.get('input[name="password"]').clear()
                    cy.get('.modal-content form').submit()

                    cy.get('.input-error')
                        .should('be.visible')
                        .and('contain', 'This field is required')
                });

                it('should render success notification after successful salon login and update localStorage', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('123456');
                    cy.get('.modal-content form').submit()

                    cy.get('.notification.success')
                        .should('be.visible')
                        .and('contain', 'Login successful!')

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('salon');
                        expect(localStorageData).to.exist;
                        const parsedData = JSON.parse(localStorageData);

                        expect(parsedData).to.have.property('salon_name');
                        expect(parsedData.salon_name).to.equal('test');
                        expect(parsedData).to.have.property('id');
                        expect(parsedData.id).to.equal(40);
                    })
                })

                it('should render error notification when login fails with incorrect email and not update localStorage', () => {
                    cy.get('input[name="email"]').type('nonexistent@example.com');
                    cy.get('input[name="password"]').type('wrongpassword');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.error')
                        .should('be.visible')
                        .and('contain', 'User does not exist!');

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('salon');
                        expect(localStorageData).to.be.null;
                    });
                });

                it('should render error notification when login fails with incorrect password and not update localStorage', () => {
                    cy.get('input[name="email"]').type('test@test.com');
                    cy.get('input[name="password"]').type('wrongpassword');

                    cy.get('.modal-content form').submit();

                    cy.get('.notification.error')
                        .should('be.visible')
                        .and('contain', 'Wrong email or password!');

                    cy.window().then((window) => {
                        const localStorageData = window.localStorage.getItem('salon');
                        expect(localStorageData).to.be.null;
                    });
                });

                it('should switch to register if salon doesnt have an account', () => {
                    cy.get('.existing')
                        .should('be.visible')
                        .and('contain', "Don't have an account?")
                        .and('contain', 'Register')
                        .find('a')
                        .click()

                    cy.get('.form-heading')
                        .should('be.visible')
                        .and('contain', 'register as salon');
                });
            })
        })
    })
})