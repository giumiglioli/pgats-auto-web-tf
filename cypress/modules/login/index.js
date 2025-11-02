import { getRandomEmail } from '../../support/helpers'; 
import { faker } from '@faker-js/faker';

class Login{
    constructor(){ // created to use the same name and email on the register complete form/other modules
        this.name = '';
        this.email = '';
        this.password = 'QAgmteste1234';
    }

    FillPreRegisterUser(){

        this.name = faker.person.firstName() + faker.person.lastName();
        this.email = getRandomEmail();

        cy.get('[data-qa="signup-name"]').type(this.name);
        cy.get('[data-qa="signup-email"]').type(this.email)

        cy.contains('button', 'Signup').click();
    }

    FillLoginFormCorrect(){
        cy.get('[data-qa="login-email"]').type(this.email);
        cy.get('[data-qa="login-password"]').type(this.password);
        cy.get('[data-qa="login-button"]').click();
    }

    FillLoginFormIncorrect(){
        cy.get('[data-qa="login-email"]').type(this.email);
        cy.get('[data-qa="login-password"]').type(`QAgmteste4321`);//wrong password
        cy.get('[data-qa="login-button"]').click();
    }

    LougoutUser(){
        cy.get('a[href="/logout"]').should('be.visible').click();
    }

 }

export default new Login();