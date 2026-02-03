/// <reference types="cypress"/>
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload'

describe('Flie Uploads', () => {

    it('Single File Upload', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')

        //file upload cypress
        cy.get('#file-upload').should('be.visible').attachFile('sample1.pdf')

        cy.get('#file-submit').click()
        
        //validation
        cy.get("div[class='example'] h3").should('be.visible').should('have.text', 'File Uploaded!')
        cy.get('#uploaded-files').should('be.visible').should('contain.text', 'sample1.pdf')
    });

    it('File Upload - Rename', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')

        //custom name file/rename name file
        cy.get('#file-upload').should('be.visible').attachFile({
            filePath:'sample1.pdf', 
            fileName:'custom_Name_File.pdf'})

        cy.get('#file-submit').click()

        //validation
        cy.get("div[class='example'] h3").should('be.visible').should('have.text', 'File Uploaded!')
        cy.get('#uploaded-files').should('be.visible').should('contain.text', 'custom_Name_File.pdf')
    });

    it('File Upload - Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')

        //drag n drop file
        cy.get('#drag-drop-upload').attachFile('sample2.jpg', {
            subjectType: 'drag-n-drop'
        })

        //validation
        cy.get('#drag-drop-upload > .dz-preview > .dz-details > .dz-filename').should('be.visible').should('contain.text', 'sample2.jpg')
        cy.get("div[class='dz-preview dz-processing dz-image-preview dz-success dz-complete'] div[class='dz-success-mark']").should('be.visible')
        
    });

    it('Multiple files Upload', () => {
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')

        cy.get('#filesToUpload').attachFile(['sample1.pdf', 'sample2.jpg']).should('be.visible')

        cy.get("#fileList").should('be.visible').should('have.text', 'sample1.pdfsample2.jpg')
        
    });

    it.only('Files Upload - Shadow DOM      ', () => {
        cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm');

        cy.get('.smart-browse-input', {includeShadowDom:true}).attachFile('sample1.pdf')

        cy.get('.smart-file', {includeShadowDom:true}).contains('sample1.pdf').should('be.visible')

        cy.get("div.smart-file-upload-footer").shadow().find("smart-button[id='button4ea4']").contains('UPLOAD ALL')

    });
});