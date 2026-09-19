const cursor=document.createElement('div');cursor.className='site-cursor';document.body.appendChild(cursor);
let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY});
(function loop(){cx+=(x-cx)*.15;cy+=(y-cy)*.15;cursor.style.transform=`translate3d(${cx}px,${cy}px,0)`;requestAnimationFrame(loop)})();
const style=document.createElement('style');style.textContent='.site-cursor{position:fixed;left:0;top:0;width:12px;height:12px;border:1px solid #e45139;border-radius:50%;pointer-events:none;z-index:100;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}.site-cursor:after{content:"";position:absolute;inset:4px;background:#e45139;border-radius:50%}a:hover~.site-cursor{width:35px;height:35px}';document.head.appendChild(style);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.feature,.cards article,.studio-image,.studio-copy,.news article,.contact h2').forEach(e=>{e.classList.add('reveal');io.observe(e)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
