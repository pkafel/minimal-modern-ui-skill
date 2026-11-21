// Card reveals: play once at ~20% visible, staggered by column. Without JS or with reduced motion, cards just show.
(() => {
  const cards = [...document.querySelectorAll(".card")];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    return cards.forEach((c) => c.classList.add("is-visible"));
  }
  cards.forEach((c, i) => c.style.setProperty("--delay", `${(i % 2) * 120}ms`));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-visible");
    io.unobserve(e.target);
    setTimeout(() => e.target.style.removeProperty("--delay"), 1200);   // keep later hovers instant
  }), { threshold: 0.2 });
  cards.forEach((c) => io.observe(c));
})();
