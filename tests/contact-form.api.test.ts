/**
 * Contact form API integration test.
 *
 * Runs against the live dev server (no browser required).
 * Execute with:  npx tsx tests/contact-form.api.test.ts
 *
 * Covers:
 *  1. POST /api/messages saves the record and returns 201
 *  2. GET  /api/test/last-email confirms the Resend dispatch was triggered
 *  3. POST /api/messages with invalid body returns 400
 */

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:5000";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`  FAIL: ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`  PASS: ${msg}`);
  }
}

async function run() {
  const suffix = Date.now();
  const name = `API Test ${suffix}`;
  const email = `api-test-${suffix}@example.com`;
  const message = "API integration test message – automated, please ignore.";

  console.log("\n── Test 1: valid submission saves record and returns 201 ──");
  const res = await fetch(`${BASE}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  assert(res.status === 201, `POST /api/messages → 201 (got ${res.status})`);

  const body = await res.json() as Record<string, unknown>;
  assert(typeof body.id === "number", `response has numeric id (got ${body.id})`);
  assert(body.name === name, `response.name matches (got "${body.name}")`);
  assert(body.email === email, `response.email matches (got "${body.email}")`);
  assert(body.message === message, `response.message matches`);

  console.log("\n── Test 2: email dispatch was triggered ──");
  // Allow a brief moment for the fire-and-forget email call to register
  await new Promise((r) => setTimeout(r, 300));
  const emailRes = await fetch(`${BASE}/api/test/last-email`);
  assert(emailRes.status === 200, `GET /api/test/last-email → 200 (got ${emailRes.status})`);

  const emailData = await emailRes.json() as Record<string, string> | null;
  assert(emailData !== null, "last-email payload is not null");
  assert(emailData?.name === name, `email.name matches (got "${emailData?.name}")`);
  assert(emailData?.email === email, `email.email matches (got "${emailData?.email}")`);
  assert(
    typeof emailData?.sentAt === "string" && emailData.sentAt.length > 0,
    `email.sentAt is present (got "${emailData?.sentAt}")`
  );

  console.log("\n── Test 3: missing required fields returns 400 ──");
  // The schema requires name, email, and message to be present strings.
  // Omitting them entirely triggers a Zod parse failure → 400.
  const badRes = await fetch(`${BASE}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert(badRes.status === 400, `POST /api/messages with missing fields → 400 (got ${badRes.status})`);
  const badBody = await badRes.json() as Record<string, unknown>;
  assert(typeof badBody.message === "string", `400 response has message field`);

  console.log(
    process.exitCode === 1
      ? "\n✗ Some tests failed."
      : "\n✓ All API tests passed."
  );
}

run().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
