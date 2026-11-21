// Site behavior, driven by markup: page-load fade, scroll reveals, header hairline, disclosures, signup.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Page-load fade
  addEventListener("load", () => requestAnimationFrame(() => document.body.classList.remove("is-loading")));

  // Scroll reveals (play once at ~25% visible). data-delay in ms.
  const els = document.querySelectorAll("[data-reveal]");
  els.forEach((el) => { if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms"; });
  if (reduce || !("IntersectionObserver" in window)) els.forEach((el) => el.classList.add("is-visible"));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
      setTimeout(() => (e.target.style.transitionDelay = ""), 1200);
    }), { threshold: 0.25 });
    els.forEach((el) => io.observe(el));
  }

  // Hairline under the sticky header once the page scrolls
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  // Scroll-synced nav: underline the link of the section being read.
  // A section counts as current once its top passes 40% down the viewport; at the page bottom, the last one wins.
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll("main section[id]")];
  if (links.length && sections.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = innerHeight * 0.4;
      let current = null;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections[sections.length - 1];
      const id = current && current.id;
      links.forEach((a) => {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }

  // Disclosures
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[aria-expanded][aria-controls]");
    const box = btn && document.getElementById(btn.getAttribute("aria-controls"));
    if (!box || !box.classList.contains("reveal-box")) return;
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", open);
    box.classList.toggle("open", open);
  });

  // Signup: keeps the label, spinner only if slow, long enough not to flicker.
  async function withLoading(btn, task, showAfter = 200, minVisible = 400) {
    btn.disabled = true; btn.setAttribute("aria-busy", "true");
    let shownAt = 0;
    const timer = setTimeout(() => { btn.classList.add("is-loading"); shownAt = performance.now(); }, showAfter);
    try { return await task(); }
    finally {
      clearTimeout(timer);
      if (shownAt) await new Promise((r) => setTimeout(r, Math.max(0, minVisible - (performance.now() - shownAt))));
      btn.classList.remove("is-loading"); btn.disabled = false; btn.removeAttribute("aria-busy");
    }
  }

  document.querySelectorAll("form.signup").forEach((form) => {
    const input = form.querySelector("input[type=email]");
    const msg = form.querySelector(".msg");
    const btn = form.querySelector("button[type=submit]");
    input.addEventListener("input", () => { input.removeAttribute("aria-invalid"); msg.textContent = ""; });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = form.dataset.endpoint;   // set data-endpoint to the real signup URL
      try {
        await withLoading(btn, async () => {
          if (!endpoint) { await new Promise((r) => setTimeout(r, 700)); return; }   // demo mode: no backend yet
          const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(String(res.status));
        });
        const done = document.createElement("div");
        done.className = "signup-done"; done.setAttribute("role", "status"); done.tabIndex = -1;
        done.innerHTML = `<p><span class="accent">✓</span> You’re on the list.</p>
          <p>Look for an invite at <strong></strong>, with this month’s reading attached.</p>`;
        done.querySelector("strong").textContent = input.value;
        form.replaceWith(done); done.focus();
      } catch {
        input.setAttribute("aria-invalid", "true");
        msg.textContent = "Error: that didn’t go through. Check your connection and try again.";
        input.focus();
      }
    });
  });
})();
