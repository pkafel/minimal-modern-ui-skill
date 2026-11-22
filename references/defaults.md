# Defaults

Concrete starting values and fixes for common pitfalls. Apply them unless the user's taste or the subject says
otherwise; items marked "ask the user" are taste calls to confirm before going further.

## Direction

- **Check the direction against the audience before polishing it.** Show two or three directions live, early,
  and let the user pick before refining one. Why: an editorial look (cream paper, a display serif with
  italics, a warm accent, a drop cap) can read as dated to a tech audience, and polishing the wrong direction
  costs several rounds.
- **For visual work, offer an immersive hero.** Give photographers and artists a full-viewport first screen
  carrying the imagery (for space photography: an animated starfield, a large planet cropped at the edge, a big
  serif headline with one italic accent word, a stats row), then keep the minimal sections below. Why: a quiet
  hero with a headline and one small framed image undersells work that is itself the draw.
- **Below an immersive hero, add small color accents.** Echo the hero with an accent mark (such as ✦) before
  section headings, one serif pull line with an italic accent word, accent-colored prices. Ask the user before
  adding motion or highlight effects to the body (accent row titles with a line drawing in and other rows
  dimmed on hover, sticky section headings, a scroll-synced nav highlight). Why: after a dramatic hero a fully
  quiet body reads flat, but body effects quickly feel like too much.

## Layout and spacing

- **Section padding around dividers: 56px desktop / 40px mobile.** Why: 80px on each side puts about 160px
  around every hairline, which reads as too loose.
- **Space under the last section: about 40px**, then a footer with about 24–32px of its own padding. Why: 72px
  or more plus the footer's padding reads as too much, especially under a grid of cards.
- **Start the page with padding, not margin.** Put `padding-top` on the wrapper. Why: a top margin on the first
  block collapses through `<body>` and, with `min-height: 100vh`, adds an unwanted scroll.
- **Center full-height hero copy and cap the hero's height:** `min-height: clamp(560px, 100svh - header, 920px)`,
  with any background layer capped the same. Why: copy anchored to the bottom (`align-content: end`) looks right
  on a laptop but sits under a tall empty band on a large or half-width monitor.
- **Hero without imagery: about 40px under the header, centered, headline filling the width.** Size the headline
  to its container so it spans the page on one line: put `container-type: inline-size` on the hero, measure the
  headline's width in em once (text width ÷ font size, e.g. 11.7), and set
  `font-size: max(44px, calc(100cqi / 11.7))`, so it wraps on phones. Why: a left-aligned two-line headline
  under 100px+ of padding leaves an empty band and reads unfinished when there is no image beside it.
- **No pill or eyebrow badge above the headline.** Why: a bordered label there reads as a button.
- **Don't reserve height for an empty form message.** Give the empty message row no height or margin but keep
  it rendered so screen readers still announce it, or place it below the fine print. Why: a min-height row plus
  its margin and the flex gap opens about 45px and makes the next line look detached.

## Header and navigation

- **Give the header a nav, not a lone button.** Use a few section links with a sliding underline. Why: a single
  button opposite the brand looks unfinished.
- **One icon link is a good header for a one-section page.** A 44px ring with the GitHub (or profile) mark and an
  `aria-label`; on hover the mark and ring take the accent with a soft glow. Drop anchor links to the content
  right below the hero. Why: "Examples" pointing a few pixels down makes no sense, and the ringed icon reads as a
  deliberate accent rather than a lonely button.
- **Scroll-synced nav highlight suits a short anchor nav.** Show the accent underline on the link of the section
  in view (`aria-current="location"`, current once its top passes ~40% of the viewport, last section at the page
  bottom). Why: with three or so full-color links it orients without noise; on long navs or under an
  immersive hero it can feel like too much, so ask first there.
- **Size the header against the hero headline, not only the section headings.** Next to a 64px hero headline,
  start at about a 27px wordmark, 16px nav links with a 40px gap and a 76px bar. Why: a 22px wordmark, 14px
  links and a 64px bar look undersized under a big hero, even when the wordmark is 1.2–1.6× the section
  headings.
- **Nav links in the full text color at rest**, with the sliding accent underline as the hover and focus
  feedback. Ask the user before using muted nav links. Why: muted gray links read as disabled, especially in a
  dark header.
- **Pause control for ambient motion: a labeled switch at the end of the nav.** Use `role="switch"`, the word
  "Animation" in the nav-link style and a small track that fills with the accent when on; below about 480px
  show only the track and keep the word as the accessible name (see snippets). Why: a pill at the bottom of the
  hero looks out of place, one in the hero's corner floats, and an icon-only button in the nav is barely
  visible.

## Typography

- **Section headings on a short page: about 20px semibold in the text color**, as real `<h2>`s, not styled
  `<p>`s. Why: 12px muted uppercase labels are too faint to mark sections, and 26–32px competes with the hero.
- **Size condensed and script display faces by eye**, next to the headings at a real viewport width. Why: they
  need very different sizes from a neutral face at the same nominal size.
- **Justify text only with `lang` set and `hyphens: auto`**, and never in narrow columns. Why: otherwise it
  looks gappy.

## Color and surfaces

- **Set `a { color: inherit }` globally and give links a hover state.** Why: unstyled links fall back to the
  browser's dark blue, which is unreadable on dark surfaces.
- **Re-derive the accent when the scheme changes.** An accent picked on dark rarely passes on light (a peach at
  about 2:1 on white needed a burnt orange at 4.9:1), and the reverse. Compute contrast from the token values
  for both. Why: the accent marks links and key words, so it must read as text.
- **Highlight by dimming, not decorating.** Show the item that matters at full brightness and dim the rest,
  instead of badges or tinted boxes. Why: decoration adds noise; contrast alone marks the choice quietly.

## Motion

- **Glass: fade the element as one piece.** Don't animate `backdrop-filter`, custom properties the glass colors
  depend on, or the opacity of children inside a `backdrop-filter` element; move children with `transform`
  only, or drop `backdrop-filter` from anything that fades or expands. Why: Chrome makes it flicker.
- **Reveal scripts set custom properties, not inline `transform`.** Set e.g. `--reveal-from` inline and let the
  stylesheet use it. Why: an inline `transform` out-ranks `.is-visible { transform: none }` and leaves elements
  permanently offset.
- **Clear inline reveal timing once the reveal ends.** Remove the inline `transition-duration` and
  `transition-delay`. Why: left in place, they also apply to later hover transitions, so rows further down a
  staggered list react up to half a second late.

## Interaction and CSS mechanics

- **Prefer inline help; otherwise a custom tooltip** (see snippets), never `title`. Why: native tooltips appear
  after about a second and never on touch or keyboard.
- **Build disclosures from a button with `aria-expanded`**, not native `<details>`. Why: `<details>` can't
  animate closing in every browser.
- **Add `[hidden] { display: none !important; }` once.** Why: a class that sets `display: flex/grid` overrides
  the `hidden` attribute.
- **Use `@layer` or scope broad rules.** Why: a rule like `.section p` beats a component class like `.caption`
  (see snippets).

## Content and copy

- **Don't repeat the pitch at the end.** If the hero holds the signup form, end with content and the footer,
  not a closing block restating the offer. Why: the repeat adds nothing on a short page.
- **Testimonials: two quotes per row with a hairline between them, paged in pairs** (see snippets). Why: a
  full-width dark band with one big quote looks heavy and overuses the accent, and a single 1–2 sentence quote
  across the full width feels empty.
- **Contact channels as one column of hairline rows**, like the work or post list: a small dim outline icon,
  the channel name, the value muted on the right, accent color and an arrow only on hover or focus, the whole
  row as the link. Why: a display-size email address (≈40px light) is out of proportion, and a grid of rows
  with ringed icons, labels and always-on arrows is too busy.
- **Footer: a credit and the essential links, no disclaimers.** "Made by Name" linking to the author's profile
  is a good default. Why: lines like "names here are made up" add noise at the end of the page.
- **Re-read the copy after changing behavior.** Check every sentence that explains a form or page after it
  changes what it does. Why: a line can quietly become wrong.
