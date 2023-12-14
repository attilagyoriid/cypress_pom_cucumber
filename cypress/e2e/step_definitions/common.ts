import { After, Before } from "@badeball/cypress-cucumber-preprocessor";

After(() => {
  cy.log("this is cucumber after hook");
  cy.log("current scenario", window.testState.currentScenario);
});

Before(() => {
  cy.log("this is cucumber before hook");
  const scenarioName = cy.state("ctx").test.title;
  const test = cy.state("ctx").test;
  // writing brwoser name as suit name
  cy.allure().parentSuite(`Browser: ${Cypress.browser.displayName}`);
  // writing brwoser name as environment property
  cy.allure().writeEnvironmentInfo({ browser: Cypress.browser.displayName });
  // on failure logging Scenario name and Step name
  // cy.on("fail", (error, runnable) => {
  //   let currentStep;
  //   cy.log(`FAIL:Scenario: ${scenarioName}`);
  //   cy.window()
  //     .then((win) => {
  //       currentStep = win.testState.pickleStep.text;
  //     })
  //     .then(() => {
  //       cy.log(`FAIL:Step: ${currentStep}`);
  //       throw error;
  //     });
  // });
});
