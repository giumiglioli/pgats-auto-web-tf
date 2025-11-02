class Menu{

    navigateToLoginPage(){
        cy.get('a[href="/login"]').click(); 
    }
}

export default new Menu();