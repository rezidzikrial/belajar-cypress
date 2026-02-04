/// <reference types="cypress"/>

describe('Learn Custom Command', () => {

    beforeEach(()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    })

    it('Handling Links using custom command', () => {

        cy.visit("https://automationteststore.com/");
        
        //using custom command
        cy.clickLink("Flash Bronzer Body Gel")

        cy.get('.bgnone').should('be.visible').should('have.text', 'Flash Bronzer Body Gel')
        
    });

    it('overwriting existing command', () => {

        cy.visit("https://automationteststore.com/");
        
        //using custom command
        cy.clickLink("Flash bronzer body gelll")

        cy.get("a[title='Flash Bronzer Body Gel']").should('be.visible').should('have.text', 'Flash Bronzer Body Gel')
        
    });
    
    //login with usig custom command
    it('Validate Login using Custom Commands', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.mwLogin('Admin', 'admin123');

        cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', 'Dashboard')

        cy.url().should('include', '/dashboard')

    });

    //login with usig custom command & fixtures with loop 3 data
    it('Validate Login using Custom Command & with fixtures', () => {
        cy.fixture('orangehrm2').then((users)=>{

        users.forEach((user) => {

        cy.mwLogin(user.username, user.password);

        cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', user.expected)

        cy.url().should('include', '/dashboard')

        cy.get(".oxd-userdropdown-tab").click() //logout
        cy.get(":nth-child(4) > .oxd-userdropdown-link").click() //logout

            });
        });
    });

    //login with usig custom command & fixtures with 1 data in object
    it.only('Validate Login using Custom Command & with fixtures', () => {
        cy.fixture('orangehrmLogin').then((user)=>{
        
        // cy.log(JSON.stringify(user))

        cy.mwLogin(user.username, user.password);

        cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', user.expected)

        cy.url().should('include', '/dashboard')

        });
    });
});


