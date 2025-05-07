const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TodoActions = require('../pages/actions/todo.actions');

Given('I am on the todo page', async function() {
  await this.page.goto('https://demo.playwright.dev/todomvc');
  this.todoActions = new TodoActions(this.page);
});

When('I add a new todo item {string}', async function(item) {
  await this.todoActions.addTodo(item);
});

Then('I should see {string} in the todo list', async function(item) {
  const todoItems = await this.todoActions.getTodoItems();
  const itemTexts = await Promise.all(todoItems.map(item => item.textContent()));
  expect(itemTexts).toContain(item);
});

Given('I have a todo item {string}', async function(item) {
  await this.todoActions.addTodo(item);
});

When('I complete the todo item {string}', async function(item) {
  const todoItems = await this.todoActions.getTodoItems();
  const itemTexts = await Promise.all(todoItems.map(item => item.textContent()));
  const index = itemTexts.indexOf(item);
  if (index !== -1) {
    await this.todoActions.completeTodo(index);
  }
});

Then('It should show as completed', async function() {
  const todoItems = await this.todoActions.getTodoItems();
  const completedItems = await Promise.all(
    todoItems.map(async item => {
      const checkbox = await item.$('input[type="checkbox"]');
      return await checkbox.isChecked();
    })
  );
  expect(completedItems).toContain(true);
});

When('I delete the todo item {string}', async function(item) {
  const todoItems = await this.todoActions.getTodoItems();
  const itemTexts = await Promise.all(todoItems.map(item => item.textContent()));
  const index = itemTexts.indexOf(item);
  if (index !== -1) {
    await this.todoActions.deleteTodo(index);
  }
});

Then('It should be removed from the list', async function() {
  const todoItems = await this.todoActions.getTodoItems();
  expect(todoItems.length).toBe(0);
}); 