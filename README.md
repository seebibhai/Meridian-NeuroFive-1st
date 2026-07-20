# Meridian — SaaS Landing Page

A production-quality, fully responsive landing page for **Meridian**, a
real-time infrastructure monitoring & alerting SaaS product, built with
**pure HTML5, CSS3, and vanilla JavaScript (ES6)** — no frameworks, no
libraries, no build step.

---

## 1. Project Overview

Meridian's pitch: *"Know your systems are up before your users tell you
they're not."* The page is designed around that idea — a live-looking pulse
graphic in the hero, a metrics-dashboard mockup, and copy aimed at
engineers/SREs rather than generic "grow your business" SaaS language.

The entire page is rendered by JavaScript component functions into a single
`<div id="app">` in `index.html`. No section's HTML is hand-written and
duplicated — every card (feature, pricing, testimonial, FAQ) is generated
from a JS function reading structured data.

---

## 2. Features

- Sticky, blurring navbar with smooth scroll + mobile hamburger drawer
- Hero with an animated, stroke-drawn "live pulse" SVG graphic
- Trusted-by logo strip (original fictional wordmarks, all local SVG)
- 6 feature cards with icons and hover lift animation
- Why Choose Us section with an incident-timeline illustration + checklist
- Product preview with a browser-chrome-framed dashboard mockup
- Statistics section with scroll-triggered animated counters
- 6 testimonial cards with star ratings and avatar illustrations
- 3-tier pricing (Basic / Pro / Enterprise) with a highlighted plan
- JavaScript-driven FAQ accordion (single-open, keyboard accessible)
- Newsletter signup with client-side email validation
- Final CTA banner
- Footer with link columns, social icons, and dynamic copyright year
- Bonus: scroll progress bar, back-to-top button, button ripple effect,
  scroll-reveal animation on every section, floating hero badges

---

## 3. Folder Structure

```
meridian/
│
├── index.html                 → HTML shell; loads CSS/JS, holds #app mount point
│
├── css/
│   ├── reset.css               → normalizes browser default styles
│   ├── variables.css           → design tokens (color, type, spacing, radius, shadow)
│   ├── style.css                → base typography + every component's visual styles
│   ├── utilities.css           → small reusable helper classes (.container, .grid, .reveal…)
│   └── responsive.css           → mobile-first breakpoint overrides, loaded last
│
├── js/
│   ├── data.js                  → all page copy/content (single source of truth)
│   ├── components.js            → shared low-level builders: createButton, createCard, createIcon, createStars
│   ├── navbar.js                 → navbar component + mobile drawer + scroll-blur logic
│   ├── hero.js                   → hero section + animated pulse SVG
│   ├── features.js                → trusted-by, feature cards, why-us, product preview, stats counters
│   ├── testimonials.js            → testimonial card component + section
│   ├── pricing.js                 → pricing card component + section
│   ├── faq.js                     → FAQ accordion component + section
│   ├── footer.js                  → newsletter, final CTA, footer
│   └── app.js                     → mounts every section + page-wide behavior (scroll reveal, progress bar, back-to-top, smooth scroll)
│
├── images/
│   ├── logo.svg, favicon.svg      → brand mark (pulse line in a rounded square)
│   ├── dashboard-mockup.svg       → product preview illustration
│   ├── why-visual.svg             → incident timeline illustration
│   ├── icons/                     → feature icons + social icons (all inline-style line SVGs)
│   ├── logos/                     → 6 fictional "trusted by" company wordmarks
│   └── avatars/                   → 6 abstract initials-based testimonial avatars
│
└── README.md
```

**All images are original SVG files created for this project** — no
external image URLs, stock photos, or third-party logos are used anywhere
in the page, per the project requirements.

### Why this structure?
Every CSS file has exactly one job (reset OR tokens OR components OR
utilities OR responsive), so a developer can predict which file to open
without reading all of them. Every JS file maps to either a data concern
(`data.js`) or a section of the page, which mirrors how a real frontend
team would split ownership of a large page across multiple files/PRs.

---

## 4. Component-Based Architecture

Even without a framework, the page uses functions as components:

| Function | Produces |
|---|---|
| `createButton(opts)` | `<button>`/`<a>` styled button, with ripple effect |
| `createCard(className)` | generic bordered card shell |
| `createIcon(src, alt)` | consistent `<img>` with lazy-loading + alt text |
| `createStars(count)` | star rating markup |
| `createFeature(feature)` | one feature card |
| `createTestimonial(t)` | one testimonial card |
| `createPricing(plan)` | one pricing card |
| `createFaqItem(item, i)` | one accordion item |
| `render*()` functions | assemble components into full `<section>`s |

`app.js` calls every `render*()` function once and appends the results to
`#app` — so `index.html` stays a thin shell and content changes only
require editing `data.js`.

---

## 5. Installation & How to Run

No build tools, no `npm install` required.

1. Download / unzip the project folder.
2. Open `index.html` directly in any modern browser, **or** serve it
   locally for the most accurate experience (some browsers restrict
   `file://` fetches for fonts/assets):

   ```bash
   # Python 3
   cd meridian
   python3 -m http.server 5500
   # then visit http://localhost:5500
   ```

   ```bash
   # Node (if you have the http-server package)
   npx http-server -p 5500
   ```
3. That's it — no dependencies, no compilation step.

---

## 6. Technologies Used

- **HTML5** — semantic elements (`header`, `nav`, `section`, `footer`)
- **CSS3** — custom properties (variables), CSS Grid & Flexbox, keyframe
  animations, media queries
- **Vanilla JavaScript (ES6)** — template literals, arrow functions,
  `IntersectionObserver`, `classList`, event delegation
- **Google Fonts** — Space Grotesk, Inter, Space Mono
- No frameworks, no libraries, no bundler

---

## 7. Responsive Breakpoints

| Breakpoint | Target device | Key layout changes |
|---|---|---|
| 320px – 374px | Small mobile | Single column, hamburger nav, 2-col stats |
| 375px – 424px | Standard mobile | Single column, hamburger nav |
| 425px – 767px | Large mobile | Single column, 2-col stats grid |
| 768px – 1023px | Tablet | 2-col features/pricing/testimonials, 2-col footer |
| 1024px – 1279px | Laptop | Full desktop nav, 3-col grids restored |
| 1280px – 1439px | Desktop | Max container width applied |
| 1440px+ | Large desktop | Wider container, larger hero type |

CSS is written **mobile-first**: base rules in `style.css` target the
smallest screens, and `responsive.css` progressively adds back multi-column
layouts as `min-width` breakpoints are crossed. No element overflows at any
tested width — images are responsive (`max-width: 100%` in `reset.css`) and
all grids collapse to a single column before 768px.

---

## 8. Design System

Defined entirely in `css/variables.css`:

```css
--color-bg:            #0b0f14;   /* page background — deep charcoal-navy */
--color-surface:       #121a26;   /* card / component background */
--color-primary:       #5b6ef5;   /* indigo — brand, links, primary CTA */
--color-accent:        #ffb020;   /* amber — highlights, "signal" motif   */
--color-signal-good:   #35d399;   /* uptime / success status             */
--color-signal-bad:    #ff5c5c;   /* error / down status                 */
--color-text:          #eef1f6;
--color-text-muted:    #9aa7bd;
--color-border:        #253044;

--font-display: 'Space Grotesk';  /* headings — technical, geometric      */
--font-body:    'Inter';          /* body copy — neutral, legible         */
--font-mono:    'Space Mono';     /* metrics/data — reads as "live" data  */

--space-xs … --space-4xl          /* 4px-based spacing scale              */
--radius-sm … --radius-full       /* 6px / 12px / 20px / pill             */
--shadow-sm / md / lg / glow      /* elevation + brand-colored glow       */
--container-width: 1200px         /* max content width, grows at 1440px  */
```

### Why a dark, indigo/amber palette instead of a generic light SaaS theme?
Meridian is a monitoring tool that engineers keep open on a second monitor
during incidents — a dark, dashboard-like surface fits how the product is
actually used, and the amber "signal" accent echoes a status light rather
than being a decorative brand color.

---

## 9. Accessibility

- Semantic landmarks: `header`, `nav`, `main` content via `section`, `footer`
- Every image has descriptive `alt` text (or `alt=""` for pure decoration)
- FAQ accordion uses real `<button>` elements with `aria-expanded` /
  `aria-controls`, so it's fully keyboard and screen-reader operable
- Visible focus rings via `:focus-visible` (never removed)
- Form input has an associated `<label>` (visually hidden, still announced)
- Respects `prefers-reduced-motion` — animations and smooth scroll disable
  themselves for users who've asked for reduced motion at the OS level

---

## 10. Future Improvements

- Add a light/dark theme toggle (tokens are already centralized, so this is
  mostly a matter of swapping the `:root` variable values behind a class)
- Replace the static pricing/testimonial data with a real CMS/API call
- Add a real testimonial carousel with drag/swipe support on mobile
- Add form submission to a real newsletter provider (currently simulated
  client-side only)
- Add unit tests for the component functions using a lightweight test
  runner (e.g. Vitest) since none of them touch the DOM until called
## 11. Veiw Live Website
https://seebibhai.github.io/Meridian-NeuroFive-1st/
