const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern:"cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl:"https://reqres.in/api/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
