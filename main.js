/* =========================================================
   ENIGMA STUDIO — INTERACTIONS
   Rien de lourd : juste assez de mouvement pour donner vie
   au site sans transformer la page en démonstration technique.
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   Apparition douce des sections au scroll
   --------------------------------------------------------- */
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".manifesto-title, .manifesto-copy, .project-feature, .project-strip, .studio-card, .team-lead, .join-team, .contact > *"
  );

  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
}

/* ---------------------------------------------------------
   Petit mouvement du visuel principal
   --------------------------------------------------------- */
if (!reduceMotion) {
  const art = document.querySelector(".hero-art");

  window.addEventListener("pointermove", (event) => {
    if (!art || window.innerWidth < 900) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 7;
    const y = (event.clientY / window.innerHeight - 0.5) * 7;

    art.style.transform = `rotate(2deg) translate(${x}px, ${y}px)`;
  }, { passive: true });
}

/* ---------------------------------------------------------
   Liens d'ancrage : ferme automatiquement le focus visuel
   --------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});