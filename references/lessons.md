# Lessons and pitfalls

Collected from building real pages. Each item is a thing that cost time once. The taste calls here are one
person's reactions on specific projects: treat them as things to check with your user, not rules.

## Visual and CSS

- **Glass flicker (Chrome).** Animating `backdrop-filter`, a custom property that glass colors depend on, or the
  opacity of children inside a `backdrop-filter` element makes it blink. Fade the glass element as one piece
  and move children with `transform`, or remove `backdrop-filter` from anything that fades or expands.
- **Inline styles beat state classes.** A reveal script that set `style.transform` left elements permanently
  offset, because the inline value out-ranked `.is-visible { transform: none }`. Set a custom property inline
  and let the stylesheet use it.
- **Margin collapse.** A top margin on the first block collapses through `<body>`. With `min-height: 100vh` it
  adds an unwanted scroll. Use `padding-top` on the wrapper.
- **A reserved empty message row floats the next line.** A min-height status row under a form, plus its margin
  and the flex gap, opened about 45px between the form and the fine print, and the fine print looked detached.
  Give the empty message no height and margin (keep it rendered so screen readers still announce it), or place
  it below the fine print.
- **Dividers double section padding.** 80px top and bottom put about 160px around each hairline, which read as
  too loose. 56px desktop / 40px mobile worked.
- **Last section + footer padding.** 72px under the last section plus the footer's 32px read as slightly too
  much; 40px was better.
- **Unstyled links on a dark page.** Headlines as `<a>` without a color fell back to the browser's dark blue and
  were unreadable on a charcoal card. Set `a { color: inherit }` globally and give links a hover state.
- **Lonely header button.** A single "Subscribe" pill in the top-right corner looked odd. Three section links
  with a sliding underline replaced it.
- **Section heading size on a personal home page.** 12px muted uppercase labels were too faint to mark
  sections; 26–32px medium competed with the hero; about 20px semibold in the text color worked. Use real
  `<h2>`s, not styled `<p>`s.
- **Specificity.** A broad rule like `.section p` beats a component class like `.caption`. Use `@layer` (see
  snippets) or scope the broad rule.
- **`[hidden]` vs `display`.** A class that sets `display: flex/grid` overrides the `hidden` attribute. Add
  `[hidden] { display: none !important; }` once.
- **Native tooltips are slow and unreliable.** `title` appears after about a second and never on touch or
  keyboard. Prefer inline help; otherwise a custom tooltip (snippets).
- **Native `<details>` can't animate closing** in every browser. Use a button with `aria-expanded`.
- **Justified text** looks gappy without `lang` and `hyphens: auto`, and in narrow columns.
- **Condensed or script display faces** need very different sizes from a neutral face; judge by eye next to
  the headings, at a real viewport width.

## Content and copy

- **Check a direction against the audience before polishing it.** An editorial look (cream paper, a display
  serif with italics, a burnt-orange accent, a drop cap) on a personal engineering home page read as dated to
  its owner, after the same look had already needed several rounds of fixes on another page. A dark sticky
  split with a neutral sans, a monospace for dates and one amber accent was accepted. Showing two or three
  directions live, early, would have saved those rounds.
- **A repeated closing pitch added nothing.** On a short newsletter page with the signup form in the hero, a
  closing block restating the offer and the form was removed. End with content and the footer.
- **Loud testimonial banner on a calm page.** A full-width dark band with one big italic quote looked heavy and
  made the accent feel overused. A one-quote carousel was better, but a 1–2 sentence quote across the full
  width still felt empty. Two quotes per row with a hairline between them, paged in pairs, was accepted.
- **Highlight by dimming, not decorating.** Badges and tinted boxes to mark "the best one" were rejected; a
  brighter value with the rest dimmed was accepted.
- **Copy must match behavior.** After changing what a form or page does, re-read every sentence that explains
  it; a line can quietly become wrong.

## Verifying with a browser tool

- **Background tabs throttle** timers, animations and IntersectionObserver. Take a screenshot to force a render,
  wait a moment, then screenshot again. Reveal animations may look blank in the first shot.
- **Navigating to a hash-only change doesn't reload the page.** Add a throwaway query (`?r=2#section`) to force
  fresh CSS/JS.
- **Mouse coordinates.** Some browser tools take click/hover coordinates in the screenshot's frame, which can be
  scaled relative to CSS pixels (ratio = frame width ÷ `innerWidth`). Read element rects in JS, then convert.
- For hover states, dispatch `pointerover`/`pointerout` events to test the logic, then confirm with a real hover.
- Prove layout claims with numbers: `getBoundingClientRect()` for gaps and alignment, `getComputedStyle()` for
  colors and fonts, `document.fonts.check()` that web fonts loaded.
- Test the ends of the range: a very tall window (footer stays at the bottom), a narrow one, a very wide one
  (zoom out to 50%), reduced motion, dark mode, keyboard-only, JS disabled.
- On macOS, set scroll bars to "Always show" (System Settings → Appearance) to see the layout Windows users
  get; unexpected scrollbars point at overflow bugs.
- **No browser tool in the session?** Playwright can still take screenshots at several widths
  (`npx playwright install chromium`, then `npx playwright screenshot --viewport-size "375,800" URL out.png`).
  Otherwise give the user a short list of exactly what to look at.
- Stop dev servers you started when the user asks, and close browser tabs you opened.
