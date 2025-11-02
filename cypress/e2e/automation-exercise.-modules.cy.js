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


describe('Automation Exercise Testing that need Register/Logged In page', () => {

    beforeEach(() => {
        //Runs before each test in the block
        //Define viewport and visit the website and click on the login link
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

    it(' TEST 15 - PLACE ORDER: REGISTER BEFORE CHECKOUT', () => {
        //First screen for register        
        login.FillPreRegisterUser();
        //Second screen for register - Enter Account Information
        register.FillRegisterUserComplete();

        //Assertions - same as Test 1
        cy.url().should('include','account_created'); //validate the url text
        cy.contains('b', 'Account Created!'); //check if the text is displayed on page 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');//validate the text on H2 tag with data-qa attribute

         // 1. Add product in cart
        cy.visit('https://automationexercise.com/products');
        cy.get('.features_items .product-image-wrapper').first().trigger('mouseover');
        cy.get('.features_items .product-image-wrapper').first().contains('Add to cart').click();

         // 2. Go to cart page and verify that product is visible in cart
        cy.get('u').contains('View Cart').click();
        cy.url().should('include', '/view_cart');
        cy.get('.cart_info').should('be.visible');

        // 3. Click in "Proceed To Checkout"
        cy.contains('Proceed To Checkout').click();
        //Check if page of review your order is displayed
        cy.contains('h2', 'Review Your Order').should('be.visible'); // ajuste conforme o texto real

        //4. Verify Address Details on the Review Your Order page
        // Verify delivery address details
        cy.get('#address_delivery').should('be.visible');
        //selector: #address_delivery > .address_title > .page-subheading picked up in cypress
        cy.get('#address_delivery > .address_title > .page-subheading').should('contain.text', 'Your delivery address'); //verifying the title of delivery address section
        cy.get('#address_delivery > .address_firstname').should('contain.text', login.name);
        cy.get('#address_delivery').should('contain.text', register.address);
        cy.get('#address_delivery').should('contain.text', register.city);
        cy.get('#address_delivery').should('contain.text', register.state);
        cy.get('#address_delivery').should('contain.text', register.country);
        cy.get('#address_delivery').should('contain.text', register.zipcode);

        // Verify the invoice address - which is the same as delivery address
        cy.get('#address_invoice').should('be.visible');
        cy.get('#address_invoice  > .address_title > .page-subheading').should('contain.text', 'Your billing address'); //verifying the title of delivery address section
        cy.get('#address_invoice  > .address_firstname').should('contain.text', login.name);
        cy.get('#address_invoice').should('contain.text', register.address);
        cy.get('#address_invoice').should('contain.text', register.city);
        cy.get('#address_invoice').should('contain.text', register.state);
        cy.get('#address_invoice').should('contain.text', register.country);
        cy.get('#address_invoice').should('contain.text', register.zipcode);

        //Enter description in comment text area and click 'Place Order'
        cy.get('textarea[name="message"]').type('Please deliver as soon as possible.');
        cy.contains('Place Order').click();

        //5. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.get('.heading').should('contain.text', 'Payment');
        // Aguarde overlays sumirem, se existirem
        cy.get('.modal, .loader, .overlay', { timeout: 10000 }).should('not.exist');
        // Role até o campo
        cy.get('[data-qa="name-on-card"]').scrollIntoView().should('be.visible').and('not.be.disabled');
        // Pequeno wait para garantir fim de animação (último recurso)
        cy.wait(300);
        cy.get('[data-qa="name-on-card"]').type('Test User', { force: true });
        cy.get('[data-qa="card-number"]').type('4111111111111111', { force: true });
        cy.get('[data-qa="cvc"]').type('123', { force: true });
        cy.get('[data-qa="expiry-month"]').type('12', { force: true });
        cy.get('[data-qa="expiry-year"]').type('2030', { force: true });

        //6. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').click();

        // Assertion, success message 'Order Placed!'
        cy.get('[data-qa="order-placed"] > b').should('contain.text', 'Order Placed!');
        cy.contains("p", "Congratulations! Your order has been confirmed!").should("be.visible") 
        cy.get('[data-qa="continue-button"]').should('contain.text', 'Continue');
        
    }); //it

}); // describe

describe('Automation Exercise Testing Without the need to be Login page', () => {

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
        
        //1. Access Products page
        cy.get('a[href="/products"]').click(); 
        // 2. Verify if the products page were loaded 
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');

        // 3. The product list is visible
        cy.get('.features_items').should('be.visible');

        // 4. Check if there is at least one prodsuct on the list 
        cy.get('.features_items').should('have.length.greaterThan', 0);

        // 5. Click on the view product of the first product
        cy.get('.features_items .product-image-wrapper').first().find('a').contains('View Product').click();

        // 6. Check if the detail page were loaded correctly 
        cy.url().should('include', '/product_details');
        cy.get('.product-information').should('be.visible');

        // 7. Verify that detail detail is visible: product name, category, price, availability, condition, brand
        //The checks on last step of testing 
        cy.get('.product-information h2').should('not.be.empty'); // Product Name
        cy.get('.product-information p').should('contain.text', 'Category'); //Category
        cy.get('.product-information span span').should('not.be.empty'); // Price
        cy.get('.product-information p').should('contain.text', 'Availability'); // Availability
        cy.get('.product-information p').should('contain.text', 'Condition'); // Condition
        cy.get('.product-information p').should('contain.text', 'Brand'); //Brand

    }); // it

    it(' TEST 09 - SEARCH PRODUCT', () => {

        //1. Access Products page
        cy.get('a[href="/products"]').click(); 
        // 2. Verify if the products page were loaded 
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');

        // 3. The product list is visible
        cy.get('.features_items').should('be.visible');
        // 4. Type product name in search input and click search button
        //const productName = 'Sleeveless Dress';
        cy.get('#search_product').type('Winter Top');
        cy.get('#submit_search').click();

        // 5. Verify if the searched products page is displayed
        cy.contains('h2', 'Searched Products').should('be.visible');

        // 6. Verify that all the products related to search are visible
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items .product-image-wrapper').each(($el) => {
            cy.wrap($el).find('.productinfo p').should('contain.text', 'Winter Top');
        });

    }); // it

    it(' TEST 10 - VERIFY SUBSCRIPTION IN HOME PAGE', () => {
        // 1. Scroll to bottom of page where 
        cy.get('footer').scrollIntoView();;

        // 2. Verify text SUBSCRIPTION
        cy.contains('h2', 'Subscription').should('be.visible');

        // 3. Enter email address in input and click arrow button
        const randomEmail = getRandomEmail();
        cy.get('#susbscribe_email').type(randomEmail); //There is a typo on page 'susbscribe_email' Needed help from copilot to figure it out.
        cy.get('#subscribe').click();

        // 4. Verify success alert message 'You have been successfully subscribed!' is visible
        cy.get('.alert-success').should('be.visible');
        cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!');
    }); //it


}); // describe
