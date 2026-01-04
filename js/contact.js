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
