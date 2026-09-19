const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const glow=document.querySelector(".cursor-glow");
if(!reduce){window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".section-head,.project-card,.project-next,.studio-intro,.principle,.team-card,.recruit,.contact-content").forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=Math.min(i*.055,.35)+"s";observer.observe(el)});
const core=document.querySelector(".core");
const object=document.querySelector(".hero-object");
window.addEventListener("pointermove",e=>{if(innerWidth<900)return;const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*10;object.style.transform="translate("+x*.35+"px,"+y*.35+"px)";core.style.transform="translate("+x+"px,"+y+"px) rotate(-1deg)"},{passive:true});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{document.querySelector(a.getAttribute("href"))?.focus({preventScroll:true})}));
