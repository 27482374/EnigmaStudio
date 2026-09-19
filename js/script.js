const cursor=document.querySelector('.cursor');
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function cursorLoop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;if(cursor)cursor.style.transform=`translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a,button,.file').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('big'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('big'))});

const files=[...document.querySelectorAll('.file')];
files.forEach((card,i)=>{
 let down=false,ox=0,oy=0,baseX=0,baseY=0;
 card.addEventListener('pointerdown',e=>{
   if(e.target.closest('button'))return;
   down=true;card.classList.add('dragging');card.setPointerCapture(e.pointerId);
   const r=card.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;baseX=r.left;baseY=r.top;
 });
 card.addEventListener('pointermove',e=>{
   if(!down)return;
   card.style.left=(e.clientX-ox-card.parentElement.getBoundingClientRect().left)+'px';
   card.style.top=(e.clientY-oy-card.parentElement.getBoundingClientRect().top)+'px';
   card.style.transform='rotate(0deg)';
 });
 card.addEventListener('pointerup',()=>{down=false;card.classList.remove('dragging')});
});
document.querySelectorAll('.file button').forEach(btn=>btn.addEventListener('click',()=>{
 const card=btn.closest('.file');card.classList.toggle('opened');
 btn.textContent=card.classList.contains('opened')?'DOSSIER OUVERT ✓':'OUVRIR LE DOSSIER ↗';
}));
const clock=document.getElementById('clock');
function tick(){const d=new Date();clock.textContent=d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}tick();setInterval(tick,1000);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in') }),{threshold:.12});
document.querySelectorAll('.hero h1,.file,.statement,.manifest h2,.contact-main h2').forEach(x=>observer.observe(x));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
