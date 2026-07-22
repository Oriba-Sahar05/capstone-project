const assert = require("assert");
const {
  validateEmail,
  validatePassword,
  validateConfirm,
} = require("./validation");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log("  PASS: " + name);
    passed++;
  } catch (err) {
    console.log("  FAIL: " + name);
    console.log("        " + err.message);
    failed++;
  }
}

console.log("\nEmail validation");
test("rejects empty email", () => {
  assert.strictEqual(validateEmail("").valid, false);
});
test("rejects malformed email (no @)", () => {
  assert.strictEqual(validateEmail("notanemail").valid, false);
});
test("rejects malformed email (no domain)", () => {
  assert.strictEqual(validateEmail("user@nodomain").valid, false);
});
test("accepts valid email", () => {
  assert.strictEqual(validateEmail("user@example.com").valid, true);
});
test("rejects whitespace-only email", () => {
  assert.strictEqual(validateEmail("   ").valid, false);
});

console.log("\nPassword validation");
test("rejects empty password", () => {
  assert.strictEqual(validatePassword("").valid, false);
});
test("rejects whitespace-only password", () => {
  assert.strictEqual(validatePassword("        ").valid, false);
});
test("rejects password under 8 characters", () => {
  assert.strictEqual(validatePassword("ab1").valid, false);
});
test("rejects password with only letters", () => {
  assert.strictEqual(validatePassword("abcdefgh").valid, false);
});
test("rejects password with only numbers", () => {
  assert.strictEqual(validatePassword("12345678").valid, false);
});
test("accepts valid password (letter + number, 8+ chars)", () => {
  assert.strictEqual(validatePassword("abcd1234").valid, true);
});

console.log("\nConfirm password validation");
test("rejects empty confirm field", () => {
  assert.strictEqual(validateConfirm("abcd1234", "").valid, false);
});
test("rejects mismatched confirm field", () => {
  assert.strictEqual(validateConfirm("abcd1234", "abcd9999").valid, false);
});
test("accepts matching confirm field", () => {
  assert.strictEqual(validateConfirm("abcd1234", "abcd1234").valid, true);
});

console.log("\n" + "=".repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40) + "\n");

if (failed > 0) process.exit(1);
