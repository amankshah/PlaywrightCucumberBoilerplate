const path = require('path');

module.exports = {
    default: {
      paths: [path.join(__dirname, '../features/**/*.feature')],
      require: [
        path.join(__dirname, '../step-definitions/**/*.js'),
        path.join(__dirname, '../support/**/*.js')
      ],
      parallel: 2,
      format: [
        'html:../reports/html-report/cucumber-report.html',
        'json:../reports/html-report/cucumber-report.json',
        'allure-cucumberjs/reporter'
      ],
      formatOptions: {
        'allure-cucumberjs/reporter': {
          resultsDir: path.join(__dirname, '../reports/allure')
        }
      }
    }
  };
  