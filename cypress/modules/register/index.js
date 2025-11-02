
import { getTimestamp, getRandomEmail, getRandomGender, getRandomBirthday, getRandomPhone } from '../../support/helpers.js';
import Login from '../login';
import { faker } from '@faker-js/faker';

class Register{
    FillRegisterUserComplete(){
        const birthday = getRandomBirthday();
        const gender = getRandomGender();

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
        cy.get('input#first_name').type(Login.name);
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

    }

    RegisterWithExistingEmail(name, email) {
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
    }   


}

export default new Register();

