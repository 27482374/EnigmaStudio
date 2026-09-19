const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 35);
}, { passive: true });

toggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature, .project, .studio-content, .journal-list article, .contact h2')
  .forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = Math.min(index * 70, 280) + 'ms';
    revealObserver.observe(element);
  });

const heroArt = document.querySelector('.hero-art');
heroArt?.addEventListener('pointermove', event => {
  const box = heroArt.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  heroArt.querySelector('.art-window').style.transform = `rotate(-5deg) translate(${x * 10}px,${y * 10}px)`;
  heroArt.querySelector('.orbit-one').style.transform = `translate(${x * 14}px,${y * 14}px)`;
  heroArt.querySelector('.orbit-two').style.transform = `rotate(58deg) scaleX(.45) translate(${x * -18}px,${y * -18}px)`;
  heroArt.querySelector('.art-core').style.transform = `translate(calc(-50% + ${x * 18}px),calc(-50% + ${y * 18}px))`;
});

heroArt?.addEventListener('pointerleave', () => {
  heroArt.querySelector('.art-window').style.transform = 'rotate(-5deg)';
  heroArt.querySelector('.orbit-one').style.transform = '';
  heroArt.querySelector('.orbit-two').style.transform = 'rotate(58deg) scaleX(.45)';
  heroArt.querySelector('.art-core').style.transform = 'translate(-50%,-50%)';
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
