/// <reference types="cypress"/>
import 'cypress-iframe'
import '@4tw/cypress-drag-drop'


describe('Mouse Operations', () => {

    it('MouseHover', () => {

        cy.visit("https://automationteststore.com/")

        cy.get("a[href='https://automationteststore.com/index.php?rt=index/home&currency=EUR']").should('not.be.visible')

        //menggunakan invoke('show') hidden karna css, untuk menampilakan dropdown hover dan ambil tag parent dropdown list nya
        cy.get('.dropdown-menu.currency').invoke('show')

        cy.get("a[href='https://automationteststore.com/index.php?rt=index/home&currency=EUR']").should('be.visible').click()

        cy.get("ul[class='nav language pull-left'] a[class='dropdown-toggle']").should('be.visible').should('contain.text', 'Euro')

        // cy.visit("https://the-internet.herokuapp.com/hovers")

        // cy.get("div.figcaption").should('be.visible')

        // cy.get("body > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > img:nth-child(1)").trigger('mouseover')
        
        // cy.get("a[href='/users/1']").should('exist')

    });

    it('Right Click', () => {
        cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html")

        // //contoh 1
        // cy.get('.context-menu-one.btn.btn-neutral').should('be.visible').should('have.text', 'right click me').trigger('contextmenu')

        //contoh 2
        cy.get('.context-menu-one.btn.btn-neutral').rightclick().should('be.visible')

        //validasi mempunyai salah satu menu
        cy.get('.context-menu-list.context-menu-root').click({force: true}).should('be.visible').should('contain', 'Edit')

        //validasi jumlah menu
        cy.get('.context-menu-list.context-menu-root>li')
        .should('have.length', 7)

        //validasi mempunyai 7 menu dan 1 visible 
        const expectedMenus = [
            'Edit',
            'Cut',
            'Copy',
            'Paste',
            'Delete',
            '',
            'Quit'
        ]

        cy.get('.context-menu-list.context-menu-root>li')
        .should('have.length', expectedMenus.length)
        .each(($el, index) => {
            cy.wrap($el).should('have.text', expectedMenus[index])
        })
    });

    it('Double click', () => {
        cy.visit("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick")

        cy.frameLoaded('#iframeResult').should('be.visible')

        // //dbclick contoh 1
        // cy.iframe("#iframeResult")
        // .find("p[ondblclick='myFunction()']")
        // .should('be.visible')
        // .trigger('dblclick')
        
        // cy.iframe('#iframeResult')
        // .find('#demo')
        // .should('contain', 'Hello World')
        // .should('be.visible')

        //dbclick contoh 2
        cy.iframe("#iframeResult")
        .find("p[ondblclick='myFunction()']")
        .should('be.visible')
        .dblclick()
        
        cy.iframe('#iframeResult')
        .find('#demo')
        .should('contain', 'Hello World')
        .should('be.visible')
    });

    it('Drag and Drop Using plugin', () => {
        // cy.visit('https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager').wait(5000);

        // cy.frameLoaded("div[class='single_tab_div resp-tab-content resp-tab-content-active'] iframe[class='demo-frame']");
        // cy.iframe("div[class='single_tab_div resp-tab-content resp-tab-content-active'] iframe[class='demo-frame']").find('div[class="ui-widget ui-helper-clearfix"]>ul>li:nth-child(1)').should('be.visible')
        // cy.iframe("div[class='single_tab_div resp-tab-content resp-tab-content-active'] iframe[class='demo-frame']").find('#trash').should('be.visible')

        // // cy.iframe("div[class='single_tab_div resp-tab-content resp-tab-content-active'] iframe[class='demo-frame']").find('li:nth-child(1)').find('#trash')

        // //drag dalam iframe
        // cy.iframe('iframe.demo-frame:first').within(() => {
        // cy.get('li:nth-child(1)').drag('#trash', { force: true })

        // })

        cy.visit('https://demos.telerik.com/aspnet-ajax/dragdropmanager/overview/defaultcs.aspx')
        
        //contoh 1
        cy.get("#draggable").should('be.visible')
        cy.get("#ctl00_ContentPlaceholder1_droptarget").should('be.visible')

        cy.get('#draggable').drag('#ctl00_ContentPlaceholder1_droptarget', {force:true})

        cy.get("#ctl00_ContentPlaceholder1_droptarget").should('be.visible').should('have.text', 'You did great!');
    });

        it.only('Scrolling Page', () => {
            cy.visit('https://www.worldometers.info/geography/flags-of-the-world/')

            cy.get("body div div:nth-child(80)").scrollIntoView({duration:2000}).should('be.visible')
            cy.get("body div div:nth-child(80)>span").should('contain.text', 'Indonesia')

            cy.get("img[alt='Argentina']").scrollIntoView({duration:3000}).should('be.visible')
            cy.get("body div div:nth-child(7)>span").should('contain.text', 'Argentina')

            cy.get(".flex.flex-col.items-center.justify-center.gap-4.border-y.pt-12.pb-8").scrollIntoView({duration:1000}).should('be.visible')
            cy.get("div[class='text-zinc-200']>a:nth-child(4)").should('contain.text', 'contact')
        });
    });