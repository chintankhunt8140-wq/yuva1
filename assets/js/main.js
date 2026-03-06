// ============================================
// YUVA CONSULTANCY — Global JavaScript
// ============================================

/* ---- Sticky Header ---- */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ---- Mobile Nav Toggle ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Active Nav Link ---- */
(function markActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#header .nav a, #mobileNav a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- Scroll Reveal ---- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---- Counter Animation ---- */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  });
}

function initCounters() {
  const bars = document.querySelectorAll('.stats-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounters(); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const original = btn.innerHTML;
    btn.innerHTML = '✅ &nbsp;Message Sent Successfully!';
    btn.disabled = true;
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.innerHTML = original; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3500);
  });
}

/* ---- Testimonials Simple Slider (auto-advance) ---- */
function initTestimonialSlider() {
  const wrapper = document.querySelector('.testimonial-slider');
  if (!wrapper) return;
  const cards = wrapper.querySelectorAll('.testimonial-card');
  if (cards.length <= 1) return;
  let active = 0;
  // On mobile, show one at a time with fade
  if (window.innerWidth < 768) {
    cards.forEach((c, i) => { c.style.display = i === 0 ? 'block' : 'none'; });
    setInterval(() => {
      cards[active].style.display = 'none';
      active = (active + 1) % cards.length;
      cards[active].style.display = 'block';
    }, 4000);
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFAQ();
  initCounters();
  initContactForm();
  initTestimonialSlider();
});
