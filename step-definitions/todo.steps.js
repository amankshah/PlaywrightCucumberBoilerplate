const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the todo page', async function() {
  await this.page.goto('https://demo.playwright.dev/todomvc');
});

When('I add a new todo item {string}', async function(item) {
  await this.page.locator('.new-todo').fill(item);
  await this.page.locator('.new-todo').press('Enter');
});

Then('I should see {string} in the todo list', async function(item) {
  await expect(this.page.locator('.todo-list label').getByText(item)).toBeVisible();
});

Given('I have a todo item {string}', async function(item) {
  await this.page.locator('.new-todo').fill(item);
  await this.page.locator('.new-todo').press('Enter');
});

When('I complete the todo item {string}', async function(item) {
  const todoItem = this.page.locator('.todo-list li').filter({ hasText: item });
  await todoItem.locator('.toggle').check();
});

Then('It should show as completed', async function() {
  await expect(this.page.locator('.todo-list li.completed')).toBeVisible();
});

When('I delete the todo item {string}', async function(item) {
  const todoItem = this.page.locator('.todo-list li').filter({ hasText: item });
  await todoItem.hover();
  await todoItem.locator('.destroy').click();
});

Then('It should be removed from the list', async function() {
  await expect(this.page.locator('.todo-list li')).toHaveCount(0);
}); 