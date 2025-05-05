const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: 'test-results/multiple-html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'XX'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10'
    }
  }
});
