# minimal-modern-ui

A [Claude Code](https://claude.com/claude-code) skill for building and restyling **minimal, modern personal
sites, portfolios, landing pages and blogs** in plain HTML, CSS and a little vanilla JS.

It gives Claude a design compass rather than a template: how to pick a quiet direction, set up design tokens
and shared components so every page matches, lay out each page type, set readable type, add restrained
motion, meet an accessibility and performance baseline, ship (SEO, social preview, RSS, analytics, hosting)
and check the result in a real browser.

## Contents

- [Install](#install)
- [Use](#use)
- [Examples](#examples)
  - [Astrophotographer portfolio](#astrophotographer-portfolio)
- [What's inside](#whats-inside)
- [Contributing](#contributing)

## Install

For all your projects:

```sh
git clone https://github.com/pkafel/minimal-modern-ui-skill ~/.claude/skills/minimal-modern-ui
```

For one project only (run from the project root):

```sh
git clone https://github.com/pkafel/minimal-modern-ui-skill .claude/skills/minimal-modern-ui
```

The folder must be named `minimal-modern-ui`. Start a new Claude Code session afterwards so the skill is picked
up. To update, run `git pull` inside the folder.

## Use

Ask for what you want and Claude loads the skill when it fits:

> Build me a minimal personal site with a blog, dark and light mode.

> Restyle this landing page so it looks clean and modern.

Or invoke it directly with `/minimal-modern-ui`.

## Examples

### Astrophotographer portfolio

![First screen of a dark astrophotography portfolio: a large serif headline "Light that left before we did." with "before" in warm amber italic, a starfield background, a ringed planet cropped at the right edge, and an "Animation" switch at the end of the nav](docs/examples/astro-photography.png)

**Prompt:**

> Design a web page for a photographer who is into space, planets and stars photography. Use /minimal-modern-ui skill.

## What's inside

| File | Contents |
|---|---|
| `SKILL.md` | Workflow, direction, shared styles and components, page recipes (landing, personal, blog index, blog post), typography, color, motion, interaction patterns, the firm quality baseline |
| `references/snippets.md` | Copy-paste building blocks: tokens (light and dark), base layer, skip link, header, prose, post list, buttons and fields, signup form, page-load fade, scroll reveals, FAQ disclosure, and more |
| `references/interface-checklist.md` | Detailed interaction, form, content, motion and performance checks |
| `references/ship-checklist.md` | Head metadata, structured data, RSS, sitemap, social images, analytics, hosting |
| `references/lessons.md` | Pitfalls from real projects and tips for verifying in a browser |
| `references/templates.md` | Measurements from ten landing-page templates, to calibrate the eye |

## Contributing

Issues and pull requests are welcome, especially lessons from real sites built with the skill. Keep additions
framework-agnostic and within scope (personal sites, landing pages, blogs).
