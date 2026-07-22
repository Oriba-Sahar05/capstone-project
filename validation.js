// Validation logic extracted from settings-form.html
// so it can be unit tested independently of the DOM.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value) {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "Email is required." };
  }
  if (!EMAIL_RE.test(trimmed)) {
    return { valid: false, message: "Enter a valid email address." };
  }
  return { valid: true, message: "" };
}

function passwordStrengthScore(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

function validatePassword(value) {
  if (value.length === 0) {
    return { valid: false, message: "Password is required." };
  }
  if (value.trim().length === 0) {
    return { valid: false, message: "Password cannot be only whitespace." };
  }
  if (value.length < 8) {
    return { valid: false, message: "Use at least 8 characters." };
  }
  if (!/[0-9]/.test(value) || !/[A-Za-z]/.test(value)) {
    return {
      valid: false,
      message: "Include at least one letter and one number.",
    };
  }
  return { valid: true, message: "" };
}

function validateConfirm(password, confirm) {
  if (confirm.length === 0) {
    return { valid: false, message: "Please confirm your password." };
  }
  if (confirm !== password) {
    return { valid: false, message: "Passwords do not match." };
  }
  return { valid: true, message: "" };
}

module.exports = {
  validateEmail,
  validatePassword,
  validateConfirm,
  passwordStrengthScore,
};
