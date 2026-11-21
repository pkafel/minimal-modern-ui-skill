// Page-load fade and scroll reveals, driven by data attributes.
addEventListener("load", () => requestAnimationFrame(() => document.body.classList.remove("is-loading")));

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prep = (el, d, speed, delay) => {
    el.style.setProperty("--reveal-from", `translateY(${d}px)`);
    el.style.transitionDuration = `${speed}ms`;
    el.style.transitionDelay = `${delay}ms`;
  };
  const els = document.querySelectorAll("[data-reveal]");
  els.forEach((el) => {
    const d = 6 + 4.2 * +(el.dataset.i || 1);
    const speed = +(el.dataset.speed || 900), delay = +(el.dataset.delay || 0);
    const stagger = el.dataset.stagger;
    if (stagger) [...el.children].slice(0, 8).forEach((c, i) => prep(c, d, speed, delay + i * +stagger));
    else prep(el, d, speed, delay);
  });
  if (reduce || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-visible");
    // Once revealed, drop the reveal timing so hover transitions on these elements respond immediately.
    const items = e.target.dataset.stagger ? [...e.target.children] : [e.target];
    setTimeout(() => items.forEach((el) => { el.style.transitionDuration = ""; el.style.transitionDelay = ""; }), 2000);
    io.unobserve(e.target);
  }), { threshold: 0.25 });
  els.forEach((el) => io.observe(el));
})();

// Starfield behind the hero: twinkling stars and a rare shooting star.
// Static under reduced motion; pausable; stops drawing when the hero is off screen.
(() => {
  const cv = document.querySelector(".sky-canvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toggle = document.querySelector(".sky-toggle");
  let stars = [], W = 0, H = 0, shooting = null, paused = reduce, onScreen = true, raf = 0;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round(W * H / 2400) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() ** 3 * 1.5 + .25,
      p: Math.random() * 6.28, s: .4 + Math.random() * 1.2,
      c: ["255,255,255", "214,226,255", "255,232,204"][Math.random() * 3 | 0],
    }));
  };
  const draw = (t = 0) => {
    ctx.clearRect(0, 0, W, H);
    const band = ctx.createLinearGradient(0, H, W, 0);
    band.addColorStop(.3, "rgba(110,95,170,0)"); band.addColorStop(.5, "rgba(130,110,180,.09)"); band.addColorStop(.7, "rgba(110,95,170,0)");
    ctx.fillStyle = band; ctx.fillRect(0, 0, W, H);
    const sec = t / 1000;
    for (const s of stars) {
      const a = paused ? .75 : .45 + .55 * Math.abs(Math.sin(sec * s.s + s.p));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.29); ctx.fillStyle = `rgba(${s.c},${a})`; ctx.fill();
    }
    if (paused) return;
    if (!shooting && Math.random() < .003) shooting = { x: Math.random() * W * .6, y: Math.random() * H * .35, l: 0 };
    if (shooting) {
      const L = ++shooting.l, x = shooting.x + L * 9, y = shooting.y + L * 4;
      const g = ctx.createLinearGradient(x - 120, y - 53, x, y);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, `rgba(255,240,220,${1 - L / 50})`);
      ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x - 120, y - 53); ctx.lineTo(x, y); ctx.stroke();
      if (L > 50) shooting = null;
    }
  };
  const loop = (t) => { draw(t); raf = !paused && onScreen ? requestAnimationFrame(loop) : 0; };
  const start = () => { if (!raf && !paused && onScreen) raf = requestAnimationFrame(loop); };

  resize(); draw();
  addEventListener("resize", () => { resize(); draw(); });
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; start(); }).observe(cv);

  if (toggle && !reduce) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.setAttribute("aria-checked", !paused);
      if (paused) { cancelAnimationFrame(raf); raf = 0; draw(); } else start();
    });
  }
  start();
})();

// Highlight the nav item for the section being read.
(() => {
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  // The hero (#top) is observed too, so scrolling back up clears the highlight.
  const targets = [document.getElementById("top"), ...links.map((a) => document.querySelector(a.getAttribute("href")))].filter(Boolean);
  if (!targets.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id));
    links.forEach((a) => a.hasAttribute("aria-current") && a.setAttribute("aria-current", "location"));
  }), { rootMargin: "-45% 0px -50% 0px" });
  targets.forEach((t) => io.observe(t));
})();
