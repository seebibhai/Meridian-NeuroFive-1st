/* ==========================================================================
   PRICING.JS
   Pricing Card Component. The "highlighted" plan is a data flag
   (plan.highlighted), not a hardcoded "middle card" style — so if the
   business ever wants to promote a different tier, it's a one-line change
   in data.js instead of a CSS/HTML edit.
   ========================================================================== */

function createPricing(plan) {
  const card = createCard(`pricing-card reveal${plan.highlighted ? ' is-highlighted' : ''}`);

  if (plan.badge) {
    const badge = document.createElement('span');
    badge.className = 'pricing-badge';
    badge.textContent = plan.badge;
    card.appendChild(badge);
  }

  const name = document.createElement('div');
  name.className = 'pricing-plan-name';
  name.textContent = plan.name;

  const price = document.createElement('div');
  price.className = 'pricing-price';
  price.innerHTML = `<span class="amount">${typeof plan.price === 'number' ? '$' + plan.price : plan.price}</span><span class="period">${plan.period}</span>`;

  const list = document.createElement('ul');
  list.className = 'pricing-features';
  plan.features.forEach(f => {
    const li = document.createElement('li');
    li.className = f.included ? '' : 'is-excluded';
    li.textContent = (f.included ? '✓  ' : '—  ') + f.text;
    list.appendChild(li);
  });

  const btn = createButton({
    label: plan.cta,
    variant: plan.highlighted ? 'primary' : 'ghost',
    block: true,
  });
  btn.setAttribute('href', '#');

  card.append(name, price, list, btn);
  return card;
}

function renderPricing() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'pricing';
  section.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Pricing</span>
        <h2>Simple pricing that scales with your infrastructure</h2>
        <p>Every plan includes unlimited team members and a 14-day free trial.</p>
      </div>
      <div class="grid pricing-grid"></div>
    </div>
  `;
  const grid = section.querySelector('.pricing-grid');
  SITE_DATA.pricing.forEach(plan => grid.appendChild(createPricing(plan)));
  return section;
}
