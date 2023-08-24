/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche campos obrigatórios e envia form', function() {
        const text = 'Teste '

        cy.clock()

        cy.get('#firstName').type('Grace')
        cy.get('#lastName').type('Kyta')
        cy.get('#email').type('test@test.com')
        cy.get('#phone').type('555198222222')
        cy.get('#open-text-area').type(text.repeat(7))
        cy.get('button[type="submit"]').click()
            //Assert
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro e-mail inválido', function() {
        //Actions
        cy.get('#firstName').type('Grace')
        cy.get('#lastName').type('Kyta')
        cy.get('#email').type('test@test,com')
        cy.get('#phone').type('555198222222')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        //Assert
        cy.get('.error').should('be.visible')
    })

    it('validar campo número de telefone', function() {
        //Actions
        cy.get('#phone')
            .type('ghbk')
            //Assert
            .should('have.value', '')
    })
    it('se marcar checkbox telefone fica required', function() {
        //Actions
        cy.get('#firstName').type('Grace')
        cy.get('#lastName').type('Kyta')
        cy.get('#email').type('test@test.com')
        cy.get('#phone-checkbox').check()
            //cy.get('#phone').type('555198222222')
        cy.get('#open-text-area').type('telefone tem que informar')
        cy.get(' [type="submit"]').click()

        //Assert
        cy.get('.error').should('be.visible')
    })

    it('verifica nome, limpa', function() {
            //Actions
            cy.get('#firstName')
                .type('Grace')
                .should('have.value', 'Grace')
                .clear()
                //Assert
                .should('have.value', '')
        })
        //usando comandos
    it('preenche form com sucesso', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('usando select', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    })
    it('usando radio seleção unica', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    })
    it('marca cada seleção do radio', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3) //valida tamanho
            .each(function($radio) { //passa por todas as interações
                cy.wrap($radio).check() //marca todos opções e verifica 
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca cada seleção do checkbox e desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('add file', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.be.checked')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                // console.log($input) // verificando o que vem no terminal para coletar no asserts
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.be.checked')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo drag-drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.be.checked')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) //arrasta arquivo
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para o qual foi dado o alias', function() {
        cy.fixture('example.json').as('sampleFile') // usando um alias
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
    })
    it('elemento tipo âncora (a) seleciona um tipo de elemento target sem a necessidade de abrir outra página', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')

    })
    it('seleciona um tipo de elemento target e retira pra abrir na mesma pagina dos testes em Cypress', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
    it('exibe mensagem por 3 segundos', function() {
        cy.clock()
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })
    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789 ', 20)

        cy.get('#open-text-area').type(longText, { delay: 0 })
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it('Faz uma requisiçao HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) { // função de callback
                //console.log(response)
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include("CAC TAT")
            })
    })
    it.only('encontra o gato', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title') //usando o invoke para mudar o titulo
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu 💚 gatos')
    })
})