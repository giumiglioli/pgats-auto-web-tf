
import { getTimestamp, getRandomEmail, getRandomGender, getRandomBirthday, getRandomPhone } from '../../support/helpers.js';
import Login from '../login';
import { faker } from '@faker-js/faker';

class Register{
    //Properties to store user information 
        address = '';
        city = '';
        state = '';
        country = '';
        zipcode = '';



    FillRegisterUserComplete(){
        const birthday = getRandomBirthday();
        const gender = getRandomGender();

        this.address = faker.location.streetAddress();
        this.city = faker.location.city();
        this.state = faker.location.state();
        this.country = 'United States';
        this.zipcode = faker.location.zipCode();

        cy.get('input[type="radio"]').check(gender);
        cy.get('input#password').type('QAgmteste1234', { log: false }); //to hide password in Cypress logs
        cy.get('select[data-qa=days]').select(birthday.day);
        cy.get('select[data-qa=months]').select(birthday.month);
        cy.get('select[data-qa=years]').select(birthday.year);
        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();
        //Address Information session
        cy.get('input#first_name').type(Login.name);
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type(`GM ${faker.company.name()}`);
        cy.get('input#address1').type(this.address);
        cy.get('select#country').select(this.country);
        cy.get('input#state').type(this.state);
        cy.get('input#city').type(this.city);
        cy.get('[data-qa="zipcode"]').type(this.zipcode);
        cy.get('[data-qa="mobile_number"]').type(getRandomPhone());

        
        cy.get('[data-qa="create-account"]').click();
    }


    

    RegisterWithExistingEmail(name, email) {
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
    }   


}

export default new Register();

