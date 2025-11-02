class Products {
    goToProductsPage() {
        cy.get('a[href="/products"]').click();
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');
    }

    searchProduct(productName) {
        cy.get('#search_product').type(productName);
        cy.get('#submit_search').click();
        cy.contains('h2', 'Searched Products').should('be.visible');
    }

    viewFirstProductDetail() {
        cy.get('.features_items .product-image-wrapper').first().find('a').contains('View Product').click();
    }
}

export default new Products();