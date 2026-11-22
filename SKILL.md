---
name: minimal-modern-ui
description: Build or restyle minimal, clean, modern websites for people and small launches - personal sites, portfolios, landing pages and blogs - in plain HTML/CSS/JS that works with any stack. Covers choosing a quiet direction, design tokens and shared components so every page matches, page recipes (landing, personal, gallery, blog index, blog post), reading typography, restrained motion, accessible forms and disclosures, the accessibility and performance baseline, and verifying the result (in a browser when one is available, otherwise headless). Use when asked for a "modern", "clean", "minimal", "polished" personal site, landing page or blog. Not for web apps, product UIs, dashboards or internal tools.
---

# Minimal modern UI: minimal sites that feel finished

For **personal sites, portfolios, landing pages and blogs**: small, content-first sites where restraint and
detail do the work. Not for web apps, product interfaces, dashboards or tools; their problems (app state,
data density, complex forms) need different guidance.

Everything here is plain HTML, CSS and a little vanilla JS, so it fits any stack or none. Where the project
already has a build or templating setup, use it; the principles don't change.

It is a **compass, not a template**: each rule gives the *why* and a *starting point* to bend to the subject
and the user's taste. Items marked **Firm** are the few things not to skip.

Supporting files (read when needed):
- [references/snippets.md](references/snippets.md): copy-paste building blocks (tokens, base, prose, post list, forms, motion).
- [references/interface-checklist.md](references/interface-checklist.md): detailed interaction, form, content
  and performance checks, adapted from Vercel's Web Interface Guidelines.
- [references/defaults.md](references/defaults.md): concrete default values (spacing, header sizes, section
  headings, contact rows) and fixes for common CSS and motion pitfalls.
- [references/templates.md](references/templates.md): measurements from ten landing-page templates. Reference
  data to calibrate your eye, not rules.

## 1. Workflow

1. **Understand the job.** Whose site, for whom, the one thing a visitor should do or learn, the pages needed,
   and what "done" means. Ask when the answer changes the build: who owns the copy, and whether there is
   existing content (posts, projects) to bring in.
2. **Set the direction** (§2) and write it down: color tokens, a type pairing, a spacing and radius scale and a
   motion personality, in the project notes (CLAUDE.md, AGENTS.md or README) so later sessions stay consistent.
3. **Set up the shared pieces** (§3) before the first page: tokens, base styles, layout primitives, components
   and one source for the header, footer and `<head>`. Every page, including the first, is built from these.
4. **Real copy first.** Placeholder text hides layout problems. Follow the page recipe (§4).
5. **Build static, responsive and accessible**, then add motion, then polish.
6. **Verify the result** (§11), then do the **restraint pass** (§12).
7. **Iterate in small, visible steps.** One change at a time, look at it, ask for taste calls instead of
   guessing, say plainly what was and wasn't verified, and only commit or publish when asked.

## 2. Choose a direction

Minimal is the default: content first, one accent, generous space, hairlines over boxes, small motion. Every
element should carry meaning; decoration that doesn't is removed.

| Family | Look | Tends to fit |
|---|---|---|
| Quiet light | Near-white, neutral sans, hairline dividers, one crisp accent | Personal sites, blogs, writing |
| Quiet dark | Near-black, light-weight large type, one accent, a monospace for metadata | Engineering and personal sites, launches |
| Editorial | Serif for display or body, generous measure, outlined buttons | Long-form writing, books, culture; can read dated to tech audiences, so show it live first |
| Soft glow | Quiet base plus one subtle gradient or radial glow, optional frosted surface | Landing pages that need some warmth |
| One bold block | Quiet base plus one full-bleed color block or framed photo | Portfolios, events, personal brands |
| Immersive hero, quiet body | One atmospheric full-viewport first screen (imagery, a slow ambient effect, a display face for the headline only), then the quiet sections below | Photographers, artists, visual subjects where the work itself is the draw |

- **Tone beats novelty.** A serious subject wants calm and credible; playful fonts and loud effects usually
  get rejected there.
- **Match the audience's conventions.** Tech audiences tend to expect a neutral sans on near-white or
  near-black with one crisp accent; other audiences have their own. When proposing several directions, make
  them differ in layout and surfaces (list page, sticky split, card grid, one color block), not only in font
  and paper color, so the user chooses between real alternatives. For visual subjects, include an immersive
  hero option: a plain minimal hero can read flat there (see defaults).
- **When taste is unknown, try it live.** Swap the font, the accent or the spacing in the real page and let the
  user react. Expect a few rounds.
- **The user's taste outranks this guide.** Once they accept or reject a direction, write it in the project
  notes and follow it over any default here.

## 3. Shared styles and components

A second page should look like the first because it is built from the same pieces, not because styles were
copied over.

- **One source for tokens.** Colors, type scale, spacing, radii, shadows and motion timings are custom
  properties in one file. Pages and components use tokens, never raw values: a hex code or one-off pixel size
  in a page's styles is a bug to fix.
- **Style components, not pages.** `.btn`, `.card`, `.field`, `.prose`, `.post-list`, `.site-header`, not
  `.about .blue-box`. Variants are modifiers (`.btn--outline`), never edited copies. Page styles only arrange
  components and stay short.
- **Layer the CSS**: tokens → base → layout primitives → components → page arrangement, declared with `@layer`
  so a page rule can't quietly out-rank a component (see snippets).
- **Write shared chrome once.** Header, nav, footer, `<head>` and the site script come from one source: the
  project's includes, partials or templates, or a small build script. Hand-copied headers drift; if copying is
  unavoidable on a two-page site, say so and re-check every copy after each change. Mark the current page in
  the nav with `aria-current="page"`.
- **Behavior by markup.** One site script handles reveals and disclosures through data attributes and
  classes, so a new page gets them with no per-page JS.
- **Keep an inventory.** List the components in the project notes (name, purpose, variants). On a new page,
  reuse first; anything new goes into the shared files and the list, not into the page. A `styleguide.html`
  showing every component in each state and theme is a quick check after changes.
- **Single page today?** Split tokens and components from page styles anyway; the next page becomes assembly.

## 4. Page recipes

**Landing page**
- Hero: one headline, one sentence of lead, the primary action (or the signup form itself) in the first viewport.
- Then sections that answer the visitor's questions in order: what it is, how it works (numbered steps plus one
  small picture), proof (short quotes, logos, numbers that are real), FAQ, footer.
- Don't repeat the pitch: if the hero holds the form, a closing block restating it adds nothing.

**Personal site / portfolio**
- Name and one line on what the person does, then short sections: work or projects, writing, about, contact.
- Lists with hairlines beat card grids for projects and posts; one framed photo is enough imagery, except for
  visual work (photography, art), where the first screen can carry the imagery full-bleed before the quiet lists.
- Contact is a plain link (email, profiles), not a form, unless the user asks for one. Several channels read
  best as the same hairline rows as the rest of the page, not as oversized text or icon cards (see defaults).

**Gallery / showcase** (examples, case studies, work samples)
- A short centered hero (headline plus one sentence), then the work. No install, pricing or "how it works"
  blocks; link out to docs instead.
- Two per row on desktop, one on phones. Each item: the screenshot in a small browser frame (dots plus the
  address), a small type label, the title with an arrow, and one caption (a prompt, a client, a one-line
  summary) in a quiet box.
- The whole card is the link: stretch the title link over the card (`::after { inset: 0 }`) so the screenshot
  is clickable too, with one tab stop. Hover: the frame lifts a few pixels and the screenshot zooms slightly.
- A plain single column of full-width screenshots on a system font reads bland and oversized; give the page
  one display accent (an italic serif word in the headline, a soft background glow).

**Blog index**
- A list, not cards: title, date (`<time datetime>`), optionally a one-line summary. Group by year once there
  are many posts. The whole row is the link, with no dead zones.
- No stock thumbnails. Pagination or one long page both work; say which in the notes.

**Blog post**
- A reading column of about 60–72 characters, body 17–19px with line-height 1.6–1.75 (§5).
- Title, date and optional reading time at the top; headings with anchors and `scroll-margin-top`; a table of
  contents only for long posts.
- Figures with captions may break wider than the text; code blocks scroll inside themselves, never the page.
- End with a next step: previous/next posts or a short list of more, plus the RSS link if the site has a feed.

**Shared across types**
- **Page essentials** in the shared `<head>`: every page has `<html lang>`, a unique `<title>` and meta
  description, a favicon, `theme-color`, and Open Graph title and description.
- **Header: a nav, one icon link, or nothing.** A single lonely text button opposite the brand looks
  unfinished, but one icon link in a ring (a GitHub or profile mark) works. On a one-section page, drop anchor
  links to the content right below; they point nowhere useful.
- **Footer at the bottom**, also on short pages (full-height flex column), with no stray margin under it.
- **Design every state**: empty (no posts yet), very long titles, missing images, a 404 page in the site's look.

## 5. Typography

- One or two families: a neutral body face (a system stack is fine) plus at most one display face. A monospace
  for dates, code and metadata is a third face only if it earns it.
- **Headings** read modern big, light and tightly tracked: about 40–72px for the hero, weight 300–500,
  letter-spacing −0.02 to −0.05em for neo-grotesk, line-height 1.1–1.25, sized with `clamp()`.
- **Section headings on a short page** (personal site, blog index): about 1.25× body (≈20px), semibold, in the
  text color. Faint uppercase labels are too weak; display sizes compete with the hero.
- **Reading text.** 17–19px, line-height 1.6–1.75, 60–72ch measure, paragraphs spaced by about 1em.
  Secondary text uses a muted color, not a smaller size.
- **Tidy lines**: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs to avoid stranded words.
- **Typographic details**: curly quotes (“ ”), the ellipsis character (…), a non-breaking space between a number
  and its unit (`10&nbsp;MB`), `tabular-nums` for dates and figures in lists. Mark brand and product names
  `translate="no"` so browser translation leaves them alone.
- **Wordmark**: large enough to hold its own next to section headings (often 1.2–1.6×); a weight contrast inside
  one word (light + extra-bold) adds character cheaply.
- **Justified text** only with `lang` set and `hyphens: auto`, and never in narrow columns.

## 6. Color and surfaces

- Tokens on `:root`: background, surface, text, muted, a hairline color, one accent (optional second gradient
  stop) and an on-accent color.
- **Contrast (Firm).** Body text at least 4.5:1 (WCAG 2) on the *actual* surface, checked at the lightest spot
  of translucent or gradient surfaces. Light-weight display type needs more. APCA is a useful second opinion
  for thin type, not a replacement. Always set link colors; the browser default blue looks wrong on almost
  every design.
- **Accent for a few small marks**: one word in a headline, links, hover and focus, the current nav item. Not a
  large block of color, and not for list numbering.
- **Surfaces**: flat with hairlines by default. Shadows, when used, have two layers (soft ambient plus a tighter
  direct one); borders can be semi-transparent so edges stay crisp on any background. Inner radii are never
  larger than their container's. On a colored background, tint borders and shadows toward its hue.
- **Hover and focus raise contrast** against the resting state.
- **Light, dark or both.** Decide early. One fixed scheme is fine: set `color-scheme` and `theme-color` to match.
  For both, redefine the same tokens under `prefers-color-scheme: dark` (plus a `[data-theme]` override if
  there is a toggle) and check contrast, shadows, images and code blocks in each.
- **Backgrounds**: solid, or one gentle gradient or glow; a pattern only at ≤10% contrast. Never two loud things.

## 7. Motion

Motion should help someone see what changed or where to look. On these sites, less is usually better.

- **Default**: a short fade-in of the main content on load (a few pixels of rise) and hover/focus feedback. A
  page with only this is a complete, calm result.
- **Scroll reveals are optional** and stay subtle: opacity plus 6–20px of movement, `ease`, 0.3–1s, play once at
  about 25% visible. Cascade by distance (heading moves least, buttons most); stagger 100–150ms, cap 6–8 items.
  Never on long-form reading content.
- **CSS first**, then the Web Animations API, then a JS library only if truly needed.
- **Animate only `opacity` and `transform`**, list transitioned properties explicitly (never `transition: all`),
  and set `transform-origin` where the motion physically starts. For SVG, animate a `<g>` with
  `transform-box: fill-box`.
- **Interruptible**: transitions, not fixed timelines, so a hover-out or a second click reverses smoothly.
- **Hover/focus**: buttons scale about 1.02–1.06 or lift; nav and text links get a 2px underline sliding in
  from the left, also on `:focus-visible`.
- **Ambient motion**: at most one slow loop, or none. Looping media is a muted `<video>`, not a GIF, and
  motion longer than 5 seconds needs a pause control. Put it in the header nav as a labeled switch
  ("Animation"), not a floating button or a bare icon (see snippets and defaults).
- **Glass flicker (Chrome)**: don't fade a `backdrop-filter` element's children or animate its blur (see defaults).

## 8. Interaction patterns

- **Links are links.** Navigation uses `<a>` so new-tab, copy-link and middle-click work. No dead zones: if a row
  looks clickable, all of it is.
- **Forms** (signup, contact): every field labeled; correct `type`, `name`, `autocomplete` and `inputmode`;
  spellcheck off for emails; native validation first. Don't block paste or keystrokes, and don't disable
  submit before the user tries. Errors sit next to the field, say how to fix the problem, and focus moves to
  the first error on submit. More in the interface checklist.
- **Submitting**: the button keeps its label and gains a spinner, shown only after ~200ms and then for at least
  ~400ms so fast responses don't flicker (see snippets). Success replaces the form with a clear next step.
- **Disclosures** (FAQ, "show more"): a `<button aria-expanded aria-controls>`, animated with the grid-rows
  trick, closed state only when JS runs.
- **Inline help over tooltips.** Explain in the text first. If a tooltip is needed, never rely on `title`; use a
  custom one on hover and focus, with a short delay before the first and none when moving between neighbors.
- **Copy**: say what the page offers in the visitor's words; buttons say exactly what they do ("Get the
  newsletter", not "Submit"); error messages say how to recover.

## 9. Quality baseline (Firm)

- **Reduced motion**: with `prefers-reduced-motion: reduce`, reveals show instantly and loops and smooth
  scrolling are off.
- **No-JS safe**: hidden-until-revealed states live behind a `.js` class, so nothing stays invisible if JS fails.
- **Keyboard and focus**: a "Skip to content" link, logical heading levels, visible `:focus-visible` on every
  interactive element, and sticky headers never covering the focused element (`scroll-padding-top`).
- **Touch**: targets at least 44px on mobile (24px minimum hit area anywhere); inputs at least 16px so iOS
  doesn't zoom; never disable zoom; respect safe areas (`env(safe-area-inset-*)`).
- **Semantics**: native elements before ARIA, labeled inputs, icon-only buttons with `aria-label`, decoration
  `aria-hidden`, status never shown by color alone, `aria-live="polite"` for messages that appear.
- **Layout**: test at 375, 768, 1280 and a very wide window; no horizontal scroll; images have `width` and
  `height` so nothing shifts.
- **Performance**: preload the main font and keep weights and character sets to what's used, preconnect to font
  hosts, `display=swap`, lazy-load images below the fold, one IntersectionObserver, no large blocking scripts.
- **Honest content**: no fake numbers or quotes.

## 10. Adapting to an existing project

If the site already has a build or templating setup, put the tokens in its global stylesheet, the header,
footer and head in its shared layout or includes, and keep the components' markup and class names. If it has
none, plain files are fine: the layer structure in snippets works without any tooling.

## 11. Verify the result

Check the page in a real rendering engine, with whatever the session offers, in this order of preference:
1. **A browser tool** (an in-app browser or browser extension): best for interaction, hover and scrolling.
2. **A headless browser** when there is no browser tool, or it can't do what's needed: Playwright
   (`npx playwright install chromium`, then `npx playwright screenshot --viewport-size "375,800" URL out.png`) or
   headless Chrome. Screenshot several widths and read the images.
3. **Neither available?** Check what the code can prove (paths resolve, tokens are used, contrast computed from
   the token values), then give the user a short, specific list of things to look at, and say plainly what
   wasn't verified.

Whichever route, prove claims with numbers rather than impressions:
- **Measure**: `getBoundingClientRect()` for gaps and alignment, `getComputedStyle()` for end-state colors and
  fonts, `document.fonts.check()` that web fonts loaded, `scrollWidth` vs `clientWidth` for horizontal scroll.
- **The ends of the range**: narrow, short, very tall (half of a large monitor: the footer stays at the bottom
  and full-height heroes keep their copy in place) and very wide (zoom out to 50%); also keyboard tab order,
  reduced motion, dark mode, JS disabled, and Safari if available. On macOS, "Always show" scroll bars reveal
  overflow bugs.
- **Wait for the end state.** Pages fade in on load; screenshot only after the fade, or a correct page looks
  broken. Headless "virtual time" budgets may not finish CSS transitions: wait real time before capturing.
- **Stale files**: a local static server lets the browser reuse cached CSS and JS. Refetch them with
  `fetch(url, { cache: "reload" })` before reloading, or add a throwaway query (`?r=2`). A hash-only navigation
  doesn't reload either (`?r=2#section`).
- **Narrow widths**: a browser window may refuse to shrink to phone width. Load the page in a 375px `<iframe>`
  (or set the headless viewport) and check its `scrollWidth`.
- **Tool quirks**: background tabs throttle timers, animations and IntersectionObserver, so take a screenshot to
  force a render, wait, and take another. Some tools take click coordinates in the screenshot's scaled frame
  (ratio = frame width ÷ `innerWidth`); for hover and clicks prefer an element reference, or read the element's
  rect and target its center. Test hover logic by dispatching `pointerover`/`pointerout`, then confirm with a
  real hover.
- Close tabs you opened, and stop dev servers you started when the user asks.

## 12. Restraint pass

Before handing over, remove: any animation that doesn't help someone see what changed, any label a quieter
treatment could replace, any color or size that isn't a token, any page-level style that duplicates a shared
component, and any rule from this guide that fights the subject. Then read the page as a first-time visitor.
