/* ==========================================================================
   FOOTER.JS
   Groups the page's closing sections: the newsletter signup (with inline
   JS validation), the final motivational CTA, and the site footer with its
   link columns and social icons. Grouped together because they share no
   interactive state with the sections above and are naturally "the bottom
   of the page" as a unit.
   ========================================================================== */

function renderNewsletter() {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container">
      <div class="newsletter reveal">
        <span class="eyebrow">Newsletter</span>
        <h2>Get incident-response tips in your inbox</h2>
        <p>One email a month. No spam, unsubscribe anytime.</p>
        <form class="newsletter-form" id="newsletter-form" novalidate>
          <label for="newsletter-email" class="visually-hidden">Email address</label>
          <input type="email" id="newsletter-email" placeholder="you@company.com" autocomplete="email" required />
          <span id="newsletter-btn-slot"></span>
        </form>
        <p class="newsletter-msg" id="newsletter-msg" role="status" aria-live="polite"></p>
      </div>
    </div>
  `;

  const btn = createButton({ label: 'Subscribe', variant: 'primary' });
  btn.type = 'submit';
  section.querySelector('#newsletter-btn-slot').replaceWith(btn);

  const form = section.querySelector('#newsletter-form');
  const emailInput = section.querySelector('#newsletter-email');
  const msg = section.querySelector('#newsletter-msg');

  // Simple client-side email validation. In production this would also
  // be validated server-side — never trust the client alone.
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = emailInput.value.trim();

    if (!EMAIL_PATTERN.test(value)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'newsletter-msg is-error';
      emailInput.focus();
      return;
    }

    msg.textContent = `Thanks — we'll send updates to ${value}.`;
    msg.className = 'newsletter-msg is-success';
    form.reset();
  });

  return section;
}

function renderFinalCta() {
  const section = document.createElement('section');
  section.className = 'section final-cta';
  section.innerHTML = `
    <div class="container">
      <span class="eyebrow reveal">Ready when you are</span>
      <h2 class="reveal">Stop finding out about outages from your customers.</h2>
      <div class="hero-ctas reveal" style="justify-content:center;" id="final-cta-slot"></div>
    </div>
  `;
  const btn = createButton({ label: 'Start your free trial', variant: 'primary' });
  btn.setAttribute('href', '#pricing');
  section.querySelector('#final-cta-slot').appendChild(btn);
  return section;
}

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const columnsHtml = Object.entries(SITE_DATA.footerLinks).map(([title, links]) => `
    <div class="footer-col">
      <h4>${title}</h4>
      <ul>
        ${links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
      </ul>
    </div>
  `).join('');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#top" class="navbar-brand">
            <img src="images/logo.svg" alt="Meridian logo" width="28" height="28" />
            Meridian
          </a>
          <p>Real-time monitoring, tracing, and alerting for teams who can't afford downtime.</p>
        </div>
        ${columnsHtml}
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Meridian, Inc. All rights reserved.</p>
        <div class="footer-socials" id="footer-socials"></div>
      </div>
    </div>
  `;

  const socials = [
    { name: 'X (Twitter)', icon: 'images/icons/social-x.svg' },
    { name: 'GitHub', icon: 'images/icons/social-github.svg' },
    { name: 'LinkedIn', icon: 'images/icons/social-linkedin.svg' },
  ];
  const socialWrap = footer.querySelector('#footer-socials');
  socials.forEach(s => {
    const a = document.createElement('a');
    a.href = '#';
    a.setAttribute('aria-label', s.name);
    a.appendChild(createIcon(s.icon, ''));
    socialWrap.appendChild(a);
  });

  return footer;
}
