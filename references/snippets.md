# Snippets

Copy-paste building blocks for the patterns in SKILL.md. Plain HTML/CSS/JS, no dependencies, no build step
required. Treat numbers and colors as starting points. Every snippet reads colors and sizes from the tokens,
so they work in light and dark and in any direction family.

## Shared file structure

```
styles/
  main.css          the only stylesheet pages link; declares the layer order
  tokens.css        :root custom properties only
  base.css          reset, body, headings, links, focus, forms (see "Base layer")
  layout.css        .frame .section .split .stack
  components.css    .btn .card .field .prose .post-list .site-header .site-footer … with --variants
  pages/*.css       optional, arrangement only; no colors or sizes of their own
scripts/site.js     page-load fade, reveals, disclosures; driven by data attributes
partials/           header, footer, head: through the project's includes or templates, if any
```

```css
/* main.css: later layers win regardless of selector specificity */
@layer tokens, base, layout, components, pages;
@import url("tokens.css") layer(tokens);
@import url("base.css") layer(base);
@import url("layout.css") layer(layout);
@import url("components.css") layer(components);
```
If there is a build step, bundle them: chained `@import`s load one after another.

## Tokens (default: quiet light + dark)

```css
:root {
  color-scheme: light dark;
  /* color */
  --bg-1: #fafaf9; --bg-2: #fafaf9; --bg-glow: transparent; --surface: #ffffff;
  --text: #18181b; --muted: #52525b; --dim: #71717a; --line: rgba(0,0,0,.1);
  --accent-a: #4f46e5; --accent-b: #4f46e5; --on-accent: #ffffff;
  --field-bg: #ffffff; --tip-bg: #ffffff; --code-bg: #f4f4f5;
  --shadow: rgba(0,0,0,.08); --glow: rgba(79,70,229,.25);
  /* elevation: two layers, ambient + direct */
  --elev-1: 0 1px 2px var(--shadow), 0 4px 12px var(--shadow);
  --elev-2: 0 1px 2px var(--shadow), 0 12px 32px var(--shadow);
  /* type */
  --font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --display: var(--font);
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --text-s: 14px; --text-m: 16px; --text-read: clamp(17px, 1rem + .2vw, 19px); --text-l: 20px;
  --text-xl: clamp(28px, 3.4vw, 40px); --text-hero: clamp(36px, 5.4vw, 60px);
  --measure: 68ch;
  /* space, shape, motion */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 40px; --space-7: 64px;
  --radius-s: 6px; --radius-m: 10px; --radius-l: 16px; --radius-pill: 999px;
  --ease-out: cubic-bezier(.2,.8,.2,1); --dur-fast: .2s; --dur: .5s; --dur-reveal: 1s;
  --header-h: 0px;   /* set to the sticky header's height if there is one */
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-1: #0c0c0f; --bg-2: #0c0c0f; --surface: #17171c;
    --text: #f4f4f5; --muted: #a1a1aa; --dim: #8b8b94; --line: rgba(255,255,255,.12);
    --accent-a: #818cf8; --accent-b: #818cf8; --on-accent: #0c0c0f;
    --field-bg: #17171c; --tip-bg: #27272a; --code-bg: #17171c;
    --shadow: rgba(0,0,0,.4); --glow: rgba(129,140,248,.3);
  }
}
:root[data-theme="dark"] { color-scheme: dark; /* same values as the dark block above */ }
:root[data-theme="light"] { color-scheme: light; }
```
Body text clears 4.5:1 on `--bg-1` and `--surface` in both schemes. Drop the `[data-theme]` rules if there is
no toggle. Match `<meta name="theme-color">` to `--bg-1` (two tags with `media` for light and dark).

Web fonts, if any: `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect"
href="https://fonts.gstatic.com" crossorigin>`, load only the weights used with `&display=swap`, and preload the
one file used for body text.

## Base layer

```css
html { -webkit-text-size-adjust: 100%; scroll-padding-top: calc(var(--header-h) + 16px); }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
body {
  margin: 0; min-height: 100vh; background: var(--bg-1); color: var(--text);
  font: var(--text-m)/1.6 var(--font); -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { font-family: var(--display); line-height: 1.15; text-wrap: balance; }
h1 { font-size: var(--text-hero); font-weight: 500; letter-spacing: -0.035em; }
p, li { text-wrap: pretty; }
img, svg, video { display: block; max-width: 100%; height: auto; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--accent-a); outline-offset: 3px; }
[hidden] { display: none !important; }
button, input, select, textarea { font: inherit; color: inherit; }
input, select, textarea { font-size: max(16px, 1em); }               /* below 16px iOS zooms on focus */
select { background-color: var(--field-bg); color: var(--text); }   /* Windows dark-mode contrast */
a, button, label, summary { touch-action: manipulation; }            /* no double-tap zoom delay */
time, .num { font-variant-numeric: tabular-nums; }
```

## Skip link and landmarks

```html
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">…</header>
  <main id="main" tabindex="-1">…</main>
  <footer class="site-footer">…</footer>
</body>
```
```css
.skip { position: absolute; left: 16px; top: -100px; z-index: 100; padding: 10px 16px; border-radius: var(--radius-m);
  background: var(--text); color: var(--bg-1); text-decoration: none; }
.skip:focus { top: 16px; }
main:focus { outline: none; }
```

## Layout skeleton

```css
.frame {
  max-width: 1120px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column;
  padding: var(--space-5) max(var(--space-5), env(safe-area-inset-right)) 0 max(var(--space-5), env(safe-area-inset-left));
}
.frame > .site-footer { margin-top: auto; }          /* footer at the bottom, also on short pages */
.section { padding-block: var(--space-7); }
.section + .section { border-top: 1px solid var(--line); }
.split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
.stack > * + * { margin-top: var(--stack-gap, var(--space-4)); }
@media (max-width: 860px) {
  .frame { padding-inline: max(var(--space-4), env(safe-area-inset-left)) max(var(--space-4), env(safe-area-inset-right)); }
  .section { padding-block: var(--space-6); }
  .split { grid-template-columns: 1fr; gap: 28px; }
}
```
`env(safe-area-inset-*)` needs `<meta name="viewport" content="width=device-width, initial-scale=1,
viewport-fit=cover">`. Never add `maximum-scale` or `user-scalable=no`. Use padding, not a top margin, on the
frame: a margin collapses through `<body>` and adds scroll with `min-height: 100vh`.

## Header with nav

```html
<header class="site-header">
  <a class="brand" href="/" translate="no">Name</a>
  <nav class="site-nav" aria-label="Main">
    <a href="/writing/" aria-current="page">Writing</a><a href="/projects/">Projects</a><a href="/about/">About</a>
  </nav>
</header>
```
```css
.site-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-5); padding-block: var(--space-4); }
.brand { font-weight: 600; text-decoration: none; }
.site-nav { display: flex; gap: var(--space-5); }
/* Full text color at rest: muted nav links read as disabled (see defaults). The underline is the feedback. */
.site-nav a { position: relative; color: var(--text); text-decoration: none; padding: 10px 0; }
.site-nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 4px; height: 2px; border-radius: 2px;
  background: var(--accent-a); transform: scaleX(0); transform-origin: left; transition: transform .3s ease; }
.site-nav a:is(:hover, :focus-visible, [aria-current="page"])::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { .site-nav a::after { transition: none; } }
```
For a sticky header, add `position: sticky; top: 0; background: var(--bg-1);` and set `--header-h` to its height.

## Prose (blog posts, long text)

```css
.prose { max-width: var(--measure); margin-inline: auto; font-size: var(--text-read); line-height: 1.7; }
.prose :is(p, ul, ol, blockquote, pre, figure) { margin: 0 0 1.1em; }
.prose :is(h2, h3) { margin: 2em 0 .6em; line-height: 1.25; letter-spacing: -0.01em; }
.prose h2 { font-size: 1.45em; } .prose h3 { font-size: 1.2em; }
.prose a { text-decoration: underline 1px; text-decoration-color: color-mix(in srgb, var(--accent-a) 55%, transparent);
  text-underline-offset: .2em; transition: text-decoration-color var(--dur-fast); }
.prose a:hover { text-decoration-color: var(--accent-a); }

/* heading anchors: <h2 id="why">Why it matters <a class="anchor" href="#why" aria-label="Link to this section">#</a></h2> */
.prose .anchor { margin-left: .3em; color: var(--dim); text-decoration: none; opacity: 0; transition: opacity var(--dur-fast); }
.prose :is(h2, h3):hover .anchor, .prose .anchor:focus-visible { opacity: 1; }

.prose blockquote { margin-inline: 0; padding-left: 1em; border-left: 2px solid var(--line); color: var(--muted); }
.prose hr { border: 0; height: 1px; background: var(--line); margin: 2.5em 0; }
.prose :not(pre) > code { font: .9em var(--mono); padding: .1em .35em; border-radius: var(--radius-s); background: var(--code-bg); }
.prose pre { overflow-x: auto; padding: 1em 1.2em; border-radius: var(--radius-m); border: 1px solid var(--line);
  background: var(--code-bg); font: .875em/1.6 var(--mono); tab-size: 2; }
.prose figure img, .prose figure video { border-radius: var(--radius-m); }
.prose figcaption { margin-top: .6em; font-size: var(--text-s); color: var(--muted); text-align: center; }
/* figure wider than the text column, centered on it */
.prose figure.wide { --w: max(100%, min(960px, 100vw - 48px)); width: var(--w); margin-left: calc((100% - var(--w)) / 2); }
.prose .footnotes { margin-top: 3em; font-size: .9em; color: var(--muted); }
```
Post header: `<h1>`, then `<p class="meta"><time datetime="2026-11-02">2 Nov 2026</time> · 6 min read</p>` in
`--muted`. Format dates once, at build time or by hand, in the site's language; `<time datetime>` keeps them
machine-readable.

## Post list (blog index, "writing" section)

```html
<h2 class="year">2026</h2>
<ul class="post-list">
  <li><a href="/posts/quiet-interfaces/">
    <span class="post-title">Quiet interfaces</span>
    <time datetime="2026-11-02">Nov 2</time>
  </a></li>
</ul>
```
```css
.post-list { list-style: none; margin: 0; padding: 0; }
.post-list li + li { border-top: 1px solid var(--line); }
.post-list a { display: grid; grid-template-columns: 1fr auto; gap: var(--space-4); align-items: baseline;
  padding: 14px 0; text-decoration: none; }                /* the whole row is the link */
.post-list time { color: var(--dim); font-size: var(--text-s); white-space: nowrap; }
.post-list a:hover .post-title { text-decoration: underline 1px; text-underline-offset: .2em; }
.year { font-size: var(--text-l); margin: var(--space-6) 0 var(--space-2); }
@media (max-width: 480px) { .post-list a { grid-template-columns: 1fr; gap: 2px; } }
```
Add a one-line summary as a third element spanning both columns if the index needs it.

## Buttons and fields

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 24px;
  font-weight: 600; color: var(--on-accent); border: 0; border-radius: var(--radius-m); cursor: pointer;
  background: linear-gradient(120deg, var(--accent-a), var(--accent-b));
  transition: transform .25s, box-shadow .25s, background-color .25s, color .25s;
}
.btn:hover { transform: scale(1.03); box-shadow: 0 8px 24px -8px var(--glow); }
.btn:active { transform: scale(.98); }
.btn--outline { background: transparent; color: var(--text); box-shadow: inset 0 0 0 1px var(--line); }
.btn--outline:hover { box-shadow: inset 0 0 0 1px var(--text); }
.btn--pill { border-radius: var(--radius-pill); }
.btn .arrow { transition: transform .25s; } .btn:hover .arrow { transform: translateX(3px); }

.field { display: grid; gap: 6px; }
.field label { font-weight: 500; }
.field .hint { font-size: var(--text-s); color: var(--muted); }
.field .error { font-size: var(--text-s); color: var(--text); }   /* pair with an icon or "Error:" prefix, not color alone */
input, textarea {
  min-height: 48px; padding: 0 14px; border-radius: var(--radius-m); background: var(--field-bg);
  border: 1px solid var(--line); outline: none; transition: border-color .2s, box-shadow .2s;
}
textarea { padding-block: 12px; }
input:focus-visible, textarea:focus-visible { border-color: var(--accent-a);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-a) 22%, transparent); }
input[aria-invalid="true"] { border-color: currentColor; }
```

## Signup form with submit state

```html
<form class="signup" action="…" method="post">
  <div class="field">
    <label for="email">Email</label>
    <div class="signup-row">
      <input id="email" name="email" type="email" autocomplete="email" spellcheck="false"
             placeholder="you@example.com" required aria-describedby="email-msg">
      <button class="btn" type="submit"><span class="spinner" aria-hidden="true"></span><span>Get the newsletter</span></button>
    </div>
    <p class="msg" id="email-msg" aria-live="polite"></p>
  </div>
</form>
```
```css
.signup-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.signup-row input { flex: 1 1 220px; }
.spinner { display: none; width: 16px; height: 16px; border-radius: 50%; animation: spin .7s linear infinite;
  border: 2px solid color-mix(in srgb, currentColor 25%, transparent); border-top-color: currentColor; }
.btn.is-loading .spinner { display: block; }
.btn:disabled { cursor: wait; }
.msg { margin: 0; font-size: var(--text-s); }
.msg:empty { min-height: 0; }           /* no reserved empty row (it makes the next line float), but keep it
                                           rendered: display:none can stop screen readers announcing it */
@keyframes spin { to { transform: rotate(360deg); } }
```
```js
// Keeps the label, shows the spinner only if the request is slow, and keeps it long enough not to flicker.
async function withLoading(btn, task, showAfter = 200, minVisible = 400) {
  btn.disabled = true; btn.setAttribute("aria-busy", "true");
  let shownAt = 0;
  const timer = setTimeout(() => { btn.classList.add("is-loading"); shownAt = performance.now(); }, showAfter);
  try { return await task(); }
  finally {
    clearTimeout(timer);
    if (shownAt) await new Promise((r) => setTimeout(r, Math.max(0, minVisible - (performance.now() - shownAt))));
    btn.classList.remove("is-loading"); btn.disabled = false; btn.removeAttribute("aria-busy");
  }
}
```
On submit: let native validation run (no `novalidate` unless you replace it fully), then `withLoading` around
the request. On error, set `aria-invalid="true"`, write a fix-it message in `.msg` and focus the field. On
success, replace the form with a short confirmation and the next step.

## Page-load fade

```html
<html class="no-js"> … <body class="is-loading">
```
```css
.site-main { transition: opacity 1s, transform 1s; }
.js body.is-loading .site-main { opacity: 0; transform: translateY(0.375rem); }   /* .js: visible without JS */
@media (prefers-reduced-motion: reduce) { .site-main { transition: none; } }
```
```js
// inline in <head>, so it runs before first paint:
document.documentElement.classList.replace("no-js", "js");
// in the site script:
addEventListener("load", () => requestAnimationFrame(() => document.body.classList.remove("is-loading")));
```

## Scroll reveals (optional; modeled on common site-builder reveal presets)

Markup: `data-reveal="fade-up|fade-down|fade-left|fade-right|fade-in|zoom-in|zoom-out|zoom-out-image|pop-in|blur-in"`,
optional `data-i` (intensity 0–5 → distance 6px + 4.2px × i), `data-delay` (ms), `data-speed` (ms,
default 1000), `data-stagger` (ms, applies to children).

```html
<h1 data-reveal="fade-up" data-i="0">Heading</h1>
<p data-reveal="fade-up" data-i="1">Lead</p>
<div class="actions" data-reveal="fade-up" data-i="2" data-delay="250">Buttons</div>
<ul data-reveal="fade-in" data-stagger="125"><li>…</li><li>…</li></ul>
<div class="photo"><img data-reveal="zoom-out-image" src="…" alt="…" width="…" height="…"></div>
```

Put `data-reveal` on a wrapper (like `.actions`), not on a button or link with its own hover transition: the
reveal's duration and delay would also slow the hover. Don't reveal paragraphs of an article.

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
    const effect = el.dataset.reveal, d = 6 + 4.2 * +(el.dataset.i || 1);   // intensity ladder: 6px + 4.2px per step
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
    // Clear the reveal timing afterwards, or later hover transitions inherit its duration and stagger delay.
    const items = e.target.dataset.stagger ? [...e.target.children] : [e.target];
    const wait = Math.max(...items.map((el) => (parseFloat(el.style.transitionDuration) || 0) + (parseFloat(el.style.transitionDelay) || 0)));
    setTimeout(() => items.forEach((el) => { el.style.transitionDuration = ""; el.style.transitionDelay = ""; }), wait + 50);
  }), { threshold: 0.25 });
  els.forEach((el) => io.observe(el));
})();
```

## Disclosure (FAQ, "show more")

```html
<div class="faq">
  <h3><button type="button" class="disclosure" aria-expanded="false" aria-controls="q1">Is it free?</button></h3>
  <div class="reveal-box" id="q1"><div class="reveal-inner"><p>Yes. …</p></div></div>
</div>
```
```css
.disclosure { display: flex; width: 100%; justify-content: space-between; align-items: center; gap: var(--space-4);
  min-height: 48px; padding: 0; border: 0; background: none; font: inherit; font-weight: 600; text-align: left; cursor: pointer; }
.disclosure::after { content: ""; flex: none; width: 7px; height: 7px; border-right: 2px solid; border-bottom: 2px solid;
  transform: translateY(-2px) rotate(45deg); transition: transform .35s ease; }
.disclosure[aria-expanded="true"]::after { transform: translateY(1px) rotate(-135deg); }
.reveal-box { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .45s var(--ease-out), opacity .35s ease,
  transform .45s var(--ease-out), visibility 0s linear .45s; }
.js .reveal-box:not(.open) { grid-template-rows: 0fr; opacity: 0; transform: translateY(-8px); visibility: hidden; }
.reveal-box.open { transition-delay: 0s; }
.reveal-inner { min-height: 0; overflow: hidden; }
.faq + .faq { border-top: 1px solid var(--line); }
@media (prefers-reduced-motion: reduce) { .reveal-box, .disclosure::after { transition: none; } }
```
```js
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[aria-expanded][aria-controls]");
  const box = btn && document.getElementById(btn.getAttribute("aria-controls"));
  if (!box || !box.classList.contains("reveal-box")) return;
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", open);
  box.classList.toggle("open", open);
});
```
Closed only when JS runs, so the answers stay readable without it. For a "Show more" button outside a
heading, also switch its text ("Show more" / "Show less").

## Tooltip (only when inline help won't do)

```css
.has-tip { position: relative; }
.tip { position: absolute; z-index: 5; left: 0; top: calc(100% + 8px); width: max-content; max-width: 280px;
  padding: 9px 12px; border-radius: var(--radius-m); background: var(--tip-bg); color: var(--text);
  border: 1px solid var(--line); box-shadow: var(--elev-2); font-size: 13px; line-height: 1.45;
  opacity: 0; visibility: hidden; transform: translateY(-3px); pointer-events: none;
  transition: opacity .15s, transform .15s, visibility .15s; }
.has-tip:has(.tipbtn:hover) .tip { transition-delay: .25s; }                 /* short delay before showing on hover */
.has-tip:has(.tipbtn:is(:hover, :focus-visible)) .tip { opacity: 1; visibility: visible; transform: none; }
```
```html
<span class="has-tip">Label <button type="button" class="tipbtn" aria-label="More about label" aria-describedby="t1">i</button>
  <span class="tip" id="t1" role="tooltip">Explanation text</span></span>
```
Keyboard focus shows it at once. Give the trigger at least a 24px hit area.

## Numbered steps ("how it works")

```css
.steps { list-style: none; counter-reset: step; margin: var(--space-5) 0 0; padding: 0; }
.steps li { counter-increment: step; position: relative; padding-left: 42px; margin: 0 0 18px; color: var(--muted); max-width: 58ch; }
.steps li::before { content: counter(step); position: absolute; left: 0; top: 1px; width: 26px; height: 26px; border-radius: 50%;
  display: grid; place-items: center; font-size: 13px; font-weight: 600; color: var(--text); box-shadow: inset 0 0 0 1px var(--line); }
.steps b { color: var(--text); font-weight: 600; }
```
Pair the steps with one small diagram of the real thing instead of a generic illustration.

## Quotes, two per slide (manual carousel)

All slides share one grid cell, so the block takes the tallest slide's height and nothing shifts on change.
Manual only: auto-rotation adds motion and needs a pause control (WCAG 2.2.2).

```css
.slides { display: grid; padding: 40px 0 28px; }
.slide { grid-area: 1/1; display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
  opacity: 0; visibility: hidden; transform: translateY(6px);
  transition: opacity .5s ease, transform .5s ease, visibility 0s .5s; }
.slide.on { opacity: 1; visibility: visible; transform: none; transition: opacity .5s ease, transform .5s ease; }
.slide figure { margin: 0; }
.slide figure + figure { border-left: 1px solid var(--line); padding-left: 48px; }
.slide p { font: italic 300 clamp(20px, 2.4vw, 24px)/1.45 var(--display); }
.slide cite { display: block; font-style: normal; font-size: var(--text-s); color: var(--muted); margin-top: 16px; }
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
With two or fewer slides, skip the carousel and show them all.

## Wordmark with weight contrast

```css
.wordmark { font-family: var(--display); font-weight: 400; font-size: clamp(24px, 3vw, 34px);
  line-height: 1; letter-spacing: -0.04em; }
.wordmark b { color: var(--accent-a); font-weight: 800; }
```
```html
<a class="brand" href="/" translate="no"><span class="wordmark">First<b>Second</b></span></a>
```
Wrap both halves in one element so a flex `gap` doesn't split the word.

## Framed photo (personal sites)

```css
.photo-frame { border: 5px solid var(--surface); border-radius: var(--radius-l); overflow: hidden; box-shadow: var(--elev-2); }
.photo-frame img { display: block; width: 100%; height: auto; }
```
Give the `<img>` its real `width`/`height`, `alt`, and `loading="lazy"` unless it is in the first viewport.

## Animation switch (pause control for ambient motion)

Motion longer than 5 seconds needs a pause control (WCAG 2.2.2). Put it at the end of the header nav, styled
like the nav links, so it reads as part of the chrome rather than a floating widget.

```html
<nav class="site-nav" aria-label="Main">
  <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
  <button class="motion-switch" type="button" role="switch" aria-checked="true" hidden>
    <span class="motion-switch-label">Animation</span>
    <span class="switch" aria-hidden="true"><span class="switch-thumb"></span></span>
  </button>
</nav>
```
```css
.site-nav { align-items: center; }
.motion-switch { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0;
  background: none; border: 0; color: var(--text); cursor: pointer; }   /* same color as the nav links */
.motion-switch[hidden] { display: none; }
.switch { position: relative; width: 36px; height: 20px; border-radius: var(--radius-pill);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text) 35%, transparent); transition: background-color .25s, box-shadow .25s; }
.switch-thumb { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%;
  background: var(--muted); transition: transform .25s var(--ease-out), background-color .25s; }
.motion-switch[aria-checked="true"] .switch { background: var(--accent-a); box-shadow: none; }
.motion-switch[aria-checked="true"] .switch-thumb { transform: translateX(16px); background: var(--on-accent); }
@media (max-width: 480px) {   /* word hidden visually, still the accessible name */
  .motion-switch-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}
@media (prefers-reduced-motion: reduce) { .switch, .switch-thumb { transition: none; } }
/* CSS loops pause with the switch too */
.motion-paused :is(*, *::before, *::after) { animation-play-state: paused !important; }
```
```js
// Shown only when JS runs and motion is allowed. Loops listen for "motionchange" or check the class.
(() => {
  const sw = document.querySelector(".motion-switch");
  if (!sw || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  sw.hidden = false;
  sw.addEventListener("click", () => {
    const paused = sw.getAttribute("aria-checked") === "true";
    sw.setAttribute("aria-checked", !paused);
    document.documentElement.classList.toggle("motion-paused", paused);
    dispatchEvent(new CustomEvent("motionchange", { detail: { paused } }));
  });
})();
```
A canvas or JS loop should also stop drawing when it scrolls out of view (one IntersectionObserver) and render a
single static frame under reduced motion. Check the header still fits at 375px with the switch added.

## Louder options (only when the direction calls for them)

**Soft glow background**
```css
body { background: radial-gradient(1200px 700px at 50% -10%, var(--bg-glow), transparent 70%), var(--bg-1); }
```

**Gradient on one headline word** (hero only)
```css
.gradient-text { background: linear-gradient(104deg, var(--accent-a), var(--accent-b)); -webkit-background-clip: text;
  background-clip: text; color: transparent; }
```

**Faint patterns** (≤10% contrast)
```css
.bg-diagonal { background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 1px, transparent 1px 48px); }  /* dark */
.bg-grid { background-image: linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px);
  background-size: 160px 160px; }                                                                                     /* light */
```

**Glass card** (deep navy/plum backgrounds)
```css
:root { --bg-1: #16206a; --bg-2: #1f3c8f; --bg-glow: #2f5fae; --text: #eef2ff; --muted: #b9c6ec; --line: rgba(160,185,255,.22);
  --accent-a: #c9f6e4; --accent-b: #b8c6ff; --on-accent: #1b2560; color-scheme: dark; }
.glass {
  position: relative; border-radius: var(--radius-l); border: 1px solid rgba(255,255,255,.22);
  background: linear-gradient(135deg, rgba(110,150,235,.5), rgba(90,170,150,.45));
  box-shadow: 0 2px 6px rgba(5,10,50,.25), 0 30px 80px -20px rgba(5,10,50,.6), inset 0 1px 0 rgba(255,255,255,.25);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
}
/* To fade it in, fade the card as one piece and only move its children: fading children inside
   backdrop-filter flickers in Chrome. */
.js .glass[data-stage] { opacity: 0; transition: opacity 1s ease; }
.js .glass[data-stage].is-visible { opacity: 1; }
.js .glass[data-stage] > * { transform: translateY(12px); transition: transform 1s ease; }
.js .glass[data-stage].is-visible > * { transform: none; }
```
Give staged cards `data-reveal="fade-in" data-stage` so the reveal script adds `is-visible`.
