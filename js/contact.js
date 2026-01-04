/**
 * Contact Form - Validation & Interactivity
 */

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const formEl = document.getElementById('contact-form');
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const emailEl = document.getElementById('email');
const subjectEl = document.getElementById('subject');
const messageEl = document.getElementById('message');
const charCounterEl = document.getElementById('char-counter');
const successMessageEl = document.getElementById('success-message');

const MIN_MESSAGE_LENGTH = 20;

// ==========================================================================
// VALIDATION FUNCTIONS
// ==========================================================================

/**
 * Checks if a character is a letter (including accented)
 * @param {string} char - Single character
 * @returns {boolean}
 *
 * JS compares characters by their Unicode numbers
 */
function isLetter(char) {
  return (
    (char >= 'a' && char <= 'z') ||
    (char >= 'A' && char <= 'Z') ||
    (char >= 'À' && char <= 'ÿ')
  );
}

/**
 * Validates a name field - letters and spaces only
 * @param {string} name - The name to validate
 * @returns {boolean} - True if valid
 */
function validateName(name) {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return false;
  }

  for (const char of trimmed) {
    if (!isLetter(char) && char !== ' ') {
      return false;
    }
  }

  return true;
}

/**
 * Validates an email address - must contain @ and .
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
  const trimmed = email.trim();
  // Simple check: contains @ and . with something before/after
  return trimmed.includes('@') && trimmed.includes('.') && trimmed.length >= 5;
}

/**
 * Validates message length
 * @param {string} message - The message to validate
 * @returns {boolean} - True if valid (>= MIN_MESSAGE_LENGTH chars)
 */
function validateMessage(message) {
  return message.trim().length >= MIN_MESSAGE_LENGTH;
}

/**
 * Validates subject selection
 * @param {string} subject - The selected subject value
 * @returns {boolean} - True if a subject is selected
 */
function validateSubject(subject) {
  return subject.trim().length > 0;
}

// ==========================================================================
// ERROR DISPLAY FUNCTIONS
//
// State hoisting pattern: we add .error/.valid to the PARENT wrapper,
// not the input itself. This lets CSS cascade down to style multiple
// children (input border, error message) with a single class change.
// ==========================================================================

/**
 * Shows error state on a form field
 * @param {HTMLElement} input - The input element
 */
function showError(input) {
  // .closest() traverses UP the DOM to find the parent wrapper
  const field = input.closest('.form-field');
  field.classList.remove('valid');
  field.classList.add('error');
}

/**
 * Marks a field as valid
 * @param {HTMLElement} input - The input element
 */
function markValid(input) {
  const field = input.closest('.form-field');
  field.classList.remove('error');
  field.classList.add('valid');
}

/**
 * Clears validation states from a form field
 * @param {HTMLElement} input - The input element
 */
function clearFieldState(input) {
  const field = input.closest('.form-field');
  field.classList.remove('error', 'valid');
}

/**
 * Clears validation states from all form fields
 */
function clearAllFieldStates() {
  document.querySelectorAll('.form-field').forEach((field) => {
    field.classList.remove('error', 'valid');
  });
}

// ==========================================================================
// CHARACTER COUNTER
// ==========================================================================

/**
 * Updates the character counter display
 */
function updateCharCounter() {
  const length = messageEl.value.length;
  charCounterEl.textContent = `${length} / ${MIN_MESSAGE_LENGTH}`;

  // Show counter only when user starts typing
  if (length > 0) {
    charCounterEl.classList.add('visible');
  } else {
    charCounterEl.classList.remove('visible');
  }

  // Update counter color: red if below minimum, green if valid
  if (length >= MIN_MESSAGE_LENGTH) {
    charCounterEl.classList.remove('error');
    charCounterEl.classList.add('valid');
  } else {
    charCounterEl.classList.remove('valid');
    charCounterEl.classList.add('error');
  }
}

// ==========================================================================
// FORM SUBMISSION
// ==========================================================================

/**
 * Validates all form fields
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
  let isValid = true;

  // Validate first name
  if (validateName(firstNameEl.value)) {
    markValid(firstNameEl);
  } else {
    showError(firstNameEl);
    isValid = false;
  }

  // Validate last name
  if (validateName(lastNameEl.value)) {
    markValid(lastNameEl);
  } else {
    showError(lastNameEl);
    isValid = false;
  }

  // Validate email
  if (validateEmail(emailEl.value)) {
    markValid(emailEl);
  } else {
    showError(emailEl);
    isValid = false;
  }

  // Validate subject
  if (validateSubject(subjectEl.value)) {
    markValid(subjectEl);
  } else {
    showError(subjectEl);
    isValid = false;
  }

  // Validate message
  if (validateMessage(messageEl.value)) {
    markValid(messageEl);
  } else {
    showError(messageEl);
    isValid = false;
  }

  return isValid;
}

/**
 * Shows success message and auto-hides after delay
 */
function showSuccessMessage() {
  const firstName = firstNameEl.value.trim();
  successMessageEl.textContent = `✓ Thank you ${firstName}! Talk soon!`;
  successMessageEl.classList.remove('hidden');

  // Auto-hide after 3 seconds
  setTimeout(() => {
    successMessageEl.classList.add('hidden');
  }, 3000);
}

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
function handleSubmit(event) {
  // Stop the browser's built-in form submission
  event.preventDefault();

  if (validateForm()) {
    // Form is valid - show success message
    showSuccessMessage();

    // Clear all inputs back to their initial values
    formEl.reset();

    // Clear all validation states and reset character counter
    clearAllFieldStates();
    updateCharCounter();
  }

  // Validation failed; validateForm() side effects applied:
  // 1. Invalid fields get red borders (.error class added)
  // 2. Error messages appear
  // 3. Form stays filled — user can fix their mistakes
  // 4. No success message, no reset
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

// Form submission
formEl.addEventListener('submit', handleSubmit);

// Character counter - update on every keystroke
messageEl.addEventListener('input', updateCharCounter);

// Real-time validation on blur (when user leaves field)
firstNameEl.addEventListener('blur', () => {
  if (firstNameEl.value.trim()) {
    validateName(firstNameEl.value)
      ? markValid(firstNameEl)
      : showError(firstNameEl);
  }
});

lastNameEl.addEventListener('blur', () => {
  if (lastNameEl.value.trim()) {
    validateName(lastNameEl.value)
      ? markValid(lastNameEl)
      : showError(lastNameEl);
  }
});

emailEl.addEventListener('blur', () => {
  if (emailEl.value.trim()) {
    validateEmail(emailEl.value) ? markValid(emailEl) : showError(emailEl);
  }
});

subjectEl.addEventListener('blur', () => {
  if (subjectEl.value) {
    validateSubject(subjectEl.value)
      ? markValid(subjectEl)
      : showError(subjectEl);
  }
});

messageEl.addEventListener('blur', () => {
  if (messageEl.value.trim()) {
    validateMessage(messageEl.value)
      ? markValid(messageEl)
      : showError(messageEl);
  }
});

// Clear validation state when user starts typing
firstNameEl.addEventListener('input', () => clearFieldState(firstNameEl));
lastNameEl.addEventListener('input', () => clearFieldState(lastNameEl));
emailEl.addEventListener('input', () => clearFieldState(emailEl));
subjectEl.addEventListener('change', () => clearFieldState(subjectEl));
messageEl.addEventListener('input', () => clearFieldState(messageEl));

// Form reset - clear all validation states
formEl.addEventListener('reset', () => {
  clearAllFieldStates();

  // The reset EVENT fires before the browser clears inputs.
  // setTimeout with 0ms pushes updateCharCounter to run AFTER
  // the browser finishes resetting, so messageEl.value is empty.
  setTimeout(updateCharCounter, 0);
});
