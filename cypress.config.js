const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //for html reports
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern : "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}" //untuk fokus pada pengujian di folder/file tertentu menggunakan cypress run
  },
  //capture screenshots & videos
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,

  env: {

      username : 'standard_user',
      password : 'secret_sauce',

  },
});
