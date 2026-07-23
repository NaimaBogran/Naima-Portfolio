import { test, expect } from "@playwright/test";

test.describe("Resume PDF file", () => {
  test("GET /resume.pdf returns 200 with Content-Type application/pdf", async ({ request }) => {
    const response = await request.get("/resume.pdf");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType).toContain("application/pdf");
  });
});

test.describe("Resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("page loads with the correct document title", async ({ page }) => {
    await expect(page).toHaveTitle("Resume | Naima Bogran | Full Stack Developer");
  });

  // The resume page renders content as an inline React card rather than a PDF
  // iframe. This test confirms the main resume card is visible — the equivalent
  // of the iframe-presence check called for in the task spec.
  test("resume content card is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="resume-content"]')).toBeVisible();
  });

  test("primary download button has correct href and download attribute", async ({ page }) => {
    const downloadBtn = page.locator('[data-testid="button-download-resume"]');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute("href", "/resume.pdf");
    await expect(downloadBtn).toHaveAttribute("download");
  });

  // With Radix Slot (`asChild`), the Button's props are forwarded onto the
  // child <a> element, so data-testid="button-download-resume-nav" is the
  // anchor itself. Assert href/download directly on the locator.
  test("nav download button has correct href and download attribute", async ({ page }) => {
    const navDownloadBtn = page.locator('[data-testid="button-download-resume-nav"]');
    await expect(navDownloadBtn).toBeVisible();
    await expect(navDownloadBtn).toHaveAttribute("href", "/resume.pdf");
    await expect(navDownloadBtn).toHaveAttribute("download");
  });

  test("back-home button is visible and its link points to /", async ({ page }) => {
    const backHomeLink = page.locator('a:has([data-testid="button-back-home"])');
    await expect(backHomeLink).toBeVisible();
    await expect(backHomeLink).toHaveAttribute("href", "/");
  });
});
