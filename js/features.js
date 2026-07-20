/* ==========================================================================
   FEATURES.JS
   Groups every section that explains "what Meridian does and why it's
   credible": trusted-by logos, the 6 feature cards, the why-choose-us
   checklist, the product preview mockup, and the animated stat counters.
   They're kept in one file because they share the same data cluster and
   visual purpose (building trust before the pricing ask).
   ========================================================================== */

/** Feature Card Component — one per item in SITE_DATA.features */
function createFeature(feature) {
  const card = createCard('feature-card reveal');
  const iconWrap = document.createElement('div');
  iconWrap.className = 'feature-icon';
  iconWrap.appendChild(createIcon(feature.icon, ''));

  const title = document.createElement('h3');
  title.textContent = feature.title;

  const desc = document.createElement('p');
  desc.textContent = feature.desc;

  card.append(iconWrap, title, desc);
  return card;
}

function renderTrustedBy() {
  const section = document.createElement('section');
  section.className = 'trusted-by';
  section.innerHTML = `
    <div class="container">
      <p>Trusted by engineering teams at</p>
      <div class="trusted-logos"></div>
    </div>
  `;
  const wrap = section.querySelector('.trusted-logos');
  SITE_DATA.trustedBy.forEach(company => {
    wrap.appendChild(createIcon(company.src, `${company.name} logo`));
  });
  return section;
}

function renderFeatures() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'features';
  section.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Features</span>
        <h2>Everything an on-call engineer actually opens</h2>
        <p>Six tools built around one goal: knowing about a problem before it becomes a support ticket.</p>
      </div>
      <div class="grid features-grid"></div>
    </div>
  `;
  const grid = section.querySelector('.features-grid');
  SITE_DATA.features.forEach(f => grid.appendChild(createFeature(f)));
  return section;
}

function renderWhyUs() {
  const section = document.createElement('section');
  section.className = 'section why-us';
  section.innerHTML = `
    <div class="container">
      <div class="grid why-grid">
        <div class="why-visual reveal">
          <img src="images/why-visual.svg" alt="Sample incident timeline showing detection, paging, and resolution steps" />
        </div>
        <div class="why-copy reveal">
          <span class="eyebrow">Why choose Meridian</span>
          <h2>Built for the five minutes that matter most</h2>
          <p>Most monitoring tools are great at collecting data and slow at helping you act on it. Meridian is built around the incident, not the dashboard.</p>
          <ul class="why-checklist" id="why-checklist"></ul>
        </div>
      </div>
    </div>
  `;
  const list = section.querySelector('#why-checklist');
  SITE_DATA.whyChecklist.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="why-check-icon"></span><span>${item}</span>`;
    li.querySelector('.why-check-icon').appendChild(createIcon('images/icons/icon-check.svg', ''));
    list.appendChild(li);
  });
  return section;
}

function renderProductPreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'preview';
  section.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Product preview</span>
        <h2>One dashboard, every signal</h2>
        <p>Latency, uptime, throughput and live incident status in a single view your whole team can read.</p>
      </div>
      <div class="preview-frame reveal">
        <div class="frame-bar"><span></span><span></span><span></span></div>
        <img src="images/dashboard-mockup.svg" alt="Meridian dashboard mockup showing uptime, latency, request volume and error-rate cards above a live line chart" />
      </div>
    </div>
  `;
  return section;
}

/** Animated counter used by the Statistics section — counts from 0 to target
    once the section scrolls into view, instead of on page load, so the
    motion actually means something to the person reading it. */
function animateCounter(el, target, suffix, duration = 1400) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = target * eased;
    el.textContent = (isFloat ? current.toFixed(2) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = (isFloat ? target.toFixed(2) : target.toLocaleString()) + suffix;
  }
  requestAnimationFrame(tick);
}

function renderStatistics() {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container">
      <div class="grid stats-grid" id="stats-grid"></div>
    </div>
  `;
  const grid = section.querySelector('#stats-grid');
  SITE_DATA.stats.forEach((stat, i) => {
    const item = document.createElement('div');
    item.className = 'reveal';
    item.innerHTML = `<span class="stat-value" data-target="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</span><span class="stat-label">${stat.label}</span>`;
    grid.appendChild(item);
  });

  // trigger counters once, when the grid enters the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        grid.querySelectorAll('.stat-value').forEach(el => {
          animateCounter(el, parseFloat(el.dataset.target), el.dataset.suffix);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(grid);

  return section;
}
