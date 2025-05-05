const reporter = require('cucumber-html-reporter');
const path = require('path');

reporter.generate({
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/html-report/cucumber-report.json'),
  output: path.join(__dirname, '../reports/html-report/cucumber-report.html'),
  reportSuiteAsScenarios: true
});
