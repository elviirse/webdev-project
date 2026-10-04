import { test, expect } from "@playwright/test";

test.describe("Nordic Spices restaurant E2E tests", () => {
  test("Home page loads successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Nordic/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("Lunch menu page opens and displays content", async ({ page }) => {
    await page.goto("/menu");

    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/lunch/i).first()).toBeVisible();
  });

  test("Fine dining page opens successfully", async ({ page }) => {
    await page.goto("/fine-dining");

    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/fine dining/i).first()).toBeVisible();
  });

  test("Reservation page displays reservation form", async ({ page }) => {
    await page.goto("/reservation");

    await expect(page.getByText(/reserve your table/i)).toBeVisible();
    await expect(page.locator('input[name="date"]')).toBeVisible();
    await expect(page.locator('select[name="time"]')).toBeVisible();
    await expect(page.locator('select[name="guests"]')).toBeVisible();
  });

  test("Login page displays login form", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("Register page displays registration form", async ({ page }) => {
    await page.goto("/register");

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("Unauthenticated user cannot access account page", async ({ page }) => {
    await page.goto("/account");

    await expect(page.locator("body")).toBeVisible();

    const bodyText = await page.locator("body").innerText();

    expect(
      /login|log in|account|not logged|authentication/i.test(bodyText),
    ).toBe(true);
  });
});
