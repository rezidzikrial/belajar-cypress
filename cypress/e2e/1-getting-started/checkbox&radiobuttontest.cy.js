/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

describe('Check UI Elements', () => {
    
    it('Checking Radio Buttons', () => {
        
        cy.visit('https://testautomationpractice.blogspot.com/');

        //check visibility of radio buttons
        cy.get('#male').should('to.be.visible'); //untuk memastikan bahwa tombol male terlihat
        cy.get('input#female').should('to.be.visible'); //untuk memastikan bahwa tombol terlihat

        //selecting radio buttons
        cy.get('input#male').check().should('to.be.checked'); //pilih tombol male
        cy.get('input#female').should('not.to.be.checked'); //memastikan bahwa tombol tidak di pilih

        cy.get('input#female').check().should('to.be.checked');
        cy.get('input#male').should('not.to.be.checked');
    });

    it.only('Checking Check Boxes', () => {
        
        cy.visit('https://testautomationpractice.blogspot.com/');

        //check visibility
        cy.get('input#sunday').should('to.be.visible');

        //Selecting single check box ~sunday
        cy.get('input#sunday').check().should('to.be.checked').and('to.be.visible');
        
        //Unselecting checkbox
        cy.get('input#sunday').uncheck().should('not.to.be.checked');

        //selecting all the check boxes
        cy.get("input.form-check-input[type='checkbox']").check().should('to.be.checked')
        cy.get("input.form-check-input[type='checkbox']").uncheck().should('not.to.be.checked')

        //selecting mutliple checkbox
        cy.get("input.form-check-input[type='checkbox']").check(['wednesday', 'saturday']).should('to.be.checked').and('have.value', 'wednesday', 'saturday');

        // //select first and last checkbox
        // cy.get("input.form-check-input[type='checkbox']").first().check().should('to.be.checked');
        // cy.get("input.form-check-input[type='checkbox']").last().check().should('to.be.checked');
    });
});
