describe('mySuite', () => {

    it('Capture screenshots & Videos', () => {

        cy.visit('https://automationteststore.com/')
        // cy.screenshot("Home Page")

        // cy.wait(5000)

        //Automatically capture screenshot & video on failure -only when i execute through CLI : 
        // for example : npx cypress run --spec cypress\e2e\1-getting-started\CaptureSS&Videos.cy.js

        cy.get("div[id='block_frame_featured_1769'] a[title='BeneFit Girl Meets Pearl']").click() //BeneFit Girl Meets Pearl
        
        cy.get('.bgnone').should('have.text', 'Face Wash')
    });
});