const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the todo page', async function() {
  await this.page.goto('http://localhost:5173');
});

Given('I have a todo item {string}', async function(todoText) {
  await this.page.fill('input[placeholder="Add a new todo"]', todoText);
  await this.page.press('input[placeholder="Add a new todo"]', 'Enter');
});

When('I add a new todo item {string}', async function(todoText) {
  await this.page.fill('input[placeholder="Add a new todo"]', todoText);
  await this.page.press('input[placeholder="Add a new todo"]', 'Enter');
});

When('I complete the todo item {string}', async function(todoText) {
  await this.page.click(`text="${todoText}" >> xpath=../input[@type="checkbox"]`);
});

When('I delete the todo item {string}', async function(todoText) {
  await this.page.click(`text="${todoText}" >> xpath=../button[contains(@class, "delete")]`);
});

Then('I should see {string} in the todo list', async function(todoText) {
  const todoElement = await this.page.locator(`text="${todoText}"`);
  await expect(todoElement).toBeVisible();
});

Then('It should show as completed', async function() {
  const completedTodo = await this.page.locator('input[type="checkbox"]:checked');
  await expect(completedTodo).toBeVisible();
});

Then('It should be removed from the list', async function() {
  const todos = await this.page.locator('.todo-item').count();
  expect(todos).toBe(0);
}); 