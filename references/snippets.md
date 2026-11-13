# Snippets

Copy-paste building blocks for the patterns in SKILL.md. All vanilla CSS/JS, no dependencies. Treat the
numbers and colors as starting points: swap tokens, sizes and timings to fit the project's direction.
Colors come from the tokens, so the snippets work on light and dark pages alike. In a framework, see
SKILL.md §10.

## Shared file structure (any site with more than one page, or likely to get one)

```
styles/
  main.css          the only stylesheet pages link; declares the layer order
  tokens.css        :root custom properties only (colors, type, space, radii, shadows, motion)
  base.css          reset, body, headings, links, focus, [hidden]
  layout.css        .frame .section .split .stack
  components.css    .btn .card .field .tip .site-header .site-footer … with --variants
  pages/*.css       optional, arrangement only; no colors or sizes of their own
scripts/site.js     reveals, tooltips, disclosures, driven by data attributes
partials/           header, footer, head (via the framework, SSG or build step)
```

```css
/* main.css: later layers win regardless of selector specificity */
@layer tokens, base, layout, components, pages;
@import url("tokens.css") layer(tokens);
@import url("base.css") layer(base);
@import url("layout.css") layer(layout);
@import url("components.css") layer(components);
```
Bundle them in a build step if there is one: chained `@import`s load one after another.

Tokens beyond color, so components never hard-code sizes:
```css
:root {
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 40px; --space-7: 64px;
  --radius-s: 8px; --radius-m: 14px; --radius-l: 22px; --radius-pill: 999px;
  --text-s: 14px; --text-m: 16px; --text-l: 20px; --text-xl: clamp(28px, 3.4vw, 40px); --text-hero: clamp(36px, 5.4vw, 60px);
  --dur-fast: .2s; --dur: .5s; --dur-reveal: 1s;
}
.stack > * + * { margin-top: var(--stack-gap, var(--space-4)); }   /* layout primitive: vertical rhythm */
```
Component with a variant, current-page nav marker:
```css
.card { padding: var(--space-5); border-radius: var(--radius-l); background: var(--surface); border: 1px solid var(--line); }
.card--flat { background: transparent; }
.site-nav a[aria-current="page"] { color: var(--text); }
.site-nav a[aria-current="page"]::after { transform: scaleX(1); }
```

## Tokens (glass-gradient family; swap values per family)

```css
:root {
  color-scheme: dark;
  --bg-1: #16206a; --bg-2: #1f3c8f; --bg-glow: #2f5fae;
  --text: #eef2ff; --muted: #b9c6ec; --dim: #8796c8;
    --line: rgba(160,185,255,.22); --surface: rgba(40,60,140,.45);
  --field-bg: rgba(15,25,80,.35); --tip-bg: #141d5c; --shadow: rgba(5,10,50,.5); --glow: rgba(150,180,255,.6);
  --accent-a: #c9f6e4; --accent-b: #b8c6ff; --on-accent: #1b2560;
  --ease-out: cubic-bezier(.2,.8,.2,1);
  --font: "Inter", system-ui, sans-serif;
}
body {
  margin: 0; color: var(--text); font: 16px/1.6 var(--font); -webkit-font-smoothing: antialiased;
  background: radial-gradient(1200px 700px at 50% 110%, var(--bg-glow), transparent 70%),
              linear-gradient(180deg, var(--bg-1), var(--bg-2)) fixed;
  background-color: var(--bg-1);
}
h1 { font-size: clamp(36px, 5.4vw, 60px); font-weight: 500; letter-spacing: -0.035em; line-height: 1.05; }
```

Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
then `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap`.

## Tokens: light and dark (neutral family)

Same token names, so every snippet works unchanged. Body text clears 4.5:1 on `--bg-1` and `--surface` in
both schemes. Drop the `[data-theme]` rules if there is no toggle.

```css
:root {
  color-scheme: light dark;
  --bg-1: #fafaf9; --bg-2: #fafaf9; --bg-glow: transparent; --surface: #ffffff;
  --text: #18181b; --muted: #52525b; --dim: #71717a; --line: rgba(0,0,0,.1);
  --accent-a: #4f46e5; --accent-b: #4f46e5; --on-accent: #ffffff;
  --field-bg: #ffffff; --tip-bg: #ffffff; --shadow: rgba(0,0,0,.12); --glow: rgba(79,70,229,.25);
  --ease-out: cubic-bezier(.2,.8,.2,1); --font: "Inter", system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-1: #0c0c0f; --bg-2: #0c0c0f; --surface: #17171c;
    --text: #f4f4f5; --muted: #a1a1aa; --dim: #8b8b94; --line: rgba(255,255,255,.12);
    --accent-a: #818cf8; --accent-b: #818cf8; --on-accent: #0c0c0f;
    --field-bg: #17171c; --tip-bg: #27272a; --shadow: rgba(0,0,0,.5); --glow: rgba(129,140,248,.3);
  }
}
:root[data-theme="dark"] { color-scheme: dark; /* same values as the dark block above */ }
:root[data-theme="light"] { color-scheme: light; }
```

## Page-load sequence

```html
<html class="no-js"> … <body class="is-loading">
```
```css
.site-main { transition: opacity 1s, transform 1s; }
body.is-loading .site-main { opacity: 0; transform: translateY(0.375rem); }
body.is-loading { pointer-events: none; }
```
```js
document.documentElement.classList.replace("no-js", "js");
addEventListener("load", () => requestAnimationFrame(() => document.body.classList.remove("is-loading")));
```

## Scroll-reveal engine (modeled on Carrd's reveal presets)

Markup: `data-reveal="fade-up|fade-down|fade-left|fade-right|fade-in|zoom-in|zoom-out|zoom-out-image|pop-in|blur-in"`,
optional `data-i` (intensity 0–5 → distance 6px + 4.2px × i), `data-delay` (ms), `data-speed` (ms,
default 1000), `data-stagger` (ms, applies to children).

```html
<p class="eyebrow" data-reveal="fade-down" data-i="1">Product name</p>
<h1 data-reveal="fade-up" data-i="0">Heading</h1>
<p data-reveal="fade-up" data-i="1">Paragraph</p>
<div class="actions" data-reveal="fade-up" data-i="2" data-delay="250">Buttons</div>
<ul data-reveal="fade-in" data-stagger="125"><li>…</li><li>…</li></ul>
<div class="frame-img"><img data-reveal="zoom-out-image" src="…" alt="…" width="…" height="…"></div>
```

Put `data-reveal` on a wrapper (like `.actions` above), not on a button or link that has its own hover
transition: the reveal's duration and delay would also slow the hover.

For a card whose **surface** should appear after its content (a 500ms delay works well),
put the reveal on a `::before` background layer: see "Card background fade" below.

```css
/* Hidden state only when JS is running, so content never stays invisible. */
.js [data-reveal]:not([data-stagger]), .js [data-stagger] > * {
  opacity: 0; transform: var(--reveal-from, none); filter: var(--reveal-filter, none);
  transition-property: opacity, transform, filter; transition-timing-function: ease;
}
/* The script sets --reveal-from / --reveal-filter, not inline transform/filter: an inline style would beat
   the visible state below and leave elements offset. */
.js [data-reveal].is-visible:not([data-stagger]), .js [data-stagger].is-visible > * {
  opacity: 1; transform: none; filter: none;
}
@media (prefers-reduced-motion: reduce) {
  .js [data-reveal], .js [data-stagger] > * { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
}
```

```js
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const initial = {
    "fade-up":        (d) => `translateY(${d}px)`,
    "fade-down":      (d) => `translateY(${-d}px)`,
    "fade-left":      (d) => `translateX(${d}px)`,
    "fade-right":     (d) => `translateX(${-d}px)`,
    "fade-in":        () => "none",
    "zoom-in":        () => "scale(0.98)",
    "zoom-out":       () => "scale(1.04)",
    "zoom-out-image": () => "scale(1.28)",   // put on an <img> inside overflow:hidden
    "pop-in":         () => "scale(0.9)",
    "blur-in":        () => "none",
  };
  const prep = (el, effect, d, speed, delay) => {
        el.style.setProperty("--reveal-from", (initial[effect] || initial["fade-up"])(d));
    if (effect === "blur-in") el.style.setProperty("--reveal-filter", "blur(8px)");
    el.style.transitionDuration = `${speed}ms`;
    el.style.transitionDelay = `${delay}ms`;
  };
  const els = document.querySelectorAll("[data-reveal]");
  els.forEach((el) => {
    const effect = el.dataset.reveal, d = 6 + 4.2 * +(el.dataset.i || 1);   // Carrd intensity ladder
    const speed = +(el.dataset.speed || 1000), delay = +(el.dataset.delay || 0);
    const stagger = el.dataset.stagger;
    if (stagger) [...el.children].slice(0, 8).forEach((c, i) => prep(c, effect, d, speed, delay + i * +stagger));
    else prep(el, effect, d, speed, delay);
  });
  if (reduce || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-visible");
    io.unobserve(e.target);                       // play once
  }), { threshold: 0.25 });
  els.forEach((el) => io.observe(el));
})();
```

Re-playing a reveal for content injected later (e.g. results): remove `is-visible`, force reflow
(`el.offsetWidth`), add it back inside `requestAnimationFrame`.

## Card background fade (content first, surface after)

```css
.card { position: relative; isolation: isolate; }   /* keeps the z-index:-1 layer inside the card */
.card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: var(--surface); z-index: -1; }
.js .card::before { opacity: 0; transition: opacity 1s ease .5s; }
.js .card.is-visible::before { opacity: 1; }
```
Give the card `data-reveal="fade-in"` (so it gets `is-visible`) and reveal its children separately.

**Not for glass cards.** On an element with `backdrop-filter`, don't animate the blur, a custom
property its colors depend on, or its children's opacity: Chrome flickers. Use a glass "stage"
instead: the card fades as one piece and its children only move.

```css
.js .stage { opacity: 0; transition: opacity 1s ease; }
.js .stage.is-visible { opacity: 1; }
.js .stage > * { transform: translateY(var(--rise, 14px)); transition: transform 1s ease; }
.js .stage > :nth-child(1) { --rise: 6px; }
.js .stage > :nth-child(2) { --rise: 10px; }
.js .stage.is-visible > * { transform: none; }
```

## Hover & focus micro-interactions

```css
.btn {
  display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 30px;
  font: inherit; font-weight: 600; color: var(--on-accent); border: 0; border-radius: 14px; cursor: pointer;
  background: linear-gradient(120deg, var(--accent-a), var(--accent-b));
  box-shadow: 0 10px 30px -8px var(--glow);
  transition: transform .25s, box-shadow .25s, background-color .25s, color .25s;
}
.btn:hover { transform: scale(1.0425); box-shadow: 0 16px 36px -8px var(--glow); }  /* 1.0425: most common template value */
.btn.lift:hover { transform: translateY(-11%); }                                                  /* alternative: lift */
.btn-outline { background: transparent; color: var(--text); border: 2px solid currentColor; }    /* secondary / editorial */
.btn-pill { border-radius: 999px; }
.btn:active { transform: scale(.98); }
.btn .arrow { transition: transform .25s; } .btn:hover .arrow { transform: translateX(3px); }
.btn:focus-visible, a:focus-visible, summary:focus-visible { outline: 2px solid var(--accent-a); outline-offset: 4px; }
.icon-btn:hover { transform: scale(1.08); color: var(--accent-a); }

/* Nav / text links: underline slides in from the left */
nav a { position: relative; color: var(--muted); text-decoration: none; padding: 6px 0; transition: color .2s; }
nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 2px;
  background: var(--accent-a); transform: scaleX(0); transform-origin: left; transition: transform .3s ease; }
nav a:hover, nav a:focus-visible { color: var(--text); }
nav a:hover::after, nav a:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { nav a::after { transition: none; } }

input {
  height: 48px; padding: 0 14px; border-radius: 12px; font: inherit; color: var(--text);
  background: var(--field-bg); border: 1px solid var(--line); outline: none;
  transition: border-color .2s, box-shadow .2s, background .2s;
}
input:focus-visible { border-color: var(--accent-a); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-a) 22%, transparent); }

/* Static disclosure (no animation). For an animated one use "Animated show/hide box" below. */
summary { list-style: none; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
summary::-webkit-details-marker { display: none; }
summary::before { content: ""; width: 7px; height: 7px; border-right: 2px solid; border-bottom: 2px solid; transform: rotate(-45deg); transition: transform .2s; }
details[open] summary::before { transform: rotate(45deg); }
```

## Glass card + ambient blobs (glass family)

```css
.glass {
  position: relative; overflow: hidden; border-radius: 22px; border: 1px solid rgba(255,255,255,.22);
  background: linear-gradient(135deg, rgba(110,150,235,.55), rgba(80,140,200,.45) 50%, rgba(90,170,150,.55));
  box-shadow: 0 30px 80px -20px rgba(5,10,50,.65), inset 0 1px 0 rgba(255,255,255,.25);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
}
.glass::before, .glass::after {
  content: ""; position: absolute; border-radius: 50%; filter: blur(50px); opacity: .55; pointer-events: none;
  animation: drift 18s ease-in-out infinite alternate;
}
.glass::before { width: 420px; height: 420px; left: -120px; bottom: -200px; background: #5d6ef0; }
.glass::after  { width: 380px; height: 380px; right: -120px; top: -160px; background: #5fc0a4; animation-delay: -9s; }
.glass > * { position: relative; z-index: 1; }
@keyframes drift { to { transform: translate(60px, -40px) scale(1.15); } }
@media (prefers-reduced-motion: reduce) { .glass::before, .glass::after { animation: none; } }
```

## Low-poly mesh background (generated, no image)

```html
<svg id="mesh" aria-hidden="true" style="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0"></svg>
```
```js
(() => {
  const svg = document.getElementById("mesh"), W = 1600, H = 1000, cols = 14, rows = 9, cw = W / cols, ch = H / rows;
  let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const pts = [];
  for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
    const edge = !r || !c || r === rows || c === cols;
    pts.push([c * cw + (edge ? 0 : (rnd() - .5) * cw * .8), r * ch + (edge ? 0 : (rnd() - .5) * ch * .8)]);
  }
  const P = (r, c) => pts[r * (cols + 1) + c].map((n) => n.toFixed(1)).join(",");
  let d = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    d += (r + c) % 2
      ? `M${P(r,c)}L${P(r,c+1)}L${P(r+1,c+1)}ZM${P(r,c)}L${P(r+1,c)}L${P(r+1,c+1)}Z`
      : `M${P(r,c)}L${P(r,c+1)}L${P(r+1,c)}ZM${P(r,c+1)}L${P(r+1,c+1)}L${P(r+1,c)}Z`;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.innerHTML = `<path d="${d}" fill="none" stroke="rgba(170,195,255,.09)"/>`;
})();
```

## Other background patterns (pure CSS, ≤10% contrast)

```css
/* Diagonal lines (for dark backgrounds) */
.bg-diagonal { background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 1px, transparent 1px 48px); }
/* Thin grid (for light backgrounds) */
.bg-grid { background-image: linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px); background-size: 160px 160px; }
/* Bubbles: a few outlined circles (on a colored gradient) */
.bg-bubbles { background-image: radial-gradient(circle at 20% 30%, transparent 10px, rgba(255,255,255,.25) 11px, transparent 12px),
                                radial-gradient(circle at 70% 60%, transparent 16px, rgba(255,255,255,.2) 17px, transparent 18px); background-size: 220px 180px; }
```

## Gradient headline text (dark-minimal family, hero only)

```css
.gradient-text { background: linear-gradient(104deg, var(--accent-a), var(--accent-b)); -webkit-background-clip: text; background-clip: text; color: transparent; }
```

## Framed photo overlapping a color block

```css
.photo-frame { border: 5px solid #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px -20px rgba(0,0,0,.35); }
.photo-frame img { display: block; width: 100%; height: auto; }
```

## Loading button

```html
<button class="btn" id="go"><span class="spinner" aria-hidden="true"></span><span class="label">Submit</span></button>
```
```css
.spinner { display: none; width: 16px; height: 16px; border-radius: 50%; border: 2px solid color-mix(in srgb, currentColor 25%, transparent); border-top-color: currentColor; animation: spin .7s linear infinite; }
.btn:disabled { opacity: .7; cursor: wait; transform: none; }
.btn:disabled .spinner { display: block; }
@keyframes spin { to { transform: rotate(360deg); } }
```
```js
btn.disabled = true; btn.querySelector(".label").textContent = "Submitting";
// … finally { btn.disabled = false; label back to "Submit" }
```

## Count-up numbers + bar fill

```js
function countUp(el, value, format, dur = 1100) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return (el.textContent = format(value));
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);   // ease-out cubic
    el.textContent = format(value * e);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```
```css
.track { height: 8px; border-radius: 99px; background: var(--line); overflow: hidden; }
.fill  { height: 100%; width: 0; border-radius: inherit; background: linear-gradient(90deg, var(--accent-a), var(--accent-b)); transition: width 1.1s var(--ease-out); }
```
Set `fill.style.width` inside a double `requestAnimationFrame` after inserting the markup so the transition runs.

## Results reveal + scroll into view

```css
#results { scroll-margin-top: 24px; }
```
```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
results.hidden = false;
results.classList.remove("is-visible"); void results.offsetWidth;
requestAnimationFrame(() => results.classList.add("is-visible"));
results.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
```

## Responsive skeleton (adjust widths to the page type)

```css
/* Tool pages with side-by-side panels: wide container, modest side padding. Reading pages: ~720–900px. */
.frame { max-width: 1360px; margin: 0 auto; padding-top: 24px; min-height: 100vh; display: flex; flex-direction: column; }
.frame > footer { margin-top: auto; }                  /* footer at the very bottom, also on short pages */
.section { padding: 64px 24px; }
.split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
@media (max-width: 860px) {
  .frame { margin: 0 16px; padding-top: 8px; }
  .section { padding: 40px 16px; }
  .split { grid-template-columns: 1fr; gap: 28px; }
}
```
Use `padding-top` on the frame, not a top margin: a margin collapses through `<body>` and, combined with
`min-height: 100vh`, adds a pointless 24px of scroll. Don't leave a bottom margin under the footer.

## Equal-height cards (input next to results)

```css
.cards { display: grid; grid-template-columns: minmax(360px, 4fr) minmax(0, 7fr); gap: 24px; align-items: start; }
@media (min-width: 961px) {
  .cards { align-items: stretch; }
  .cards > .input-card { display: flex; flex-direction: column; }
  .cards > .input-card form { margin-top: auto; }      /* heading at the top, form pinned to the bottom */
}
@media (max-width: 960px) { .cards { grid-template-columns: 1fr; } }
```
Put anything that expands (tables, long details) in its own block *after* the cards, not inside the results card.
That removes the need for script-based height syncing.

## Animated show/hide box (full-width, under the cards)

```html
<button type="button" class="more" id="moreBtn" aria-expanded="false" aria-controls="moreBox">
  <span id="moreLabel">Show details</span>
</button>
<!-- later, as a grid item that spans all columns -->
<div class="reveal-box" id="moreBox" role="region" aria-label="Details">
  <div class="reveal-inner"><div class="card">…content…</div></div>
</div>
```
```css
.cards { --gap: 24px; }
.reveal-box {
  grid-column: 1 / -1; display: grid; grid-template-rows: 0fr;
  margin-top: calc(var(--gap) * -1);                  /* cancels the grid gap while closed */
  opacity: 0; transform: translateY(-12px); visibility: hidden;
  transition: grid-template-rows .55s var(--ease-out), margin-top .55s var(--ease-out),
              opacity .4s ease, transform .55s var(--ease-out), visibility 0s linear .55s;   /* hide after the animation */
}
.reveal-box.open { grid-template-rows: 1fr; margin-top: 0; opacity: 1; transform: none; visibility: visible; transition-delay: 0s; }
.reveal-inner { min-height: 0; overflow: hidden; }
.reveal-box.settled .reveal-inner { overflow: visible; }  /* lets the card's shadow show once it has opened */
.reveal-box .card { backdrop-filter: none; }               /* it fades, so no backdrop-filter (flicker) */
.more::before { content: ""; width: 7px; height: 7px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
  transform: translateY(-2px) rotate(45deg); transition: transform .35s ease; }
.more[aria-expanded="true"]::before { transform: translateY(1px) rotate(-135deg); }
@media (prefers-reduced-motion: reduce) { .reveal-box, .more::before { transition: none; } }
```
```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const btn = document.getElementById("moreBtn"), box = document.getElementById("moreBox");
let settle = 0;
btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", open);
  document.getElementById("moreLabel").textContent = open ? "Hide details" : "Show details";
  clearTimeout(settle); box.classList.remove("settled"); box.classList.toggle("open", open);
  if (open) settle = setTimeout(() => {
    box.classList.add("settled");
    box.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }, reduce ? 0 : 600);
});
```

## Instant tooltips

HTML elements (CSS only; works on hover and keyboard focus):
```css
.has-tip { position: relative; }
.tip { position: absolute; z-index: 5; left: 0; top: calc(100% + 8px); width: max-content; max-width: min(280px, 100%);
  padding: 9px 12px; border-radius: 10px; background: var(--tip-bg); color: var(--text); border: 1px solid var(--line);
  box-shadow: 0 10px 28px var(--shadow); font-size: 13px; line-height: 1.45;
  opacity: 0; visibility: hidden; transform: translateY(-3px); pointer-events: none;
  transition: opacity .18s, transform .18s, visibility .18s; }
.has-tip:has(.tipbtn:hover) .tip, .has-tip:has(.tipbtn:focus-visible) .tip { opacity: 1; visibility: visible; transform: none; }
```
```html
<span class="has-tip">Label <button type="button" class="tipbtn" aria-label="Details" aria-describedby="t1">i</button>
  <span class="tip" id="t1" role="tooltip">Explanation text</span></span>
```

SVG chart dots (the native `<title>` waits ~1s, so use a shared tooltip element and event delegation):
```html
<div class="chart-wrap" style="position:relative"><svg id="chart">…</svg><div class="ctip" id="ctip" role="tooltip" hidden></div></div>
```
```js
// each dot: <g tabindex="0" role="img" aria-label="…" data-tip="line 1\nline 2"><circle class="dot" r="4.5"/><circle class="hit" r="12" fill="transparent"/></g>
const ctip = document.getElementById("ctip"), wrap = ctip.parentElement;
const hide = () => (ctip.hidden = true);
function show(g) {
  const box = wrap.getBoundingClientRect(), dot = g.querySelector(".dot").getBoundingClientRect();
  ctip.textContent = g.dataset.tip; ctip.hidden = false;                       // CSS: white-space: pre-line; position: absolute
  const w = ctip.offsetWidth, h = ctip.offsetHeight;
  const cx = Math.min(Math.max(dot.left + dot.width / 2 - box.left, w / 2), box.width - w / 2);   // stay inside
  const above = dot.top - box.top - h - 12 > 0;                                                    // flip when no room above
  ctip.style.left = cx - w / 2 + "px";
  ctip.style.top = (above ? dot.top - box.top - h - 10 : dot.bottom - box.top + 10) + "px";
}
const svg = document.getElementById("chart");
svg.addEventListener("pointerover", (e) => { const g = e.target.closest("[data-tip]"); if (g) show(g); });
svg.addEventListener("pointerout",  (e) => { if (e.target.closest("[data-tip]")) hide(); });
svg.addEventListener("focusin",     (e) => { const g = e.target.closest("[data-tip]"); if (g) show(g); });
svg.addEventListener("focusout", hide);
```
Hide the tooltip whenever the chart is redrawn.

## Quiet emphasis for the best option

```css
.row .value { color: var(--muted); transition: color .3s; }
.row.best .value { color: var(--text); }
.row.best .fill { background: linear-gradient(90deg, var(--accent-a), var(--accent-b)); }   /* others keep a plain fill */
```
Add a visually hidden "(best)" text for screen readers instead of a visible badge.

## Explainer: numbered steps

```css
.steps { list-style: none; counter-reset: step; margin: 22px 0 0; padding: 0; }
.steps li { counter-increment: step; position: relative; padding-left: 42px; margin: 0 0 18px; color: var(--muted); max-width: 58ch; }
.steps li::before { content: counter(step); position: absolute; left: 0; top: 1px; width: 26px; height: 26px; border-radius: 50%;
  display: grid; place-items: center; font-size: 13px; font-weight: 600; color: var(--on-accent);
  background: linear-gradient(120deg, var(--accent-a), var(--accent-b)); }
.steps b { color: var(--text); font-weight: 600; }
.explainer :is(p, li) { text-align: justify; hyphens: auto; }     /* needs <html lang="…">; keep headings left */
```
Pair the steps with one small SVG worked example (two or three rows of nodes joined by lines, dates under each
node) instead of a generic illustration.

## Wordmark with weight contrast

```css
.wordmark { font-family: "Bricolage Grotesque", var(--font); font-weight: 500; font-size: clamp(30px, 3.8vw, 42px);
  line-height: 1; letter-spacing: -0.04em; font-variation-settings: "opsz" 48; }
.wordmark b { color: var(--accent-a); font-weight: 800; }
```
```html
<header class="brand"><svg class="logo" …/><span class="wordmark">First<b>Second</b></span></header>
```
Load the display face with its weights (`family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800`), and wrap both
halves in one element so a flex `gap` doesn't split the word.

## Quiet testimonial carousel (two quotes per slide)

All slides share one grid cell, so the block takes the tallest slide's height and nothing shifts on change.
Manual only: auto-rotation adds motion and needs a pause control (WCAG 2.2.2).

```css
.slides { display: grid; padding: 40px 0 28px; }
.slide { grid-area: 1/1; display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
  opacity: 0; visibility: hidden; transform: translateY(6px);
  transition: opacity .5s ease, transform .5s ease, visibility 0s .5s; }
.slide.on { opacity: 1; visibility: visible; transform: none; transition: opacity .5s ease, transform .5s ease; }
.slide figure + figure { border-left: 1px solid var(--line); padding-left: 48px; }
.slide p { font: italic 300 clamp(20px, 2.4vw, 24px)/1.45 var(--display); }
.slide cite { display: block; font-style: normal; font-size: 14px; color: var(--muted); margin-top: 16px; }
.ctrl { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }
.ctrl button { width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 50%; background: transparent; color: var(--text); }
.ctrl button:hover { border-color: var(--text); }
@media (max-width: 860px) {
  .slide { grid-template-columns: 1fr; gap: 28px; }
  .slide figure + figure { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); padding-top: 28px; }
}
@media (prefers-reduced-motion: reduce) { .slide, .slide.on { transition: none; transform: none; } }
```
```html
<section aria-roledescription="carousel" aria-label="What readers say">
  <div class="slides" aria-live="polite">
    <div class="slide on" role="group" aria-roledescription="slide" aria-label="1 of 3">
      <figure><p>“…”</p><cite>Role, company type</cite></figure>
      <figure><p>“…”</p><cite>Role</cite></figure>
    </div>
    <!-- more .slide pages -->
  </div>
  <div class="ctrl">
    <button type="button" id="prev" aria-label="Previous quotes">←</button>
    <button type="button" id="next" aria-label="Next quotes">→</button>
    <span id="count">1 / 3</span>
  </div>
</section>
```
```js
const s = [...document.querySelectorAll('.slide')], c = document.getElementById('count'); let i = 0;
const go = d => { s[i].classList.remove('on'); i = (i + d + s.length) % s.length; s[i].classList.add('on');
  c.textContent = (i + 1) + ' / ' + s.length; };
document.getElementById('prev').onclick = () => go(-1);
document.getElementById('next').onclick = () => go(1);
```
Label sample quotes as samples until real ones exist.
