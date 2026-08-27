document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.removeAttribute('open');
    });
  });
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.querySelector('.site-nav');
const progress = document.querySelector('.scroll-progress span');
let scrollFrame;

const updateScrollEffects = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  progress?.style.setProperty('--progress', amount);
  nav?.classList.toggle('is-scrolled', window.scrollY > 28);
  scrollFrame = null;
};

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
}, { passive: true });
updateScrollEffects();

const revealTargets = document.querySelectorAll([
  '.section-intro',
  '.feature-card',
  '.service-card',
  '.process-card',
  '.product-row',
  '.faq-intro',
  '.faq-list',
  '.takeaway-content',
  '.takeaway-orbit',
  '.cta > *',
  '.contact-heading',
  '.contact-form',
  '.secure-note'
].join(','));

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll('.feature-card, .service-card, .process-card').forEach((card) => {
  card.classList.add('spotlight-card');
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

const hero = document.querySelector('.hero');
if (hero && !reducedMotion) {
  hero.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    hero.style.setProperty('--hero-glow-x', `${(x * 3).toFixed(2)}%`);
    hero.style.setProperty('--hero-glow-y', `${(y * 2).toFixed(2)}%`);
    hero.style.setProperty('--hero-left-x', `${(x * 12).toFixed(2)}px`);
    hero.style.setProperty('--hero-left-y', `${(y * 9).toFixed(2)}px`);
    hero.style.setProperty('--hero-left-r', `${(x * -1).toFixed(2)}deg`);
    hero.style.setProperty('--hero-right-x', `${(x * -15).toFixed(2)}px`);
    hero.style.setProperty('--hero-right-y', `${(y * -11).toFixed(2)}px`);
    hero.style.setProperty('--hero-right-r', `${(x * 1.2).toFixed(2)}deg`);
  });
  hero.addEventListener('pointerleave', () => {
    ['--hero-glow-x', '--hero-glow-y', '--hero-left-x', '--hero-left-y', '--hero-left-r', '--hero-right-x', '--hero-right-y', '--hero-right-r'].forEach((property) => hero.style.removeProperty(property));
  });
}

const homeSections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav nav a[href^="#"]')];
if (homeSections.length && navLinks.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.18, 0.4, 0.65], rootMargin: '-20% 0px -55% 0px' });
  homeSections.forEach((section) => sectionObserver.observe(section));
}
