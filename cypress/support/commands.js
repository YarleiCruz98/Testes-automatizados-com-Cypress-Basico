// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('preencheCamposObrigatoriosEnviar', (name, lastName, email) =>{

    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

    cy.get('#firstName')
        .should('be.visible')
        .type(name)
        .and('have.value', name)

    cy.get('#lastName')
        .should('be.visible')
        .type(lastName)
        .and('have.value', lastName)    

    cy.get('#email')
        .should('be.visible')
        .type(email, {log: false})     

    cy.get('#open-text-area')
        .should('be.visible')
        .type(longText)
        .and('have.value', longText, {delay:0})

    cy.get('.button[type="submit"]')
        .click()
    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible', {timeout: 10000})
})