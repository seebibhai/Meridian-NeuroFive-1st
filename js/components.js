/* ==========================================================================
   COMPONENTS.JS
   The smallest reusable building blocks. Every section-specific file
   (features.js, pricing.js, testimonials.js...) composes its cards out of
   these instead of writing raw <button> or <img> markup itself. That's the
   "component-based" part of a vanilla-JS build: no HTML template, one
   function you can call from anywhere and trust to look consistent.
   ========================================================================== */

/**
 * Builds a <button> or <a> styled as a button.
 * @param {Object} opts
 * @param {string} opts.label - visible text
 * @param {'primary'|'ghost'} [opts.variant]
 * @param {'sm'|'md'} [opts.size]
 * @param {string} [opts.href] - if present, renders an <a>, otherwise a <button>
 * @param {boolean} [opts.block] - full width
 * @returns {HTMLElement}
 */
function createButton({ label, variant = 'primary', size = 'md', href, block = false }) {
  const el = document.createElement(href ? 'a' : 'button');
  el.className = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}${block ? ' btn-block' : ''}`;
  el.textContent = label;
  if (href) el.setAttribute('href', href);
  else el.setAttribute('type', 'button');

  // ripple micro-interaction, shared by every button on the page
  el.addEventListener('click', function (e) {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  return el;
}

/**
 * Generic empty card shell with a css class — sections add their own
 * content into it rather than duplicating the border/radius/padding rules.
 */
function createCard(className = 'feature-card') {
  const el = document.createElement('div');
  el.className = className;
  return el;
}

/** Small helper to build an <img> tag consistently, always with alt text. */
function createIcon(src, alt = '') {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  return img;
}

/** Renders a row of 1-5 star glyphs for testimonials. */
function createStars(count) {
  const span = document.createElement('span');
  span.className = 'testimonial-stars';
  span.setAttribute('aria-label', `${count} out of 5 stars`);
  span.textContent = '★★★★★'.slice(0, count) + '☆☆☆☆☆'.slice(0, 5 - count);
  return span;
}
