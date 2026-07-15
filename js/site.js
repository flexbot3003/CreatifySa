const CREATIFY_DEFAULTS = {
  settings: {
    eyebrow: "Creative Design Studio",
    hero_line_1: "CRAFTING",
    hero_line_2: "DIGITAL ICONS",
    hero_description: "Creatify is a South African creative studio shaping memorable brands, digital experiences and visual systems for ambitious businesses.",
    intro_title: "DESIGN THAT SPEAKS VOLUMES",
    intro_body: "We are a collective of passionate designers, strategists and creators dedicated to crafting exceptional brand experiences. From startups to enterprises, we partner with visionary clients to create designs that captivate, communicate and convert.",
    about_title: "WHERE CREATIVITY MEETS STRATEGY",
    about_body: "Our studio is a hub of innovation where designers, strategists and technologists come together to create extraordinary work. Every project connects bold creativity with clear business objectives.",
    location: "Based in South Africa. Available worldwide.",
    email: "hello@creatifystudios.co.za",
    phone: "",
    instagram: "#",
    linkedin: "#",
    behance: "#",
    primary_cta_label: "Start a Project",
    primary_cta_url: "contact.html",
    secondary_cta_label: "View Projects",
    secondary_cta_url: "work.html",
    footer_blurb: "Elevating brands through strategic thinking, expressive design and digital excellence."
  },
  projects: [
    {id:"demo-lumin",slug:"lumin-dental",title:"Lumin Dental",category:"Brand Identity & Graphics",year:"2026",excerpt:"Brand reveal concepts and promotional materials tailored for a modern dental clinic.",description:"A warm, contemporary visual language developed to help Lumin Dental communicate clinical confidence without losing its human touch.",image_url:"assets/projects/lumin.svg",client_name:"Lumin Dental",services:"Brand identity, campaign design, digital graphics",featured:true,published:true,sort_order:1},
    {id:"demo-laomai",slug:"laomai-dental",title:"Laomai Dental",category:"Print & Digital Layout",year:"2026",excerpt:"Custom flyers, posters and clinic branding created to elevate the patient experience.",description:"A practical and polished campaign system designed for consistent use across social posts, print and in-clinic communication.",image_url:"assets/projects/laomai.svg",client_name:"Laomai Dental",services:"Print design, social media, clinic graphics",featured:true,published:true,sort_order:2},
    {id:"demo-creatify",slug:"creatify-collective",title:"Creatify Collective",category:"Web Design",year:"2026",excerpt:"The flagship digital home for our creative collective, featuring seamless motion and UX.",description:"A flexible portfolio platform balancing confident typography, playful studio personality and a powerful content management system.",image_url:"assets/projects/creatify.svg",client_name:"Creatify Studios",services:"Web design, UI/UX, development",featured:true,published:true,sort_order:3},
    {id:"demo-imperial",slug:"imperial-ac",title:"Imperial AC",category:"Sports Branding",year:"2026",excerpt:"A complete visual system giving an ambitious community football club a professional edge.",description:"From matchday graphics and player profiles to kit concepts and a live website, the identity positions Imperial AC for its next stage of growth.",image_url:"assets/projects/imperial.svg",client_name:"Imperial Athletic Club",services:"Brand identity, sports graphics, web design",featured:true,published:true,sort_order:4},
    {id:"demo-elevate",slug:"elevate-wellness",title:"Elevate Wellness",category:"Web Design",year:"2024",excerpt:"Holistic wellness platform featuring immersive visuals and a seamless user journey.",description:"A calming editorial website system designed to make wellness services easier to understand and explore.",image_url:"assets/projects/elevate.svg",client_name:"Elevate Wellness",services:"Web design, UI/UX",featured:false,published:true,sort_order:5},
    {id:"demo-lumina",slug:"lumina-tech",title:"Lumina Tech Rebrand",category:"Brand Identity",year:"2024",excerpt:"Complete brand transformation for a growing SaaS company.",description:"A modern identity system with a sharper voice, flexible digital assets and scalable guidelines.",image_url:"assets/projects/lumina.svg",client_name:"Lumina Tech",services:"Strategy, visual identity, guidelines",featured:false,published:true,sort_order:6},
    {id:"demo-artisan",slug:"artisan-coffee",title:"Artisan Coffee Co.",category:"Packaging Design",year:"2024",excerpt:"Premium packaging balancing artisanal craft with modern shelf presence.",description:"A tactile packaging family built around provenance, ritual and contemporary specialty coffee culture.",image_url:"assets/projects/artisan.svg",client_name:"Artisan Coffee Co.",services:"Packaging, art direction",featured:false,published:true,sort_order:7},
    {id:"demo-nova",slug:"nova-finance",title:"Nova Finance App",category:"UI/UX Design",year:"2023",excerpt:"An intuitive mobile banking experience for a new generation of customers.",description:"A simplified product experience turning everyday financial tasks into clear, approachable journeys.",image_url:"assets/projects/nova.svg",client_name:"Nova Finance",services:"Product design, UI/UX",featured:false,published:true,sort_order:8}
  ],
  services: [
    {id:"service-1",title:"Brand Identity",icon:"✦",description:"Strategic brand development including logo design, visual systems, positioning and comprehensive brand guidelines.",sort_order:1,published:true},
    {id:"service-2",title:"Web Design",icon:"▣",description:"Responsive websites that combine compelling aesthetics, clear structure and exceptional user experience.",sort_order:2,published:true},
    {id:"service-3",title:"UI/UX Design",icon:"⌘",description:"User-centred interface design creating intuitive, engaging digital experiences across platforms.",sort_order:3,published:true},
    {id:"service-4",title:"Digital Marketing",icon:"↗",description:"Campaign systems and creative assets that capture attention and drive engagement across digital channels.",sort_order:4,published:true},
    {id:"service-5",title:"Motion Design",icon:"▶",description:"Expressive animated content, title systems and social media motion that give brands energy and personality.",sort_order:5,published:true},
    {id:"service-6",title:"Print & Packaging",icon:"◇",description:"Editorial, packaging and physical brand applications designed to feel considered in every detail.",sort_order:6,published:true}
  ],
  clients: ["Lumin Dental","Laomai Dental","Imperial AC","HeadsUp","Melora","MiMi","Significance","Africa Change Lab"].map((name,index)=>({id:`client-${index+1}`,name,logo_url:"",website_url:"#",sort_order:index+1,published:true})),
  testimonials: [
    {id:"test-1",quote:"Our beauty brand needed a fresh, elegant look. Creatify elevated our entire visual identity to match the quality of our products.",client_name:"Melora",client_role:"Beauty Brand",sort_order:1,published:true},
    {id:"test-2",quote:"Working with Creatify was a dream. They designed a beautiful, soft and modern brand aesthetic that our mommy demographic absolutely loves.",client_name:"MiMi",client_role:"Baby & Mommy Clothing",sort_order:2,published:true},
    {id:"test-3",quote:"The attention to detail Creatify brought to our jewellery brand was unmatched. Everything looks premium, luxurious and highly professional.",client_name:"Significance",client_role:"Jewellery",sort_order:3,published:true},
    {id:"test-4",quote:"Creatify gave our Sunday league squad a professional edge. The graphics and branding make us look like a top-tier team on and off the pitch.",client_name:"Imperial AC",client_role:"Community Football Club",sort_order:4,published:true},
    {id:"test-5",quote:"Creatify perfectly captured our mission to provide safe hubs for students in South Africa. The design is approachable, friendly and exactly what we needed.",client_name:"HeadsUp",client_role:"Student Safety Hub",sort_order:5,published:true}
  ],
  faqs: [
    {id:"faq-1",question:"What services does Creatify offer?",answer:"We specialise in brand identity, website design, UI/UX, digital campaigns, print communication, packaging, motion design and creative direction.",sort_order:1,published:true},
    {id:"faq-2",question:"How long does a typical project take?",answer:"Timelines depend on scope. Smaller design projects may take several working days, while full identities and websites usually take between four and twelve weeks.",sort_order:2,published:true},
    {id:"faq-3",question:"What is your design process?",answer:"Our process generally includes discovery, research, creative direction, design development, refinement and final delivery. Each stage is adapted to the project.",sort_order:3,published:true},
    {id:"faq-4",question:"Do you work with clients internationally?",answer:"Yes. Creatify is based in South Africa and works remotely with clients locally and internationally.",sort_order:4,published:true},
    {id:"faq-5",question:"What are your pricing structures?",answer:"Projects are quoted according to scope, complexity, timing and deliverables. After a discovery conversation, we provide a clear proposal before work begins.",sort_order:5,published:true}
  ],
  stats: [
    {id:"stat-1",value:"150+",label:"Projects Delivered",sort_order:1,published:true},
    {id:"stat-2",value:"5+",label:"Years Combined Experience",sort_order:2,published:true},
    {id:"stat-3",value:"30+",label:"Brands Supported",sort_order:3,published:true},
    {id:"stat-4",value:"8+",label:"Design Fields Covered",sort_order:4,published:true}
  ]
};

let cmsClient = null;
let currentSettings = {...CREATIFY_DEFAULTS.settings};

function configReady(){
  const c = window.CREATIFY_CMS || {};
  return Boolean(c.supabaseUrl && c.supabaseAnonKey && window.supabase?.createClient);
}
function client(){
  if(!configReady()) return null;
  cmsClient ||= window.supabase.createClient(window.CREATIFY_CMS.supabaseUrl, window.CREATIFY_CMS.supabaseAnonKey);
  return cmsClient;
}
function esc(value=""){ return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
function attr(value=""){ return esc(value); }
function sortItems(items=[]){ return [...items].sort((a,b)=>(a.sort_order??999)-(b.sort_order??999)); }
function imagePath(path=""){ if(!path) return "assets/projects/creatify.svg"; return path.startsWith("/") ? path.slice(1) : path; }

async function loadSettings(){
  if(!client()) return currentSettings;
  const {data,error}=await client().from("site_settings").select("*").limit(1).maybeSingle();
  if(!error && data) currentSettings={...currentSettings,...data};
  return currentSettings;
}
async function loadTable(table){
  const fallback=CREATIFY_DEFAULTS[table]||[];
  if(!client()) return fallback;

  const {data,error}=await client()
    .from(table)
    .select("*")
    .eq("published",true)
    .order("sort_order",{ascending:true});

  if(error){
    console.error(`Creatify CMS could not load ${table}:`,error);
    return [];
  }

  // Once Supabase is connected, the database is the source of truth.
  // An empty table should remain empty instead of silently showing demo data.
  return data||[];
}

function renderHeader(){
  const mount=document.querySelector("[data-site-header]"); if(!mount) return;
  const page=document.body.dataset.page||"home";
  const items=[["Home","index.html","home"],["Our Work","work.html","work"],["Services","services.html","services"],["About","about.html","about"],["Contact","contact.html","contact"]];
  const links=items.map(([label,href,key])=>`<a class="nav-link ${page===key?'active':''}" href="${href}">${label}</a>`).join("");
  mount.innerHTML=`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html"><img src="assets/logo.svg" alt="Creatify Studios"></a><nav class="desktop-nav">${links}</nav><div class="header-actions"><a class="button small" href="${attr(currentSettings.primary_cta_url||'contact.html')}">${esc(currentSettings.primary_cta_label||'Start a Project')} ↗</a><button class="menu-button" aria-label="Open navigation" aria-expanded="false">☰</button></div></div><div class="mobile-menu">${items.map(([l,h])=>`<a href="${h}">${l}</a>`).join("")}<a href="admin.html">Admin dashboard</a></div></header>`;
  const header=mount.querySelector('.site-header');
  const setHeader=()=>header.classList.toggle('scrolled',window.scrollY>16); setHeader(); addEventListener('scroll',setHeader,{passive:true});
  const btn=mount.querySelector('.menu-button'), menu=mount.querySelector('.mobile-menu');
  btn.addEventListener('click',()=>{const open=menu.classList.toggle('open');document.body.classList.toggle('menu-open',open);btn.textContent=open?'✕':'☰';btn.setAttribute('aria-expanded',String(open));});
}
function renderFooter(){
  const mount=document.querySelector('[data-site-footer]'); if(!mount) return;
  mount.innerHTML=`<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><img src="assets/logo.svg" alt="Creatify Studios"><p>${esc(currentSettings.footer_blurb)}</p></div><div class="footer-col"><h4>Navigation</h4><a href="work.html">Our Work</a><a href="services.html">Services</a><a href="about.html">About</a><a href="contact.html">Contact</a></div><div class="footer-col"><h4>Social</h4><a href="${attr(currentSettings.instagram)}" target="_blank" rel="noopener">Instagram</a><a href="${attr(currentSettings.linkedin)}" target="_blank" rel="noopener">LinkedIn</a><a href="${attr(currentSettings.behance)}" target="_blank" rel="noopener">Behance</a></div><div class="footer-col"><h4>Get in touch</h4><a href="mailto:${attr(currentSettings.email)}">${esc(currentSettings.email)}</a><a href="contact.html">Start a Project</a><p>${esc(currentSettings.location)}</p></div></div><div class="footer-bottom"><span>© <span data-year></span> CREATIFY STUDIOS. ALL RIGHTS RESERVED.</span><span><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></span></div></div></footer>`;
  mount.querySelector('[data-year]').textContent=new Date().getFullYear();
}
function projectCard(p,featured=false){
  return `<a class="project-card ${featured?'project-featured':''} reveal" data-category="${attr(p.category)}" href="project.html?slug=${encodeURIComponent(p.slug)}"><div class="project-image"><img src="${attr(imagePath(p.image_url))}" alt="${attr(p.title)} project" loading="lazy"><span class="project-open">↗</span></div><div class="project-meta"><div><h3>${esc(p.title)}</h3><p>${esc(p.category)}</p></div><span>${esc(p.year)}</span></div></a>`;
}
async function renderProjects(target,opts={}){
  const mount=document.getElementById(target); if(!mount) return;
  let items=sortItems(await loadTable('projects'));
  if(opts.featured) items=items.filter(x=>x.featured).slice(0,4);
  mount.innerHTML=items.length?items.map(p=>projectCard(p,Boolean(opts.featured))).join(''):'<div class="empty-state">Projects will appear here soon.</div>';
  setupReveal();
  if(opts.filters) renderFilters(items,mount);
}
function renderFilters(items,mount){
  const filterMount=document.getElementById('projectFilters'); if(!filterMount) return;
  const cats=['All',...new Set(items.map(x=>x.category))];
  filterMount.innerHTML=cats.map((c,i)=>`<button class="filter-button ${i===0?'active':''}" data-filter="${attr(c)}">${esc(c)}</button>`).join('');
  filterMount.addEventListener('click',e=>{const b=e.target.closest('[data-filter]'); if(!b)return; filterMount.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active'); const f=b.dataset.filter; mount.querySelectorAll('.project-card').forEach(card=>card.hidden=f!=='All'&&card.dataset.category!==f);});
}
async function renderServices(target,limit=null){
  const mount=document.getElementById(target); if(!mount)return; let items=sortItems(await loadTable('services')); if(limit)items=items.slice(0,limit);
  mount.innerHTML=items.map((s,i)=>`<article class="service-card reveal"><div class="service-number"><span>0${i+1}</span><span class="service-icon">${esc(s.icon||'✦')}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></article>`).join(''); setupReveal();
}
async function renderStats(){ const mount=document.getElementById('statsGrid'); if(!mount)return; const items=sortItems(await loadTable('stats')); mount.innerHTML=items.map(s=>`<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join(''); }
async function renderTestimonials(){ const mount=document.getElementById('testimonialGrid'); if(!mount)return; const items=sortItems(await loadTable('testimonials')).slice(0,6); mount.innerHTML=items.map(t=>`<article class="testimonial-card reveal"><div class="quote-mark">“</div><blockquote>${esc(t.quote)}</blockquote><div class="testimonial-author"><strong>${esc(t.client_name)}</strong><span>${esc(t.client_role)}</span></div></article>`).join(''); setupReveal(); }
async function renderClients(){ const mount=document.getElementById('clientTrack'); if(!mount)return; const items=sortItems(await loadTable('clients')); const html=[...items,...items].map(c=>`<a class="client-item" href="${attr(c.website_url||'#')}" ${c.website_url&&c.website_url!=='#'?'target="_blank" rel="noopener"':''}>${c.logo_url?`<img src="${attr(imagePath(c.logo_url))}" alt="${attr(c.name)}">`:esc(c.name)}</a>`).join(''); mount.innerHTML=html; }
async function renderFaqs(){ const mount=document.getElementById('faqList'); if(!mount)return; const items=sortItems(await loadTable('faqs')); mount.innerHTML=items.map(f=>`<article class="faq-item"><button class="faq-question"><span>${esc(f.question)}</span><span>+</span></button><div class="faq-answer"><p>${esc(f.answer)}</p></div></article>`).join(''); mount.addEventListener('click',e=>{const q=e.target.closest('.faq-question');if(!q)return; const item=q.closest('.faq-item'); item.classList.toggle('open'); const a=item.querySelector('.faq-answer'); a.style.maxHeight=item.classList.contains('open')?a.scrollHeight+'px':'0';}); }
async function renderProjectDetail(){
  const mount=document.getElementById('projectDetail'); if(!mount)return; const slug=new URLSearchParams(location.search).get('slug'); const items=await loadTable('projects'); const p=items.find(x=>x.slug===slug)||items[0]; if(!p){mount.innerHTML='<div class="empty-state">Project unavailable.</div>';return;}
  document.title=`${p.title} | Creatify Studios`;
  mount.innerHTML=`<div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="work.html">Work</a><span>/</span><span>${esc(p.title)}</span></div><div class="project-detail-head"><div><p class="eyebrow">${esc(p.category)}</p><h1 class="heading">${esc(p.title)}</h1><p class="subheading">${esc(p.excerpt)}</p></div><div class="project-detail-meta"><div class="meta-block"><small>Client</small><strong>${esc(p.client_name||p.title)}</strong></div><div class="meta-block"><small>Year</small><strong>${esc(p.year)}</strong></div><div class="meta-block" style="grid-column:1/-1"><small>Services</small><strong>${esc(p.services||p.category)}</strong></div></div></div><div class="project-hero-image"><img src="${attr(imagePath(p.image_url))}" alt="${attr(p.title)} project"></div><div class="project-body-grid"><h2>The project</h2><div><p>${esc(p.description||p.excerpt)}</p><p>Creatify approached the work as a connected visual system rather than a collection of isolated deliverables. The result is designed to remain clear, consistent and useful wherever the brand appears.</p></div></div></div>`;
}
function fillStaticCopy(){
  document.querySelectorAll('[data-setting]').forEach(el=>{const key=el.dataset.setting;if(currentSettings[key]!=null)el.textContent=currentSettings[key];});
  document.querySelectorAll('[data-setting-href]').forEach(el=>{const key=el.dataset.settingHref;if(currentSettings[key])el.href=currentSettings[key];});
}
function setupReveal(){ const obs=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');obs.unobserve(x.target)}}),{threshold:.12}); document.querySelectorAll('.reveal:not(.visible)').forEach(x=>obs.observe(x)); }
function setupContact(){
  const form=document.getElementById('contactForm'); if(!form)return;
  form.addEventListener('submit',async e=>{e.preventDefault();const notice=document.getElementById('formNotice'),button=form.querySelector('button[type=submit]');button.disabled=true;button.textContent='Sending…';const fd=new FormData(form);const payload=Object.fromEntries(fd.entries());
    if(!client()){notice.textContent='The form is ready, but Supabase must be connected before enquiries can be saved.';notice.className='notice show error';button.disabled=false;button.textContent='Send Enquiry ↗';return;}
    const {error}=await client().from('inquiries').insert(payload);notice.textContent=error?error.message:'Thank you. Your enquiry has been sent to Creatify.';notice.className=`notice show ${error?'error':''}`;if(!error)form.reset();button.disabled=false;button.textContent='Send Enquiry ↗';
  });
}
async function init(){
  await loadSettings(); renderHeader(); renderFooter(); fillStaticCopy();
  await Promise.all([renderProjects('featuredProjects',{featured:true}),renderProjects('allProjects',{filters:true}),renderServices('serviceGrid'),renderServices('servicePreview',4),renderStats(),renderTestimonials(),renderClients(),renderFaqs(),renderProjectDetail()]);
  setupContact(); setupReveal();
}
document.addEventListener('DOMContentLoaded',init);
