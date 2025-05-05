const { Before, After, Status } = require('@cucumber/cucumber');

Before(async function() {
  console.log('Starting scenario...');
  await this.init();
  console.log('Scenario setup complete.');
});

After(async function(scenario) {
  console.log(`Scenario "${scenario.pickle.name}" ${scenario.result.status}`);
  if (scenario.result.status === Status.FAILED) {
    console.log('Taking screenshot for failed scenario...');
    const screenshot = await this.page.screenshot({ path: `./reports/screenshots/${scenario.pickle.name}.png` });
    await this.attach(screenshot, 'image/png');
  }
  await this.cleanup();
  console.log('Scenario cleanup complete.');
}); 