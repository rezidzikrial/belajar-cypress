const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern : "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}" //untuk fokus pada pengujian di folder/file tertentu menggunakan cypress run
  },
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
