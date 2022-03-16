// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        cy.get('#firstName').type('joão')
        cy.get('#lastName').type('Morais')
        cy.get('#email').type('jomorais@email.com')
        cy.get('#open-text-area').type(longtext, { delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('joão')
        cy.get('#lastName').type('Morais')
        cy.get('#email').type('1234,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

   it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
        .type('abc')
        .should('have.value', '')
    })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
       cy.get('#firstName').type('joão')
       cy.get('#lastName').type('Morais')
       cy.get('#email').type('1234.com')
       cy.get('#phone-checkbox').check()
       ///cy.get('#phone').type('abc')
       cy.get('#open-text-area').type('teste')
       cy.contains('button', 'Enviar').click()

       cy.get('.error').should('be.visible')
    })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('joão')
            .should('have.value', 'joão')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Morais')
            .should('have.value', 'Morais')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('1234.com')
            .should('have.value', '1234.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')

    })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

   it('envia o formuário com sucesso usando um comando customizado', function() {
       cy.fillMandatoryFieldsAndSubmit() /// Esse comando personalizado unificou várias linhas de código em uma só.

       cy.get('.success').should('be.visible')
    })

   it('seleciona um produto (YouTube) por seu texto', function() {
       cy.get('#product') /// foi usado a ID do select, mas poderia ser usado apenas 'select'
            .select('YouTube')
            .should('have.value', 'youtube')
    })

   it('seleciona um produto (Mentoria) por seu valor', function() {
    cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
    })

   it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('#check input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) /// simula o upload arrastando o arquivo para a página
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
            cy.url().should('include', 'privacy.html')
    })
})
