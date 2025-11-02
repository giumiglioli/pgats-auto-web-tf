import data from '../../fixtures/ContactUs.json';

class ContactForm{
    FillContactForm() {
        cy.get('a[href="/contact_us"]').click(); // access contact us page
        cy.get('div.contact-form > .title').should('have.text', 'Get In Touch'); //validates if the user is on contact us page
        //Fill the form
        cy.get('[data-qa="name"]').type(data.name);
        cy.get('[data-qa="email"]').type(data.email);
        cy.get('[data-qa="subject"]').type(data.subject);
        cy.get('[data-qa="message"]').type(data.message);
        /*
        Both options are valid, choosing one of them.
        cy.fixture('ContactUs.json').then((data) => {
            cy.get('[data-qa="name"]').type(data.name);
            cy.get('[data-qa="email"]').type(data.email);
            cy.get('[data-qa="subject"]').type(data.subject);
            cy.get('[data-qa="message"]').type(data.message); 
        };*/
        //Uploading an image file on Contact US form
        cy.get('input[type="file"]').selectFile('cypress/fixtures/BuildReadyMeme.jpg');

        //Act
        cy.get('[data-qa="submit-button"]').click();
    }
}

export default new ContactForm();