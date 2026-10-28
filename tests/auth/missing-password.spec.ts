import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Login rejects a missing password', async ({ page }) => {
    // 1. Open the login page for the missing-password scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    await usernameInput.fill('standard_user');
    await expect(usernameInput).toHaveValue('standard_user');
    await expect(passwordInput).toBeEmpty();

    // 2. Submit the form with username set and password missing.
    await page.locator('[data-test="login-button"]').click();

    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Epic sadface: Password is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
