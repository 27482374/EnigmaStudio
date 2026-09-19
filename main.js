/* ENIGMA STUDIO — MAIN.JS
   Interactions légères uniquement.
   Objectif : garder le site rapide, lisible et sans dépendance lourde.
*/
"use strict";

/* Reveal : les éléments sont observés une seule fois puis retirés. */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    target.classList.add("visible");
    observer.unobserve(target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = Math.min(index * 35, 280) + "ms";
  revealObserver.observe(element);
});

/* Petit mouvement de profondeur sur l'image principale.
   requestAnimationFrame évite de modifier le DOM à chaque événement souris. */
const heroCard = document.querySelector(".hero-glass");
let pointerX = 0, pointerY = 0, raf = 0;

window.addEventListener("pointermove", ({ clientX, clientY }) => {
  if (!heroCard || window.innerWidth < 850) return;
  pointerX = (clientX / window.innerWidth - 0.5) * 7;
  pointerY = (clientY / window.innerHeight - 0.5) * 7;
  if (!raf) raf = requestAnimationFrame(() => {
    heroCard.style.transform = `translate3d(${pointerX}px,${pointerY}px,0)`;
    raf = 0;
  });
}, { passive: true });

/* Navigation clavier / ancres : pas de bibliothèque nécessaire. */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});