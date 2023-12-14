/// <reference types="@shelex/cypress-allure-plugin" />

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { isFileExist, findFiles } = require("cy-verify-downloads");
const {
  NodeModulesPolyfillPlugin,
} = require("@esbuild-plugins/node-modules-polyfill");
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");

const path = require("path");

const URL = process.env.URL || "http://localhost:4200";

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  // it writes cy.log to logs/out.txt
  const options_log_printer = {
    printLogsToConsole: "always",
    outputRoot: "./logs/",
    outputTarget: {
      "out.txt": "txt",
      "out.json": "json",
    },
  };
  require("cypress-terminal-report/src/installLogsPrinter")(
    on,
    options_log_printer
  );

  on("task", { isFileExist, findFiles });
  getCompareSnapshotsPlugin(on, config);

  console.log("***URL***", URL);

  allureWriter(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [NodeModulesPolyfillPlugin(), createEsbuildPlugin(config)],
    })
  );
  on("task", {
    concatCurrentPathWith(pathToConcat) {
      console.info("path to concat: ", pathToConcat);
      var joinedPath = path.join(__dirname, ...pathToConcat);
      console.info("joined path: ", joinedPath);
      return joinedPath;
    },
  });

  on("task", {
    console(message) {
      console.log(message);

      return null;
    },
  });

  return config;
}

module.exports = defineConfig({
  video: true,
  trashAssetsBeforeRuns: true,
  embeddedScreenshots: true,
  allureSkipAutomaticScreenshots: false,
  experimentalWebKitSupport: true,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 0,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  e2e: {
    setupNodeEvents,
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: "cypress/e2e/features/*.feature",
    excludeSpecPattern: "cypress/e2e/features/experiment/*.feature",
    stepDefinitions: "cypress/e2e/step_definitions/*Steps.ts",

    baseUrl: URL,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    preserveOriginalScreenshot: true,

    env: {
      ALWAYS_GENERATE_DIFF: false,
      allureSkipAutomaticScreenshots: false,
      trashAssetsBeforeRuns: true,
      allureReuseAfterSpec: true,
      allure: true,
      allureLogCypress: true,
      allureLogGherkin: true,
      allureCypressLogCommands: true,
      allureCypressLogRequests: true,
    },
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
  },
});
