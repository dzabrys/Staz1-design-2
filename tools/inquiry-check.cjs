/* Offline interaction checks: no HTTP requests, messages or user data are sent. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const script=fs.readFileSync(path.resolve(__dirname,'../inquiry.js'),'utf8');
const names=['name','email','telefon','organizacja','gra','rodzaj_zapytania','message','subject','grupa','miejsce','termin','cel','_gotcha'];
const make=({query='',valid=true,respond=async()=>({ok:true,json:async()=>({ok:true})})}={})=>{
 const fields=Object.fromEntries(names.map(n=>[n,{value:'',addEventListener(){}}]));fields.rodzaj_zapytania.value='Pomoc w wyborze gry';fields.subject.value='Zapytanie o gry';
 const status={dataset:{},textContent:'',focus(){this.focused=true}},button={disabled:false,innerHTML:'Wyślij zapytanie',textContent:''};
 const note={hidden:true,querySelector(){return this.strong},strong:{textContent:''}},emailLink={href:''};
 let submit,count=0,payload;
 const form={fields,action:'https://formspree.io/f/myekbjrg',elements:{namedItem:n=>fields[n]},querySelector:s=>s.includes('status')?status:button,reportValidity:()=>valid,addEventListener:(name,fn)=>{if(name==='submit')submit=fn},setAttribute(){},removeAttribute(){},reset(){for(const field of Object.values(fields))field.value='';fields.rodzaj_zapytania.value='Pomoc w wyborze gry'}};
 fields.gra.addEventListener=()=>{};
 class Data{constructor(source){this.data=new Map(source?Object.entries(source.fields).map(([k,v])=>[k,v.value]):[])}get(k){return this.data.get(k)}set(k,v){this.data.set(k,v)}}
 const document={querySelector:s=>s.includes('inquiry-form')?form:s.includes('selected-inquiry')?note:null,querySelectorAll:()=>[emailLink]};
 vm.runInNewContext(script,{document,location:{search:query},URLSearchParams,FormData:Data,AbortController,setTimeout:()=>1,clearTimeout(){},fetch:async(url,options)=>{count++;assert.equal(url,form.action);payload=options.body;return respond()}});
 const fill=()=>{fields.name.value='Test lokalny';fields.email.value='test@example.invalid';fields.message.value='Sprawdzenie zachowania formularza bez sieci.'};
 return {fields,status,button,note,emailLink,fill,submit:()=>submit({preventDefault(){}}),count:()=>count,payload:()=>payload};
};
(async()=>{
 const context=make({query:'?temat=Obieg%20zamkni%C4%99ty%20wody'});assert.equal(context.fields.gra.value,'Obieg zamknięty wody');assert.equal(context.fields.rodzaj_zapytania.value,'Wycena gotowej gry');assert(context.emailLink.href.includes('Obieg%20zamkni%C4%99ty%20wody'));context.fill();await context.submit();assert.equal(context.fields.gra.value,'Obieg zamknięty wody');assert.equal(context.fields.rodzaj_zapytania.value,'Wycena gotowej gry');
 const cleared=make({query:'?temat=Obieg%20zamkni%C4%99ty%20wody'});cleared.fill();cleared.fields.gra.value='';await cleared.submit();assert(!cleared.payload().get('subject').includes('Obieg'));assert.equal(cleared.fields.gra.value,'');
 const invalid=make({valid:false});await invalid.submit();assert.equal(invalid.count(),0);
 const good=make();good.fill();await good.submit();assert.equal(good.count(),1);assert.equal(good.payload().get('email'),'test@example.invalid');assert(good.payload().get('message').includes('Sprawdzenie zachowania'));assert.equal(good.status.dataset.state,'success');assert.equal(good.button.disabled,false);assert(good.status.focused);
 const malformed=make({respond:async()=>({ok:true,json:async()=>{throw new Error('HTML response')}})});malformed.fill();await malformed.submit();assert.equal(malformed.status.dataset.state,'error');assert(malformed.fields.message.value.length>0);
 for(const respond of [async()=>{throw new TypeError('offline')},async()=>{const e=new Error('timeout');e.name='AbortError';throw e},async()=>({ok:true,json:async()=>({errors:[{message:'Rejected'}]})})]){const retry=make({respond});retry.fill();await retry.submit();assert.equal(retry.status.dataset.state,'error');assert(retry.fields.message.value.length>0);assert.equal(retry.button.disabled,false)}
 const optional=make();optional.fill();optional.fields.organizacja.value='Szkoła lokalna';optional.fields.grupa.value='Klasa 4';await optional.submit();assert(optional.payload().get('message').includes('Organizacja: Szkoła lokalna'));assert(optional.payload().get('message').includes('Uczestnicy: Klasa 4'));
 const failed=make({respond:async()=>({ok:false,json:async()=>({ok:false})})});failed.fill();await failed.submit();assert.equal(failed.status.dataset.state,'error');assert.equal(failed.fields.message.value,'Sprawdzenie zachowania formularza bez sieci.');assert.equal(failed.button.disabled,false);
 let finish;const pending=make({respond:()=>new Promise(resolve=>{finish=resolve})});pending.fill();const first=pending.submit();await pending.submit();assert.equal(pending.count(),1);assert.equal(pending.button.disabled,true);finish({ok:true,json:async()=>({ok:true})});await first;assert.equal(pending.button.disabled,false);
 const custom=make({query:'?rodzaj=custom'});assert.equal(custom.fields.rodzaj_zapytania.value,'Gra na zamówienie');assert(custom.emailLink.href.includes('na%20zam%C3%B3wienie'));custom.fill();custom.fields.gra.value='Nowy temat';await custom.submit();assert.equal(custom.fields.gra.value,'Nowy temat');assert.equal(custom.fields.rodzaj_zapytania.value,'Gra na zamówienie');
 const helper=make({query:'?rodzaj=dobor&temat=Gry%20dla%20szk%C3%B3%C5%82'});assert.equal(helper.fields.rodzaj_zapytania.value,'Pomoc w wyborze gry');
 console.log('PASS: context, direct-email subject, native-invalid guard, success, retained error content, duplicate-submit guard, malformed responses, optional context and preserved inquiry kind. Offline only.');
})().catch(error=>{console.error(error);process.exitCode=1});
