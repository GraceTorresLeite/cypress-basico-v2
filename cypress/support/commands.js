/*Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const text = 'Teste '
    cy.get('#firstName').type('Grace')
    cy.get('#lastName').type('Kyta')
    cy.get('#email').type('test@test.com')
    cy.get('#phone').type('555198222222')
    cy.get('#open-text-area').type(text.repeat(7), { delay: 0 })
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const text = 'Teste '
    cy.get('#firstName').type('Grace')
    cy.get('#lastName').type('Kyta')
    cy.get('#email').type('test@test.com')
    cy.get('#phone').type('555198222222')
    cy.get('#product').select(1).should('have.value', 'blog') //'Blog'->texto ou 'blog'->value ou (1)->indice
    cy.get('#open-text-area').type(text.repeat(7), { delay: 0 })
    cy.contains('button', 'Enviar').click()
})*/

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const text = 'Teste '
    cy.get('#firstName').type('Grace')
    cy.get('#lastName').type('Kyta')
    cy.get('#email').type('test@test.com')
    cy.get('#phone').type('555198222222')
        //cy.get('[type="radio"]').first().check()
    cy.get('input[type="radio"][value="elogio"]').check().should('have.value', 'elogio')
    cy.get('#open-text-area').type(text.repeat(7), { delay: 0 })
    cy.contains('button', 'Enviar').click()
})