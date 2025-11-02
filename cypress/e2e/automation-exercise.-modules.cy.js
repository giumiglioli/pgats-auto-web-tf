//Automation Exercise Testing Trabalho Final Cypress
//Exercises: 1,2,3,4,5,6,8,9, 10 e 15 implemented.

/// <reference types="cypress" />
import data from '../fixtures/ContactUs.json';
import { getTimestamp, getRandomEmail, getRandomGender, getRandomBirthday, getRandomPhone } from '../support/helpers.js';
import { faker, Faker } from '@faker-js/faker';

//Modular Organization - importing classes
import menu from '../modules/menu/index.js';
import login from '../modules/login/index.js';
import register from '../modules/register/index.js';
import contact from '../modules/contact';


describe('Automation Exercise Testing that need Register/Logged In', () => {

    beforeEach(() => {
        //Runs before each test in the block
        //Define viewport and visit the website
        cy.viewport(`ipad-2`);
        cy.visit('https://automationexercise.com/');
        menu.navigateToLoginPage();

    }); //beforeEach

    it(' TEST 01 - REGISTER USER', () => {
        //First screen for register        
        login.FillPreRegisterUser();
        //Second screen for register - Enter Account Information
        register.FillRegisterUserComplete();

        //Assertions
        cy.url().should('include','account_created'); //validate the url text
        cy.contains('b', 'Account Created!'); //check if the text is displayed on page 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');//validate the text on H2 tag with data-qa attribute
 
        //qagmtester-1761707943789@testing.com

        
    }); // it

    it(' TEST 02 - LOGIN  WITH CORRECT EMAIL AND PASSWORD', () => {

        //First screen for login existing email and correct password
        login.FillLoginFormCorrect();

        //Assertions
        cy.get('i.fa-user').parent().should('contain.text', login.name);
        cy.contains('b', login.name);
        cy.get('a[href="/logout"]').should('be.visible');
        cy.get('a[href="/delete_account"]').should('be.visible');

        
    }); // it

    it (' TEST 03 - LOGIN  WITH INCORRECT EMAIL AND PASSWORD', () => {

        //First screen for login - correct email but wrong password
        login.FillLoginFormIncorrect();

        //Assertions
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!'); // Check Error message
        //cy.contains('Your email or password is incorrect!').should('be.visible');
        cy.get('a[href="/login"]').should('be.visible'); //Check Still showing login screen
        cy.get('[data-qa="login-email"]').should('be.visible'); //Still showing email field

    }); // it

    it(' TEST 04 - LOGOUT USER', () => {
        
        //First screen for logiin
        login.FillLoginFormCorrect();
        //Check if logged in
        cy.get('i.fa-user').parent().should('contain.text', login.name);
        //Act - logout
        login.LougoutUser();
        
        //Assertions
        cy.url().should('include','/login'); //validates if redirected to login page
        cy.get('i.fa-user').should('not.exist'); //validates if logged in message do not exist.
        cy.get('a[href="/logout"]').should('not.exist'); //validates if logout button do not exist.


    }); // it
    
    it(' TEST 05 - REGISTER USER WITH EXISTING EMAIL', () => {

        //First screen for register
        register.RegisterWithExistingEmail( login.name, login.email);

        //Assertions
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!'); // Check Error message
        cy.get('a[href="/login"]').should('be.visible'); //Check Still showing login screen
        cy.get('[data-qa="signup-name"]').should('be.visible'); //Still showing name field
    
    }); // it

}); // describe

describe('Automation Exercise Testing Without the need to be Logged In', () => {

    beforeEach(() => {
        //Runs before each test in the block
        //Define viewport and visit the website
        cy.viewport(`ipad-2`);
        cy.visit('https://automationexercise.com/');
    }); //beforeEach

    it(' TEST 06 - CONTACT US FORM', () => {

        contact.FillContactForm();
        //Assertions
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.'); //validates success message
        cy.get('span').contains('Home'); //validates text on the button after the success message
    
    }); // it

    it(' TEST 08 - VERIFY ALL PRODUCTS AND PRODUCT DETAILS', () => {
        
        cy.get('i.fa-home').parent().should('contain.text', 'Home');
        //Access Products page
        cy.get('a[href="/products"]').click();

        //Access Products page
    }); // it

    it(' TEST 09 - ADD PRODUCTS TO CART', () => {
        //Access Products page
    });
}); // describe
