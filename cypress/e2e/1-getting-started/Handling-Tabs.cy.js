/// <reference types="cypress"/>

describe('Handling Tabs', () => {

    it('Appraoch1', () => {
        
        cy.visit('https://the-internet.herokuapp.com/windows');

            cy.get("a[href='/windows/new']")
            .invoke('removeAttr', 'target')
            .click(); //di cypress tidak bisa membuka halaman baru, jadi hapus dulu atribute dari terget, dan menjalankan di halaman yang sama

            cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new')
            cy.title().should('eq', 'New Window')
            cy.get("div[class='example'] h3").should('be.visible').and('have.text', 'New Window');

            //operations for back to patent tab
            cy.go('back')

    });

    it('Appraoch2', () => {
        
        cy.visit('https://the-internet.herokuapp.com/windows');

           cy.get("a[href='/windows/new']").then((e) => {
                
                const url = e.prop('href')

                cy.visit(url);
           })

           cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new')
            cy.title().should('eq', 'New Window')
            cy.get("div[class='example'] h3").should('be.visible').and('have.text', 'New Window');

            cy.wait(5000)

            //operations for back to patent tab
            cy.go('back')
    });     

    

});