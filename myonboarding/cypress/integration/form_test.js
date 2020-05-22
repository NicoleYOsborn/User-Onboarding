describe('form inputs', ()=>{
    it('navigates to the site', ()=>{
        cy.visit('http://localhost:3000/')
        cy.url().should('include', 'localhost')
    })
// Get the Name input and type a name in it.
// Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
    it('Verifies name field works', ()=>{
        cy.get('input[name="membername"]')
            .type('Michelle')
            .should('have.value', 'Michelle')
    })

// Get the Email input and type an email address in it
    it('Verifies email input works', ()=>{
        cy.get('input[name="email"]')
            .type('michelle@email.com')
            .should('have.value', 'michelle@email.com')
    })
// Get the password input and type a password in it
    it('Verifies password input works', ()=>{
        cy.get('input[name="password"]')
            .type('1234567')
            .should('have.value', '1234567')
    })
// Set up a test that will check to see if a user can check the terms of service box
    it('checks the terms box', ()=>{
        cy.get('input[name="terms"]').not('[disabled]')
      .check().should('be.checked')
    })
// Check to see if a user can submit the form data
    it('Submits the form', ()=>{
        cy.get('button')
        .should('not.be.disabled')
    })
})
// Check for form validation if an input is left empty
describe('Form validation', ()=>{
    it('validates username correctly', ()=>{
        cy.visit('http://localhost:3000')
        cy.contains('name must be at least three characters').should('not.exist')
        cy.get('input[name="membername"]').type('a')
        cy.contains('name must be at least three characters')
        cy.get('input[name="membername"]').type('b')
        cy.contains('name must be at least three characters')
        cy.get('input[name="membername"]').type('c')
        cy.contains('name must be at least three characters').should('not.exist')
    })
    it('validates terms correctly')
})