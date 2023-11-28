export class BasePage {
  baseElements = {
    root() {
      return cy.get("#root");
    },
  };
}
