describe('Central de Atendimento ao Cliente TAT', function() {
    it('testa a página da política de privacidade de forma independente', ()=>{
        cy.visit('./src/privacy.html')
        cy.contains('#title', 'CAC TAT - Política de privacidade')
            .should('be.visible')
        cy.get('#white-background')
            .contains('Talking About Testing')
            .should('be.visible')
    })
})