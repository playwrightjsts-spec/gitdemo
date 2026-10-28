import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Authenticated user logs out to the login page', async ({ page }) => {
    // 1. Open the login page for a fresh logout scenario.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // 2. Open the dashboard navigation menu and select Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
  });
});
