/* ==========================================================================
   APP.JS
   The single entry point. Its only two jobs:
     1. Mount every section, in order, into #app — so index.html's <body>
        stays essentially empty and the page's structure lives in code
        that's easy to reorder, test, or reuse.
     2. Wire up behavior that belongs to the PAGE, not to one component:
        smooth scroll, scroll-reveal animations, the scroll progress bar,
        and the back-to-top button.
   This file loads last (see index.html) so every render*() and create*()
   function above it is already defined on the page.
   ========================================================================== */

(function mountPage() {
  const root = document.getElementById('app');

  const sections = [
    renderNavbar(),
    renderHero(),
    renderTrustedBy(),
    renderFeatures(),
    renderWhyUs(),
    renderProductPreview(),
    renderStatistics(),
    renderTestimonials(),
    renderPricing(),
    renderFaq(),
    renderNewsletter(),
    renderFinalCta(),
    renderFooter(),
  ];

  // one batched append instead of N separate reflows — cheaper than
  // calling root.appendChild() in a loop against the live document.
  const fragment = document.createDocumentFragment();
  sections.forEach(el => fragment.appendChild(el));
  root.appendChild(fragment);

  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initSmoothScroll();
})();

/** Fills a fixed top bar based on how far down the page the user has scrolled. */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${percent}%`;
  }, { passive: true });
}

/** Shows a "back to top" button after the user scrolls past one viewport. */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&uarr;';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/** Fades + slides any .reveal element into place the first time it enters
    the viewport. Uses one shared IntersectionObserver instead of one per
    element — much cheaper on a page with 30+ animated elements. */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/** Intercepts in-page #hash links so they scroll smoothly and account for
    the fixed navbar height instead of hiding the target section under it. */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', `#${id}`);
  });
}
