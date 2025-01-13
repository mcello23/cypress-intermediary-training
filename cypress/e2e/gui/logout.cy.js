describe('Logout', () => { 
    beforeEach(() => {
      cy.login()
    })

    it('successfully logs out', () => {
      cy.automated_logout()
      cy.get('[data-testid="sign-in-button"]').should('be.visible')
    })
  })