//Lodash
Cypress._.times(5, function() {
        it('testa a página Privacy de forma independente', function() {
            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing')
                .should('be.visible')
        })
    }) //repete o teste várias vezes