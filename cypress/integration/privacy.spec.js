it('testa a página Privacy de forma independete', function() {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing')
        .should('be.visible')
})