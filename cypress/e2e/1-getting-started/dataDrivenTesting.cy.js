/// <reference types="cypress"/>

describe('Test Suite', () => {

    beforeEach(()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    })

    it('DataDrivenTest', () => {  

        cy.fixture('orangehrm2').then((testcase)=>{
            testcase.forEach((data)=>{
            
                cy.get("input[placeholder='Username']").should('be.visible').clear().type(data.username)
                cy.get("input[placeholder='Password']").should('be.visible').clear().type(data.password)
                cy.get("button[type='submit']").should('be.visible').click()

                
                if(data.expected === 'Dashboard'){
                    cy.get('.oxd-topbar-header-breadcrumb>h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('be.visible').should('have.text', data.expected)

                    cy.url().should('include', '/dashboard')

                    cy.get(".oxd-userdropdown-tab").click() //logout
                    cy.get(":nth-child(4) > .oxd-userdropdown-link").click() //logout
                }else{
                    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should('be.visible', data.expected)
                    cy.url().should('include', '/login')
                }
        
    });
        })
    })

    
});