document.documentElement.classList.add('js');
const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu');
const links=[...document.querySelectorAll('.nav nav a')];
let last=0;
addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('compact',y>40);nav.classList.toggle('hide',y>last&&y>260);last=y},{passive:true});
menu?.addEventListener('click',()=>document.body.classList.toggle('nav-open'));
links.forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('nav-open')));

const reveal=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}})
},{threshold:.14});
document.querySelectorAll('.main-game,.project-card,.studio-head,.studio-body,.news-list article,.contact h2').forEach(el=>{
 el.classList.add('reveal');reveal.observe(el);
});

const visual=document.querySelector('.hero-visual');
visual?.addEventListener('pointermove',e=>{
 const r=visual.getBoundingClientRect();
 const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
 visual.style.setProperty('--mx',px.toFixed(3));visual.style.setProperty('--my',py.toFixed(3));
});
visual?.addEventListener('pointerleave',()=>{visual.style.setProperty('--mx',0);visual.style.setProperty('--my',0)});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
}));
