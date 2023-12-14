/// <reference types="cypress"/>
import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

defineStep(
  "Take Screenshot on viewport as: {string}",
  (screenshotName: string) => {
    cy.get("#root").imageCapture({ screenshotName });
  }
);

defineStep(
  "Take Screenshot on viewport top as: {string}",
  (screenshotName: string) => {
    cy.goToPageTopByPageUp();
    cy.get("#root").imageCapture({ screenshotName });
  }
);
