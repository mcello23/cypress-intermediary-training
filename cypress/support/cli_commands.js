Cypress.Commands.add('cloneViaSSH', project => {
    const domain = Cypress.config('baseUrl').replace('http://', '').replace('https://', '');
    const sshKeyPath = Cypress.env('SSH_KEY_PATH') || '~/.ssh/id_rsa';
    
    cy.exec(`
      mkdir -p ~/.ssh && \
      chmod 700 ~/.ssh && \
      ssh-keygen -F ${domain} || ssh-keyscan -H ${domain} >> ~/.ssh/known_hosts && \
      eval $(ssh-agent -s) && \
      chmod 600 ${sshKeyPath} && \
      ssh-add ${sshKeyPath}
    `, { failOnNonZeroExit: false }).then((result) => {
      cy.log('SSH setup result:', result.stdout);
    });

    cy.exec('mkdir -p cypress/downloads', { failOnNonZeroExit: false });
    cy.exec(`rm -rf cypress/downloads/${project.name}`, { failOnNonZeroExit: false });
  
    cy.exec(
      `GIT_SSH_COMMAND="ssh -v" git clone git@${domain}:${Cypress.env('user_name')}/${project.name}.git cypress/downloads/${project.name}`,
      { 
        timeout: 30000,
        failOnNonZeroExit: false 
      }
    ).then((result) => {
      if (result.code !== 0) {
        cy.log('Clone error:', result.stderr);
        throw new Error(`Falha ao clonar: ${result.stderr}`);
      }
    });
  });