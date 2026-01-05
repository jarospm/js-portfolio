# JS Portfolio

An educational project for learning **vanilla JavaScript interactivity** and understanding **Tailwind utility classes vs vanilla CSS**. Built as a personal portfolio site with form validation, dynamic filtering, and responsive layouts.

## Getting Started

### Option 1: Just open it

Clone the repo and open `index.html` directly in your browser. All features work without a build step — the compiled CSS is already included.

### Option 2: Development setup

For active development with live reload and Tailwind watching:

```bash
npm install

# Terminal 1: Watch Tailwind changes
npm run css

# Terminal 2: Start dev server (port 8000)
npm run dev
```

Then open [http://localhost:8000](http://localhost:8000).

## Project Structure

```
js-portfolio/
├── index.html          # Home: hero, explore cards, contact form
├── projects.html       # Filterable project showcase
├── tools.html          # Developer tools grid
├── css/
│   ├── input.css       # Tailwind config + @theme tokens
│   ├── output.css      # Generated Tailwind (don't edit)
│   ├── contact.css     # Form validation states
│   └── projects.css    # Filter buttons, project cards
├── js/
│   ├── contact.js      # Form validation logic
│   └── projects.js     # Project filtering & rendering
└── images/             # WebP images
```

## Features

### Contact Form (`index.html` + `contact.js`)

Real-time validation with visual feedback:

- **Name fields** — Letters and spaces only (Unicode-aware)
- **Email** — Must contain `@` and `.` with min 5 characters
- **Subject** — Required dropdown selection
- **Phone** — Optional, must contain at least one digit if provided
- **Message** — Minimum 20 characters with live character counter

Validation triggers on blur with immediate visual states: red borders/background for errors, green for valid fields.

### Project Showcase (`projects.html` + `projects.js`)

- Dynamic card rendering from JavaScript data array
- Category filtering: All, Frontend, Backend, Algorithm
- Live counter showing "X / Y projects"
- Fade-in entrance animations

### Tools Grid (`tools.html`)

9-card responsive grid with fade-in animations. Links to external developer tools.

## CSS Architecture: Tailwind + Vanilla Hybrid

This project uses a deliberate split between Tailwind and vanilla CSS based on **who controls the styles**.

### Tailwind handles static styling

Layout, spacing, typography, colors, and responsive breakpoints live in utility classes. These styles are known at build time and don't change based on user interaction.

Design tokens are defined via the `@theme` directive in `css/input.css`.

### Vanilla CSS handles JavaScript-driven states

When JavaScript toggles classes to reflect state changes, vanilla CSS provides the corresponding styles.

## Available Scripts

| Command            | Purpose                               |
| ------------------ | ------------------------------------- |
| `npm run css`      | Watch Tailwind and rebuild on changes |
| `npm run dev`      | Start live-server with hot reload     |
| `npm run check`    | Run ESLint + Prettier validation      |
| `npm run lint:fix` | Auto-fix linting issues               |
| `npm run format`   | Format code with Prettier             |

## Code Quality Tools

### ESLint

Static analysis tool that catches potential bugs and enforces coding standards. Key rules in this project:

- **`no-var`** — Enforces `const`/`let` over `var`
- **`eqeqeq`** — Requires `===` instead of `==` to avoid type coercion surprises
- **`prefer-const`** — Suggests `const` when a variable is never reassigned
- **`no-unused-vars`** — Warns about declared but unused variables

### Prettier

Opinionated code formatter that handles all stylistic concerns — quotes, semicolons, indentation, line length. By letting Prettier own formatting, ESLint can focus purely on code quality.

The two tools are integrated via `eslint-config-prettier`, which disables ESLint's formatting rules to avoid conflicts.
