var $=function(i){return document.getElementById(i)};
var G={
shrink:'<svg viewBox="0 0 64 64"><rect x="24" y="5" width="16" height="9" rx="2"/><path d="M18 16h28v42H18zM18 28h28M18 46h28"/></svg>',
pouch:'<svg viewBox="0 0 64 64"><path d="M14 8h36l-4 48H18zM14 16h36"/></svg>',
film:'<svg viewBox="0 0 64 64"><ellipse cx="22" cy="32" rx="10" ry="20"/><path d="M22 12h30v40H22"/></svg>',
label:'<svg viewBox="0 0 64 64"><path d="M6 20h40l12 12-12 12H6z"/><circle cx="46" cy="32" r="3"/></svg>'};
var P=[
["shrink","Shrink sleeves","Flexible PVC printed shrink sleeve","Printed sleeves that follow the shape of bottles and containers.","Bottles, jars and curved containers."],
["shrink","Shrink sleeves","Rigid PVC printed shrink sleeve","A firmer sleeve, printed to your design.","Packs that need a stiffer, sharper finish."],
["shrink","Shrink sleeves","Plasticized PVC printed shrink sleeve","Soft, stretchy sleeves for curved packs.","Bottles with curves and tapered shapes."],
["shrink","Shrink film","PVC shrink film","Clear film that tightens around products when heated.","Boxes, multipacks and bundles."],
["pouch","Pouches","PET pillow packaging pouch","Pillow-style pouches for snacks and light products.","Snacks, sweets and small items."],
["pouch","Pouches","PET laminated stand-up pouch","Pouches that stand upright on the shelf.","Retail products that need shelf presence."],
["pouch","Food pouches","Food packaging stand-up pouch","Stand-up pouches made for food products.","Dry food, spices and grains."],
["pouch","Food pouches","Food packaging zipper pouch","Resealable pouches that keep contents fresh.","Products customers open more than once."],
["pouch","Pouches","Center seal pouch","A simple back-seam pouch for everyday packing.","Sachets and single-use packs."],
["film","Rolls and films","Plain laminated roll","Plain laminated roll for your own packing machines.","Filling and packing lines."],
["film","Rolls and films","Printed laminated film","Laminated film printed with your brand.","Branded packs on your own machines."],
["film","Rolls and films","2 layer and 3 layer laminated film","Layered film for extra strength and barrier.","Products that need extra protection."],
["film","Rolls and films","Food flexible packaging film","Flexible film suited to food packing.","Food packing lines."],
["label","Labels","Pearlized BOPP film","Pearlized film for bottle labels.","Bottle and container labels."]];
var R={drink:[0,2,3],food:[4,6,12],box:[3,1],label:[13,10]};
var Q={},L=$('list');
P.forEach(function(p,i){var d=document.createElement('div');d.className='item';d.dataset.c=p[0];
d.innerHTML='<div class="ic">'+G[p[0]]+'</div><small>'+p[1]+'</small><h3>'+p[2]+'</h3><p>'+p[3]+'</p><p class="more" hidden>Good for: '+p[4]+'</p><div class="row"><button type="button" class="lnk" data-d="1">Details</button><button type="button" class="add" data-a="'+i+'" aria-pressed="false">Add to enquiry</button></div>';
L.appendChild(d)});
document.querySelectorAll('.tabs button').forEach(function(b){b.addEventListener('click',function(){
document.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
document.querySelectorAll('.item').forEach(function(i){i.hidden=!(b.dataset.f==='all'||i.dataset.c===b.dataset.f)})})});
function tog(i){if(Q[i])delete Q[i];else Q[i]={q:'',u:'kg'};sync()}
function sync(){
document.querySelectorAll('.add').forEach(function(b){var on=!!Q[b.dataset.a];b.setAttribute('aria-pressed',on);b.textContent=on?'Added. Remove':'Add to enquiry'});
var k=Object.keys(Q),h='';
k.forEach(function(i){var q=Q[i];h+='<div class="qrow"><b>'+P[i][2]+'</b><input type="number" min="1" inputmode="numeric" placeholder="Quantity" value="'+q.q+'" data-q="'+i+'" aria-label="Quantity for '+P[i][2]+'"><select data-u="'+i+'" aria-label="Unit"><option'+(q.u==='kg'?' selected':'')+'>kg</option><option'+(q.u==='ton'?' selected':'')+'>ton</option><option'+(q.u==='rolls'?' selected':'')+'>rolls</option></select><button type="button" class="lnk" data-r="'+i+'">Remove</button></div>'});
$('qlist').innerHTML=k.length?h:'<p style="color:var(--muted);margin:0">Nothing here yet. Add products above, or use the finder.</p>';
$('cnt').textContent=k.length;$('pill').hidden=!k.length}
L.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;
if(t.dataset.d){var m=t.closest('.item').querySelector('.more');m.hidden=!m.hidden;t.textContent=m.hidden?'Details':'Hide details'}
else if(t.dataset.a!==undefined)tog(t.dataset.a)});
$('qlist').addEventListener('input',function(e){var i=e.target.dataset.q;if(i!==undefined)Q[i].q=e.target.value});
$('qlist').addEventListener('change',function(e){var i=e.target.dataset.u;if(i!==undefined)Q[i].u=e.target.value});
$('qlist').addEventListener('click',function(e){var r=e.target.dataset.r;if(r!==undefined)tog(r)});
function msg(){var s='Hello, I would like a quote for:\n';
Object.keys(Q).forEach(function(i){var q=Q[i];s+='- '+P[i][2]+': '+(q.q?q.q+' '+q.u:'quantity to confirm')+'\n'});
s+='\nName: '+$('nm').value+'\nCompany and city: '+$('co').value+'\nNotes: '+$('nt').value;return s}
function send(e,mk){if(!Object.keys(Q).length){e.preventDefault();$('qnote').textContent='Add at least one product first.';return}
$('qnote').textContent='';var a=e.currentTarget;
a.href=mk?'mailto:mk.kumar000@gmail.com?subject='+encodeURIComponent('Enquiry from website')+'&body='+encodeURIComponent(msg()):'https://wa.me/919871303107?text='+encodeURIComponent(msg())}
$('sendWa').addEventListener('click',function(e){send(e,0)});
$('sendMail').addEventListener('click',function(e){send(e,1)});
document.querySelectorAll('.opts button').forEach(function(b){b.addEventListener('click',function(){
document.querySelectorAll('.opts button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
var ids=R[b.dataset.k];$('rec').innerHTML='<p><b>Good places to start:</b></p><ul>'+ids.map(function(i){return'<li>'+P[i][2]+'</li>'}).join('')+'</ul><button type="button" class="btn" id="addAll">Add these to my enquiry</button>';
$('addAll').addEventListener('click',function(){ids.forEach(function(i){if(!Q[i])Q[i]={q:'',u:'kg'}});sync();$('enquiry').scrollIntoView()})})});
$('heat').addEventListener('input',function(){var v=this.value;$('film').style.setProperty('--s',v/100);
$('ht').textContent=v<25?'Loose wrap. Drag to apply heat.':v<85?'Shrinking around the product...':'Tight, sealed fit.'});
sync();
function route(){var h=location.hash.slice(1),v={'why-us':'whyus','reviews':'revpage'},t=v[h]||'home';
['home','whyus','revpage'].forEach(function(i){$(i).hidden=i!==t});
if(t==='home'&&h&&$(h))$(h).scrollIntoView();else window.scrollTo(0,0)}
var KB=[
['How do I get a price?',['price','pricing','cost','quote','quotation','how much','per kg','rates'],'Prices depend on the product, size, print and quantity. Add products to your enquiry with the quantity you need and send it by WhatsApp or email, and we will reply with a quote.',['Build my enquiry','#enquiry']],
['What is the minimum order?',['minimum','moq','min order','smallest','at least','how many pieces'],'Tell us the quantity you need in your enquiry and we will confirm what is possible. We do not list a fixed minimum here.',['Build my enquiry','#enquiry']],
['How long have you been in business?',['how long have','been doing','been in business','been making','how old','since when','since','established','experience','years','started'],'KFC Shrinkpack Private Limited was established in 2019, and has been printing and packaging products since then.',['Why us','#why-us']],
['How long does delivery take?',['deliver','delivery','shipping','dispatch','lead time','turnaround','how long will','how long does','how long to','will it take','does it take','how many days','how soon','time to make','transport'],'We focus on timely delivery. The time depends on the product and quantity, so share your requirement and we will confirm.',['Build my enquiry','#enquiry']],
['Where are you based?',['where','address','location','office','visit','based','situated'],'Our registered office is at I 101, Surjapur Site C Industrial Area, Greater Noida, Uttar Pradesh.',['Contact details','#contact']],
['How can I contact you?',['phone','call','number','whatsapp','email','contact','reach','talk to'],'You can call +91 98713 03107, message us on WhatsApp, or email mk.kumar000@gmail.com.',['Contact details','#contact']],
['Who runs the company?',['owner','director','who runs','mukesh','founder','led by','who is the','managed by'],'The company is led by Mukesh Kumar.',['About us','#about']],
['Can you print my design?',['print','custom','design','logo','artwork','my size','brand','personali'],'Yes, we make packaging to your size and print. Add your artwork details and sizes in the notes of your enquiry.',['Build my enquiry','#enquiry']],
['What sizes and materials are available?',['size','thickness','width','micron','material','dimension','pvc','pet film'],'Sizes and thickness depend on your product. We work with PVC shrink sleeves and film, PET pouches, laminated films and BOPP film. Put your dimensions in the notes of your enquiry and we will confirm.',['Build my enquiry','#enquiry']],
['Can I get a sample?',['sample','trial','test order'],'Please message us about samples, and we will confirm what is possible for your product.',['Contact details','#contact']],
['What are the payment terms?',['payment','advance','pay ','credit','invoice','terms'],'Payment terms are confirmed with each quote. Send your enquiry and we will share them.',['Build my enquiry','#enquiry']],
['Do you give bulk discounts?',['bulk','discount','wholesale','large order','big order','cheaper'],'For larger orders, put the quantity in your enquiry and we will quote accordingly.',['Build my enquiry','#enquiry']],
['Is your packaging food safe?',['food','hygien','safe','grade'],'We make food packaging pouches and films and focus on strong, hygienic packaging. For a specific food-grade requirement, message us so we can confirm.',['Build my enquiry','#enquiry']],
['What machines do you use?',['machine','quality','factory','plant','infrastructure','facility'],'We use an advanced machinery set-up with strict quality controls. You can see photos of our machines on the Why us page.',['Why us','#why-us']],
['Can I get GST details?',['gst','registration','cin','documents'],'We are a private limited company. For GST or registration documents, please contact us and we will share them.',['Contact details','#contact']],
['What is a shrink sleeve?',['sleeve'],'A shrink sleeve is a printed plastic sleeve that slips over a bottle or container and tightens when heated. We make flexible, rigid and plasticized PVC printed sleeves.',['See products','#products']],
['Do you make pouches?',['pouch','zipper','stand-up','standup','pillow','sachet'],'We make PET pillow pouches, PET laminated stand-up pouches, food stand-up pouches, zipper pouches and center seal pouches.',['See products','#products']],
['Do you make bottle labels?',['label','bopp','pearl'],'For bottle labels we offer pearlized BOPP film.',['See products','#products']],
['Do you make laminated rolls?',['roll','laminat','film'],'We make plain and printed laminated rolls, 2 and 3 layer laminated films, food flexible packaging film and PVC shrink film.',['See products','#products']],
['What do you make?',['make','sell','offer','product','range','supply','manufactur','what do you do','what do you make'],'We make printed shrink sleeves (flexible, rigid and plasticized PVC), PVC shrink film, PET and food pouches, laminated rolls and films, and pearlized BOPP film for bottle labels.',['See products','#products']],
['Are you a real person?',['real person','are you a bot','are you ai','are you human','chatbot','who are you','am i talking','a robot'],'I am an automatic answer box on this website, not a person. I answer from our company information, and for anything else you can message us directly.',['Contact details','#contact']],
['Hello',['hello','hey','thanks','thank','hi ','good morning','good evening'],'Hello! Ask about our products, printing, prices, delivery or where we are.']
];
var NOREL={'Hello':1,'Are you a real person?':1};
function lev(a,b){var m=[],i,j;for(i=0;i<=a.length;i++)m[i]=[i];for(j=1;j<=b.length;j++)m[0][j]=j;
for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}
function norm(q){return ' '+q.toLowerCase().replace(/\bu\b/g,'you').replace(/\bur\b/g,'your').replace(/\br\b/g,'are').replace(/\bpls\b|\bplz\b/g,'please').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ')+' '}
function score(e,s,t){var n=0;e[1].forEach(function(k){var w=k.trim().split(' ').length;
if(s.indexOf(k)>-1)n+=w>1?w*2:1;
else if(w===1&&k.length>5&&t.some(function(x){return Math.abs(x.length-k.length)<=1&&lev(x,k)<=1}))n+=1});return n}
function ask(q){q=q.trim();if(!q)return;var s=norm(q),t=s.trim().split(' ');
var r=KB.map(function(e,i){return{e:e,n:score(e,s,t),i:i}}).filter(function(x){return x.n>0}).sort(function(a,b){return b.n-a.n||a.i-b.i});
var box=$('aa');box.textContent='';var d=document.createElement('div');d.className='ans';var p=document.createElement('p'),a=document.createElement('a'),rel;
if(r.length){var e=r[0].e;p.textContent=e[2];a.className='btn alt';a.href=e[3]?e[3][1]:'#enquiry';a.textContent=e[3]?e[3][0]:'Build my enquiry';
rel=r.slice(1).map(function(x){return x.e}).filter(function(x){return !NOREL[x[0]]}).slice(0,2)}
else{p.textContent='I do not have a confirmed answer to that. Send your question to us and we will reply.';a.className='btn';a.href='https://wa.me/919871303107?text='+encodeURIComponent('Hello, I have a question: '+q);a.textContent='Ask on WhatsApp';
rel=['How do I get a price?','What do you make?','How can I contact you?'].map(function(t){return KB.filter(function(x){return x[0]===t})[0]})}
d.appendChild(p);d.appendChild(a);
if(rel.length){var l=document.createElement('p');l.style.cssText='margin:1rem 0 .4rem;color:var(--muted)';l.textContent='You may also want to ask:';d.appendChild(l);
var c=document.createElement('div');c.className='chips';c.style.margin='0';
rel.forEach(function(x){var b=document.createElement('button');b.type='button';b.textContent=x[0];b.addEventListener('click',function(){$('aq').value=x[0];ask(x[0])});c.appendChild(b)});d.appendChild(c)}
box.appendChild(d)}
$('ab').addEventListener('click',function(){ask($('aq').value)});
$('aq').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();ask(this.value)}});
document.querySelectorAll('.chips button').forEach(function(b){b.addEventListener('click',function(){$('aq').value=b.textContent;ask(b.textContent)})});
var REVIEWS=[{s:5,t:'Nice quality',n:'Manoj Kumar',c:'Printing and packaging, UP'}];
(function(){var box=$('rvs');if(!REVIEWS.length){var e=document.createElement('div');e.className='rvempty';e.textContent='Reviews from our customers will appear here.';box.appendChild(e);return}
var g=document.createElement('div');g.className='rvgrid';
REVIEWS.forEach(function(r){var f=document.createElement('figure');f.className='rv';
if(r.s){var s=document.createElement('div');s.className='stars';s.setAttribute('role','img');s.setAttribute('aria-label',r.s+' out of 5');s.textContent='\u2605'.repeat(r.s);f.appendChild(s)}
var q=document.createElement('blockquote');q.textContent=r.t;var c=document.createElement('figcaption'),b=document.createElement('b');b.textContent=r.n;c.appendChild(b);c.appendChild(document.createTextNode(r.c||''));
f.appendChild(q);f.appendChild(c);g.appendChild(f)});box.appendChild(g)})();
var rating=0;
function paint(n){document.querySelectorAll('.starpick button').forEach(function(b){var v=+b.dataset.v;b.classList.toggle('on',v<=n);b.setAttribute('aria-checked',v===rating)})}
document.querySelectorAll('.starpick button').forEach(function(b){b.addEventListener('click',function(){rating=+b.dataset.v;paint(rating)});b.addEventListener('mouseenter',function(){paint(+b.dataset.v)});b.addEventListener('mouseleave',function(){paint(rating)})});
var REVIEW_ENDPOINT='https://formspree.io/f/mbggzagq';
$('rvSend').addEventListener('click',function(){var n=$('rvnote'),btn=this;
if(!rating){n.textContent='Please choose a star rating.';return}
if(!$('rn').value.trim()){n.textContent='Please enter your name.';return}
if($('rt').value.trim().length<10){n.textContent='Please write a short review of at least 10 characters.';return}
if(!REVIEW_ENDPOINT){n.textContent='Reviews are not switched on yet. Please check back soon.';return}
btn.disabled=true;n.textContent='Sending...';
fetch(REVIEW_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({rating:rating,name:$('rn').value.trim(),company:$('rc').value.trim(),review:$('rt').value.trim(),_gotcha:$('rh').value})})
.then(function(r){if(!r.ok)throw 0;n.textContent='Thank you! Your review has been received.';rating=0;paint(0);$('rn').value='';$('rc').value='';$('rt').value=''})
.catch(function(){n.textContent='We could not send your review. Please try again later.'})
.then(function(){btn.disabled=false})});
var sp=$('strip');[2,3,0].forEach(function(n){var im=document.querySelectorAll('#whyus .zoom img')[n];if(!im)return;var f=document.createElement('figure'),i=document.createElement('img'),c=document.createElement('figcaption');i.src=im.src;i.alt=im.alt;i.loading='lazy';c.textContent=im.closest('figure').querySelector('figcaption').textContent;f.appendChild(i);f.appendChild(c);sp.appendChild(f)});
document.querySelectorAll('.zoom').forEach(function(b){b.addEventListener('click',function(){var i=b.querySelector('img');$('lbi').src=i.src;$('lbi').alt=i.alt;$('lb').showModal()})});
$('lbx').addEventListener('click',function(){$('lb').close()});
$('lb').addEventListener('click',function(e){if(e.target===this)this.close()});
window.addEventListener('hashchange',route);route();
