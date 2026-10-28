# Sauce Demo Authentication, Dashboard, and Logout Test Plan

## Application Overview

Plan for Sauce Demo authentication behavior: successful standard-user sign-in and landing on the inventory dashboard, logout back to login, required-field validation, invalid and locked credentials, and dashboard route protection while logged out. Explored https://www.saucedemo.com/ using the planner workflow. The publicly displayed test credentials are standard_user and secret_sauce; locked_out_user is also listed as a test user.

## Test Scenarios

### 1. Login, dashboard landing, and logout

**Seed:** `tests\seed.spec.ts`

#### 1.1. Standard user logs in and lands on the inventory dashboard

**File:** `tests\auth\standard-user-login.spec.ts`

**Steps:**
  1. Start in a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login screen is displayed with Username, Password, and Login controls.
  2. Enter standard_user in Username and secret_sauce in Password, then select Login.
    - expect: Login succeeds and the URL is https://www.saucedemo.com/inventory.html.
    - expect: The page title is Swag Labs and the Products heading is visible.
    - expect: The inventory contains six products, including Sauce Labs Backpack.

#### 1.2. Authenticated user logs out to the login page

**File:** `tests\auth\logout.spec.ts`

**Steps:**
  1. Start in a fresh browser context and sign in with standard_user and secret_sauce.
    - expect: The inventory dashboard is displayed at /inventory.html.
  2. Open the navigation menu and select Logout.
    - expect: The browser returns to https://www.saucedemo.com/.
    - expect: The Login form and Username and Password fields are visible.
    - expect: The inventory dashboard is no longer displayed.

#### 1.3. Login rejects both fields empty

**File:** `tests\auth\empty-credentials.spec.ts`

**Steps:**
  1. Start in a fresh browser context at the login page and leave Username and Password empty.
    - expect: Both fields are empty.
  2. Select Login.
    - expect: Login is rejected and an alert displays “Epic sadface: Username is required”.
    - expect: The user remains on the login page.

#### 1.4. Login rejects a missing password

**File:** `tests\auth\missing-password.spec.ts`

**Steps:**
  1. Start in a fresh browser context at the login page and enter standard_user in Username, leaving Password empty.
    - expect: The username is present and the password is empty.
  2. Select Login.
    - expect: Login is rejected and an alert displays “Epic sadface: Password is required”.
    - expect: The user remains on the login page.

#### 1.5. Login rejects a missing username

**File:** `tests\auth\missing-username.spec.ts`

**Steps:**
  1. Start in a fresh browser context at the login page and leave Username empty, entering secret_sauce in Password.
    - expect: The username is empty and the password is present.
  2. Select Login.
    - expect: Login is rejected and an alert displays “Epic sadface: Username is required”.
    - expect: The user remains on the login page.

#### 1.6. Login rejects unrecognized credentials

**File:** `tests\auth\invalid-credentials.spec.ts`

**Steps:**
  1. Start in a fresh browser context at the login page and enter an unrecognized username with an incorrect password.
    - expect: Both credential fields contain non-empty values that do not match a valid account.
  2. Select Login.
    - expect: Login is rejected and an alert displays “Epic sadface: Username and password do not match any user in this service”.
    - expect: The user remains on the login page and does not reach the inventory dashboard.

#### 1.7. Login rejects the locked-out test account

**File:** `tests\auth\locked-out-user.spec.ts`

**Steps:**
  1. Start in a fresh browser context at the login page and enter locked_out_user with secret_sauce.
    - expect: The documented locked-out username and shared password are entered.
  2. Select Login.
    - expect: Login is rejected and an alert displays “Epic sadface: Sorry, this user has been locked out.”.
    - expect: The user remains on the login page.

#### 1.8. Logged-out user cannot open the inventory route directly

**File:** `tests\auth\protected-inventory.spec.ts`

**Steps:**
  1. Start in a fresh browser context with no authenticated session.
    - expect: The user is logged out.
  2. Navigate directly to https://www.saucedemo.com/inventory.html.
    - expect: The browser redirects to or remains on the login page.
    - expect: The inventory dashboard is not accessible without authentication.
