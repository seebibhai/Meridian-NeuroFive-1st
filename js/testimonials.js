/* ==========================================================================
   TESTIMONIALS.JS
   Testimonial Card Component. Kept as its own file because social proof
   has its own data shape (quote/author/role/avatar/stars) distinct from a
   feature or pricing card, even though visually it reuses the same card
   pattern via createCard().
   ========================================================================== */

function createTestimonial(t) {
  const card = createCard('testimonial-card reveal');
  card.appendChild(createStars(t.stars));

  const quote = document.createElement('p');
  quote.className = 'testimonial-quote';
  quote.textContent = `"${t.quote}"`;
  card.appendChild(quote);

  const author = document.createElement('div');
  author.className = 'testimonial-author';
  const avatar = createIcon(t.avatar, `Portrait avatar for ${t.name}`);
  const meta = document.createElement('div');
  meta.innerHTML = `<div class="name">${t.name}</div><div class="role">${t.role}</div>`;
  author.append(avatar, meta);
  card.appendChild(author);

  return card;
}

function renderTestimonials() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'testimonials';
  section.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Testimonials</span>
        <h2>Engineering teams sleep better with Meridian</h2>
        <p>Real feedback from the people who get paged at 3am.</p>
      </div>
      <div class="grid testimonials-track"></div>
    </div>
  `;
  const track = section.querySelector('.testimonials-track');
  SITE_DATA.testimonials.forEach(t => track.appendChild(createTestimonial(t)));
  return section;
}
