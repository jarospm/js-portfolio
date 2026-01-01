import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['js/**/*.js'],

    // Load recommended rules
    ...js.configs.recommended,

    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals (document, window, etc.)
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'script', // Vanilla JS scripts, not ES modules
    },

    // Code quality rules
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'off', // Allow console for debugging
      eqeqeq: ['error', 'always'], // Enforce === over ==
      'no-var': 'error', // Prefer const/let over var
      'prefer-const': 'warn', // Suggest const when possible
    },
  },

  // Styling rules via prettier
  prettierConfig,
]);
