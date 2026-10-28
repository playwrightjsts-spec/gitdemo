import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Login rejects unrecognized credentials', async ({ page }) => {
    // 1. Open the login page for the unrecognized-credentials scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    await usernameInput.fill('unrecognized_user');
    await passwordInput.fill('incorrect_password');
    await expect(usernameInput).toHaveValue('unrecognized_user');
    await expect(passwordInput).toHaveValue('incorrect_password');

    // 2. Submit unrecognized credentials and verify the site rejects them.
    await page.locator('[data-test="login-button"]').click();

    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
  });
});
