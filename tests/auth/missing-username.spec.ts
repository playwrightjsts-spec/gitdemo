import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Login rejects a missing username', async ({ page }) => {
    // 1. Open the login page for the missing-username scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    await passwordInput.fill('secret_sauce');
    await expect(usernameInput).toBeEmpty();
    await expect(passwordInput).toHaveValue('secret_sauce');

    // 2. Submit login while Username is empty and Password is filled.
    await page.locator('[data-test="login-button"]').click();

    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
