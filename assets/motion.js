(()=>{
 const root=document.getElementById('body-plexsans');
 if(!root)return;
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches||!('IntersectionObserver' in window))return;
 const nodes=[...root.querySelectorAll('.project-list > article, .case > section, .case > figure, .case > .food-gallery, .case > .luu-pair, .case > .award')];
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){requestAnimationFrame(()=>requestAnimationFrame(()=>entry.target.classList.remove('is-pending')));observer.unobserve(entry.target);}});
 },{threshold:0,rootMargin:'0px 0px -48px 0px'});
 nodes.forEach(node=>{
  node.classList.add('scroll-reveal','is-pending');
  // Commit the hidden state before observing, including elements initially visible.
  void node.offsetWidth;
  observer.observe(node);
 });
 // Keyboard navigation must never focus an invisible link.
 root.addEventListener('focusin',event=>{const node=event.target.closest('.is-pending');if(node){node.classList.remove('is-pending');observer.unobserve(node);}});
 const showAll=()=>{if(preference.matches){nodes.forEach(node=>node.classList.remove('is-pending'));observer.disconnect();}};
 if(preference.addEventListener)preference.addEventListener('change',showAll);
})();
