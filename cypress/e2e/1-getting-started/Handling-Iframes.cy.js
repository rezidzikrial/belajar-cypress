/// <reference types="cypress"/>
import 'cypress-iframe'


describe('Handling iframe', () => {

    it('Appraoch1', () => {

        cy.visit('https://qa-practice.razvanvancea.ro/iframe.html')

        const iframe = cy.get('#iframe-checkboxes')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
        
        iframe.click();
        iframe.should('contain', 'his text appears when you click the "Learn more" button')

    });

    it('Appraoch2 by using custom commands', () => {

        cy.visit('https://qa-practice.razvanvancea.ro/iframe.html')

        cy.getIframe('#iframe-checkboxes').find('#learn-more').click();
        cy.getIframe('#iframe-checkboxes').find("button[aria-label='Toggle navigation']").click()
        cy.getIframe('#iframe-checkboxes').should('contain', 'his text appears when you click the "Learn more" button').and('contain', 'Hello, this is an Iframe!')
        
    });

    it.only('Appraoch3 by using plugin iframe', () => {

        cy.visit('https://qa-practice.razvanvancea.ro/iframe.html')

        cy.frameLoaded("#iframe-checkboxes")
        cy.iframe("#iframe-checkboxes").find("button[aria-label='Toggle navigation']").click();
        cy.iframe("#iframe-checkboxes").should('contain', 'his text appears when you click the "Learn more" button').and('contain', 'Hello, this is an Iframe!')
        cy.iframe("#iframe-checkboxes").should('be.visible')
        cy.iframe("#iframe-checkboxes").find("button[aria-label='Toggle navigation']").click()
        cy.iframe("#iframe-checkboxes").should('contain', 'Home').and('contain', 'Disabled')
        
    });
});   