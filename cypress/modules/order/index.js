class Order {
    addFirstProductToCart() {
        cy.visit('https://automationexercise.com/products');
        cy.get('.features_items .product-image-wrapper').first().trigger('mouseover');
        cy.get('.features_items .product-image-wrapper').first().contains('Add to cart').click();
    }

    goToCartAndCheckout() {
        cy.get('u').contains('View Cart').click();
        cy.url().should('include', '/view_cart');
        cy.get('.cart_info').should('be.visible');
        cy.contains('Proceed To Checkout').click();
    }

    fillOrderCommentAndPlaceOrder() {
        cy.get('textarea[name="message"]').type('Comment on the order: Please deliver as soon as possible.');
        cy.contains('Place Order').click();
    }

    fillPaymentDetails() {
        cy.get('.heading').should('contain.text', 'Payment');
        cy.get('.modal, .loader, .overlay', { timeout: 10000 }).should('not.exist');
        cy.get('[data-qa="name-on-card"]').scrollIntoView().should('be.visible').and('not.be.disabled');
        cy.get('[data-qa="name-on-card"]').type('Test User', { force: true });
        cy.get('[data-qa="card-number"]').type('4111111111111111', { force: true });
        cy.get('[data-qa="cvc"]').type('123', { force: true });
        cy.get('[data-qa="expiry-month"]').type('12', { force: true });
        cy.get('[data-qa="expiry-year"]').type('2030', { force: true });
        cy.get('[data-qa="pay-button"]').click();
    }
}

export default new Order();