import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Login rejects the locked-out test account', async ({ page }) => {
    // 1. Open the login page for the locked-out account scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    await usernameInput.fill('locked_out_user');
    await passwordInput.fill('secret_sauce');
    await expect(usernameInput).toHaveValue('locked_out_user');
    await expect(passwordInput).toHaveValue('secret_sauce');

    // 2. Submit the locked-out account credentials and confirm login is rejected.
    await page.locator('[data-test="login-button"]').click();

    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
