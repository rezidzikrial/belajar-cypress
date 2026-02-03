/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

describe('Handle Dropdowns', () => {

    it.skip('Dropdown with select', () => {
        
        cy.visit('https://www.zoho.com/commerce/free-demo.html')
        cy.get('.cwf-change-country').click();
        cy.get('#zcf_address_country_1')
        .select('Indonesia')
        .should('have.a.value', 'Indonesia');

    });

    it.skip('Dropdown without select ', () => {
        
        cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

        cy.get('#select2-billing_country-container').click();
        cy.get("input[role='combobox']").type('Indonesia').type('{enter}');
        cy.get('#select2-billing_country-container').should('have.a.text', 'Indonesia');
    });

    it.skip('Dropdown with auto suggestions', () => {
        
        cy.visit('https://www.wikipedia.org/');

        // cy.get('#searchInput').click()
        cy.get('#searchInput').type('Jakarta');
        cy.get('.suggestion-link').should('to.have.property', '3')
        cy.get('.suggestion-link').contains("Jakarta MRT").click();
        cy.url().should('include', 'Jakarta_MRT');

        
            cy.origin('https://en.wikipedia.org', () => {
            cy.get('#firstHeading')
            .should('contain.text', 'Jakarta MRT');
            })
        
    });

    it('Dynamic Dropdowns', () => {
        
        cy.visit('https://www.google.com/');

        cy.get("textarea[name$='q']").type('cypress automation');

        cy.wait(3000);

        cy.get('div.wM6W7d>span').should('have.length', 13);

        cy.get('div.wM6W7d>span').each( ($el, index, $list) => {
            if($el.text()=='cypress automation tutorial')
            {
                cy.wrap($el).click();
            }
        })

        cy.get("textarea[name$='q']").should('have.value', 'cypress automation tutorial')
        
    });

});