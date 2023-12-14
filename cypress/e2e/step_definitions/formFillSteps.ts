/// <reference types="cypress"/>
import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

const FEATURE_PREFIX = "Form Fill";

Given("User navigates to the application", () => {
  cy.log("visiting url: ", Cypress.config().baseUrl);
  cy.visit("/");
});

Given("User expand form layout on sidebar", () => {});

When(
  "User enter username: {string} and password: {string} and select option: {string} and press Submit button",
  function (username, password, option) {}
);

Then("Username input field has value: {string}", (username) => {});

Then("Password input field has value: {string}", (username) => {});

Then("Option: {string} is selected", (username) => {});
