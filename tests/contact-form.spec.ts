import { test, expect, type Page } from "@playwright/test";
import { DEFAULT_AUTO_RESET_SECONDS } from "../shared/constants";

const BASE_URL = "http://localhost:5000";

const AUTO_RESET_SECONDS = Number(process.env.VITE_CONTACT_RESET_SECONDS) || DEFAULT_AUTO_RESET_SECONDS;

async function resetRateLimit() {
  await fetch(`${BASE_URL}/api/test/reset-rate-limit`, { method: "POST" });
}

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

test.describe("Contact form – double-submit protection", () => {
  async function scrollToForm(page: Page) {
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForSelector('[data-testid="input-name"]', { state: "visible" });
  }

  test.beforeEach(async () => {
    await resetRateLimit();
  });

  test("rapidly double-clicking Submit sends only one POST request and disables the button", async ({ page }) => {
    const ts = Date.now();

    // Track how many POST /api/messages requests reach the server
    let requestCount = 0;
    page.on("request", (req) => {
      if (req.method() === "POST" && req.url().includes("/api/messages")) {
        requestCount++;
      }
    });

    await page.goto("/");
    await scrollToForm(page);

    await page.fill('[data-testid="input-name"]', `Double-Click Test ${ts}`);
    await page.fill('[data-testid="input-email"]', `double-click-${ts}@example.com`);
    await page.fill('[data-testid="input-message"]', "Double-submit protection test – please ignore.");

    const submitBtn = page.locator('[data-testid="button-submit"]');

    // Double-click rapidly — both clicks happen before the component can re-render
    await submitBtn.dblclick();

    // After the first click the button must become disabled (isPending = true)
    await expect(submitBtn).toBeDisabled({ timeout: 3000 });

    // Wait for the successful response and confirmation panel to appear
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible({ timeout: 10000 });

    // Exactly one network request must have been made
    expect(requestCount).toBe(1);
  });
});

test.describe("Contact form – countdown auto-reset", () => {
  async function scrollToForm(page: Page) {
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForSelector('[data-testid="input-name"]', { state: "visible" });
  }

  async function submitForm(page: Page) {
    const ts = Date.now();
    await page.fill('[data-testid="input-name"]', `Countdown Test ${ts}`);
    await page.fill('[data-testid="input-email"]', `countdown-${ts}@example.com`);
    await page.fill('[data-testid="input-message"]', "Countdown auto-reset test – please ignore.");
    await page.click('[data-testid="button-submit"]');
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible({ timeout: 10000 });
  }

  test.beforeEach(async () => {
    await resetRateLimit();
  });

  test("countdown text is visible after submission", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);
    await submitForm(page);

    // Countdown should be running and display the remaining seconds
    await expect(page.locator('[data-testid="countdown-text"]')).toBeVisible();
    await expect(page.locator('[data-testid="countdown-text"]')).toContainText("Returning to form in");
    await expect(page.locator('[data-testid="countdown-value"]')).toContainText("s");

    // Paused text must NOT be visible while counting
    await expect(page.locator('[data-testid="countdown-paused-text"]')).not.toBeVisible();
  });

  test("clicking Cancel pauses the countdown — form does not auto-reset while paused", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);
    await submitForm(page);

    // Pause immediately to maximise remaining time on the clock
    await page.click('[data-testid="button-pause-countdown"]');

    // Paused state: paused-text visible, countdown-text hidden, button label is "Resume"
    await expect(page.locator('[data-testid="countdown-paused-text"]')).toBeVisible();
    await expect(page.locator('[data-testid="countdown-paused-text"]')).toContainText("Auto-reset paused.");
    await expect(page.locator('[data-testid="countdown-text"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="button-pause-countdown"]')).toHaveText("Resume");

    // Wait several seconds — confirmation must still be showing (timer is stopped)
    await page.waitForTimeout(4000);
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="countdown-paused-text"]')).toBeVisible();
  });

  test("clicking Resume restarts the countdown", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);
    await submitForm(page);

    // Pause first
    await page.click('[data-testid="button-pause-countdown"]');
    await expect(page.locator('[data-testid="button-pause-countdown"]')).toHaveText("Resume");

    // Resume
    await page.click('[data-testid="button-pause-countdown"]');

    // After resuming: countdown-text is visible again, paused-text is gone, button is "Cancel"
    await expect(page.locator('[data-testid="countdown-text"]')).toBeVisible();
    await expect(page.locator('[data-testid="countdown-paused-text"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="button-pause-countdown"]')).toHaveText("Cancel");
  });

  test("clicking 'Send another message' mid-countdown immediately restores the form", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);
    await submitForm(page);

    // Pause to freeze the clock so the form cannot auto-reset under us
    await page.click('[data-testid="button-pause-countdown"]');
    await expect(page.locator('[data-testid="button-pause-countdown"]')).toHaveText("Resume");

    // Click "Send another message" — should immediately dismiss confirmation and show form
    await page.click('[data-testid="button-send-another"]');

    await expect(page.locator('[data-testid="confirmation-message"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="input-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-submit"]')).toBeVisible();
  });

  test("countdown auto-fires after AUTO_RESET_SECONDS with no manual intervention", async ({ page }) => {
    await page.goto("/");
    await scrollToForm(page);
    await submitForm(page);

    // Confirmation should be visible immediately after submission
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();

    // Wait AUTO_RESET_SECONDS + 1 second buffer — derived from the same constant the frontend uses
    await page.waitForTimeout((AUTO_RESET_SECONDS + 1) * 1000);

    // The timer should have auto-fired: confirmation gone, form visible again
    await expect(page.locator('[data-testid="confirmation-message"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="input-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-submit"]')).toBeVisible();
  });
});
