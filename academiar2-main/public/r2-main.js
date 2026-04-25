window.addEventListener('scroll',()=>{
  document.getElementById('nb').style.boxShadow=
    window.scrollY>40?'0 4px 30px rgba(0,0,0,.6)':'none';
});
const io=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('vis'),i*80);
  });
},{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// ═══ INTRO SPLASH ═══
(function(){
  var splash=document.getElementById("splash");
  var bar=document.getElementById("spBar");
  var bg=document.getElementById("spBg");
  var ids=["sl0","sl1","sl2","sl3"];
  var fin=document.getElementById("slFinal");
  var bgs=["rgba(247,97,30,.07)","rgba(160,50,8,.1)","rgba(20,90,55,.07)","rgba(200,65,25,.09)","rgba(0,0,0,0)"];
  var cur=0,total=ids.length+1,DUR=1700,t0=null,raf=null,alive=true;
  function show(i){
    ids.forEach(function(id){var e=document.getElementById(id);e.classList.remove("active","in","out");e.style.opacity=0;});
    fin.classList.remove("active","in");fin.style.opacity=0;
    bg.style.background=bgs[Math.min(i,bgs.length-1)];
    if(i<ids.length){
      var e=document.getElementById(ids[i]);e.style.opacity=1;e.classList.add("active");
      requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add("in");});});
    }else{
      fin.style.opacity=1;fin.classList.add("active");
      requestAnimationFrame(function(){requestAnimationFrame(function(){fin.classList.add("in");});});
    }
  }
  function out(i){if(i<ids.length){var e=document.getElementById(ids[i]);e.classList.remove("in");e.classList.add("out");}}
  function tick(ts){
    if(!alive)return;if(!t0)t0=ts;
    var el=ts-t0,idx=Math.floor(el/DUR);
    bar.style.width=Math.min(el/(DUR*total)*100,100)+"%";
    if(idx!==cur){out(cur);cur=idx;if(cur<total)show(cur);}
    if(el>=DUR*total){end();return;}
    raf=requestAnimationFrame(tick);
  }
  function end(){
    alive=false;if(raf)cancelAnimationFrame(raf);
    splash.classList.add("done");
    setTimeout(function(){splash.style.display="none";document.body.style.overflow="";},720);
  }
  document.body.style.overflow="hidden";
  show(0);raf=requestAnimationFrame(tick);
  splash.addEventListener("click",end);
  var sk=document.querySelector(".sp-skip");
  if(sk)sk.addEventListener("click",function(e){e.stopPropagation();end();});
})();


// Animate schedule table on scroll
(function(){
  var tbl = document.getElementById('schedTable');
  if(!tbl) return;
  var obs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){ tbl.classList.add('revealed'); obs.disconnect(); }
  }, {threshold:0.15});
  obs.observe(tbl);
})();
