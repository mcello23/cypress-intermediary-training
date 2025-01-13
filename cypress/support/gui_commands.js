Cypress.Commands.add('login', ({ user, password, cacheSession = true } = {}) => {
  const username = user || Cypress.env('user_name');
  const userPassword = password || Cypress.env('user_password');

  const login = () => {
    cy.visit('/users/sign_in');
    cy.get('[data-testid="username-field"]').type(username);
    cy.get('[data-testid="password-field"]').type(userPassword, { log: false });
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('.user-bar').should('be.visible');
  };

  const validate = () => {
    cy.visit('/');
    cy.location('pathname', { timeout: 1000 }).should('not.eq', '/users/sign_in');
  };

  const sessionOptions = {
    cacheAcrossSpecs: true,
    validate,
  };

  if (cacheSession) {
    cy.session(username, login, sessionOptions);
  } else {
    login();
  }
  cy.visit('/');
});

  Cypress.Commands.add('automated_logout', () => {
    cy.get('[data-testid="user-avatar-content"]').click()
    cy.get('[data-testid="sign-out-link"]').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new#blank_project')
  cy.get('[data-testid="project-name"]').eq(0).type(project.name)
  cy.get('[data-testid="select-namespace-dropdown"] > [data-testid="base-dropdown-toggle"]').eq(0).click()
  cy.wait(1000)
  cy.get('[data-testid="listbox-item-gid://gitlab/Namespaces::UserNamespace/1"] > .gl-new-dropdown-item-content > .gl-new-dropdown-item-text-wrapper').click()
  cy.contains('Create project').click()
  });

  Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('[data-testid="issuable-form-title-field"]').type(issue.title)
    cy.get('[data-testid="issuable-form-description-field"]').type(issue.description)
    cy.contains('Create issue').click()
  });

  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('[data-testid="sidebar-labels"] > :nth-child(1) > .gl-font-bold > [data-testid="edit-button"]').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })

  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('[data-testid="milestone-edit"] > .gl-flex > [data-testid="edit-button"]').click()
    cy.contains(milestone.title).click()
  })
  