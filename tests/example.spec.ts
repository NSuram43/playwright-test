import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('search for a product', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await page.locator('[id="username"]').fill('rahulshettyacademy');
  await page.locator('[id="password"]').fill('learning');
  await page.locator('select.form-control').selectOption('consult');

  await page.locator('.radiotextsty').last().click();
  const value = await page.locator('.modal-body p').textContent();
  expect(value).toBe('You will be limited to only fewer functionalities of the app. Proceed?');

  await page.locator('#okayBtn').click();
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
  // await page.locator('[id="terms"]').check();
  // await page.locator('[id="signInBtn"]').click();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("[href*='document']").click()
  ]);
  await expect(newPage).toHaveURL('https://rahulshettyacademy.com/documents-request');

});
