// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Mobile dropdown (Projects) toggle — tap to expand instead of hover
const dropdownBtn = document.querySelector('.nav-dropdown-btn');
const dropdown = document.querySelector('.nav-dropdown');
if (dropdownBtn) {
  dropdownBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      dropdown.classList.toggle('mobile-open');
    }
  });
}

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Nav background solidify on scroll (rAF-throttled + passive so it never blocks scrolling)
const nav = document.getElementById('nav');
let navScrolled = null;
function updateNavShadow() {
  const shouldShow = window.scrollY > 40;
  if (shouldShow === navScrolled) return;
  navScrolled = shouldShow;
  nav.style.boxShadow = shouldShow ? '0 1px 0 rgba(36,19,17,0.08)' : 'none';
}
window.addEventListener('scroll', () => { requestAnimationFrame(updateNavShadow); }, { passive: true });
updateNavShadow();

// Note: research.html's project filtering now lives in its own page-specific
// script (the accordion component), since it replaced the tile-grid/filter-bar UI.

// Gentle on-scroll reveal for homepage sections (replaces the old
// scroll-hijacked pin/zoom effect). No-ops gracefully if .reveal isn't
// present (other pages) or if the browser lacks IntersectionObserver.
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }
} else if (revealEls.length) {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
