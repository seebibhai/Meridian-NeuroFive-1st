/* ==========================================================================
   HERO.JS
   The hero is the page's "thesis": it has to communicate what Meridian does
   in under three seconds. Instead of a generic screenshot, it renders a
   small live-looking metrics card whose line animates in with a stroke-draw
   effect on load — a visual metaphor for "we watch your signal" that ties
   directly back to the product and to the brand name.
   ========================================================================== */

function renderHero() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'top';

  const primaryBtn = createButton({ label: 'Start free trial', variant: 'primary' });
  primaryBtn.setAttribute('href', '#pricing');
  const secondaryBtn = createButton({ label: 'Watch demo', variant: 'ghost' });
  secondaryBtn.setAttribute('href', '#preview');

  section.innerHTML = `
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">
            <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;"></span>
            Now monitoring 3,100+ engineering teams
          </span>
          <h1 class="hero-title reveal">Know your systems are <span class="accent">up</span> before your users tell you they're not.</h1>
          <p class="hero-subtitle reveal">Meridian tracks uptime, latency, and traces across every service in real time, so your team hears about incidents from a dashboard — not from support tickets.</p>
          <div class="hero-ctas reveal" id="hero-ctas"></div>
          <div class="hero-meta reveal">
            <span class="dot"></span> No credit card required · 14-day free trial
          </div>
        </div>

        <div class="hero-visual reveal">
          <div class="hero-pulse-card">
            <div class="pulse-header">
              <span>api-gateway.meridian.live</span>
              <span class="pulse-status"><span class="dot"></span> Operational</span>
            </div>
            <svg class="hero-pulse-svg" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
              <polyline class="hero-pulse-line" points="0,80 40,80 60,30 90,100 120,50 150,70 180,20 210,90 240,60 270,75 300,35 330,65 360,55 400,60" />
            </svg>
            <div class="pulse-metrics">
              <div class="pulse-metric"><span class="value">99.98%</span><span class="label">Uptime</span></div>
              <div class="pulse-metric"><span class="value">142ms</span><span class="label">P99 latency</span></div>
              <div class="pulse-metric"><span class="value">0</span><span class="label">Open incidents</span></div>
            </div>
          </div>
          <div class="hero-floating-badge badge-1"><span class="dot" style="width:6px;height:6px;border-radius:50%;background:var(--color-signal-good);"></span> Alert resolved · 42s</div>
          <div class="hero-floating-badge badge-2">⌁ 12 checks/sec</div>
        </div>
      </div>
    </div>
  `;

  section.querySelector('#hero-ctas').append(primaryBtn, secondaryBtn);
  return section;
}
