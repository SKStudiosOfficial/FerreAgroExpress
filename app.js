// ===== Utilidades UI =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú responsive
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger?.addEventListener('click', () => nav.classList.toggle('open'));

// Animaciones on-scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Carrusel hero simple
const slides = document.querySelectorAll('.hero__carousel .slide');
let slideIdx = 0;
setInterval(()=>{
  if(!slides.length) return;
  slides[slideIdx].classList.remove('active');
  slideIdx = (slideIdx + 1) % slides.length;
  slides[slideIdx].classList.add('active');
}, 3500);

// ===== Datos demo (reemplaza con tu catálogo real) =====
const CATEGORIES = [
  'Todo','Herramientas','Materiales','Electricidad','Pinturas','Ferretería general','Jardinería'
];

const PRODUCTS = [
  {id:1, name:'Taladro percutor 1/2" 750W', cat:'Herramientas', price:59.9, img:'assets/p-taladro.jpg'},
  {id:2, name:'Cemento Portland 50kg', cat:'Materiales', price:8.5, img:'assets/p-cemento.jpg'},
  {id:3, name:'Cable THW 2x12 AWG 20m', cat:'Electricidad', price:15.0, img:'assets/p-cable.jpg'},
  {id:4, name:'Pintura Látex Exterior 1Gal', cat:'Pinturas', price:12.0, img:'assets/p-pintura.jpg'},
  {id:5, name:'Kit llaves combinadas 8pcs', cat:'Ferretería general', price:18.0, img:'assets/p-llaves.jpg'},
  {id:6, name:'Tijera de podar', cat:'Jardinería', price:6.5, img:'assets/p-tijera.jpg'},
  {id:7, name:'Arena lavada m³ (a granel)', cat:'Materiales', price:null, img:'assets/p-arena.jpg'},
  {id:8, name:'Amoladora angular 850W', cat:'Herramientas', price:39.0, img:'assets/p-amoladora.jpg'},
];

const PROMOS = [
  {title:'Semana de Herramientas', text:'-10% en marcas seleccionadas', icon:'🛠️'},
  {title:'Pinturas 2x1', text:'Colores para tu proyecto', icon:'🎨'},
  {title:'Entrega a domicilio', text:'Consulta cobertura por WhatsApp', icon:'🚚'}
];

const POSTS = [
  {title:'Cómo elegir la brocha adecuada', img:'assets/brocha.jpg', text:'Un acabado perfecto comienza por la herramienta correcta.'},
  {title:'5 tips para taladrar concreto', img:'assets/taladro-tip.jpg', text:'Velocidad, broca y seguridad: lo esencial.'},
  {title:'Nuevos ingresos: línea jardín', img:'assets/jardin.jpg', text:'Mangueras, tijeras y fumigadoras.'},
];

// ===== Render chips categorías =====
const chipsEl = document.getElementById('categoryChips');
let activeCat = 'Todo';
CATEGORIES.forEach(c=>{
  const chip = document.createElement('button');
  chip.className = 'chip' + (c===activeCat ? ' active':'');
  chip.textContent = c;
  chip.addEventListener('click', ()=>{
    activeCat = c;
    document.querySelectorAll('.chip').forEach(ch => ch.classList.toggle('active', ch.textContent===activeCat));
    renderProducts();
  });
  chipsEl?.appendChild(chip);
});

// ===== Render promos =====
const promoTrack = document.getElementById('promoTrack');
PROMOS.forEach(p=>{
  const el = document.createElement('div');
  el.className = 'promo__card';
  el.innerHTML = `<div class="badge">${p.icon} ${p.title}</div><p style="color:#cfcfcf;margin:.4rem 0 0">${p.text}</p>`;
  promoTrack?.appendChild(el);
});

// ===== Render productos + búsqueda =====
const gridEl = document.getElementById('productsGrid');
const emptyEl = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

function renderProducts(){
  const term = (searchInput?.value || '').toLowerCase().trim();
  gridEl.innerHTML = '';
  const filtered = PRODUCTS.filter(p=>{
    const byCat = activeCat==='Todo' || p.cat===activeCat;
    const byTerm = !term || p.name.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term);
    return byCat && byTerm;
  });
  if(!filtered.length){ emptyEl.hidden = false; return; }
  emptyEl.hidden = true;

  filtered.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card pcard';
    card.innerHTML = `
      <div class="pcard__img"><img src="${p.img}" alt="${p.name}"></div>
      <h3>${p.name}</h3>
      <div class="pcard__meta">
        <span class="tag">${p.cat}</span>
        <span class="price">${p.price ? '$'+p.price.toFixed(2) : 'Consultar'}</span>
      </div>
      <button class="btn btn--sm" style="margin-top:10px"
        onclick="whats('${encodeURIComponent(p.name)}')">Consultar</button>
    `;
    gridEl.appendChild(card);
  });
}
searchInput?.addEventListener('input', renderProducts);
renderProducts();

// Consulta rápida por WhatsApp
window.whats = (name)=>{
  const url = `https://wa.me/584121234567?text=Hola%20Ferreagro%20Express%2C%20quiero%20información%20sobre:%20${name}`;
  window.open(url, '_blank');
};

// ===== Blog =====
const blogGrid = document.getElementById('blogGrid');
POSTS.forEach(b=>{
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <img src="${b.img}" alt="">
    <h3>${b.title}</h3>
    <p style="color:#cfcfcf">${b.text}</p>
    <a class="link" href="#">Leer más</a>
  `;
  blogGrid?.appendChild(el);
});

// ===== Formulario de contacto (demo sin backend) =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e=>{
  e.preventDefault();
  const data = new FormData(form);
  const msg = `Hola Ferreagro Express,%0A%0A` +
              `Nombre: ${data.get('nombre')}\nCorreo: ${data.get('email')}\n` +
              `Mensaje: ${data.get('mensaje')}`;
  document.getElementById('formMsg').textContent = '¡Gracias! Te responderemos pronto.';
  window.open(`mailto:ventas@ferreagro.com?subject=Consulta%20web%20Ferreagro&body=${encodeURIComponent(msg)}`);
  form.reset();
});
