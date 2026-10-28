import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Login rejects both fields empty', async ({ page }) => {
    // 1. Open the login page for the empty-credentials scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    await expect(usernameInput).toBeEmpty();
    await expect(passwordInput).toBeEmpty();

    // 2. Submit the login form with both fields empty.
    await page.locator('[data-test="login-button"]').click();

    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
