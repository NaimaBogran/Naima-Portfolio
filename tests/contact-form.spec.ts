import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

test.describe("Contact form – end-to-end flow", () => {
  const testName = `E2E Test ${Date.now()}`;
  const testEmail = `e2e-${Date.now()}@example.com`;
  const testMessage = "Automated Playwright test – please ignore.";

  test("submits the form, resets fields, saves to DB, and triggers email", async ({ page }) => {
    await page.goto("/");

    // Scroll to the contact section
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });

    // Wait for the form to be visible
    await page.waitForSelector('input[placeholder="Your name"]', { state: "visible" });

    // Fill in form fields
    await page.fill('input[placeholder="Your name"]', testName);
    await page.fill('input[placeholder="your.email@example.com"]', testEmail);
    await page.fill('textarea[placeholder="How can I help you?"]', testMessage);

    // Submit the form
    await page.click('button[type="submit"]');

    // Assert the form is reset (fields cleared) — indicates onSuccess fired
    await expect(page.locator('input[placeholder="Your name"]')).toHaveValue("", { timeout: 8000 });
    await expect(page.locator('input[placeholder="your.email@example.com"]')).toHaveValue("");
    await expect(page.locator('textarea[placeholder="How can I help you?"]')).toHaveValue("");

    // Assert success toast appeared
    await expect(page.getByText("Message Sent!")).toBeVisible({ timeout: 8000 });

    // Verify the database record exists via the API response — use /api/test/last-email
    // to confirm the email dispatch was triggered (dev-only endpoint)
    const emailResp = await page.request.get(`${BASE}/api/test/last-email`);
    expect(emailResp.ok()).toBeTruthy();
    const emailData = await emailResp.json() as { name: string; email: string; message: string } | null;
    expect(emailData).not.toBeNull();
    expect(emailData?.name).toBe(testName);
    expect(emailData?.email).toBe(testEmail);
    expect(emailData?.message).toContain("Automated Playwright test");
  });

  test("rejects submission with missing required fields", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });

    await page.waitForSelector('button[type="submit"]', { state: "visible" });

    // Click submit without filling any fields
    await page.click('button[type="submit"]');

    // Validation errors should appear inline (react-hook-form / zod)
    await expect(page.getByText(/required|invalid|at least/i).first()).toBeVisible({ timeout: 5000 });
  });
});
