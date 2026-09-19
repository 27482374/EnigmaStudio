/* =========================================================
   ENIGMA STUDIO — JAVASCRIPT
   Animations légères : chargement + apparition au scroll
========================================================= */

const loader = document.querySelector("#loader");

window.addEventListener("load", () => {
  setTimeout(() => loader?.classList.add("done"), 450);
});

/* ---------------------------------------------------------
   Apparition progressive des sections
--------------------------------------------------------- */

const revealItems = document.querySelectorAll(
  ".intro > div, .project-main, .project-card, .studio-copy, .member, .recruit-copy, .contact h2"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("revealed");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

/* ---------------------------------------------------------
   Petit effet de parallaxe sur l'illustration tropicale
--------------------------------------------------------- */

const heroArt = document.querySelector(".hero-art");

window.addEventListener("mousemove", (event) => {
  if (!heroArt || window.innerWidth < 850) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  heroArt.style.transform = `translate(${x * 7}px, ${y * 5}px)`;
});

/* ---------------------------------------------------------
   CSS d'apparition injecté ici pour garder le fichier simple
--------------------------------------------------------- */

const style = document.createElement("style");
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1);
  }

  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
