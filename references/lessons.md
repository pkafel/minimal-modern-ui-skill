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
- **Reveal timing leaks into hover.** The reveal script sets `transition-duration` and `transition-delay` inline.
  Left in place, they also applied to later hover transitions on the same elements, so rows further down a
  staggered list reacted up to half a second late. Clear both inline values once the reveal has finished.
- **Margin collapse.** A top margin on the first block collapses through `<body>`. With `min-height: 100vh` it
  adds an unwanted scroll. Use `padding-top` on the wrapper.
- **A reserved empty message row floats the next line.** A min-height status row under a form, plus its margin
  and the flex gap, opened about 45px between the form and the fine print, and the fine print looked detached.
  Give the empty message no height and margin (keep it rendered so screen readers still announce it), or place
  it below the fine print.
- **Dividers double section padding.** 80px top and bottom put about 160px around each hairline, which read as
  too loose. 56px desktop / 40px mobile worked.
- **Pause control for ambient motion: a labeled switch in the nav.** A hero starfield needed a pause control.
  A "Pause stars" pill at the bottom of the hero looked out of place above the next section; moved to the hero's
  top-right corner it still floated; an icon-only pause/play button in the nav was "barely visible". Accepted: a
  `role="switch"` at the end of the nav, the word "Animation" in the nav-link style plus a small track that fills
  with the accent when on. Below ~480px only the track shows, and the word stays as the accessible name.
- **Bottom-anchored hero copy on tall screens.** A full-viewport hero with `align-content: end` looked right on
  a 14" laptop but left the headline at the very bottom of a 24" monitor (full or half width), under a tall empty
  sky. Centering the copy and capping the hero (`min-height: clamp(560px, 100svh - header, 920px)`, with the
  background layer capped the same) fixed it. Check full-height heroes in a tall window, not only a laptop.
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
- **A plain minimal hero can undersell visual work.** On an astrophotographer's site the quiet-dark hero (headline
  plus one small framed image) was judged less appealing than a freeform version's first screen: full-viewport
  animated starfield, a large planet cropped at the edge, a big serif headline with one italic accent word and a
  stats row. The accepted result kept that immersive hero and the minimal sections below it.
- **Accents below an immersive hero: open question, not a pattern.** After a dramatic hero, the quiet body read
  as "very homogeneous" and dull. Small color accents echoing the hero were accepted: an accent ✦ before section
  headings, one serif pull line with an italic accent word, accent prices. Hover effects on list rows (accent
  title, line drawing in, other rows dimmed), sticky section headings and a scroll-synced nav highlight were
  judged "almost too much", and the user was unsure about how far the body had been pushed. Prefer the color
  accents, and check with the user before adding motion or highlight effects to the body.
- **Contact channels: rows, not a display email or icon cards.** A display-size email address (≈40px light) was
  out of proportion with the rest of the page. Replacing it with a two-column grid of rows, each with an icon in a
  ringed circle, a mono purpose label, the value and an always-on arrow, was "way better" but too busy. Accepted:
  one column of hairline rows like the work list: small dim outline icon, channel name, muted value on the right,
  accent color and an arrow only on hover or focus, whole row as the link.
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
- Test the ends of the range: a very tall window (footer stays at the bottom; full-height heroes keep their copy
  where intended), a narrow one, a very wide one
  (zoom out to 50%), reduced motion, dark mode, keyboard-only, JS disabled.
- On macOS, set scroll bars to "Always show" (System Settings → Appearance) to see the layout Windows users
  get; unexpected scrollbars point at overflow bugs.
- **No browser tool in the session?** Playwright can still take screenshots at several widths
  (`npx playwright install chromium`, then `npx playwright screenshot --viewport-size "375,800" URL out.png`).
  Otherwise give the user a short list of exactly what to look at.
- Stop dev servers you started when the user asks, and close browser tabs you opened.
