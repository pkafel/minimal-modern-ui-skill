---
name: modern-web-ui
description: Ramp up any web page or small site (landing page, tool, calculator, dashboard, portfolio) with a modern, clean look, polished motion and a production-ready baseline. Covers setting direction and design tokens, building pages from shared styles and components so every page of a site looks the same, layout, typography, color and motion principles, interaction patterns (disclosures, tooltips, forms and results), the accessibility baseline, shipping (SEO, social preview, analytics, hosting) and verifying in a real browser. Use when starting a new page, restyling one, or when asked for a "modern", "clean", "polished" or "animated" page. A compass to adapt, not a template to copy.
---

# Modern web UI: a ramp-up guide

Use this to get a web page project moving fast without making it look generic. It is a **compass,
not a template**: every section gives the *why* and a *starting point* you can bend to the subject,
the audience and the user's taste. Items marked **Firm** are the few things not to skip.

Supporting files (read when needed):
- [references/snippets.md](references/snippets.md): copy-paste CSS/JS building blocks.
- [references/ship-checklist.md](references/ship-checklist.md): SEO, social preview, analytics, hosting.
- [references/lessons.md](references/lessons.md): pitfalls and browser-verification tips from real projects.
- [references/templates.md](references/templates.md): measurements from 10 Carrd landing-page templates
  (cited by Carrd's template number, e.g. #304). Reference data to calibrate your eye, not rules.

## 1. Ramp-up workflow

1. **Understand the job.** Purpose, audience, the one primary action, constraints (hosting, APIs, data,
   languages, brand), and what "done" means. Ask when the answer changes the build: the final domain,
   whether to track visitors, who owns the copy and numbers.
2. **Set the direction** (§2) and write it down: 5–7 color tokens, a type pairing, a radius/spacing scale
   and a motion personality. Put them in the project notes (CLAUDE.md, AGENTS.md or README) so later sessions stay
   consistent.
3. **Set up the shared pieces** (§3) before the first page: a tokens file, base styles, layout primitives and
   components, plus one source for the header, footer and head. Every page, including the first, is built
   from these.
4. **Structure and real copy first.** Hero with the primary action, then sections that answer the visitor's
   questions in order. Placeholder copy hides layout problems.
5. **Build static, responsive and accessible** from the shared components, then add motion, then polish.
6. **Ship** (§11) and **verify in a browser** (§12).
7. **Iterate in small, visible steps.** One change at a time, look at it, ask for taste calls instead of
   guessing, say plainly what was and wasn't verified, and only commit or publish when asked.

## 2. Choose a direction

Match the subject, then stay coherent. These families are starting points, not a menu:

| Family | Look | Tends to fit |
|---|---|---|
| Glass gradient | Deep navy/plum background, frosted cards, faint pattern | Finance, tools, SaaS |
| Dark minimal + gradient accent | Charcoal or near-white, huge light type, gradient on one element | Product launch, dev tools |
| Split hero | Text half and image half, strong accent button | Personal, agency, services |
| Soft light pastel | Light gradient, thin lines, pill buttons | Lifestyle, community, waitlist |
| Bold color blocks | Flat full-bleed color, bold headline | Portfolio, events |
| Editorial serif | Cream background, serif display, outlined buttons | Fashion, books, studios, culture. Can read dated to tech audiences, so show it live before building on it |

- **Tone beats novelty.** A serious subject (money, health, legal) wants calm and credible. Playful or script
  fonts and loud effects usually get rejected there.
- **When taste is unknown, try it live.** Swap the font, the highlight or the spacing in the real page, show
  it and let the user react. Expect a few rounds, and keep the rejected ones out of the final notes.
- Restraint is the modern signal: few colors, one accent, generous space, large light type, small motion.
- **Match the audience's conventions.** Tech and engineering audiences tend to expect a neutral sans on
  near-white or near-black with one crisp accent; other audiences have their own. When proposing several
  directions, make them differ in layout and surfaces (list page, sticky split, card grid, one bold color
  block), not only in font and paper color, so the user chooses between real alternatives.
- **The user's taste outranks this guide.** Once the user accepts or rejects a direction, write it in the
  project notes and follow it over any default here.

## 3. Shared styles and components

Treat the look as a small design system, not as page styling. A second page should look like the first
because it is built from the same pieces, not because styles were copied over.

- **One source for tokens.** Colors, type scale, spacing, radii, shadows and motion timings are custom
  properties in one place (a `tokens.css`, or the framework's global stylesheet). Pages and components use
  tokens, never raw values: a hex code or a one-off pixel size in a page's styles is a bug to fix.
- **Style components, not pages.** Write `.btn`, `.card`, `.field`, `.section`, `.site-header`, not
  `.pricing .blue-box`. Variants are modifiers (`.btn--outline`, `.card--glass`), never copies with small edits.
  Page-specific styles only arrange components and should stay short.
- **Layer the CSS**: tokens → base (reset, body, headings, links, focus) → layout primitives (`.frame`,
  `.section`, `.split`, `.stack`) → components → page arrangement. Declare it with `@layer` so a page rule can't
  quietly out-rank a component (see snippets).
- **Write shared chrome once.** Header, nav, footer, `<head>` (fonts, favicon, analytics) and the site script
  come from one source: a framework layout, a static site generator's includes (Eleventy, Astro, Hugo), or
  a small build step. Hand-copied headers drift; if copying is unavoidable on a two-page site, say so and
  re-check every copy after each change. Mark the current page in the nav with `aria-current="page"`.
- **Behavior by markup.** One site script handles reveals, tooltips and disclosures through data attributes
  and classes, so a new page gets them by markup alone, with no per-page JS.
- **Keep an inventory.** List the components in the project notes (name, purpose, variants) next to the
  tokens. On a new page, reuse from the list first; if something new is needed, add it to the shared files and
  the list, not to the page. For larger sites, a `styleguide.html` that shows every component in each state
  and theme is a quick visual check after changes.
- **Single page today?** Split tokens and components from page styles anyway. It costs minutes and makes the
  next page an assembly job.

## 4. Layout principles

- **Hero first.** Brand mark, one headline, one sentence of lead, and the primary action (or the form itself)
  in the first viewport.
- **Header: a nav or nothing.** A single lonely button opposite the brand looks unfinished. Use a short list of
  section links (hidden on phones if they don't fit) or leave the header as just the brand.
- **Don't repeat the pitch.** On a short page whose hero already holds the form, a closing "subscribe" block
  restating the hero adds nothing. End on content, then the footer.
- **One idea per block.** Alternate full-width blocks with 2-column splits (text | visual); collapse splits to
  one column around 860–960px.
- **Width follows content.** Reading pages: narrow (about 55–70 characters per line). Tool or dashboard
  pages with side-by-side panels: wide (about 1200–1400px) with modest side padding (16–32px), and give the
  results/visual panel the larger column. Fine print and footers can span the full content width.
- **Spacing scale, not one-offs.** For example 4/8/12/16/24/40/64. Sections about 40px (mobile) to 64px
  (desktop); card padding scales with card size. With hairline dividers between sections the padding shows on
  both sides of the line, so stay at the low end (about 40–56px). The last section's bottom padding stacks
  with the footer's, so trim it too (about 40px).
- **Equal-height cards** (input next to results): let the grid stretch them and pin the action to the bottom of
  the shorter one. Keep anything that expands (tables, details) *outside* the equal-height cards, in its own
  full-width block below, so nothing resizes while the user interacts.
- **Footer belongs at the bottom**, also on short pages (full-height flex column), with no stray margin under it.
- **Explain with steps and a picture.** For "how it works" content, numbered steps plus one small worked-example
  diagram beat paragraphs.
- **Testimonials match the page's volume.** On a calm page, avoid a full-bleed dark or accent banner with one big
  quote. Short quotes (1–2 sentences) sit two per row with a hairline between them, in the page's own surface
  and type. For more than two, page through pairs with small arrow buttons and a counter, sized to the tallest
  pair, no auto-rotate (see snippets).
- No horizontal scroll at any width. Reserve space for results and errors to avoid layout shift, but not a
  short status line between a form and its fine print: an empty reserved row makes the next line float (see
  lessons).

## 5. Typography principles

- One or two families. A neutral body face (Inter, a system stack) plus at most one display face with character.
- **Big, light, tightly tracked headings** read modern: roughly 40–72px, weight 300–500, letter-spacing
  −0.02 to −0.05em for neo-grotesk, line-height 1.1–1.25. Use `clamp()`.
- **Section headings on a short reading page** (personal site, blog index): about 1.25× body (≈20px),
  semibold, in the text color. A small muted uppercase label alone is too faint to mark a section, and
  display-size headings (26px+) compete with the hero.
- **Wordmark / brand text.** Give it enough size to hold its own next to the section headings (often 1.2–1.6×).
  A weight contrast inside one word (light + extra-bold) is an easy way to add character. Condensed faces
  need a larger size. Choose a face that fits the subject (see §2).
- **Long explanatory text** can be justified if you set `lang` and `hyphens: auto`; keep headings and short
  blocks left-aligned.
- Body 15–16px/1.6. Secondary text via a muted color, not a smaller size. Numbers in tables and results use
  `font-variant-numeric: tabular-nums`.

## 6. Color, surfaces and emphasis

- Define colors as CSS custom properties on `:root`: background, surface, text, muted, a hairline color, one accent (plus an
  optional second gradient stop), and an on-accent text color.
- **Contrast.** Body text at least 4.5:1 against the *actual* surface (check translucent and gradient surfaces
  at their lightest spot). Light-weight display type needs extra contrast. Always set a link color
  (`a{color:inherit}` plus a hover color): the browser default blue is unreadable on dark backgrounds and
  looks wrong on light ones, especially in a serif.
- **Surfaces.** Frosted glass (translucent gradient fill, blur, 1px light border, soft deep shadow), flat cards
  or hairline-divided sections: pick one and use it consistently. Buttons are big (about 48–64px) and often
  carry the accent gradient.
- **Emphasize quietly.** To mark the best option, brighten it and dim the rest (value color, bar fill) instead of
  adding badges, tints or outlined boxes. Escalate only if the quiet version fails.
- **A strong accent is for a few small marks** (one word in the headline, the highlighted series in a chart, a
  key delta, hover/focus). Not for list numbering, and not as a large block of color.
- Backgrounds: a solid or vertical gradient, optionally a radial glow or a ≤10%-contrast pattern. Not two loud
  things at once.
- **Light, dark or both.** Decide early. One fixed scheme is fine: set `color-scheme` to match. For both,
  redefine the same tokens under `@media (prefers-color-scheme: dark)` (plus a `[data-theme]` override if
  there is a toggle) and check contrast, shadows and images in each (see snippets).

## 7. Motion principles

Motion should help someone see what changed or where to look. Everything else is decoration.

- **Animate opacity and transform only.** Small distances (about 6–20px), `ease`, 0.3–1s, and **play once**.
- **Cascade by distance**: heading moves least, paragraph a bit more, buttons most, with the same duration, so
  a block settles top-down without delays. Stagger children 100–150ms, cap at 6–8.
- **Page load**: fade the main content in with a few pixels of rise. A page with only this and no scroll
  reveals is a valid calm option.
- **Scroll reveals** play when about 25% visible, then stop observing. Content must stay visible if JS fails.
- **State changes** (the part tools forget): a loading button with a spinner and progressive label, results that
  fade in, bars that fill, key numbers that count up, a smooth scroll to the results.
- **Disclosures** (show/hide a block): animate height with the grid-rows trick plus fade and slide, and the
  reverse on hide (see snippets).
- **Hover/focus**: buttons scale about 1.02–1.06 or lift, inputs get a border and a soft ring, chevrons rotate.
  Nav and text links get more than a color change: a 2px accent underline sliding in from the left (see
  snippets), also on `:focus-visible`.
- **Ambient motion**: at most one loop (slow blurred blobs or nothing). Never two competing.
- **Glass flicker (Chrome).** Don't animate anything a `backdrop-filter` element depends on, or its children's
  opacity. Fade the glass as one piece and move children with `transform` (details in lessons).

## 8. Interaction patterns

- **Forms.** Every input labeled; native validation first; errors in `role="alert"` saying what's wrong and how
  to fix it; hints under the field when a unit or convention is easy to get wrong.
- **Show something before the user acts.** Rotating or static examples make a tool legible. Hide controls that
  only make sense for the user's own data until it exists.
- **Disclosures.** Use a `<button aria-expanded aria-controls>` and change its label ("Show…" / "Hide…").
  Native `<details>` cannot animate closing.
- **Tooltips.** Never rely on the native `title` or SVG `<title>`: the browser waits about a second. Build an
  instant one: shown on hover and keyboard focus, hidden on blur, clamped inside its container, flipped below
  when there's no room above, larger invisible hit area for small dots.
- **Charts.** A hand-drawn SVG is enough for one line chart; add tooltips, a "now" marker, a short draw-in, and
  an accessible label. Use a library only when you need more than that.
- **Copy.** Say what the page does in the user's words, keep disclaimers short and honest, and state the
  assumptions that change the answer (units, currency, adjustments).

## 9. Quality baseline (Firm)

- `prefers-reduced-motion: reduce`: reveals show instantly; loops, count-ups, smooth scroll are off.
- Hidden-until-revealed states live behind a `.js` class so nothing stays invisible if JS fails.
- Visible `:focus-visible` on every interactive element; touch targets at least 44px.
- Labeled inputs, `role="alert"` errors, `aria-live="polite"` on regions that update.
- Test at 375, 768 and 1280 (and a very tall and a very wide window): no horizontal scroll, grids collapse.
- Performance: animate only opacity/transform; one IntersectionObserver; fonts with preconnect and
  `display=swap`; avoid large blocking scripts.
- Honest content: no fake numbers; label examples as examples; mention what is estimated.

## 10. Working in a framework

The snippets are plain HTML/CSS/JS so they drop into anything. In a framework, keep the principles and move
the pieces to where that stack expects them:

- **Tokens** stay CSS custom properties in the global stylesheet. With Tailwind, expose them as theme values
  (v4: `@theme { --color-accent: var(--accent-a); }`; v3: `theme.extend.colors.accent = "var(--accent-a)"`) so
  utilities and hand-written CSS share one source.
- **Components** from §3 become framework components (`<Button variant="outline">`, `<Card>`, `<Section>`)
  with variants as props, and one shared layout renders the header, footer and metadata for every route.
  With Tailwind, give repeated utility combinations a name (a component, or `@layer components`) rather than
  repeating long class lists on every page.
- **Component libraries** (shadcn/ui, Radix, MUI, …): restyle through their theme or CSS variables instead of
  overriding component by component.
- **Reveals** become one small hook, action or directive around a single shared IntersectionObserver, or the
  stack's motion library (Motion, Svelte transitions, Vue `<Transition>`) used with the same rules: opacity and
  transform only, play once, honor reduced motion. With server rendering, set the `.js` class from an inline
  script in `<head>` before first paint, or content shows, then hides, then reveals.
- **Head metadata, robots and sitemap** go through the framework (Next.js `metadata`, `app/robots.ts` and
  `app/sitemap.ts`; Nuxt `useHead`; SvelteKit `<svelte:head>`; Astro layouts) rather than a hand-edited
  `index.html`.
- **Disclosures, tooltips, carousels**: keep the markup and ARIA from the snippets and drive them from
  component state instead of `classList`.

## 11. Ship checklist

Before calling a page done: page title and description, canonical and social preview, favicon, structured
data, `robots.txt`/sitemap, analytics (ask first; consent for EU visitors), hosting and API caching, domain
redirects. Details, snippets and the questions to ask are in
[references/ship-checklist.md](references/ship-checklist.md).

## 12. Verify in a real browser

Screenshots after scrolling, computed styles for end states, geometry for layout claims, keyboard tab order,
narrow and short viewports, reduced motion. Background tabs throttle animations, so a screenshot forces a
render. Use whatever browser tool the session has (a browser extension, Playwright, Puppeteer). With none,
serve the page and give the user a short, specific list of things to check instead of claiming it works.
Tool-specific tips are in [references/lessons.md](references/lessons.md).

## 13. Restraint pass

Before handing over: remove any animation that doesn't help someone see what changed, any label a quieter
treatment could replace, any color or size that isn't a token, any page-level style that duplicates or tweaks a shared component, and any rule from this guide that fights the
subject. Then re-read the page as the first-time visitor.
