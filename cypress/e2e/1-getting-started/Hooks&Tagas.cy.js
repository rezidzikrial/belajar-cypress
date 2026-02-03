/// <reference types="cypress"/>

/*HOOKS
after
before
beforeEach
AfterEach
*/

/*TAGS
filtering
grouping
menjalankan test tertentu
*/

describe('Hooks & Tags', {tags: ['smoke']}, () => {
    
    before(()=>{
        cy.log('***** Launch App *****') //dijalan sekali sebelum semua test
    })

    beforeEach(()=>{
        cy.log('***** Login *****') //dijalankan setiap kali sebelum test
    })


    it('Search', () => {
        cy.log('searching')
    });

    it('Advance Search', () => {
       cy.log('advance search') 
    });

    it('Listing Product', () => {
        cy.log('listing product')
    });


    afterEach(()=>{
        cy.log('***** Logout *****') //dilakukan setiap kali selesai test
    })

    after(()=>{
      cy.log('***** Close App *****') //dilakukan 1 kali setelah semua test
    })
});