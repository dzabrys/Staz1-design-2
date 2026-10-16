/* Offline behavior checks for navigation, carousel intent and native zoom fallback. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../runtime.js'),'utf8');
class Node {
 constructor(){this.events={};this.attrs={};this.dataset={};this.textContent='';this.innerHTML='';this.classes=new Set();this.classList={contains:n=>this.classes.has(n),toggle:(n,on)=>on?this.classes.add(n):this.classes.delete(n)};}
 addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
 fire(type,event={}){for(const fn of this.events[type]||[])fn(event);}
 setAttribute(name,value){this.attrs[name]=value;}
 getAttribute(name){return this.attrs[name]??null;}
 focus(){this.focused=true;}
 contains(node){return node===this;}
}
const harness=({nativeDialog=false}={})=>{
 const document=new Node(),menu=new Node(),nav=new Node(),carousel=new Node(),prev=new Node(),next=new Node(),copy=new Node(),paragraph=new Node(),label=new Node(),cta=new Node(),status=new Node(),zoom=new Node(),dialog=new Node();
 menu.attrs['aria-expanded']='false';
 const dots=[0,1,2].map(i=>{const dot=new Node();dot.dataset.slide=String(i);return dot});
 const nodes={'.menu-toggle':menu,'#navigation':nav,'.hero-carousel':carousel,'.carousel-prev':prev,'.carousel-next':next,'.hero-slide-copy':copy,'.hero-slide-copy p':paragraph,'.hero-slide-copy .button-label':label,'.hero-slide-copy .button':cta,'#carousel-status':status};
 if(nativeDialog){nodes['.product-image-open']=zoom;nodes['#product-image-dialog']=dialog;}
 document.querySelector=s=>nodes[s]||null;
 document.querySelectorAll=s=>s==='[data-slide]'?dots:[];
 carousel.querySelector=s=>dots[Number(s.match(/[0-2]/)[0])];
 const media={};
 const matchMedia=query=>media[query]??=(Object.assign(new Node(),{matches:false,addListener(fn){this.events.change=[fn]}}));
 vm.runInNewContext(source,{document,matchMedia,URLSearchParams,location:{search:''},getComputedStyle:()=>({opacity:'1'})});
 const keyboard=(key,control=true)=>{let prevented=false;carousel.fire('keydown',{key,target:{closest:()=>control?dots[0]:null},preventDefault(){prevented=true}});return prevented};
 const touch=(x,y,extra={})=>({pointerType:'touch',isPrimary:true,pointerId:1,clientX:x,clientY:y,target:{closest:()=>null},...extra});
 return {document,menu,nav,carousel,prev,next,paragraph,label,cta,status,dots,keyboard,touch,zoom,dialog,media};
};
const app=harness();
app.menu.fire('click');assert.equal(app.menu.attrs['aria-expanded'],'true');assert(app.nav.classes.has('open'));
app.document.fire('keydown',{key:'Escape'});assert.equal(app.menu.attrs['aria-expanded'],'false');assert(app.menu.focused);
app.menu.fire('click');app.document.fire('click',{target:{closest:()=>null}});assert(!app.nav.classes.has('open'));
app.menu.fire('click');app.media['(min-width:1201px)'].fire('change',{matches:true});assert(!app.nav.classes.has('open'));
app.next.fire('click');assert.equal(app.cta.href,'firmy.html');assert.equal(app.dots[1].attrs['aria-pressed'],'true');
assert(app.keyboard('ArrowRight'));assert.equal(app.cta.href,'gry-na-zamowienie.html');assert(app.dots[2].focused);
assert(!app.keyboard('ArrowLeft',false));assert.equal(app.cta.href,'gry-na-zamowienie.html','Arrow keys outside controls retain their native behavior');
app.keyboard('Home');assert.equal(app.cta.href,'szkoly.html');
app.carousel.fire('pointerdown',app.touch(200,100));app.carousel.fire('pointerup',app.touch(100,110));assert.equal(app.cta.href,'firmy.html');
app.carousel.fire('pointerdown',app.touch(200,100));app.carousel.fire('pointerup',app.touch(210,240));assert.equal(app.cta.href,'firmy.html','Vertical scrolling must not change slides');
app.carousel.fire('pointerdown',app.touch(200,100));app.carousel.fire('pointerup',app.touch(160,100));assert.equal(app.cta.href,'firmy.html','A short tap or drag must not change slides');
app.carousel.fire('pointerdown',app.touch(200,100));app.carousel.fire('pointercancel');app.carousel.fire('pointerup',app.touch(100,100));assert.equal(app.cta.href,'firmy.html');
app.carousel.fire('pointerdown',app.touch(200,100,{target:{closest:()=>app.cta}}));app.carousel.fire('pointerup',app.touch(100,100));assert.equal(app.cta.href,'firmy.html','Using a link must not start a swipe');
const fallback=harness({nativeDialog:true});assert.equal(fallback.zoom.events.click,undefined,'Without showModal the image link retains its native action');
console.log('PASS: menu, Escape, outside click, desktop resize, carousel keys, touch intent, vertical scroll, cancel and native image fallback. Offline only.');
