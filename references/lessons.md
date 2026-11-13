# Lessons and pitfalls

Collected from building real pages. Each item is a thing that cost time once. The taste calls here are one
person's reactions on specific projects: treat them as things to check with your user, not rules.

## Visual and CSS

- **Glass flicker (Chrome).** Animating `backdrop-filter`, a custom property that glass colors depend on, or the
  opacity of children inside a `backdrop-filter` element makes it blink. Fade the glass element as one piece
  and move children with `transform`, or remove `backdrop-filter` from anything that fades or expands.
- **Margin collapse.** A top margin on the first block collapses through `<body>`. With `min-height: 100vh` it
  adds an unwanted scroll. Use `padding-top` on the wrapper.
- **Grid gap with a collapsed row.** A row of height 0 still pays the gap. Cancel it with a negative margin
  equal to the gap while closed.
- **A reserved empty message row floats the next line.** A min-height status row under a form, plus its margin
  and the flex gap, opened about 45px between the form and the fine print below it, and the line below looked detached from the form. Hide it when empty (`.msg:empty{display:none}`) and accept a small shift, or place the
  message below the fine print.
- **Dividers double section padding.** 80px top and bottom put about 160px around each hairline, which read as
  too loose. Reduced to 56px desktop / 40px mobile, which is within the spacing range in SKILL.md §4.
- **Unstyled links on a dark page.** News headlines as `<a>` without a color fell back to the browser's dark
  blue and were unreadable on a charcoal card. Set `a{color:inherit}` globally and give links a hover color.
- **Lonely header button.** A single "Subscribe" pill in the top-right corner was rejected as looking odd.
  Replaced with three section links with a sliding underline; accepted.
- **Section heading size on a personal home page.** 12px muted uppercase labels were too faint to mark sections; 26–32px medium competed with the hero; about
  20px semibold in the text color worked. Use real `<h2>`s, not styled `<p>`s.
- **Specificity.** A broad rule like `.section p` beats a component class like `.caption`. Raise the
  component selector (`.section .caption`) or scope the broad rule.
- **`[hidden]` vs `display`.** A class that sets `display: flex/grid` overrides the `hidden` attribute. Add
  `[hidden] { display: none !important; }` once.
- **Native tooltips are slow.** `title` attributes and SVG `<title>` appear after about a second. Use a custom
  tooltip (snippets) for anything the user is meant to hover.
- **Native `<details>` can't animate closing.** Use a button with `aria-expanded`.
- **Justified text** looks gappy without `lang` and `hyphens: auto`, and in very narrow columns.
- **Expanding content inside equal-height cards** makes one card chase the other. Move it out of the cards.
- **Condensed or script display faces** need very different sizes from a neutral face; judge by eye next to
  the headings, at a real viewport width.

## Product and copy

- **Rules in the UI must match the code.** After changing a rule (limits on dates, a new fallback), re-read
  every sentence that explains it. A sentence can quietly become impossible or misleading.
- **Data quirks the user can't see.** Third-party data may be adjusted (for example split-adjusted prices); say
  so next to the input, and say what the user should enter.
- **Highlight by dimming, not decorating.** Badges and tinted boxes for "best" were rejected; a brighter value and a
  gradient bar on the best row, with the rest dimmed, was accepted.
- **Hide user-only controls on example data.**
- **Check a direction against the audience before polishing it.** An editorial look (cream paper, a display
  serif with italics, a burnt-orange accent, a drop cap) on a personal engineering home page read as dated to
  its owner, after the same look had already needed several rounds of fixes on another page. A dark sticky
  split with a neutral sans, a monospace for dates and one amber accent was accepted. Showing two or three
  directions live, early, would have saved those rounds.
- **A repeated closing pitch was rejected.** On a short newsletter page with the signup form in the hero, a
  closing block restating the offer and the form added nothing. End with content and the footer.
- **Loud testimonial banner on a calm editorial page.** A full-width dark band with one big italic quote looked heavy and made the accent feel overused. A one-quote carousel on the cream background was better, but a 1–2
  sentence quote across the full width still felt empty. Two quotes per row with a hairline between them,
  paged in pairs, was accepted.
- **Last section + footer padding.** 72px under the last section plus the footer's 32px read as slightly too much;
  40px was better.

## Verifying with a browser tool

- **Background tabs throttle** timers, animations and IntersectionObserver. Take a screenshot to force a render,
  wait a moment, then screenshot again. Reveal animations may look blank in the first shot.
- **Navigating to a hash-only change doesn't reload the page.** Add a throwaway query (`?r=2#section`) to force
  fresh CSS/JS.
- **Mouse coordinates.** Some browser tools take click/hover coordinates in the screenshot's frame, which can be scaled relative to CSS
  pixels (ratio = frame width ÷ `innerWidth`). Read element rects in JS, then convert.
- For hover tooltips, dispatch `pointerover`/`pointerout` events to test the logic, then confirm with a real
  hover when the page isn't re-rendering underneath you (rotating examples reset tooltips).
- Prove layout claims with numbers: `getBoundingClientRect()` for equal heights, gaps and alignment;
  `getComputedStyle()` for colors and fonts; check `document.fonts.check()` that web fonts loaded.
- Test the ends of the range: a very tall window (footer stays at the bottom), a narrow one, reduced motion,
  keyboard-only, JS-disabled content.
- **No browser tool in the session?** Playwright can still take screenshots at several widths
  (`npx playwright install chromium`, then `npx playwright screenshot --viewport-size "375,800" URL out.png`).
  Otherwise give the user a short list of exactly what to look at.
- Stop dev servers you started when the user asks, and close browser tabs you opened.
