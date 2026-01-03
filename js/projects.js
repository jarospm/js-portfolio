/**
 * Projects data array
 * Each project has: id, title, description, category, technologies, image, link
 */
const projects = [
  {
    id: 1,
    title: 'Rock Paper Scissors',
    description:
      'Browser-based implementation of the classic game, expanded with the Lizard & Spock variant. Features first-to-5 gameplay with score tracking and themed result messages.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/rock-paper-scissors',
  },
  {
    id: 2,
    title: 'Etch-a-Sketch',
    description:
      'Interactive drawing application with a customizable grid up to 100×100 pixels. Includes randomized color generation and a progressive darkening mechanism as you draw.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/etch-a-sketch',
  },
  {
    id: 3,
    title: 'Calculator',
    description:
      'Functional calculator with arithmetic operations, square root, decimal support, and keyboard input. Handles edge cases like division by zero and chained operations.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/calculator',
  },
  {
    id: 4,
    title: 'Tic Tac Toe',
    description:
      'Two-player game built with TypeScript featuring turn-based gameplay, automatic win/draw detection, and reset functionality. Demonstrates type aliases and union types.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'TypeScript', 'Vite'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/tic-tac-toe',
  },
  {
    id: 5,
    title: 'SLM Text Generator',
    description:
      "Character-level statistical language model that learns patterns from input text using k-grams. Generates new text that mimics the original's style through frequency sampling.",
    category: 'Algorithm',
    technologies: ['C++', 'Make'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/slm',
  },
  {
    id: 6,
    title: 'Simple CRUD API',
    description:
      'Educational REST API demonstrating database operations with products, suppliers, and purchases. Features SQLite persistence, foreign key constraints, and automatic quantity sync.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'SQLite'],
    image: 'images/placeholder.jpg',
    link: 'https://github.com/jarospm/simple-crud',
  },
];

// Project categories
const categories = ['All', 'Frontend', 'Backend', 'Algorithm'];

// Project technologies
const technologies = [
  'All',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Vite',
  'C++',
  'Make',
  'Node.js',
  'Express',
  'SQLite',
];

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const projectsContainer = document.getElementById('projects-container');
const visibleCountEl = document.getElementById('visible-count');
const totalCountEl = document.getElementById('total-count');

// ==========================================================================
// DISPLAY FUNCTION
// ==========================================================================

/**
 * Renders project cards to the container
 * @param {Array} projectsArray - Array of project objects to display
 */
function displayProjects(projectsArray) {
  // Build HTML string using .map() + .join('') to concatenate array into single string
  projectsContainer.innerHTML = projectsArray
    .map(
      (p) => `
      <article class="project-card">
        <div class="project-image">
          <img src="${p.image}" alt="${p.title}" />
        </div>
        <div class="project-content">
          <span class="project-category category-${p.category.toLowerCase()} text-label">
            ${p.category}
          </span>
          <h3 class="project-title text-title">${p.title}</h3>
          <p class="project-description text-sm text-slate">${p.description}</p>
          <div class="project-technologies">
            ${p.technologies.map((tech) => `<span class="tech-pill text-body-xs">${tech}</span>`).join('')}
          </div>
          <a href="${p.link}" class="project-link text-label" target="_blank">
            View Project
          </a>
        </div>
      </article>
    `
    )
    .join('');

  // Update counters
  visibleCountEl.textContent = projectsArray.length;
  totalCountEl.textContent = projects.length;
}

// Initialize on page load
displayProjects(projects);
