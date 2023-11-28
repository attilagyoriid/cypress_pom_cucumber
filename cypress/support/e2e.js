// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import "./commands";

import "@shelex/cypress-allure-plugin";
import "cypress-image-diff-js/dist/command";

require("cy-verify-downloads").addCustomCommand();

// generate cypress visual report
after(() => {
  cy.task("generateReport");
});

let snapshot;

// detecting screenshot action and the name of the image
Cypress.on("log:added", (log) => {
  if (log.name === "screenshot") {
    snapshot = log.message;
  }
});

// currently details object missing spec details
Cypress.on("after:screenshot", (details) => {});

// detecting if there is image comapre related error, and attach screenshots to allure report
afterEach(() => {
  const state = Cypress.state();
  const attachementType = "image/png";
  if (
    state.error &&
    state.error.hasFailed &&
    state.error.parsedStack[0]["message"].includes("difference")
  ) {
    cy.log("belemegy");
    if (!snapshot) {
      return;
    }
    cy.log("snapshot name", snapshot);
    cy.task("concatCurrentPathWith", [
      "cypress-visual-screenshots",
      "baseline",
      snapshot + ".png",
    ]).then((baseImg) => {
      let diffImg = baseImg.replace("baseline", "diff");
      let actualImg = baseImg.replace("baseline", "comparison");
      cy.log("baseImg:", baseImg);
      cy.log("diffImg:", diffImg);
      cy.log("actualImg:", actualImg);

      cy.allure()
        .label("testType", "screenshotDiff")
        .fileAttachment("actual", actualImg, attachementType)
        .fileAttachment("expected", baseImg, attachementType)
        .fileAttachment("diff", diffImg, attachementType);
    });
  }
  snapshot = null;
});
