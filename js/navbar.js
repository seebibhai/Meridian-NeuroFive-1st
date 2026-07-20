/* ==========================================================================
   NAVBAR.JS
   Builds the sticky header from SITE_DATA.nav so links only need to be
   edited in one place. Also owns the mobile drawer (hamburger -> slide-in
   panel) and the "blur on scroll" effect, since both are navbar-specific
   behaviour and don't belong in the generic app.js orchestrator.
   ========================================================================== */

function renderNavbar() {
  const header = document.createElement('header');
  header.className = 'navbar';
  header.innerHTML = `
    <div class="container navbar-inner">
      <a href="#top" class="navbar-brand">
        <img src="images/logo.svg" alt="Meridian logo" width="28" height="28" />
        Meridian
      </a>

      <nav class="navbar-links" aria-label="Primary">
        ${SITE_DATA.nav.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}
      </nav>

      <div class="navbar-actions">
        <a href="#pricing" class="btn btn-ghost btn-sm">Log in</a>
        <a href="#pricing" class="btn btn-primary btn-sm">Start free trial</a>
      </div>

      <button class="navbar-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const scrim = document.createElement('div');
  scrim.className = 'navbar-scrim';

  const drawer = document.createElement('nav');
  drawer.id = 'mobile-drawer';
  drawer.className = 'navbar-drawer';
  drawer.setAttribute('aria-label', 'Mobile');
  drawer.innerHTML = `
    ${SITE_DATA.nav.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}
    <a href="#pricing" class="btn btn-ghost btn-block">Log in</a>
    <a href="#pricing" class="btn btn-primary btn-block">Start free trial</a>
  `;

  document.body.appendChild(scrim);
  document.body.appendChild(drawer);

  // sticky blur background once the user scrolls past the hero top
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  // hamburger open/close
  const toggle = header.querySelector('.navbar-toggle');
  const closeDrawer = () => {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const openDrawer = () => {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  toggle.addEventListener('click', () => {
    toggle.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  scrim.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  return header;
}
