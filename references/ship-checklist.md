# Ship checklist

Things that make a finished page findable, shareable and measurable. Do the parts that don't need
decisions first, then ask the user for the rest.

## Ask the user first (these change what you build)

- **Final domain** (with or without `www`): canonical, social preview and sitemap need absolute URLs.
- **Analytics?** Which tool, and who sets up the dashboard. Visitors in the EU/UK need consent before
  tracking cookies: ask whether to add a consent banner.
- **Hosting.** Static files only, or does the page need a server (an API proxy, secrets)? See "Hosting".
- **Author or brand links** for the footer, and the exact name to show.

## Head metadata (template)

```html
<title>Brand: what it does for whom (≤ 60 characters)</title>
<meta name="description" content="One or two sentences, ≤ 160 characters, in the visitor's words.">
<meta name="theme-color" content="#1b2260">
<link rel="canonical" href="https://www.example.com/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.example.com/">
<meta property="og:site_name" content="Brand">
<meta property="og:title" content="…same as title…">
<meta property="og:description" content="…same as description…">
<meta property="og:image" content="https://www.example.com/og.png">   <!-- absolute URL, PNG or JPG -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="What the image shows">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="…"><meta name="twitter:description" content="…"><meta name="twitter:image" content="https://www.example.com/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```
Also: `<html lang="…">`, one `<h1>`, landmarks (`<header>`, `<main>`, `<footer>`), descriptive link text,
`alt` on meaningful images. Don't add a keywords meta (ignored) or FAQ markup unless the Q&A is visible. In a framework, emit
all of this through its metadata API (SKILL.md §10).

## Structured data

```html
<script type="application/ld+json">{
  "@context": "https://schema.org", "@type": "WebApplication",
  "name": "Brand", "url": "https://www.example.com/", "description": "…",
  "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any (web browser)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}</script>
```
Pick the type and category that fit (`WebSite`, `Organization`, `Article`, `Product`, `SoftwareApplication`).

## Files in the web root

- `favicon.svg`: simple mark on a rounded square in the brand colors.
- `robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://www.example.com/sitemap.xml`
- `sitemap.xml`: one `<url><loc>…</loc><lastmod>YYYY-MM-DD</lastmod></url>` per page; update `lastmod` when
  content changes.
- `og.png`: 1200×630. Build it as an SVG (brand, tagline, a motif from the page) and render it:
  `rsvg-convert -w 1200 -h 630 og.svg -o og.png` (macOS `brew install librsvg`, Debian/Ubuntu `apt install librsvg2-bin`), or screenshot an HTML card at
  1200×630 with a headless browser. Keep text clear of the
  motif, and check the PNG visually. System fonts will stand in for web fonts.

## Analytics

Cookieless, privacy-friendly tools (Plausible, Fathom, Umami, Cloudflare Web Analytics) are a one-line script
and often need no consent banner; check the rules where the visitors are. Google Analytics through Tag Manager
is the common heavier option, shown below.

### Google Tag Manager example

Use the vendor's standard snippet rather than a hand-edited stub, and keep local and preview visits out of
the numbers by gating on the production hostname:

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
<!-- right after <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```
- A snippet that loads `gtm.js` without the `gtm.start` push (a gtag-style stub) may never fire "All Pages" tags.
- Traffic only appears if the container has a GA4 tag firing on All Pages, and the container is **published**.
- Custom events are one line: `dataLayer.push({ event: "name" })`, plus a Custom Event trigger and a GA4 event tag
  in the container. Count actions, never send personal or financial input. Skip it if the user doesn't want
  the dashboard work.
- Consent: until a banner exists, say so plainly.

## Hosting

- **Static page** (no server logic): any static host. Put files in the web root.
- **Page that calls an API or hides a secret**: needs server code. On Vercel: static files in `public/`,
  functions in `api/*.js` (Node, `module.exports = (req, res) => …`), shared code in a folder that is *not*
  `api/`, and a `vercel.json` such as
  `{ "framework": null, "outputDirectory": "public", "functions": { "api/*.js": { "includeFiles": "data/**" } } }`.
    Data files read with `fs` need `includeFiles`. Netlify (`netlify/functions/`) and Cloudflare Pages
  (`functions/`) follow the same shape, static folder plus functions folder; check each host's docs for
  bundling data files.
- **Cache third-party API responses** at the CDN (`Cache-Control: public, s-maxage=300, stale-while-revalidate=600`)
  and make the request URL cacheable (round timestamps to whole days). Cloud IPs of unofficial APIs get
  rate-limited; add a fallback host and a clear error message.
- Redirect the bare domain to the canonical host in the host's domain settings.
- Search Console (verify the domain, submit the sitemap) and a social-preview debugger (LinkedIn Post
  Inspector, Facebook Sharing Debugger) are the user's steps after the first deploy.

## Honesty and legal

- State what the numbers are (estimates, examples) and what is excluded. Add "not financial/medical/legal
  advice" where relevant.
- Say where the data comes from. Make assumptions that change the answer visible near the input.
- Tracking and cookies need disclosure and, for EU/UK visitors, consent.
