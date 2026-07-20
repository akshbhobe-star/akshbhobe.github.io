// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
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
  });
});

// Scroll-triggered reveal for case study cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.case').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(18px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Nav background solidify on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 1px 0 rgba(36,19,17,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Filter bar logic (Strategy & Consulting / Consumer Research pages)
const filterBar = document.getElementById('filterBar');
if (filterBar) {
  const pills = filterBar.querySelectorAll('.filter-pill');
  const cases = document.querySelectorAll('.case');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      cases.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
