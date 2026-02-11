class Login {

    usernameInput () {
        return cy.get("input[placeholder='Username']").should('be.visible')
    }

    passwordInput () {
        return cy.get("input[placeholder='Password']").should('be.visible')
    }

    loginButton () {
        return cy.get("button[type='submit']").should('be.visible')
    }

    verifyLogin() {
        cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('be.visible').should('have.text', 'Dashboard')
        cy.url('include', 'dashboard')
    }

    logoutButton() {
        cy.get(".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon").should('be.visible').click()
        cy.get("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > header:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)").should('be.visible').click()
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    login (username, password) {
       this.usernameInput().type(username) 
       this.passwordInput().type(password) 
       this.loginButton().click()
       cy.wait(5000)
    }


}
export default Login