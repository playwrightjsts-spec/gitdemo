import { test, expect } from '@playwright/test';

test.describe('Login, dashboard landing, and logout', () => {
  test('Standard user logs in and lands on the inventory dashboard', async ({ page }) => {
    // 1. Start a fresh browser context by navigating to the Sauce Demo login screen.
    await page.goto('https://www.saucedemo.com/');

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in the Username field, enter secret_sauce in the Password field, and submit.
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  });
});
