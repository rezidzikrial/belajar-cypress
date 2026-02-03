/// <reference types="cypress"/>


describe('veryfying variables, cypress command and jquery command', () => {
    it('Navigating to the specific product pages', () => {
        cy.visit('https://automationteststore.com/');
        cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8');
        
        const ApparelandAcces = cy.get("a[href*='product/category&path=']").contains('Apparel & accessories');
        ApparelandAcces.click();
        cy.url('include', 'path=68');

        const makeUpLink = cy.get("a[href*='product/category&path=']").contains('Makeup');

        const skinCareLink = cy.get("a[href*='product/category&path=']").contains('Skincare');

        const fragranceLink = cy.get("a[href*='product/category&path=']").contains('Fragrance');

        const menLink = cy.get("a[href*='product/category&path=']").contains('Men');

        const hairCareLink = cy.get("a[href*='product/category&path=']").contains('Hair Care');

        const booksLink = cy.get("a[href*='product/category&path=']").contains('Books');

    });
});