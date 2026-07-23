import { test, expect, type Page } from "@playwright/test";

test.describe("Contact form – end-to-end flow", () => {
  const testName = `E2E Test ${Date.now()}`;
  const testEmail = `e2e-${Date.now()}@example.com`;
  const testMessage = "Automated Playwright test – please ignore.";

  async function scrollToForm(page: Page) {
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForSelector('[data-testid="input-name"]', { state: "visible" });
  }

  test("submits the form and shows the inline confirmation message", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);

    await page.fill('[data-testid="input-name"]', testName);
    await page.fill('[data-testid="input-email"]', testEmail);
    await page.fill('[data-testid="input-message"]', testMessage);

    await page.click('[data-testid="button-submit"]');

    // Confirmation state should appear with the expected text
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Message received!")).toBeVisible();

    // Form fields should no longer be visible
    await expect(page.locator('[data-testid="input-name"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="input-email"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="input-message"]')).not.toBeVisible();

    // "Send another message" button should be visible
    await expect(page.locator('[data-testid="button-send-another"]')).toBeVisible();
  });

  test("clicking 'Send another message' restores the empty form", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);

    await page.fill('[data-testid="input-name"]', testName);
    await page.fill('[data-testid="input-email"]', testEmail);
    await page.fill('[data-testid="input-message"]', testMessage);

    await page.click('[data-testid="button-submit"]');

    // Wait for confirmation to appear
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible({ timeout: 10000 });

    // Click "Send another message"
    await page.click('[data-testid="button-send-another"]');

    // Confirmation should be gone; form should be back and empty
    await expect(page.locator('[data-testid="confirmation-message"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="input-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue("");
    await expect(page.locator('[data-testid="input-email"]')).toHaveValue("");
    await expect(page.locator('[data-testid="input-message"]')).toHaveValue("");
    await expect(page.locator('[data-testid="button-submit"]')).toBeVisible();
  });

  test("rejects submission with missing required fields", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);

    // Click submit without filling any fields
    await page.click('[data-testid="button-submit"]');

    // Validation errors should appear inline (react-hook-form / zod)
    await expect(page.getByText(/required|invalid|at least/i).first()).toBeVisible({ timeout: 5000 });
  });
});
