/**
 * Loads HTML partials into placeholder elements.
 */

// DOMContentLoaded fires when HTML is fully parsed and the DOM tree is ready
document.addEventListener('DOMContentLoaded', () => {
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    fetch('partials/footer.html')
      .then((res) => res.text())
      .then((html) => (footerSlot.innerHTML = html));
  }
});
