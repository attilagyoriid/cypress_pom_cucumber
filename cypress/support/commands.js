// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import "@shelex/cypress-allure-plugin";
import { sentenceToWord } from "./stringUtil";

// logging cy.log and commands to console and logs/out.txt
const options_log_collector = {
  collectTypes: ["cy:log", "cy:command"],
};
require("cypress-terminal-report/src/installLogsCollector")(
  options_log_collector
);

const compareSnapshotCommand = require("cypress-image-diff-js/dist/command");

compareSnapshotCommand();

// compareSnapshotCommand();
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "console",
  {
    prevSubject: true,
  },
  (subject, method) => {
    // the previous subject is automatically received
    // and the commands arguments are shifted

    // allow us to change the console method used
    method = method || "log";

    // log the subject to the console
    console[method]("The subject is", subject);

    // whatever we return becomes the new subject
    //
    // we don't want to change the subject so
    // we return whatever was passed in
    return subject;
  }
);

/**
 * imageCapture method can be used for the viewport: cy.imageCapture("img-name") ot for html elements cy.get("#element_id").imageCapture("img-name")
 * as 2nd argument you can define threshold - acceptible difference from baseline
 * you can add 3rd argument as object to control limit (retry) and delay: { limit: 2, delay: 500 }
 * hideElementsBySelector list of eleents to hide before image capture ["div", "#id", ".class", "rel > ation"]
 */
Cypress.Commands.add(
  "imageCapture",
  {
    prevSubject: "optional",
  },
  (
    subject,
    screenshotName,
    threshold = 0,
    retryOptions = { limit: 2, delay: 500 },
    hideElementsBySelector = []
  ) => {
    if (Cypress.env("VISUAL_TEST")) {
      const scenarioName = cy.state("ctx").test.title;
      screenshotName = `${sentenceToWord(scenarioName)}-[${
        Cypress.browser.displayName
      }]--${screenshotName}`;
      hideElementsBySelector.forEach((element) => {
        cy.get(element).hideElement();
      });
      if (subject) {
        cy.log("capturing specific element:" + subject);
        cy.wrap(subject).scrollIntoView();
        cy.wrap(subject).compareSnapshot(
          screenshotName,
          threshold,
          retryOptions
        );
      } else {
        cy.log("capturing viewport");
        cy.compareSnapshot(screenshotName, threshold, retryOptions);
      }
      hideElementsBySelector.forEach((element) => {
        cy.get(element).hideElement(false);
      });
    } else {
      cy.log("VISUAL_TEST is turned off");
    }
  }
);

/**
 * scrollToPageTop scrolls to the top of the window - it can cause strange render behavour for screen capture,
 * so it is recommended to use goToPageTopByPageUp
 */
Cypress.Commands.add("scrollToPageTop", () => {
  cy.window().then(($window) => {
    $window.scrollTo(0, 0);
  });
});

/**
 * goToPageTopByPageUp to simulate page up key press
 */
Cypress.Commands.add(
  "goToPageTopByPageUp",
  (retry = 5, domElement = "#root") => {
    scrollToPageTop(retry, 0, domElement);
  }
);
/**
 *
 * @param {*} retry How many times it presses pageup max
 * @param {*} i     Index to track number of keypresses
 * @param {*} domElement Dom element the key press executed on
 */
const scrollToPageTop = (retry = 5, i = 0, domElement = "#root") => {
  cy.window()
    .its("scrollY")
    .then((scrollY) => {
      cy.log("scrollY", scrollY);
      if (scrollY === 0 || i > retry) {
        return;
      } else {
        cy.get(domElement).trigger("{pageUp}", { keyCode: 33 });

        i++;
      }
      scrollToPageTop(5, i, domElement);
    });
};
