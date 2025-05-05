module.exports = {
    default: {
      paths: ['features/**/*.feature'],
      require: [
        'step-definitions/**/*.js',
        'support/**/*.js'
      ],
      format: [
        'html:test-results/cucumber-report.html',
        'json:test-results/cucumber-report.json',
        'allure-cucumberjs/reporter'
      ],
      formatOptions: {
        'allure-cucumberjs/reporter': {
          resultsDir: 'allure-results'
        }
      }
    }
  };
  