export default class FormLayoutsPage {
  elements = {
    inlineForm() {
      return cy.contains("nb-card", "Inline form").find("form");
    },
    inlineFormNameInput() {
      return this.inlineForm().find('[placeholder="Jane Doe"]');
    },
    inlineFormEmailInput() {
      return this.inlineForm().find('[placeholder="Email"]');
    },
    inlineFormCheckboxInput() {
      return this.inlineForm().find('[type="checkbox"]');
    },

    loginBtn: () => cy.get("#login-button"),
    errorMessage: () => cy.get('h3[data-test="error"]'),
    navbar: () => cy.get("#navbar"),
  };

  submitInlineFormWithNameAndEmail(name: string, email: string) {
    this.elements.inlineFormNameInput().type(name);
    this.elements.inlineFormEmailInput().type(email);
    this.elements.inlineFormCheckboxInput().check({ force: true });
    this.elements.inlineForm().submit();
  }

  submitBasicFormWithEmailAndPassword(email: string, password: string) {
    cy.contains("nb-card", "Basic form")
      .find("form")
      .then((form) => {
        cy.wrap(form).find('[placeholder="Email"]').type(email);
        cy.wrap(form).find('[placeholder="Password"]').type(password);
        cy.wrap(form).find('[type="checkbox"]').check({ force: true });
        cy.wrap(form).submit();
      });
  }
}

export const formLayoutsPage = new FormLayoutsPage();
