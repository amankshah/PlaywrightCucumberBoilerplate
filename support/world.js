const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

class CustomWorld extends World {
  async init() {
    try {
      console.log('Launching browser...');
      this.browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
      });
      console.log('Creating browser context...');
      this.context = await this.browser.newContext();
      console.log('Creating new page...');
      this.page = await this.context.newPage();
      console.log('Browser setup complete.');
    } catch (error) {
      console.error('Error during initialization:', error);
      throw error;
    }
  }

  async cleanup() {
    try {
      console.log('Cleaning up browser resources...');
      if (this.browser) {
        await this.browser.close();
        console.log('Browser closed successfully.');
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  }
}

setWorldConstructor(CustomWorld); 