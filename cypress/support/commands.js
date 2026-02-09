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
// Cypress.Commands.add('login', (email, password) => { ... })
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
/// <reference types="cypress"/>
const BASEURL = 'https://www.saucedemo.com/'


    Cypress.Commands.add('getIframe', (iframe) => {
        return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap);
    });


    //custom command link button

    Cypress.Commands.add('clickLink', (label) => {
        cy.get('a').contains(label).click()

    })

    //Over write contains()
    Cypress.Commands.overwriteQuery('contains', (originalFn, subject, filter, text, options = {}) => {
        options.matchCase = false

        // kalau dipanggil sebagai cy.contains()
        if (subject === undefined) {
        return originalFn(filter, text, options)
        }

        // kalau dipanggil sebagai cy.get().contains()
        return originalFn(subject, filter, text, options)
  })

//   Cypress.Commands.add('mwLogin', (username, password) => {

//         cy.get("input[placeholder='Username']").should('be.visible').type(username)
//         cy.get("input[placeholder='Password']").should('be.visible').type(password)
//         cy.get("button[type='submit']").should('be.visible').click()


//   })

//custom command login with using fixtures
  Cypress.Commands.add('mwLogin', (username, password) => {
    cy.fixture('orangehrmLogin').then((user)=>{

         // DEBUG
        // cy.log('USERNAME:', username)
        // cy.log('PASSWORD:', password)

        cy.get("input[placeholder='Username']").should('be.visible').type(username)
        cy.get("input[placeholder='Password']").should('be.visible').type(password)
        cy.get("button[type='submit']").should('be.visible').click()
        cy.wait(5000)

});
});

