# Interface checklist

Detailed checks for personal sites, landing pages and blogs. Adapted and filtered from Vercel's
[Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (MIT License,
© 2025 Vercel Labs), rewritten for this skill's scope. That list also covers web apps (optimistic updates, URL
state, list virtualization, keyboard shortcuts); use it directly if a project grows into an app.

## Interactions

- [ ] Everything works with the keyboard; focus order follows the visual order.
- [ ] Every focusable element shows a visible focus ring (`:focus-visible`); grouped controls use
      `:focus-within`. Sticky headers and banners never cover the focused element.
- [ ] Visual and hit targets match; anything smaller than 24px gets a larger invisible hit area; 44px on mobile.
- [ ] Zoom is never disabled; inputs are at least 16px so iOS doesn't zoom on focus.
- [ ] Navigation uses `<a href>`, never a `<button>` or `<div>` with a click handler.
- [ ] No dead zones: if part of a row or card looks clickable, all of it is.
- [ ] Back/Forward restore scroll position (don't break it with scroll-jacking or client-side routing).
- [ ] Every swipe or drag (carousels) also works with buttons and the keyboard.
- [ ] `touch-action: manipulation` on controls; the tap highlight is either designed or replaced by an
      `:active` style.
- [ ] Modals or drawers, if any, use `overscroll-behavior: contain` and trap and return focus.

## Forms (signup, contact)

- [ ] Every control has a `<label>`; clicking the label focuses the control; checkbox and label share one
      hit target.
- [ ] Correct `type`, `inputmode`, `name` and `autocomplete` (`email`, `name`, `organization`); spellcheck off
      for emails and codes.
- [ ] Paste is never blocked; keystrokes are never blocked (validate and explain instead); values are trimmed.
- [ ] Submit stays enabled until the user submits; then it is disabled while the request runs, keeps its
      label and shows a spinner.
- [ ] Enter submits a single-field form; in a `<textarea>`, Enter is a new line.
- [ ] Errors appear next to the field, say how to fix it, and focus moves to the first error on submit.
- [ ] Placeholders show an example value (`you@example.com`), never the label.
- [ ] Non-login fields don't trigger password managers (avoid names like `password`).
- [ ] Native `<select>` has an explicit `background-color` and `color`.

## Content and typography

- [ ] Curly quotes, the `…` character, non-breaking spaces in `10&nbsp;MB`, `⌘&nbsp;K`, and names that must stay
      together.
- [ ] Headings balanced (`text-wrap: balance`), paragraphs without stranded last words (`text-wrap: pretty`).
- [ ] `tabular-nums` where numbers line up (dates in lists, prices).
- [ ] Dates and numbers formatted for the site's language; `<time datetime>` on dates.
- [ ] Brand and product names wrapped in `translate="no"`.
- [ ] Status is never shown by color alone; icons that carry meaning have text or an accessible name.
- [ ] Headings form a hierarchy (one `<h1>`), there is a skip link, and linked headings have `scroll-margin-top`.
- [ ] Layouts survive very short and very long content (titles, names, translated text).
- [ ] Every page offers a next step; empty and error states (no posts yet, 404) are designed.
- [ ] Media: captions for speech in videos, `alt` for meaningful images, decorative images `alt=""` or
      `aria-hidden`.

## Motion

- [ ] `prefers-reduced-motion` has a variant for everything that moves.
- [ ] Only `opacity` and `transform` animate; transitions list their properties (never `transition: all`).
- [ ] Motion starts from where it physically comes from (`transform-origin`); SVG animates `<g>` wrappers with
      `transform-box: fill-box`.
- [ ] Transitions can be interrupted; nothing autoplays except muted, non-essential loops; anything moving
      longer than 5 seconds can be paused.
- [ ] Looping animations are `<video autoplay muted loop playsinline>` with a still fallback, not GIFs.

## Surfaces and color

- [ ] Shadows use at least two layers; borders can be semi-transparent to stay crisp.
- [ ] Nested radii: a child's radius is no larger than its parent's.
- [ ] On colored backgrounds, borders, shadows and muted text are tinted toward the same hue.
- [ ] Hover, active and focus states have more contrast than the resting state.
- [ ] `color-scheme` and `theme-color` match the page background in each scheme.
- [ ] Gradients that fade to dark don't band (use a background image if they do).

## Performance

- [ ] Images have `width` and `height` (no layout shift); only above-the-fold images load eagerly, the rest
      `loading="lazy"`.
- [ ] The body font is preloaded; fonts are subset to the characters and weights used; font hosts are
      preconnected.
- [ ] No large blocking scripts; long pages can use `content-visibility: auto` on far-down sections.
- [ ] Checked with CPU and network throttling, and in Safari (including iOS Low Power Mode) when possible.
