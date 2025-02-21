// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('login', (username, password) => { 
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('match', /inventory.html/)
})

Cypress.Commands.add('addToCart', () => { 
    cy.visit('https://www.saucedemo.com/')
    cy.login('standard_user', 'secret_sauce')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.contains('Remove')
    cy.url().should('match', /cart.html/)
})

Cypress.Commands.add('checkoutStepOne', () =>{
    cy.addToCart()
    cy.get('[data-test="checkout"]').click()
    cy.url().should('match', /checkout-step-one.html/)
})

Cypress.Commands.add('checkoutData', (firstName, lastName, postalCode) =>{
    cy.checkoutStepOne()
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
})

Cypress.Commands.add('checkoutStepTwo', () => {
    cy.checkoutData('Maria', 'Ivanova', '1000')
    cy.url().should('match', /checkout-step-two.html/)
    cy.contains('Total: $')
})

Cypress.Commands.add('checkoutComplete', () => {
    cy.checkoutStepTwo()
    cy.get('[data-test="finish"]').click()
    cy.url().should('match', /checkout-complete.html/)
    cy.contains('Thank you for your order!')
})
//

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })