//cy.go('back') => kembali ke page sebelumnya -1
//cy.go('forward') => kembali ke page sebelumnya lagi +1
//cy.reload() reload page

describe('Browser Navigation', () => {

    it('Navigation Test', () => {
        cy.visit('https://automationteststore.com/') //homepage
        cy.title().should('eq', 'A place to practice your automation skills!')

        cy.get("div[id='block_frame_featured_1769'] a[title='Skinsheen Bronzer Stick']").should('be.visible')
        .click()
        cy.title().should('eq', 'Skinsheen Bronzer Stick')
        cy.url().should('include', 'product_id=50')
        cy.get(".bgnone").should('have.text', 'Skinsheen Bronzer Stick').should('be.visible') //page product

        

        cy.go('back')//back to homepage
        cy.title().should('eq', 'A place to practice your automation skills!')
        cy.url().should('eq', 'https://automationteststore.com/')

        

        cy.go('forward') //back to page product
        cy.title().should('eq', 'Skinsheen Bronzer Stick')
        cy.url().should('include', 'product_id=50')
        cy.get('.easyzoom > .local_image > img').should('be.visible')
        cy.get(".bgnone").should('have.text', 'Skinsheen Bronzer Stick').should('be.visible')
        cy.get("div[id='description'] p").should('be.visible')
        

        cy.go(-1) //homepage

        cy.go(1) //page product

        cy.reload(true) //reload in product page
        cy.title().should('eq', 'Skinsheen Bronzer Stick').should('be.visible')
        cy.url().should('include', 'product_id=50')
        cy.get(".bgnone").should('have.text', 'Skinsheen Bronzer Stick').should('be.visible') //page product
    });
});