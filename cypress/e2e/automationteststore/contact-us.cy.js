/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

        // describe("Test Automation Contact Us webdriveruniversity", () => {

        //     //Positive Case 
        //     it("Test Successfully send data contact us form webdriveruniversity", () => {
        //         cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html') //untuk menuju pada url yang akan di uji
        //         // cy.get('#contact-us > .thumbnail').click();
        //         cy.get('[name="first_name"]').type('nama pertama');
        //         cy.get('[name="last_name"]').type('nama akhir');
        //         cy.get('[name="email"]').type('iniemail@mail.com');
        //         cy.get('textarea.feedback-input').type('hello world, saya lagi belajar cypress jirr');
        //         cy.get('[type="submit"]').click();
        //     });

        //     //Negative Case
        //     it("Test failed send data contact us form webdriveruniversity", () => {
        //         cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html') //untuk menuju pada url yang akan di uji
        //         cy.get('[name="first_name"]').type('nama pertama');
        //         cy.get('[name="email"]').type('iniemail@mail.com');
        //         cy.get('textarea.feedback-input').type('hello world, saya lagi belajar cypress jirr');
        //         cy.get('[type="submit"]').click();
        //         cy.url().should('include', '/contact_us.php');
        //     });
        // });

        describe('Test Contact Us Form automation for web Automationstoretest.com ', ()=> {
            //positive test
            it('Test Successfully send data contact us form automationstoretest', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('belajar cypress jirr');
                cy.get('[title=Submit]').click();
                cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
                cy.url().should('include', '/success');
            });

            //NEGATIVE TEST
            it('gagal isi form tanpa mengisi semua field', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //tanpa mengisi semua form
                cy.get('[title=Submit]').click();

                //cek error tanpa mengisi nama
                cy.get('.element_error.has-error').should('contain', 'First name: is required field! Name must be between 3 and 32 characters!');

                //cek error tanpa mengisi email
                cy.get('.element_error.has-error').should('contain', 'Email: is required field! E-Mail Address does not appear to be valid!');

                //cek error tanpa mengisi enquiry
                cy.get('.element_error.has-error').should('contain', 'Enquiry: is required field! Enquiry must be between 10 and 3000 characters!');
                
                //cek total keseluruhan error
                cy.get('.element_error.has-error').should('have.length', '3')

                cy.url().should('not.include', '/success');
            });

            it('Tanpa mengisi nama dan mengisi nama kurang dari 3 atau sama dengan 3 dan juga lebih 32 karakter', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title
                
                //tanpa mengisi nama
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('belajar cypress jirr');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain', 'First name: is required field! Name must be between 3 and 32 characters!').and('have.length', '1');
                cy.url().should('not.include', '/success');

                //mengisi nama tapi dengan kurang dari 3 karakter
                cy.get('#ContactUsFrm_first_name').type('gu');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain.text', 'Name must be between 3 and 32 characters!').and('have.length', '1');
                cy.url().should('not.include', '/success');

                // //mengisi nama sama dengan 3 karakter
                // cy.get('#ContactUsFrm_first_name').type('aku');
                // cy.get('[title=Submit]').click();
                // cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
                // cy.url().should('not.include', '/success');

                // //mengisi lebih dari 32 karakter << terjadi bug karna dapat mengirim nama lebih dari 32 karakter
                // cy.get('#ContactUsFrm_first_name').type('a'.repeat(53));
                // cy.get('[title=Submit]').click();
                // cy.get('.element_error.has-error').should('contain.text', 'Name must be between 3 and 32 characters!').and('have.length', '1');
                // cy.url().should('not.include', '/success');

                //mengisi nama sama dengan 32 karakter
                cy.get('#ContactUsFrm_first_name').type('a'.repeat(32));
                cy.get('[title=Submit]').click();
                cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
                cy.url().should('include', '/success');


            }); 
        });


        describe('Negative Test Email form automation for web Automationstoretest.com ', ()=> {
            it('Positive test dengan menginput email', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //mengisi field email tetapi bukan email
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('email@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('belajar cypress jirr');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain', 'E-Mail Address does not appear to be valid!');
            });

            it('Tanpa menginput email', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //tanpa mengisi email
                cy.get('#ContactUsFrm_first_name').type('nama saya');
                cy.get('#ContactUsFrm_enquiry').type('belajar cypress jirr');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain', 'Email: is required field! E-Mail Address does not appear to be valid!');

                //mengisi field email tetapi bukan email
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue'); //seharusnya error karna tidak mengisi email benar
                cy.get('#ContactUsFrm_enquiry').type('belajar cypress jirr');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain', 'E-Mail Address does not appear to be valid!');
            });
        });

        describe('Negative Test enquiry form automation contact us for web Automationstoretest.com ', ()=> {

            it.only('Tanpa menginput pertanyaan', () => {
                cy.visit('https://automationteststore.com/');
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //tanpa menginput field pertanyaan
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain', 'Enquiry: is required field! Enquiry must be between 10 and 3000 characters!').and('have.length', '1');
                cy.url().should('not.include', '/success');
            });

            it.skip('menginput pertanyaan tetapi kurang dari 10 kata', ()=> {
                cy.visit('https://automationteststore.com/');
                cy.xpath("//a[contains(@href,'contact')]").click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //mengisi field pertanyaan tetapi kurang dari 10 kata
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('satu');  //<< bug, 4 kata tetap bisa mengisi enquiry seharusnya 10 and 3000 character
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain.text', 'Enquiry must be between 10 and 3000 characters!').and('have.length', '1');
                cy.url().should('not.include', '/success');
            });

            it.only('menginput pertanyaan sama dengan 10 kata', ()=> {
                cy.visit('https://automationteststore.com/');
                cy.xpath("//a[contains(@href,'contact')]").click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //menginput pertanyaan sama dengan 10 kata
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('a'.repeat(10));
                cy.get('[title=Submit]').click();
                cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
                cy.url().should('include', '/success');
            });

            it.only('menginput pertanyaan sama dengan 3000 kata', ()=> {
                cy.visit('https://automationteststore.com/');
                cy.xpath("//a[contains(@href,'contact')]").click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //menginput pertanyaan sama denga 3000 kata
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('a'.repeat(3000)); //bug 3000 karakter tidak bisa mengisi enquiry
                cy.get('[title=Submit]').click();
                cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
                cy.url().should('include', '/success');
            });

            it.skip('menginput pertanyaan lebih dari 3000 kata', ()=> {
                cy.visit('https://automationteststore.com/');
                cy.xpath("//a[contains(@href,'contact')]").click();
                cy.document().should('have.a.property', 'charset').and('eq', 'UTF-8'); //untuk mendapatkan objek document dari jendela (window) browser yang sedang diuji
                cy.title().should('include', 'Contact Us'); //untuk mengambil judul halaman title

                //menginput pertanyaan lebih dari 3000 kata
                cy.get('.footerlinks li:nth-child(5)').click();
                cy.get('#ContactUsFrm_first_name').type('nama gue');
                cy.get('#ContactUsFrm_email').type('emailgue@mail.com');
                cy.get('#ContactUsFrm_enquiry').type('a'.repeat(3001));
                cy.get('[title=Submit]').click();
                cy.get('.element_error.has-error').should('contain.text', 'Enquiry must be between 10 and 3000 characters!').and('have.length', '1');
                cy.url().should('not.include', '/success');

            });

         });

