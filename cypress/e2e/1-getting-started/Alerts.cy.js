/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

describe('Alerts', () => {

    //Javascript Alert : it will have some text and an 'OK' button
    it.skip('JS Alert', () => {
        
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        cy.get("button[onclick='jsAlert()']").click();

        cy.on('window:alert', (text) => {
            expect(text).to.eq('I am a JS Alert')

        })
        //alert window automatically closed by cypress

        cy.get('#result').should('have.text', 'You successfully clicked an alert')

    });

    //Javascript Confirm Alert : it will have some text with 'OK' and 'Cancel' buttons
    it.skip("JS Alert Confirm 'OK' and 'cancel' ", () => {
        
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        cy.get("button[onclick='jsConfirm()']").click();

        cy.on('window:confirm', (textConfirm) => {
            expect(textConfirm).to.equal('I am a JS Confirm')

            return false; //Cypress closed alert window using cancel button/ gunakan return false jika ingin memilih tombol alert cancel
        })
        //Cypress automatically closed alert window by using OK button~Default // secara default cypress akan menekan tombol alert OK

        cy.get('#result').should('contain', 'You clicked: Cancel');
    });

    //Javascript Pormpt Alert : it will have some text with a textbox for user input along with 'OK'
    it.skip('JS Prompt Alert', () => {
        
        cy.visit('https://the-internet.herokuapp.com/basic_auth');

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(null); //null if you cancel that prompt
        })

        cy.get("button[onclick='jsPrompt()']").click()

        cy.get('#result').should('contain', 'null')

    });

    //Authenticated Alert
    it('Authenticated alert', () => {
        
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {

            auth: {
                username : 'admin',
                password : 'admin'
            }

        });

        cy.get("div[class='example'] p")
        .should('contain', 'Congratulations!');
    });

});