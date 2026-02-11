import Login from "../../PageObjects/LoginPage";

describe('Learn Page Object Model', () => {

    const loginPage = new Login()

    beforeEach(()=> {
        loginPage.visit()
    })

    it.skip('Login POM', () => {

        loginPage.login('Admin', 'admin123')
        cy.wait(5000)
        loginPage.verifyLogin();

    });

    it.only('Login POM with fixuture', () => {
        cy.fixture('orangehrmLogin').then((user)=>{

        loginPage.login(user.username, user.password)

        loginPage.verifyLogin()
        })
        
    });

    it('Login POM with fixuture & custom command', () => {
        
        cy.fixture('orangehrm2').then((users)=> {
            users.forEach((user)=>{
            
            cy.loginPomCc(user.username, user.password)

            if(user.expected === 'Dashboard'){
                loginPage.verifyLogin()
                loginPage.logoutButton()
            }else{
                cy.get('.oxd-alert').should('be.visible').should('have.text', user.expected)
                cy.url().should('include', '/login')
            }
            })
        })

    });
});
