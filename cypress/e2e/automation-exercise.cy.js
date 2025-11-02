//Automation Exercise Testing Trabalho Final Cypress
//Exercises: 1,2,3,4,5,6,8,9, 10 e 15 implemented.

/// <reference types="cypress" />
import data from '../fixtures/ContactUs.json';
import { getTimestamp, getRandomEmail, getRandomGender, getRandomBirthday, getRandomPhone } from '../support/helpers.js';
import { faker, Faker } from '@faker-js/faker';

//Global Variables 
// Grab name to create a user in test 01 and reuse on tests 02,03,04 and 05
const name = faker.person.firstName();
const email = getRandomEmail();

describe('Automation Exercise Testing', () => {

    beforeEach(() => {
        //Runs before each test in the block
        //Define viewport and visit the website
        cy.viewport(`ipad-2`);
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click(); 

    }); //beforeEach

    it(' TEST 01 - REGISTER USER', () => {

        const birthday = getRandomBirthday();
        const gender = getRandomGender();

        //First screen for register
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click();

        //Second screen for register - Enter Account Information
        cy.get('input[type="radio"]').check(gender);
        cy.get('input#password').type('QAgmteste1234'),{log: false};//to hide password in Cypress logs
        //para comboboxes ou selects -> select
        cy.get('select[data-qa=days]').select(birthday.day);
        cy.get('select[data-qa=months]').select(birthday.month);
        cy.get('select[data-qa=years]').select(birthday.year); 
        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();
        //Address Information session
        cy.get('input#first_name').type(name);
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type(`GM ${faker.company.name()}`);
        cy.get('input#address1').type(faker.location.streetAddress());
        //cy.get('input#address2').type('Apto 101'); NO need to fill this information
        cy.get('select#country').select('United States');
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get('[data-qa="mobile_number"]').type(getRandomPhone());

        //Act
        cy.get('[data-qa="create-account"]').click();

        //Assertions
        cy.url().should('include','account_created'); //validate the url text
        cy.contains('b', 'Account Created!'); //check if the text is displayed on page 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');//validate the text on H2 tag with data-qa attribute
 
        //qagmtester-1761707943789@testing.com

        
    }); // it

    it(' TEST 02 - LOGIN  WITH CORRECT EMAIL AND PASSWORD', () => {

        //First screen for login existing email and password correct
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(`QAgmteste1234`);
        cy.get('[data-qa="login-button"]').click();

        //Assertions
        cy.get('i.fa-user').parent().should('contain.text', name);
        cy.contains('b', name);
        cy.get('a[href="/logout"]').should('be.visible');
        cy.get('a[href="/delete_account"]').should('be.visible');

        
    }); // it

    it (' TEST 03 - LOGIN  WITH INCORRECT EMAIL AND PASSWORD', () => {

        //First screen for login - correct email but wrong password
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(`QAgmteste4321`);//wrong password
        cy.get('[data-qa="login-button"]').click();

        //Assertions
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!'); // Check Error message
        //cy.contains('Your email or password is incorrect!').should('be.visible');
        cy.get('a[href="/login"]').should('be.visible'); //Check Still showing login screen
        cy.get('[data-qa="login-email"]').should('be.visible'); //Still showing email field

    }); // it

    it(' TEST 04 - LOGOUT USER', () => {
        
        //First screen for logiin
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(`QAgmteste1234`);
        cy.get('[data-qa="login-button"]').click();

        cy.get('i.fa-user').parent().should('contain.text', name);
        //Act - logout
        cy.get('a[href="/logout"]').should('be.visible').click();
        
        //Assertions
        cy.url().should('include','/login'); //validates if redirected to login page
        cy.get('i.fa-user').should('not.exist'); //validates if logged in message do not exist.
        cy.get('a[href="/logout"]').should('not.exist'); //validates if logout button do not exist.


    }); // it
    
    it(' TEST 05 - REGISTER USER WITH EXISTING EMAIL', () => {

        //First screen for register
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click();

        //Assertions
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!'); // Check Error message
        cy.get('a[href="/login"]').should('be.visible'); //Check Still showing login screen
        cy.get('[data-qa="signup-name"]').should('be.visible'); //Still showing name field
    
    }); // it

    it(' TEST 06 - CONTACT US FORM', () => {

        cy.get('a[href="/contact_us"]').click(); // access contact us page
        cy.get('div.contact-form > .title').should('have.text', 'Get In Touch'); //validates if the user is on contact us page
        //Fill the form
        cy.get('[data-qa="name"]').type(data.name);
        cy.get('[data-qa="email"]').type(data.email);
        cy.get('[data-qa="subject"]').type(data.subject);
        cy.get('[data-qa="message"]').type(data.message);

        //Uploading an image file on Contact US form
        cy.get('input[type="file"]').selectFile('cypress/fixtures/BuildReadyMeme.jpg');

        //Act
        cy.get('[data-qa="submit-button"]').click();
        //Assertions
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.'); //validates success message
        cy.get('span').contains('Home'); //validates text on the button after the success message
    
    }); // it

}); // describe
