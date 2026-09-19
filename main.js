/* ==================================================
   ENIGMA STUDIO — MAIN JAVASCRIPT
   ==================================================

   CONTENT MAP
   --------------------------------------------------
   01. Cursor
   02. Cursor interactions
   03. Magnetic links
   04. Scroll reveals
   05. Project cursor labels
   06. Smooth navigation
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     01 — CUSTOM CURSOR
     ================================================== */

  const cursor = document.querySelector(".cursor");

  // -----------------------------------------------
  // The cursor follows the mouse with interpolation.
  // This makes the movement feel less robotic.
  // -----------------------------------------------

  if (cursor && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    const animateCursor = () => {

      // -------------------------------------------
      // Change this number to make the cursor:
      // 0.05 = very smooth
      // 0.15 = fast
      // -------------------------------------------

      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      cursor.style.left = currentX + "px";
      cursor.style.top = currentY + "px";

      requestAnimationFrame(animateCursor);
    };

    animateCursor();
  }


  /* ==================================================
     02 — CURSOR INTERACTIONS
     ================================================== */

  const interactiveElements = document.querySelectorAll(
    "a, [data-cursor]"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor?.classList.add("is-active");
    });

    element.addEventListener("mouseleave", () => {
      cursor?.classList.remove("is-active");
    });

  });


  /* ==================================================
     03 — MAGNETIC LINKS
     ================================================== */

  const magneticElements = document.querySelectorAll(".magnetic");

  magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

      // -------------------------------------------
      // Magnetic strength.
      // Increase this value for stronger movement.
      // -------------------------------------------

      const strength = 0.22;

      const rect = element.getBoundingClientRect();

      const x =
        (event.clientX - rect.left - rect.width / 2) * strength;

      const y =
        (event.clientY - rect.top - rect.height / 2) * strength;

      element.style.transform =
        "translate(" + x + "px, " + y + "px)";
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });

  });


  /* ==================================================
     04 — SCROLL REVEALS
     ================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* ==================================================
     05 — PROJECT CURSOR LABELS
     ================================================== */

  const projects = document.querySelectorAll("[data-cursor]");
  const cursorLabel = document.querySelector(".cursor-label");

  projects.forEach((project) => {

    project.addEventListener("mouseenter", () => {

      const label = project.dataset.cursor;

      if (cursorLabel && label) {
        cursorLabel.textContent = label;
      }

    });

    project.addEventListener("mouseleave", () => {

      if (cursorLabel) {
        cursorLabel.textContent = "VIEW";
      }

    });

  });


  /* ==================================================
     06 — SMOOTH NAVIGATION
     ================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});
