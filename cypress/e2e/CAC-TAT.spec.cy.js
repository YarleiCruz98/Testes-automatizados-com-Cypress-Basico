describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(()=>{
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', ()=> {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', ()=> {
        cy.get('input[type="text"][id="firstName"]')
            .should('be.visible')
            .type(Cypress.env('user_firstName'))
            .and('have.value', Cypress.env('user_firstName'))
        
        cy.get('#lastName')
            .should('be.visible')
            .type(Cypress.env('user_lastName'))
            .and('have.value', Cypress.env('user_lastName'))    

        cy.get('#email')
            .should('be.visible')
            .type(Cypress.env('user_email'), {log: false})     

        cy.get('#open-text-area')
            .should('be.visible')
            .type('teste')
            .and('have.value', 'teste', {delay:0})

        cy.contains('button', 'Enviar')
            .click()
        cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible', {timeout: 10000})

    })

    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
        cy.get('#firstName')
        .should('be.visible')
        .type(Cypress.env('user_firstName'))
        .and('have.value', Cypress.env('user_firstName'))
    
        cy.get('#lastName')
            .should('be.visible')
            .type(Cypress.env('user_lastName'))
            .and('have.value', Cypress.env('user_lastName'))    

        cy.get('#email')
            .should('be.visible')
            .type(Cypress.env('user_wrongEmail'), {log: false})     

        cy.get('#open-text-area')
            .should('be.visible')
            .type('teste')
            .and('have.value', 'teste', {delay:0})

        cy.contains('button', 'Enviar')
            .click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible', {timeout: 10000})            
    })

    it('verifica campo telefone vazio após tentar digitar valores não-numéricos', () =>{
        cy.get('#phone')
            .should('be.empty')
            .type('T&st#')
            .and('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
        cy.get('#firstName')
            .should('be.visible')
            .type(Cypress.env('user_firstName'))
            .and('have.value', Cypress.env('user_firstName'))
        
        cy.get('#lastName')
            .should('be.visible')
            .type(Cypress.env('user_lastName'))
            .and('have.value', Cypress.env('user_lastName'))    

        cy.get('#email')
            .should('be.visible')
            .type(Cypress.env('user_email'), {log: false})     

        cy.get('#phone')
            .should('be.empty')
            .type('T&st#')
            .and('be.empty')

        cy.get('#open-text-area')
            .should('be.visible')
            .type('teste')
            .and('have.value', 'teste', {delay:0})
        
        cy.get('#phone-checkbox')
            .should('be.visible')
            .check()
            .should('be.checked')

        cy.contains('button', 'Enviar')
            .click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible', {timeout: 10000}) 

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
        cy.get('#firstName')
            .should('be.visible')
            .type(Cypress.env('user_firstName'))
            .and('have.value', Cypress.env('user_firstName'))
            .clear()
            .and('be.empty')
        
        cy.get('#lastName')
            .should('be.visible')
            .type(Cypress.env('user_lastName'))
            .and('have.value', Cypress.env('user_lastName'))    
            .clear()
            .and('is.empty')

        cy.get('#email')
            .should('be.visible')
            .type(Cypress.env('user_email'), {log: false})
            .clear()
            .should('be.empty')     

        cy.get('#phone')
            .should('be.empty')
            .type('T&st#')
            .and('be.empty')
            .type(Cypress.env('user_phone'), {log: false})
            .should('have.value', Cypress.env('user_phone'))
            .clear()
            .should('be.empty')

        cy.get('#open-text-area')
            .should('be.visible')
            .type('teste')
            .and('have.value', 'teste', {delay:0})
            .clear()
            .should('be.empty')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.get('.button[type="submit"]')
            .click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible', {timeout: 10000}) 
    })

    it('envia o formuário com sucesso usando um comando customizado', () =>{      
        cy.preencheCamposObrigatoriosEnviar(Cypress.env('user_firstName'), Cypress.env('user_lastName'), Cypress.env('user_email'))
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
            .and('be.visible')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
            .and('be.visible')
    }) 

    it('seleciona um produto (Blog) por seu índice', ()=>{
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
            .and('be.visible')

    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check('feedback')
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {

        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each((el) =>{
                cy.wrap(el).check(el)
                cy.wrap(el).should('be.checked')
            })


    })

    it('marca ambos checkboxes, depois desmarca o último', ()=> {
        cy.get('input[type="checkbox"]')
            .should('not.be.checked')
            .each((el)=> {
                cy.wrap(el)
                    .check(el)
                    .should('be.checked')
                })
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('#file-upload')
            .should('be.visible')
            .and('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('#file-upload')
            .should('be.visible')
            .and('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(($input)=>{
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json')
            .as('sampleFile')
        cy.get('input[type="file"]')
            .should('be.visible')
            .selectFile('@sampleFile', {action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .and('be.visible')
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.url()
            .should('include', '/src/privacy.html')
    })
    
})