import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Logged-out user cannot open the inventory route directly', async ({ page }) => {
    // 1. Start in a fresh browser context with no authenticated session.
    // A new Playwright test context starts without an authenticated session.

    // 2. As a fresh logged-out browser, navigate directly to the protected inventory route.
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
  });
});
