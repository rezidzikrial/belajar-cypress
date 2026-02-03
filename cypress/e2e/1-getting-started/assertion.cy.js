/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
/* 
Cypress Assertions
========================================================================

1) Implicit assertions

    should
    and

eq
contain
include
exist
be.visible
have.length
have.value
have.a.property
etc....

2) Explicit Assertions

    expect
    assert

*/

describe('assertions demo', () => {

    it('Implicit Assertions', () => {
        
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        // //should, and
        // cy.url().should('include', 'orangehrmlive.com') //url check
        // cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        // cy.url().should('contain', 'orangehrm')

        // //u can also do this
        // cy.url().should('include', 'orangehrmlive.com')
        // .should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        // .should('contain', 'orangehrm')

        //and u can also do this
        cy.url().should('include', 'orangehrmlive.com')
        .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        .and('contain', 'orangehrm')
        .and('not.contain', 'blackhrm');
        
        cy.title().should('eq','OrangeHRM')

        //title check
        cy.title().should('eq', 'OrangeHRM')
        .and('include', 'HRM')
        .and('contain', 'Orange')

        //check logo or picture and etc...
        cy.get('.orangehrm-login-branding > img').should('to.be.visible') //logo be visible/terlihat
        .and('exist'); //logo exist

        cy.xpath("//a['href']").should('have.length', '5'); //check jumlah links

        cy.get("input[placeholder='Username']").type('Admin') //menginput element filed username "Admin"
        .and('have.value', 'Admin'); //provide a value into inputbox

    });

    it.only('Explicit Assertions', () => {
        
        cy.visit('https://www.saucedemo.com/')
        cy.title().should('include', 'Swag Labs')
        cy.get("#user-name").type('standard_user');
        cy.get("#password").type('secret_sauce');
        cy.get("#login-button").click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

        cy.get("a[id='item_4_title_link'] div[class='inventory_item_name ']").click();

        let bagPackName = "Sauce Labs Backpack";

        cy.get('[data-test="inventory-item-name"]').then((x) => {
            
            let actName = x.text()

            //BDD Style
            expect(actName).to.equal(bagPackName);
            // expect(actName).to.not.equal(bagPackName); //negative test

            //TDD Style
            assert.equal(actName,bagPackName); 
            assert.notEqual(actName, bagPackName); //ngeative test
        })

    });
});