/// <reference types="cypress"/>

describe('Handle Tables', () => {

    it('Check Number Rows & Colums', () => {
        
        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table');

        //check dropdown select and how many rows are displayed
        cy.get("select[name='example_length']")
        .should('be.visible')
        .select('5')
        .should('have.value', '5')

        cy.get("table[id='example']>tbody>tr").should('be.visible')

        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should('have.text', 'Showing 1 to 5 of 10 entries')

        //check number rows
        cy.get("table[id='example']>tbody>tr").should('have.length', '5')

        //check number colums
        cy.get("table[id='example']>thead>tr>th").should('have.length', '6')

        //check for validation text header table
        const headers = ['Student Name', 'Gender', 'Class Level', 'Home State', 'Major', 'Extracurricular Activity']

        cy.get("table[id='example']>thead>tr>th").each(($th, index) => {
            expect($th.text()).to.eq(headers[index]);
        })

    });

    it('Check Cell data from specific row & colum', () => {

        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table');

        //klik halaman table page ke 2
        cy.get('div[id="example_paginate"]>ul>li:nth-child(3)>a.page-link')
        .should('be.visible')
        .click()

        //validasi kalau berada di table page ke 2
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 4 to 6 of 10 entries').should('be.visible')

        cy.get("table[id='example']>tbody>tr:nth-child(1)>td:nth-child(1)").should('contain', 'Emma Brown')
    });

    it('Read all the rows & Colums data in the first page', () => {
        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table');

        //validasi row pada page table
        cy.get("table[id='example']>tbody>tr").each(($row, $rowIndex) => {
            
            //validasi column pada page table
            cy.wrap($row).find('td').each(($col, $colIndex)=>{
                
                //memvalidasi di cypress runner
                cy.log(`Row ${$rowIndex} - ${$colIndex} : ${$col.text()}`)
            })
        })

        cy.get("table[id='example']>tbody>tr").contains('Alice Johnson').should('exist');

        cy.get('div[class="col-sm-12 col-md-5"]>#example_info')
        .should('have.text', 'Showing 1 to 3 of 10 entries')

        cy.get("table[id='example']>tbody>tr")
        .should('have.length', '3')
    });

    it.only('Pagination', () => {
        
        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table');

        let totalPages = 5

        for(let p=1;p<=totalPages;p++)
        {
            cy.log("Active page is=="+p)

            cy.get("ul[class='pagination']>li:nth-child("+p+")").should('be.visible').click()

            cy.wait(3000)

            cy.get("table[id='example']>tbody>tr").each(($row, index, $rows)=> {
                cy.wrap($row).within(()=> {
                    cy.get("td").then((e)=>{
                        cy.log(e.text); 
                    })
                })
            })

        }

        //check dropdown select and how many rows are displayed
        cy.get("select[name='example_length']")
        .should('be.visible')
        .select('3')
        .should('have.value', '3')

        cy.get("ul[class='pagination']>li:nth-child(2)>a").click()
        //cek validasi jumlah rows
        cy.get("table[id='example']>tbody>tr").should('have.length', '3').should('be.visible')
        //cek validasi jumlah column
        cy.get("table[id='example']>thead>tr>th").should('be.visible').should('have.length', '6')
        //cek validasi showing data table
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 1 to 3 of 10 entries').should('be.visible')

        //cek validasi tombol page next
        cy.get("ul[class='pagination']>li:nth-child(6)").click()
        cy.get("table[id='example']>tbody>tr").should('have.length', '3').should('be.visible')
        cy.get("table[id='example']>thead>tr>th").should('be.visible').should('have.length', '6')
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 4 to 6 of 10 entries').should('be.visible')

        //validasi page akhir
        cy.get("ul[class='pagination']>li:nth-child(5)").click()
        cy.get("table[id='example']>tbody>tr").should('have.length', '1').should('be.visible')
        cy.get("table[id='example']>thead>tr>th").should('be.visible').should('have.length', '6')
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 10 to 10 of 10 entries').should('be.visible')

        //cek validasi tombol page prev
        cy.get("ul[class='pagination']>li:nth-child(1)").click()
        cy.get("table[id='example']>tbody>tr").should('have.length', '3').should('be.visible')
        cy.get("table[id='example']>thead>tr>th").should('be.visible').should('have.length', '6')
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 7 to 9 of 10 entries').should('be.visible')
        
        //cek validasi search
        cy.get("input[type='search']").should('be.visible').click()
        cy.get("input[type='search']").type('Alice Johnson').should('have.value', 'Alice Johnson')
        cy.get("table[id='example']>tbody>tr").should('have.length', '1').should('be.visible')
        cy.get("table[id='example']>thead>tr>th").should('be.visible').should('have.length', '6')
        cy.get('div[class="col-sm-12 col-md-5"]>#example_info').should( 'have.text', 'Showing 1 to 1 of 1 entries (filtered from 10 total entries)').should('be.visible')

    });
    
    
});