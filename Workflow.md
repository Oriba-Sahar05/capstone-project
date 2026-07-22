# WORKFLOW.md

## What I did

I built the same feature — a settings form with email and password
validation — twice, in two separate branches, using two different
prompting approaches.

- **Round 1** (`feature/settings-form-v1-vague`): a single vague
  prompt — *"Add a settings form to the app."* No context, no
  constraints, no file references. Output accepted as-is.
- **Round 2** (`feature/settings-form-v2-precise`): a precise prompt
  specifying exact fields, validation rules, accessibility
  requirements, and a verification step ("write unit tests and run
  them"). Fresh session, no context carried over from Round 1.

## Correctness

Round 1's password check only looked at `password.length < 6` —
no check for whitespace-only input, and no check that the password
actually contains a number and a letter. A password of `"      "`
(six spaces) passes Round 1's validation.

Round 2 explicitly rejects this: `validatePassword` checks
`value.trim().length === 0` before anything else, and separately
checks for `/[0-9]/` and `/[A-Za-z]/`. This was verified with a
dedicated test, `rejects whitespace-only password`, which passes.

Round 1 also never validates the confirm-password field against
the password field at all — there's no code path that compares
`password` and `confirmPassword`. A user could type two different
passwords and the form would still save silently. Round 2 has
`validateConfirm(password, confirm)`, covered by two tests
(`rejects mismatched confirm field`, `accepts matching confirm field`).

## Accessibility

Round 1 uses `placeholder="Email"` / `placeholder="Password"` as
the only field identifiers — no `<label>` elements at all. A screen
reader has no reliable way to announce what each field is once the
user starts typing and the placeholder disappears.

Round 2 has a real `<label for="...">` for every input, plus
`aria-invalid`, `aria-describedby` pointing at the error message
element, and `role="alert"` on error text so assistive tech
announces validation failures immediately.

## Edge cases

| Case | Round 1 | Round 2 |
|---|---|---|
| Empty email | not handled (only checks for `@`) | rejected, specific message |
| Whitespace-only email | passes silently | rejected |
| Whitespace-only password | passes silently (bug) | rejected |
| Password missing a number | passes if 6+ chars | rejected |
| Confirm password mismatch | not checked at all | rejected |
| Field-level error display | single shared error div at top | inline error per field |

## Review effort and time

**Round 1:** ~2 minutes to write the prompt and accept the output.
But manually testing it afterward (typing a spaces-only password,
mismatched confirm field) surfaced 3 bugs I had to describe and ask
to be fixed — roughly 15 more minutes. Total: ~17 minutes, and I
still wasn't fully confident in the result without writing my own
tests separately.

**Round 2:** ~6 minutes to write the detailed prompt. The model
wrote `validation.js`, `validation.test.js`, and ran the tests
itself — I reviewed the 14 test names and the pass/fail output
rather than re-deriving the bugs myself. Total: ~11 minutes,
and I finished with actual test coverage instead of just a
visual check.

Round 2 felt slower to start — writing the prompt took real
thought — but it ended up faster overall because the verification
step caught problems before I had to find them by hand.

## AI mistake caught

In Round 1, the generated password validation only checked
`password.length < 6`, which meant a password of six spaces
(`"      "`) was accepted as valid — there was no `.trim()` check
anywhere in the vague version. I caught this by manually typing a
spaces-only password into the Round 1 form after building it.
Round 2's prompt explicitly asked for this edge case to be rejected
and included it as `test('rejects whitespace-only password', ...)`
in `validation.test.js`, which passes.

## Test verification (Round 2)

Ran `node validation.test.js` — all 14 tests passed:

```
Email validation
  PASS: rejects empty email
  PASS: rejects malformed email (no @)
  PASS: rejects malformed email (no domain)
  PASS: accepts valid email
  PASS: rejects whitespace-only email

Password validation
  PASS: rejects empty password
  PASS: rejects whitespace-only password
  PASS: rejects password under 8 characters
  PASS: rejects password with only letters
  PASS: rejects password with only numbers
  PASS: accepts valid password (letter + number, 8+ chars)

Confirm password validation
  PASS: rejects empty confirm field
  PASS: rejects mismatched confirm field
  PASS: accepts matching confirm field

Results: 14 passed, 0 failed
```

No equivalent test suite exists for Round 1 — the vague prompt
never asked for one, so none was written.