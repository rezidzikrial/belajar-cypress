/// <reference types="cypress"/>

describe('My Test Suite', () => {

    // //direct access
    // it('Fixtures Demo Test', () => {
    //     cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //     cy.wait(3000)

    //     cy.fixture('orangehrmLogin').then((data)=> {
    //         cy.get("input[placeholder='Username']").should('be.visible').type(data.validUser.username)
    //         cy.get("input[placeholder='Password']").should('be.visible').type(data.validUser.password)
    //         cy.get("button[type='submit']").should('be.visible').click()

    //         cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', data.validUser.expected)
    //     })

    // });

    let loginData

    beforeEach(()=>{
        cy.fixture('orangehrmLogin').then((data)=>{
            loginData = data
        })
    })

    //access through hook - for multiple it blocks
    it('Fixtures Demo Test', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.wait(3000)

        cy.get("input[placeholder='Username']").should('be.visible').type(loginData.validUser.username)
        cy.get("input[placeholder='Password']").should('be.visible').type(loginData.validUser.password)
        cy.get("button[type='submit']").should('be.visible').click()

        cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', loginData.invalidUser.expected)
    });


});