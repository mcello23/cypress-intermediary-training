describe('Login', () => {
  it('successfully logs in', () => {
    const options = {
      cacheSession: false
    }

    cy.login(options)
    
    cy.get('.user-bar').should('be.visible')
  })
})