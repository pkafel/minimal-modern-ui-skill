# Ship checklist

Things that make a finished site findable, shareable and measurable. Do the parts that don't need decisions
first, then ask the user for the rest.

## Ask the user first (these change what you build)

- **Final domain** (with or without `www`): canonical, social preview, feed and sitemap need absolute URLs.
- **Analytics?** Which tool, if any. Visitors in the EU/UK need consent before tracking cookies.
- **Forms.** Where do signups or messages go (a newsletter service's form endpoint, a form service, a small
  serverless function on the host)? Secrets never go in page code.
- **Author details**: the exact name, links for the footer and `Person` data, and a photo if wanted.

## Head metadata (per page)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Page title · Site name (≤ 60 characters)</title>
<meta name="description" content="One or two sentences, ≤ 160 characters, in the visitor's words.">
<meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c0c0f" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="https://www.example.com/page/">
<meta property="og:type" content="website">  <!-- "article" on blog posts -->
<meta property="og:url" content="https://www.example.com/page/">
<meta property="og:site_name" content="Site name">
<meta property="og:title" content="…same as title…">
<meta property="og:description" content="…same as description…">
<meta property="og:image" content="https://www.example.com/og.png">   <!-- absolute URL, PNG or JPG -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="What the image shows">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="Site name" href="/feed.xml">   <!-- blogs -->
```
The head comes from one shared partial (SKILL.md §3) with title, description, canonical and image filled per
page; the title reflects the page, not just the site. Also: `<html lang="…">`, one `<h1>`, landmarks
(`<header>`, `<main>`, `<footer>`), descriptive link text, `alt` on meaningful images. No keywords meta
(ignored), no FAQ markup unless the Q&A is visible.

## Structured data

Pick the type that matches the page:
```html
<!-- Home page of a personal site -->
<script type="application/ld+json">{
  "@context": "https://schema.org", "@type": "Person",
  "name": "Full Name", "url": "https://www.example.com/", "jobTitle": "…",
  "sameAs": ["https://github.com/…", "https://www.linkedin.com/in/…"]
}</script>

<!-- Blog post -->
<script type="application/ld+json">{
  "@context": "https://schema.org", "@type": "BlogPosting",
  "headline": "Post title", "datePublished": "2026-11-02", "dateModified": "2026-11-02",
  "author": { "@type": "Person", "name": "Full Name", "url": "https://www.example.com/" },
  "image": "https://www.example.com/posts/slug/og.png", "url": "https://www.example.com/posts/slug/"
}</script>
```
Landing pages: `WebSite` plus `Organization` (or `Product` if something is sold).

## Files in the web root

- `favicon.svg`: a simple mark in the brand colors; it can switch colors with an internal
  `@media (prefers-color-scheme: dark)`.
- `robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://www.example.com/sitemap.xml`
- `sitemap.xml`: one `<url><loc>…</loc><lastmod>YYYY-MM-DD</lastmod></url>` per page; update `lastmod` when
  content changes.
- `feed.xml` (blogs): RSS 2.0 or Atom with absolute links, one item per post (title, link, date, summary or full
  content). Link it in `<head>` and visibly in the footer or post index.
- `404.html`: in the site's look, with a link home and to the post index.
- `og.png`: 1200×630, per post if possible (title on the site's background). Build it as an SVG and render it:
  `rsvg-convert -w 1200 -h 630 og.svg -o og.png` (macOS `brew install librsvg`, Debian/Ubuntu
  `apt install librsvg2-bin`), or screenshot an HTML card at 1200×630 with a headless browser. Check the PNG
  visually; system fonts stand in for web fonts.

## Analytics

Cookieless, privacy-friendly tools (Plausible, Fathom, Umami, Cloudflare Web Analytics) are a one-line script
and often need no consent banner; check the rules where the visitors are. They suit these sites best.

If the user wants Google Analytics, use the vendor's standard Tag Manager snippet rather than a hand-edited
stub, and gate it on the production hostname so local and preview visits stay out of the numbers:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  if (/(^|\.)example\.com$/.test(location.hostname)) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-XXXXXXX");
  }
</script>
```
- A snippet that loads `gtm.js` without the `gtm.start` push may never fire "All Pages" tags.
- Traffic only appears if the container has a GA4 tag firing on All Pages and the container is **published**.
- Count actions (`dataLayer.push({ event: "signup" })`), never personal input.
- Consent: until a banner exists, say so plainly.

## Hosting

- These sites are static: any static host works (GitHub Pages, Netlify, Cloudflare Pages, Vercel, a plain
  server). Put the built files in the web root.
- A form that needs a secret (an API key for a newsletter service) goes through a small serverless function on
  the same host, never through page code.
- Set long cache lifetimes for fingerprinted assets and short ones for HTML.
- Redirect the bare domain to the canonical host (or the reverse) in the host's domain settings.
- After the first deploy, the user's steps: verify the domain in Search Console and submit the sitemap; check
  the social preview in a debugger (LinkedIn Post Inspector, Facebook Sharing Debugger).

## Honesty and legal

- No invented numbers, logos or quotes; label samples as samples.
- Tracking and cookies need disclosure and, for EU/UK visitors, consent.
- A newsletter signup says what people will get and how often, and how to unsubscribe.
