/* ==========================================================================
   FAQ.JS
   FAQ Component. Uses a real <button> for the question (not a <div> with a
   click handler) so it's keyboard-focusable and reachable by screen readers
   out of the box, and toggles max-height instead of display:none so the
   collapse can be CSS-animated smoothly.
   ========================================================================== */

function createFaqItem(item, index) {
  const el = document.createElement('div');
  el.className = 'faq-item';

  el.innerHTML = `
    <button class="faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
      <span>${item.q}</span>
      <span class="faq-icon" aria-hidden="true">+</span>
    </button>
    <div class="faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
      <p class="faq-answer-inner">${item.a}</p>
    </div>
  `;

  const question = el.querySelector('.faq-question');
  const answer = el.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = el.classList.contains('is-open');

    // close any other open item so only one is expanded at a time
    document.querySelectorAll('.faq-item.is-open').forEach(open => {
      if (open !== el) {
        open.classList.remove('is-open');
        open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        open.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    el.classList.toggle('is-open', !isOpen);
    question.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
  });

  return el;
}

function renderFaq() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'faq';
  section.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">FAQ</span>
        <h2>Questions engineers ask before they switch</h2>
        <p>Can't find your answer? Reach out and a real engineer will respond.</p>
      </div>
      <div class="faq-list reveal"></div>
    </div>
  `;
  const list = section.querySelector('.faq-list');
  SITE_DATA.faq.forEach((item, i) => list.appendChild(createFaqItem(item, i)));
  return section;
}
