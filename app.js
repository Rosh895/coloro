/* COLARO – site behaviour. Language helpers (t, LANG, applyLang) come from i18n.js. */

/* ---------- Settings you can change ---------- */
const CONFIG = {
  // Exact opening moment, e.g. '2027-03-15T10:00:00+01:00'. While null, no countdown is shown.
  openingDate: '2027-03-01T10:00:00+01:00',
  // Mailbox that receives registrations while no formEndpoint is set (the visitor's email app opens, prefilled).
  contactEmail: 'colarofrance@gmail.com',
  // Address that receives form submissions, e.g. a Formspree URL: 'https://formspree.io/f/xxxxxxx'.
  // When set, forms are sent directly instead of opening the visitor's email app.
  formEndpoint: null,
};

const $ = (s, r = document) => r.querySelector(s);
const eur = n => n.toFixed(2).replace('.', ',') + ' €';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Petals ---------- */
(() => {
  const box = $('.petals');
  if (!box || reduceMotion) return;
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    s.style.animationDuration = 10 + Math.random() * 9 + 's';
    s.style.animationDelay = -Math.random() * 16 + 's';
    box.appendChild(s);
  }
})();

/* ---------- Products ---------- */
const MINT = '#A8C3B4', PEACH = '#F9D5C8', BERRY = '#E0607E', LILAC = '#DCD3F2', BUTTER = '#F6E7A8';
const PRODUCTS = [
  { id: 'tw-arbutin', cat: 'creams', brand: 'Tosowoong', name: 'Arbutin 5% Whitening Cream 50 g', price: 26.90, c: MINT, note: ['Crème à l’arbutine 5 % pour un teint d’aspect plus uniforme.', '5% arbutin cream for a more even-looking complexion.'] },
  { id: 'tw-ovalicin', cat: 'toners', brand: 'Tosowoong', name: 'SOS Intensive Red Clinic Ovalicin Lotion 80 ml', price: 25.90, c: LILAC, note: ['Lotion SOS pour les peaux sujettes aux rougeurs.', 'SOS lotion for redness-prone skin.'] },
  { id: 'tw-panthenol', cat: 'creams', brand: 'Tosowoong', name: 'Panthenol 20 Barrier Cream', price: 22.90, c: MINT, note: ['Crème au panthénol pour soutenir la barrière cutanée.', 'Panthenol cream to support the skin barrier.'] },
  { id: 'tw-hyal9', cat: 'creams', brand: 'Tosowoong', name: 'Hyaluronic Acid 9 Cream', price: 21.90, c: MINT, note: ['Crème hydratante à l’acide hyaluronique.', 'Hydrating cream with hyaluronic acid.'] },
  { id: 'tw-arbserum', cat: 'serums', brand: 'Tosowoong', name: 'Alpha Arbutin 2 Rice Serum', price: 19.90, c: PEACH, note: ['Sérum à l’alpha-arbutine et au riz pour un teint lumineux.', 'Alpha-arbutin and rice serum for a radiant-looking complexion.'] },
  { id: 'tw-ricetoner', cat: 'toners', brand: 'Tosowoong', name: 'Rice Glow Milky Toner 250 ml', price: 19.90, c: LILAC, note: ['Toner laiteux au riz pour une peau douce et lumineuse.', 'Milky rice toner for soft, glowing-looking skin.'] },
  { id: 'tw-ceramide', cat: 'toners', brand: 'Tosowoong', name: 'Ceramide Toner', price: 18.90, c: LILAC, note: ['Toner aux céramides pour hydrater et soutenir la barrière.', 'Ceramide toner to hydrate and support the barrier.'] },
  { id: 'tw-tomato', cat: 'serums', brand: 'Tosowoong', name: 'Green Tomato Pore Ampoule 30 ml', price: 17.90, c: PEACH, note: ['Ampoule à la tomate verte pour un grain de peau d’aspect affiné.', 'Green tomato ampoule for a refined-looking skin texture.'] },
  { id: 'tw-kojic', cat: 'cleansers', brand: 'Tosowoong', name: 'Kojic Acid Turmeric Face Wash', price: 14.90, c: BUTTER, note: ['Nettoyant visage à l’acide kojique et au curcuma.', 'Face wash with kojic acid and turmeric.'] },
  { id: 'tw-foam', cat: 'cleansers', brand: 'Tosowoong', name: 'Mildly Acidic Foam Cleansing', price: 12.90, c: BUTTER, note: ['Mousse nettoyante légèrement acide, douce pour la peau.', 'Mildly acidic foaming cleanser, gentle on the skin.'] },
  { id: 'mn-panthetoin', cat: 'creams', brand: 'ma:nyo', name: 'Panthetoin Cream 80 ml', price: 27.90, c: MINT, note: ['Crème apaisante et hydratante.', 'Soothing, hydrating cream.'] },
  { id: 'mn-bifida', cat: 'toners', brand: 'ma:nyo', name: 'Bifida Biome Ampoule Toner 210 ml', price: 24.90, c: LILAC, note: ['Toner-ampoule au bifida pour hydrater la peau.', 'Bifida ampoule toner to hydrate the skin.'] },
  { id: 'mn-soy', cat: 'cleansers', brand: 'ma:nyo', name: 'Pure Soybean Cleansing Milk 200 ml', price: 19.90, c: BUTTER, note: ['Lait nettoyant doux au soja.', 'Gentle soybean cleansing milk.'] },
  { id: 'ap-spicule', cat: 'serums', brand: 'APLB', name: 'Spicule Collagen Shot 300 Serum Set (2 pièces)', price: 32.90, c: PEACH, note: ['Set de 2 sérums au collagène et aux spicules.', 'Set of 2 collagen and spicule serums.'] },
  { id: 'ap-ampoule', cat: 'serums', brand: 'APLB', name: 'Collagen EGF Peptide Ampoule Serum 40 ml', price: 19.90, c: PEACH, note: ['Sérum-ampoule au collagène, EGF et peptides.', 'Collagen, EGF and peptide ampoule serum.'] },
  { id: 'ap-cream', cat: 'creams', brand: 'APLB', name: 'Collagen EGF Peptide Cream', price: 19.90, c: MINT, note: ['Crème au collagène, EGF et peptides.', 'Collagen, EGF and peptide cream.'] },
  { id: 'ap-toner', cat: 'toners', brand: 'APLB', name: 'Collagen EGF Peptide Facial Toner 160 ml', price: 16.90, c: LILAC, note: ['Toner visage au collagène, EGF et peptides.', 'Collagen, EGF and peptide facial toner.'] },
  { id: 'ap-mist', cat: 'toners', brand: 'APLB', name: 'Collagen EGF Peptide Mist Essence 105 ml', price: 15.90, c: LILAC, note: ['Brume-essence au collagène, EGF et peptides.', 'Collagen, EGF and peptide mist essence.'] },
  { id: 'ap-hyal', cat: 'serums', brand: 'APLB', name: 'Hyaluronic Acid', price: 17.90, c: PEACH, note: ['Soin à l’acide hyaluronique pour hydrater.', 'Hyaluronic acid care to hydrate.'] },
  { id: 'ap-retinol', cat: 'serums', brand: 'APLB', name: 'Retinol Vitamin C Vitamin E', price: 19.90, c: PEACH, note: ['Soin au rétinol, à la vitamine C et à la vitamine E.', 'Care with retinol, vitamin C and vitamin E.'] },
  { id: 'ap-retinoltoner', cat: 'toners', brand: 'APLB', name: 'Retinol Vitamin C Vitamin E Facial Toner 160 ml', price: 16.90, c: LILAC, note: ['Toner visage au rétinol, à la vitamine C et à la vitamine E.', 'Facial toner with retinol, vitamin C and vitamin E.'] },
  { id: 'ap-retinolmist', cat: 'toners', brand: 'APLB', name: 'Retinol Vitamin C Vitamin E Mist Essence 105 ml', price: 15.90, c: LILAC, note: ['Brume-essence au rétinol, à la vitamine C et à la vitamine E.', 'Mist essence with retinol, vitamin C and vitamin E.'] },
];
const CATS = ['creams', 'serums', 'toners', 'cleansers'];
/* Skin types each product is suggested for (to be confirmed by the COLARO team). Untagged products show under "all". */
const SKIN_TAGS = {
  'tw-arbutin': ['normal'], 'tw-ovalicin': ['sensitive'], 'tw-panthenol': ['sensitive', 'barrier'], 'tw-hyal9': ['dry'],
  'tw-arbserum': ['normal'], 'tw-ricetoner': ['dry', 'normal'], 'tw-ceramide': ['barrier', 'dry'], 'tw-tomato': ['oily'],
  'tw-kojic': ['oily'], 'tw-foam': ['sensitive', 'normal'], 'mn-panthetoin': ['barrier', 'sensitive'], 'mn-bifida': ['normal', 'oily'],
  'mn-soy': ['dry', 'sensitive', 'barrier'], 'ap-spicule': ['normal'], 'ap-ampoule': ['normal', 'dry'], 'ap-cream': ['normal', 'dry'],
  'ap-toner': ['normal'], 'ap-mist': ['normal'], 'ap-hyal': ['dry'], 'ap-retinol': ['normal'], 'ap-retinoltoner': ['normal'], 'ap-retinolmist': ['normal'],
};
const SKINS = ['dry', 'sensitive', 'normal', 'oily', 'barrier'];
const SHADES = {}; // no shade products in the catalogue for now
const PICKS = ['tw-arbutin', 'tw-panthenol', 'mn-panthetoin', 'ap-ampoule', 'tw-ricetoner', 'ap-spicule', 'tw-tomato', 'ap-cream'];

/* ---------- Cart: a reservation basket ----------
   Visitors choose products, send a reservation REQUEST by email, then pick up and pay at the pop-up.
   There is no online payment and no stock counting (COLARO has unlimited stock): COLARO confirms each request by email. */
const MAX_QTY = 99; // sanity limit for the quantity buttons; COLARO has unlimited stock
const byId = id => PRODUCTS.find(p => p.id === id);
let cart = []; // [{ id, shade: index | null, qty }]
try { cart = JSON.parse(localStorage.getItem('colaro-cart') || '[]'); } catch (_) {}
cart = cart.filter(l => l && byId(l.id) && byId(l.id).price != null && Number.isInteger(l.qty) && l.qty > 0)
  .map(l => ({ id: l.id, shade: Number.isInteger(l.shade) ? l.shade : null, qty: Math.min(MAX_QTY, l.qty) }));
const saveCart = () => { try { localStorage.setItem('colaro-cart', JSON.stringify(cart)); } catch (_) {} };
const sameLine = (l, id, shade) => l.id === id && (l.shade ?? null) === (shade ?? null);
const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const cartTotal = () => cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
function addToCart(id, shade = null, qty = 1) {
  const line = cart.find(l => sameLine(l, id, shade));
  if (line) line.qty = Math.min(MAX_QTY, line.qty + qty); else cart.push({ id, shade, qty: Math.min(MAX_QTY, qty) });
  saveCart(); updateCart();
}
const addBtn = p => p.price == null ? '' : `<button type="button" class="add-btn" data-id="${p.id}">${t('c.add')}</button>`;

/* Shade choice (memory only, per visit) */
const chosen = {};
const shadePicker = p => {
  const list = SHADES[p.id]; if (!list) return '';
  const sel = chosen[p.id];
  return `<div class="shade-pick" data-id="${p.id}">
    <div class="shade-row" role="group" aria-label="${t('shade.pick')}">${list.map(([k, hex], i) =>
      `<button type="button" class="shade" aria-pressed="${sel === i}" aria-label="${t(k)}" title="${t(k)}" data-i="${i}" style="--hex:${hex}"></button>`).join('')}</div>
    <span class="shade-name" data-warn="${t('c.pickShade')}">${sel == null ? t('shade.count', { n: list.length }) : t(list[sel][0])}</span></div>`;
};
const shadeText = p => chosen[p.id] != null && SHADES[p.id] ? ' (' + t(SHADES[p.id][chosen[p.id]][0]) + ')' : '';

/* Shade clicks anywhere (cards, detail view) */
document.addEventListener('click', e => {
  const s = e.target.closest('.shade'); if (!s) return;
  const id = s.closest('.shade-pick').dataset.id, i = +s.dataset.i;
  chosen[id] = chosen[id] === i ? null : i;
  document.querySelectorAll(`.shade-pick[data-id="${id}"]`).forEach(el => { el.outerHTML = shadePicker(byId(id)); });
  const prod = byId(id);
  document.querySelectorAll(`img[data-pid="${id}"]`).forEach(im => { im.src = imgFor(prod); im.alt = `${prod.brand} ${prod.name}${shadeText(prod)}`; });
  const again = document.querySelector(`.shade-pick[data-id="${id}"] .shade[data-i="${i}"]`); if (again) again.focus();
});

/* Dialogs: close button, backdrop click */
document.addEventListener('click', e => {
  const c = e.target.closest('[data-close]'); if (c) c.closest('dialog').close();
  else if (e.target.tagName === 'DIALOG') e.target.close();
});

const imgFor = p => (p.shadeImgs && chosen[p.id] != null) ? p.shadeImgs[chosen[p.id]] : p.img;
const photo = (p, lazy = true) => p.img ? `<img src="${imgFor(p)}" alt="${p.brand} ${p.name}${shadeText(p)}" data-pid="${p.id}"${p.fit ? ` data-fit="${p.fit}"` : ''} decoding="async"${lazy ? ' loading="lazy"' : ''}>` : '';
const priceTag = p => p.price == null
  ? `<span class="price soon">${t('price.soon')}</span>`
  : `<span class="price">${eur(p.price)}${p.per ? ' ' + t('per.mask') : ''}</span>`;

const SHAPES = {
  jar: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 92h60V62a30 30 0 0 0-60 0z" fill="#F7F6F2"/><rect x="14" y="50" width="72" height="16" rx="7" fill="#2F3B37"/></svg>',
  tube: '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="38" y="30" width="24" height="64" rx="8" fill="#F7F6F2"/><rect x="42" y="8" width="16" height="26" rx="4" fill="#2F3B37"/></svg>',
  sun: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M34 94V34h32v60z" fill="#F7F6F2"/><rect x="38" y="12" width="24" height="24" rx="4" fill="#2F3B37"/><circle cx="50" cy="64" r="9" fill="#F6E7A8"/></svg>',
  round: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="38" fill="#F7F6F2"/><circle cx="50" cy="52" r="26" fill="#E0607E" opacity=".75"/></svg>',
  bottle: '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="36" y="34" width="28" height="60" rx="9" fill="#F7F6F2"/><rect x="43" y="20" width="14" height="16" rx="3" fill="#2F3B37"/><rect x="46" y="8" width="8" height="14" rx="3" fill="#2F3B37"/></svg>',
  pillow: '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="10" y="28" width="80" height="48" rx="14" fill="#F7F6F2"/><path d="M22 46q28 12 56 0" stroke="#DCD3F2" stroke-width="5" fill="none"/></svg>',
};
const shapeFor = p => ({ creams: 'jar', serums: 'tube', toners: 'bottle', cleansers: 'tube' })[p.cat];

/* ---------- Ticker ---------- */
function renderTicker() {
  const words = t('tick');
  const html = words.map(w => `<span>${w}</span><i aria-hidden="true">✿</i>`).join('');
  $('#ticker').innerHTML = html + html + html + html;
  $('#ringText').textContent = t('ring');
}

/* ---------- Category circles ---------- */
const TILE_ART = {
  creams: ['t-mint', '<path d="M20 90h80V60a40 40 0 0 0-80 0z" fill="#F7F6F2"/><rect x="14" y="48" width="92" height="20" rx="8" fill="#2F3B37"/>', '크림'],
  serums: ['t-peach', '<rect x="46" y="34" width="28" height="58" rx="8" fill="#F7F6F2"/><rect x="52" y="14" width="16" height="24" rx="4" fill="#2F3B37"/>', '세럼'],
  toners: ['t-lilac', '<rect x="42" y="34" width="36" height="60" rx="11" fill="#F7F6F2"/><rect x="51" y="18" width="18" height="18" rx="4" fill="#2F3B37"/><rect x="55" y="6" width="10" height="14" rx="3" fill="#2F3B37"/>', '토너'],
  cleansers: ['t-butter', '<rect x="44" y="30" width="32" height="64" rx="10" fill="#F7F6F2"/><rect x="50" y="10" width="20" height="24" rx="5" fill="#2F3B37"/><circle cx="60" cy="64" r="9" fill="#F6E7A8"/>', '클렌저'],
};
function renderTiles() {
  $('#tiles').innerHTML = CATS.map(c => {
    const [cls, art, ko] = TILE_ART[c];
    return `<button type="button" class="tile ${cls}" data-cat="${c}"><span class="tile-art"><svg viewBox="0 0 120 100" aria-hidden="true">${art}</svg></span>
      <span class="tile-name">${t('cat.' + c)}<small lang="ko">${ko}</small></span></button>`;
  }).join('');
}

/* ---------- Catalogue ---------- */
let activeCat = 'all', activeSkin = 'all', sortMode = 'default', query = '';
const chip = (group, v, label, on) => `<button type="button" class="chip" data-${group}="${v}" aria-pressed="${on}">${label}</button>`;
function renderCatalogue() {
  $('#filters').innerHTML = ['all', ...CATS].map(c => chip('cat', c, t('cat.' + c), c === activeCat)).join('');
  $('#skinFilters').innerHTML = ['all', ...SKINS].map(s => chip('skin', s, t('sk.' + s), s === activeSkin)).join('');
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (activeCat === 'all' || p.cat === activeCat) &&
    (activeSkin === 'all' || (SKIN_TAGS[p.id] || []).includes(activeSkin)) &&
    (!q || (p.brand + ' ' + p.name + ' ' + p.note.join(' ')).toLowerCase().includes(q)));
  if (sortMode !== 'default') {
    const key = p => p.price == null ? Infinity : (sortMode === 'asc' ? p.price : -p.price);
    list.sort((a, b) => key(a) - key(b));
  }
  $('#resultCount').textContent = list.length === 1 ? t('shop.count1') : t('shop.count', { n: list.length });
  $('#grid').innerHTML = list.length ? list.map(p => `
    <article class="product" data-id="${p.id}" style="--c:${p.c}">
      <div class="product-img${p.img ? '' : ' is-art'}">${p.img ? photo(p) : SHAPES[shapeFor(p)]}</div>
      <p class="brand">${p.brand}</p>
      <h3><button type="button" class="open-detail">${p.name}</button></h3>
      <p class="for">${p.note[LANG === 'en' ? 1 : 0]}</p>
      ${shadePicker(p)}
      <div class="buy-row">${priceTag(p)}${addBtn(p)}</div>
    </article>`).join('') : `<div class="empty"><p>${t('shop.empty')}</p><button type="button" class="btn btn-ghost" id="resetFilters">${t('shop.reset')}</button></div>`;
}
function goShop(cat, q, skin = 'all') {
  activeCat = cat; query = q; activeSkin = skin; renderCatalogue();
  $('#shop').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}
$('#filters').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { activeCat = b.dataset.cat; renderCatalogue(); } });
$('#skinFilters').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { activeSkin = b.dataset.skin; renderCatalogue(); } });
$('#sortSel').addEventListener('change', e => { sortMode = e.target.value; renderCatalogue(); });
$('#tiles').addEventListener('click', e => { const b = e.target.closest('.tile'); if (b) goShop(b.dataset.cat, ''); });
$('#searchForm').addEventListener('submit', e => { e.preventDefault(); goShop('all', $('#searchInput').value); });

/* ---------- Product detail ---------- */
let detailId = null;
function renderDetail() {
  const p = byId(detailId); if (!p) return;
  const tags = SKIN_TAGS[p.id] || [];
  $('#pdBody').innerHTML = `
    <div class="pd-art" style="--c:${p.c}">${p.img ? photo(p, false) : SHAPES[shapeFor(p)]}</div>
    <div class="pd-info">
      <p class="brand">${p.brand}</p>
      <h2 id="pdTitle">${p.name}</h2>
      <p>${p.note[LANG === 'en' ? 1 : 0]}</p>
      ${tags.length ? `<p class="skin-line"><b>${t('pd.skin')}</b> ${tags.map(s => t('sk.' + s)).join(' · ')}</p>` : ''}
      ${shadePicker(p)}
      <div class="pd-buy">${priceTag(p)}${addBtn(p)}</div>
      <p class="muted small">${t('pd.try')}</p>
    </div>`;
}
function openDetail(id) { detailId = id; renderDetail(); $('#productDialog').showModal(); }
$('#grid').addEventListener('click', e => {
  if (e.target.id === 'resetFilters') { activeCat = 'all'; activeSkin = 'all'; query = ''; $('#searchInput').value = ''; renderCatalogue(); return; }
  if (e.target.closest('.add-btn, .shade')) return;
  const card = e.target.closest('.product'); if (card) openDetail(card.dataset.id);
});

/* ---------- Carousel ---------- */
function renderCarousel() {
  $('#favGrid').innerHTML = PICKS.map(id => PRODUCTS.find(p => p.id === id)).map(p => `
    <article class="fav-card" data-id="${p.id}">
      <div class="fav-art" style="--c:${p.c}">${photo(p)}<span class="pick">${t('pick')}</span>${p.img ? '' : SHAPES[shapeFor(p)]}</div>
      <div class="fav-body"><p class="brand">${p.brand}</p><h3><button type="button" class="open-detail">${p.name}</button></h3><div class="buy-row">${priceTag(p)}${addBtn(p)}</div></div>
    </article>`).join('');
  $('#favPrev').setAttribute('aria-label', t('carousel.prev'));
  $('#favNext').setAttribute('aria-label', t('carousel.next'));
}
$('#favGrid').addEventListener('click', e => {
  if (e.target.closest('.add-btn')) return;
  const card = e.target.closest('.fav-card'); if (card) openDetail(card.dataset.id);
});
const slide = dir => $('#favGrid').scrollBy({ left: dir * 280, behavior: reduceMotion ? 'auto' : 'smooth' });
$('#favPrev').addEventListener('click', () => slide(-1));
$('#favNext').addEventListener('click', () => slide(1));

/* ---------- Skin and scalp quiz ---------- */
const QUESTIONS = {
  goals: { multi: true, q: 'q.goals', hint: 'q.goals.hint', values: ['skin', 'scalp'], prefix: 'g.' },
  skin: { q: 'q.skin', prefix: 'o.', values: ['dry', 'sensitive', 'normal', 'oily', 'barrier'] },
  scalp: { q: 'q.scalp', prefix: 'o.sc.', values: ['normal', 'dry', 'oily', 'itchy'] },
};
/* Routines use product ids from PRODUCTS (recommendations come from the COLARO product sheet). */
const ROUTINES = {
  dry: { am: ['mn-soy', 'tw-ceramide', 'ap-hyal', 'tw-hyal9'], pm: ['mn-soy', 'tw-ceramide', 'ap-hyal', 'tw-hyal9'] },
  sensitive: { am: ['tw-foam', 'tw-ovalicin', 'tw-panthenol'], pm: ['tw-foam', 'tw-ovalicin', 'tw-panthenol'] },
  normal: { am: ['tw-foam', 'tw-ricetoner', 'tw-arbserum', 'ap-cream'], pm: ['tw-foam', 'tw-ricetoner', 'tw-arbserum', 'ap-cream'] },
  oily: { am: ['tw-kojic', 'mn-bifida', 'tw-tomato', 'tw-hyal9'], pm: ['tw-kojic', 'mn-bifida', 'tw-tomato', 'tw-hyal9'] },
  barrier: { am: ['mn-soy', 'tw-ceramide', 'tw-panthenol'], pm: ['mn-soy', 'tw-ceramide', 'mn-panthetoin'] },
};
let step = 0, ans = { goals: [] };

const hasGoal = g => ans.goals.includes(g);
const flow = (goals = ans.goals) => ['goals',
  ...(goals.includes('skin') ? ['skin'] : []),
  ...(goals.includes('scalp') ? ['scalp'] : [])];
const progressHTML = (n, total) => `
  <div class="quiz-meta"><span id="quizStep">${t('p.step', { n: n + 1, total })}</span></div>
  <div class="quiz-progress" id="quizBar" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${n + 1}">
    ${Array.from({ length: total }, (_, i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
const prodLink = id => { const p = byId(id); return `<button type="button" class="open-detail r-link" data-id="${id}">${p.brand} ${p.name}</button>${p.price != null ? `<small class="r-price">${eur(p.price)}</small>` : ''}`; };

function renderQuiz() {
  const root = $('#quiz'), steps = flow(), key = steps[step];
  if (!key) return renderResult(root);
  const q = QUESTIONS[key];
  if (q.multi) {
    root.innerHTML = `${progressHTML(step, Math.max(steps.length, 2))}
      <h3>${t(q.q)}</h3><p class="muted">${t(q.hint)}</p>
      <div class="options goal-options">${q.values.map(v => `<label class="goal-opt"><input type="checkbox" value="${v}" ${hasGoal(v) ? 'checked' : ''}>
        <span><strong>${t(q.prefix + v)}</strong><span>${t(q.prefix + v + '.s')}</span></span></label>`).join('')}</div>
      <button type="button" class="btn btn-berry quiz-next" id="quizNext" ${ans.goals.length ? '' : 'disabled'}>${t('q.next')}</button>`;
    return;
  }
  root.innerHTML = `${progressHTML(step, steps.length)}
    <h3>${t(q.q)}</h3>
    <div class="options">${q.values.map(v => `<button type="button" class="opt-btn" data-v="${v}">
      <strong>${t(q.prefix + v)}</strong><span>${t(q.prefix + v + '.s')}</span></button>`).join('')}</div>
    <button type="button" class="quiz-back" id="quizBack">${t('r.back')}</button>`;
}

function renderResult(root) {
  const ids = new Set();
  const add = id => { ids.add(id); return id; };
  let html = `<div class="result"><div class="result-hero"><p class="script r-kicker">${t('r.skinBlock')}</p>`;
  const r = ans.skin ? ROUTINES[ans.skin] : null;
  if (r) html += `<h3>${t('r.title', { label: t('o.' + ans.skin) })}</h3><p>${t('need.' + ans.skin)}</p>`;
  else html += `<h3>${t('sc.title', { label: t('o.sc.' + ans.scalp) })}</h3>`;
  html += '</div>';

  if (r && hasGoal('skin')) {
    html += `<div class="result-cols">
      <div class="routine am"><h4>${t('r.am')}</h4><ol>${r.am.map(id => `<li>${prodLink(add(id))}</li>`).join('')}</ol><p class="muted small">${t('r.spf')}</p></div>
      <div class="routine pm"><h4>${t('r.pm')}</h4><ol>${r.pm.map(id => `<li>${prodLink(add(id))}</li>`).join('')}</ol></div></div>`;
  }
  if (hasGoal('scalp')) {
    html += `<div class="scalp-card"><h4>${t('sc.title', { label: t('o.sc.' + ans.scalp) })}</h4>
      <p>${t('sc.text')}</p>${ans.scalp === 'itchy' ? `<p class="muted small">${t('sc.itchy')}</p>` : ''}
      <a class="btn btn-pine" href="#vip">${t('sc.vip')}</a></div>`;
  }
  const picks = [...ids];
  html += `<p class="muted">${t('r.note')}</p><div class="hero-actions">
    ${picks.length ? `<button type="button" class="btn btn-berry" id="quizAdd">${t('r.add')}</button>` : ''}
    ${ans.skin ? `<button type="button" class="btn btn-ghost" id="quizShop">${t('r.shop')}</button>` : ''}
    <a class="btn btn-ghost" href="#vip">${t('r.vip')}</a>
    <button type="button" class="quiz-back" id="quizRestart">${t('r.retake')}</button></div></div>`;
  root.innerHTML = html;
  root.dataset.picks = picks.join(',');
}

const quizRoot = $('#quiz');
quizRoot.addEventListener('change', e => {
  if (!e.target.matches('.goal-options input')) return;
  ans.goals = [...quizRoot.querySelectorAll('.goal-options input:checked')].map(i => i.value);
  $('#quizNext').disabled = !ans.goals.length;
  const total = Math.max(flow().length, 2);
  const bar = $('#quizBar'); bar.setAttribute('aria-valuemax', total);
  bar.innerHTML = Array.from({ length: total }, (_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('');
  $('#quizStep').textContent = t('p.step', { n: step + 1, total });
});
quizRoot.addEventListener('click', e => {
  const opt = e.target.closest('.opt-btn');
  if (opt) { ans[flow()[step]] = opt.dataset.v; step++; renderQuiz(); return; }
  const link = e.target.closest('.r-link'); if (link) { openDetail(link.dataset.id); return; }
  switch (e.target.id) {
    case 'quizNext': step++; renderQuiz(); break;
    case 'quizBack': step--; renderQuiz(); break;
    case 'quizRestart': step = 0; ans = { goals: [] }; renderQuiz(); break;
    case 'quizShop': goShop('all', '', ans.skin); break;
    case 'quizAdd': {
      quizRoot.dataset.picks.split(',').filter(Boolean).forEach(id => {
        const p = byId(id);
        if (p.price == null) return;
        addToCart(id, null);
      });
      e.target.textContent = t('r.added'); e.target.disabled = true; break;
    }
  }
});

/* ---------- Forms ---------- */
function mailTo(kind, data) {
  const subject = { vip: 'Inscription VIP COLARO', booking: 'Demande de créneau VIP COLARO', reservation: 'Réservation de produits COLARO' }[kind] || 'Inscription newsletter COLARO';
  const labels = { name: 'Nom', email: 'E-mail', phone: 'Téléphone', experience: 'Expérience', date: 'Jour souhaité', window: 'Moment souhaité', allergies: 'Allergies / sensibilités', pickup: 'Retrait souhaité', message: 'Message', items: 'Produits', total: 'Total' };
  const body = Object.keys(data).filter(k => labels[k] && data[k]).map(k => labels[k] + (k === 'items' ? ' :\n' : ' : ') + data[k]).join('\n') +
    '\n\nJ’accepte que COLARO utilise mes coordonnées pour me contacter au sujet du pop-up.';
  window.location.href = 'mailto:' + CONFIG.contactEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
async function send(kind, data) {
  if (!CONFIG.formEndpoint) { mailTo(kind, data); return 'mail'; }
  const res = await fetch(CONFIG.formEndpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ kind, ...data }),
  });
  if (!res.ok) throw new Error(res.status);
}
const validEmail = v => /^\S+@\S+\.\S+$/.test(v);

function formsState() {
  const open = !!(CONFIG.formEndpoint || CONFIG.contactEmail);
  $('#loopForm button').disabled = !open;
  if (!open) {
    $('#loopMsg').hidden = false; $('#loopMsg').textContent = t('f.closed');
  }
}

$('#loopForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target, msg = $('#loopMsg'), v = form.elements.email.value.trim();
  msg.hidden = false;
  if (!validEmail(v)) { msg.textContent = t('f.err.email'); return; }
  try { const how = await send('newsletter', { email: v, consent: true, lang: LANG }); msg.textContent = how === 'mail' ? t('f.ok.mail', { to: CONFIG.contactEmail }) : t('f.ok.loop'); form.reset(); }
  catch (_) { msg.textContent = t('f.err.send'); }
});

/* ---------- Booking request ----------
   Collects a preferred day and time window and sends it as a REQUEST (never a confirmed booking).
   There is no availability system: COLARO confirms each request by email. */
const OPEN_DAYS = []; // 1 March 2027 to 1 April 2027
for (let d = 1; d <= 31; d++) OPEN_DAYS.push(new Date(2027, 2, d, 12));
OPEN_DAYS.push(new Date(2027, 3, 1, 12));
const WINDOWS = ['bk.w1', 'bk.w2', 'bk.w3', 'bk.w4'];
const bk = { step: 1, date: null, win: null, name: '', email: '', phone: '', allergies: '', consent: false, done: null, err: '' };
const locale = () => (LANG === 'en' ? 'en-GB' : 'fr-FR');
const fmtDay = d => d.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const isoDay = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function calendarHTML() {
  const months = [[2, 31], [3, 1]]; // [month index, number of days shown]
  return months.map(([m, n]) => {
    const first = new Date(2027, m, 1, 12), lead = (first.getDay() + 6) % 7; // Monday first
    const cells = Array.from({ length: lead }, () => '<span></span>');
    for (let d = 1; d <= n; d++) {
      const date = new Date(2027, m, d, 12), iso = isoDay(date);
      cells.push(`<button type="button" class="day" data-date="${iso}" aria-pressed="${bk.date === iso}" aria-label="${fmtDay(date)}">${d}</button>`);
    }
    return `<div class="cal"><h4>${t('bk.month.' + m)}</h4>
      <div class="cal-head" aria-hidden="true">${t('bk.days').map(x => `<span>${x}</span>`).join('')}</div>
      <div class="cal-grid">${cells.join('')}</div></div>`;
  }).join('');
}

function renderBooking(focusHeading = false) {
  const root = $('#bookingApp');
  const steps = t('bk.steps').slice(1); // step 0 (experience choice) was merged away; steps run 1..3
  const cur = bk.step - 1;
  const stepper = bk.done ? '' : `<ol class="stepper" aria-label="${steps[cur]}">${steps.map((s, i) =>
    `<li class="${i === cur ? 'now' : i < cur ? 'past' : ''}" ${i === cur ? 'aria-current="step"' : ''}><span>${i + 1}</span>${s}</li>`).join('')}</ol>`;
  let body = '';
  if (bk.done) {
    const mail = bk.done === 'mail';
    body = `<div class="bk-done"><h3 tabindex="-1" id="bkHeading">${t(mail ? 'bk.done.mail.title' : 'bk.done.title')}</h3>
      <p>${mail ? t('bk.done.mail', { to: CONFIG.contactEmail }) : t('bk.done', { name: esc(bk.name.split(' ')[0]) })}</p>
      ${recapHTML()}<p class="muted small">${t('bk.nonbinding')}</p>
      <button type="button" class="btn btn-ghost" id="bkAgain">${t('bk.again')}</button></div>`;
  } else if (bk.step === 1) {
    body = `<h3 tabindex="-1" id="bkHeading">${t('bk.date.title')}</h3><p class="muted small">${t('bk.date.note')}</p>
      <div class="cals">${calendarHTML()}</div>
      <h3 class="bk-sub">${t('bk.time.title')}</h3>
      <div class="windows" role="group" aria-label="${t('bk.time.title')}">${WINDOWS.map(w =>
        `<button type="button" class="win" aria-pressed="${bk.win === w}" data-win="${w}">${t(w)}</button>`).join('')}</div>
      ${bk.err ? `<p class="form-error" role="alert">${bk.err}</p>` : ''}
      <div class="bk-nav bk-nav-end"><button type="button" class="btn btn-berry" data-next>${t('q.next')}</button></div>`;
  } else if (bk.step === 2) {
    body = `<h3 tabindex="-1" id="bkHeading">${t('bk.details')}</h3>
      <div class="bk-fields">
        <label>${t('bk.name')}<input data-f="name" type="text" autocomplete="name" value="${esc(bk.name)}" required></label>
        <label>${t('bk.email')}<input data-f="email" type="email" autocomplete="email" value="${esc(bk.email)}" required></label>
        <label>${t('bk.phone')}<input data-f="phone" type="tel" autocomplete="tel" value="${esc(bk.phone)}"></label>
        <label>${t('bk.allergies')}<input data-f="allergies" type="text" value="${esc(bk.allergies)}"></label>
      </div>
      <label class="check"><input type="checkbox" data-f="consent" ${bk.consent ? 'checked' : ''}><span>${t('bk.consent')}</span></label>
      ${bk.err ? `<p class="form-error" role="alert">${bk.err}</p>` : ''}
      <div class="bk-nav"><button type="button" class="quiz-back" data-prev>${t('r.back')}</button>
        <button type="button" class="btn btn-berry" data-next>${t('q.next')}</button></div>`;
  } else {
    body = `<h3 tabindex="-1" id="bkHeading">${t('bk.review')}</h3>${recapHTML()}
      <p class="muted small">${t('bk.nonbinding')}</p>
      ${bk.err ? `<p class="form-error" role="alert">${bk.err}</p>` : ''}
      <div class="bk-nav"><button type="button" class="quiz-back" data-prev>${t('r.back')}</button>
        <button type="button" class="btn btn-berry" id="bkSend" ${CONFIG.formEndpoint || CONFIG.contactEmail ? '' : 'disabled'}>${t('bk.send')}</button></div>`;
  }
  root.innerHTML = stepper + body;
  if (focusHeading) { const hd = $('#bkHeading'); if (hd) hd.focus({ preventScroll: true }); }
}
function recapHTML() {
  const day = bk.date ? fmtDay(new Date(bk.date + 'T12:00:00')) : '';
  return `<dl class="recap">
    <dt>${t('bk.l.exp')}</dt><dd>${t('bk.exp.vip')}</dd>
    <dt>${t('bk.l.date')}</dt><dd>${day}</dd>
    <dt>${t('bk.l.time')}</dt><dd>${bk.win ? t(bk.win) : ''}</dd>
    <dt>${t('bk.l.name')}</dt><dd>${esc(bk.name)}</dd>
    <dt>${t('bk.l.email')}</dt><dd>${esc(bk.email)}</dd></dl>`;
}
function go(step) { bk.step = step; bk.err = ''; renderBooking(true); }

const bkRoot = $('#bookingApp');
bkRoot.addEventListener('input', e => {
  const f = e.target.dataset.f; if (!f) return;
  bk[f] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
});
bkRoot.addEventListener('click', async e => {
  const el = e.target.closest('button'); if (!el) return;
  if (el.dataset.date) { bk.date = el.dataset.date; bk.err = ''; renderBooking(); $(`.day[data-date="${bk.date}"]`).focus(); return; }
  if (el.dataset.win) { bk.win = el.dataset.win; bk.err = ''; renderBooking(); $(`.win[data-win="${bk.win}"]`).focus(); return; }
  if (el.dataset.prev !== undefined) return go(bk.step - 1);
  if (el.id === 'bkAgain') { Object.assign(bk, { step: 1, date: null, win: null, done: null, err: '' }); return renderBooking(true); }
  if (el.dataset.next !== undefined) {
    if (bk.step === 1 && (!bk.date || !bk.win)) { bk.err = t('bk.err.slot'); return renderBooking(); }
    if (bk.step === 2) {
      if (!bk.name.trim() || !bk.email.trim()) { bk.err = t('f.err.fields'); return renderBooking(); }
      if (!validEmail(bk.email.trim())) { bk.err = t('f.err.email'); return renderBooking(); }
      if (!bk.consent) { bk.err = t('f.err.consent'); return renderBooking(); }
    }
    return go(bk.step + 1);
  }
  if (el.id === 'bkSend') {
    el.disabled = true; el.textContent = t('f.sending');
    try {
      const how = await send('booking', { experience: 'Lounge VIP', date: fmtDay(new Date(bk.date + 'T12:00:00')) + ' (' + bk.date + ')',
        window: t(bk.win), name: bk.name.trim(), email: bk.email.trim(), phone: bk.phone, allergies: bk.allergies, consent: true, lang: LANG });
      bk.done = how === 'mail' ? 'mail' : 'sent'; renderBooking(true);
    } catch (_) { bk.err = t('f.err.send'); renderBooking(); }
  }
});

/* ---------- Passport concept (preview only: no points, no rewards) ---------- */
(() => {
  const box = $('#stamps'), stamps = [...box.querySelectorAll('.stamp')];
  const update = () => {
    const n = stamps.filter(s => s.getAttribute('aria-pressed') === 'true').length;
    $('#ppCount').textContent = t('pp.count', { n });
    $('#ppBar').style.width = (n / stamps.length * 100) + '%';
  };
  box.addEventListener('click', e => {
    const s = e.target.closest('.stamp'); if (!s) return;
    s.setAttribute('aria-pressed', s.getAttribute('aria-pressed') !== 'true'); update();
  });
  document.addEventListener('langchange', update);
  update();
})();

/* ---------- Cart window ---------- */
let cartView = 'list'; // 'list' | 'form'
const ck = { name: '', email: '', phone: '', day: '', msg: '', consent: false, err: '', done: null };
const frShade = (id, shade) => shade != null && SHADES[id] ? ' (' + T[SHADES[id][shade][0]][0] + ')' : '';
const shadeLabel = l => l.shade != null && SHADES[l.id] ? ' (' + t(SHADES[l.id][l.shade][0]) + ')' : '';
const unitPrice = p => eur(p.price) + (p.per ? ' ' + t('per.mask') : '');

function cartLineHTML(l) {
  const p = byId(l.id), src = l.shade != null && p.shadeImgs ? p.shadeImgs[l.shade] : p.img;
  return `<li class="cart-line" data-id="${l.id}" data-shade="${l.shade ?? ''}">
    <span class="cart-thumb" style="--c:${p.c}">${src ? `<img src="${src}" alt="" loading="lazy">` : ''}</span>
    <div class="cart-info"><b>${p.brand}</b><span>${p.name}${shadeLabel(l)}</span><small>${unitPrice(p)}</small></div>
    <div class="qty" role="group" aria-label="${t('c.qty')}">
      <button type="button" class="qty-b" data-act="dec" aria-label="${t('c.dec')}">−</button><span aria-live="polite">${l.qty}</span><button type="button" class="qty-b" data-act="inc" aria-label="${t('c.inc')}">+</button></div>
    <span class="cart-sum">${eur(p.price * l.qty)}</span>
    <button type="button" class="cart-rm" data-act="rm" aria-label="${t('c.remove')} ${p.name}">×</button></li>`;
}

function renderCart() {
  const body = $('#cartBody');
  if (ck.done) {
    const mail = ck.done === 'mail';
    body.innerHTML = `<div class="bk-done"><h3 tabindex="-1" id="cartHeading">${t(mail ? 'bk.done.mail.title' : 'bk.done.title')}</h3>
      <p>${mail ? t('bk.done.mail', { to: CONFIG.contactEmail }) : t('c.done', { name: esc(ck.name.split(' ')[0]) })}</p>
      <p class="muted small">${t('c.notice')}</p>
      <div class="cart-actions">${mail && cart.length ? `<button type="button" class="btn btn-ghost" id="cartClear">${t('c.clear')}</button>` : ''}
        <button type="button" class="btn btn-pine" id="cartShop">${t('c.browse')}</button></div></div>`;
    return;
  }
  if (!cart.length) {
    body.innerHTML = `<p>${t('c.empty')}</p><button type="button" class="btn btn-pine" id="cartShop">${t('c.browse')}</button>`;
    return;
  }
  const totals = `<div class="cart-total"><span>${t('c.total')}</span><b>${eur(cartTotal())}</b></div>`;
  if (cartView === 'list') {
    body.innerHTML = `<ul class="cart-list">${cart.map(cartLineHTML).join('')}</ul>${totals}
      <p class="cart-how">${t('c.how')}</p><p class="muted small">${t('c.notice')}</p>
      <div class="cart-actions"><button type="button" class="btn btn-ghost" id="cartClear">${t('c.clear')}</button>
        <button type="button" class="btn btn-berry" id="cartNext">${t('c.continue')}</button></div>`;
  } else {
    body.innerHTML = `<h3 id="cartHeading" tabindex="-1">${t('c.details')}</h3>${totals}
      <div class="bk-fields">
        <label>${t('bk.name')}<input data-ck="name" type="text" autocomplete="name" value="${esc(ck.name)}" required></label>
        <label>${t('bk.email')}<input data-ck="email" type="email" autocomplete="email" value="${esc(ck.email)}" required></label>
        <label>${t('bk.phone')}<input data-ck="phone" type="tel" autocomplete="tel" value="${esc(ck.phone)}"></label>
        <label>${t('c.day')}<input data-ck="day" type="date" min="2027-03-01" max="2027-04-01" value="${esc(ck.day)}"></label>
      </div>
      <label>${t('c.msg')}<input data-ck="msg" type="text" value="${esc(ck.msg)}"></label>
      <label class="check"><input type="checkbox" data-ck="consent" ${ck.consent ? 'checked' : ''}><span>${t('c.consent')}</span></label>
      <p class="muted small">${t('c.notice')}</p>
      ${ck.err ? `<p class="form-error" role="alert">${ck.err}</p>` : ''}
      <div class="cart-actions"><button type="button" class="quiz-back" id="cartBack">${t('r.back')}</button>
        <button type="button" class="btn btn-berry" id="cartSend">${t('c.send')}</button></div>`;
  }
}

function updateCart() {
  const n = cartCount();
  $('#cartCount').textContent = n; $('#cartCount').hidden = !n;
  $('#cartBtn').setAttribute('aria-label', n ? `${t('c.title')} (${n})` : t('c.title'));
  if ($('#cartDialog').open && cartView === 'list') renderCart();
}
const openCart = (view = 'list') => { cartView = view; ck.err = ''; ck.done = null; renderCart(); if (!$('#cartDialog').open) $('#cartDialog').showModal(); };

$('#cartBtn').addEventListener('click', () => openCart());

/* "Add to basket" buttons everywhere (cards, carousel, detail view) */
document.addEventListener('click', e => {
  const b = e.target.closest('.add-btn'); if (!b) return;
  const p = byId(b.dataset.id); let shade = null;
  if (SHADES[p.id]) {
    shade = chosen[p.id] ?? null;
    if (shade == null) {
      document.querySelectorAll(`.shade-pick[data-id="${p.id}"]`).forEach(el => el.classList.add('warn'));
      const first = b.closest('article, .pd-info')?.querySelector('.shade'); if (first) first.focus();
      return;
    }
  }
  addToCart(p.id, shade);
  const label = b.textContent; b.textContent = t('c.added'); b.classList.add('done');
  setTimeout(() => { b.textContent = t('c.add'); b.classList.remove('done'); }, 1400);
});

const cartBody = $('#cartBody');
cartBody.addEventListener('input', e => {
  const k = e.target.dataset.ck; if (!k) return;
  ck[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
});
cartBody.addEventListener('click', async e => {
  const act = e.target.closest('[data-act]');
  if (act) {
    const li = act.closest('.cart-line'), id = li.dataset.id, shade = li.dataset.shade === '' ? null : +li.dataset.shade;
    const line = cart.find(l => sameLine(l, id, shade));
    if (act.dataset.act === 'inc') line.qty = Math.min(MAX_QTY, line.qty + 1);
    else if (act.dataset.act === 'dec') line.qty = Math.max(1, line.qty - 1);
    else cart = cart.filter(l => l !== line);
    saveCart(); updateCart(); renderCart(); return;
  }
  switch (e.target.id) {
    case 'cartNext': cartView = 'form'; ck.err = ''; renderCart(); $('#cartHeading')?.focus(); break;
    case 'cartBack': cartView = 'list'; renderCart(); break;
    case 'cartClear': cart = []; saveCart(); ck.done = null; cartView = 'list'; updateCart(); renderCart(); break;
    case 'cartShop': $('#cartDialog').close(); $('#shop').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); break;
    case 'cartSend': {
      if (!ck.name.trim() || !ck.email.trim()) ck.err = t('f.err.fields');
      else if (!validEmail(ck.email.trim())) ck.err = t('f.err.email');
      else if (!ck.consent) ck.err = t('f.err.consent');
      else ck.err = '';
      if (ck.err) { renderCart(); break; }
      e.target.disabled = true; e.target.textContent = t('f.sending');
      const frDay = d => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const items = cart.map(l => { const p = byId(l.id); return `- ${l.qty} × ${p.brand} ${p.name}${frShade(l.id, l.shade)} – ${eur(p.price)}${p.per ? ' / pièce' : ''} = ${eur(p.price * l.qty)}`; }).join('\n');
      try {
        const how = await send('reservation', { name: ck.name.trim(), email: ck.email.trim(), phone: ck.phone, pickup: ck.day ? frDay(ck.day) : '', message: ck.msg,
          items, total: eur(cartTotal()), consent: true, lang: LANG });
        ck.done = how === 'mail' ? 'mail' : 'sent';
        if (ck.done === 'sent') { cart = []; saveCart(); updateCart(); }
        renderCart(); $('#cartHeading')?.focus();
      } catch (_) { ck.err = t('f.err.send'); renderCart(); }
    }
  }
});

/* ---------- Countdown (only when CONFIG.openingDate is set) ---------- */
function startCountdown() {
  const box = $('#countdown');
  if (!CONFIG.openingDate) return;
  const target = new Date(CONFIG.openingDate).getTime();
  if (isNaN(target)) return;
  box.hidden = false;
  const tick = () => {
    const ms = target - Date.now();
    if (ms <= 0) { box.innerHTML = `<b>${t('cd.open')}</b>`; return; }
    const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    box.innerHTML = `<span class="cd-label">${t('cd.label')}</span>` +
      [[d, 'cd.d'], [h, 'cd.h'], [m, 'cd.m']].map(([n, k]) => `<span class="cd-box"><b>${n}</b>${t(k)}</span>`).join('');
  };
  tick(); setInterval(tick, 30000);
  document.addEventListener('langchange', tick);
}

/* ---------- Korean word of the day ---------- */
const WORDS = [
  ['사랑', 'sarang', 'amour', 'love'], ['안녕하세요', 'annyeonghaseyo', 'bonjour', 'hello'],
  ['감사합니다', 'gamsahamnida', 'merci', 'thank you'], ['예쁘다', 'yeppeuda', 'être joli(e)', 'to be pretty'],
  ['반짝반짝', 'banjjak-banjjak', 'scintillant (onomatopée)', 'twinkling (sparkly)'], ['촉촉', 'chokchok', 'humide, bien hydraté', 'moist, well hydrated'],
  ['물광', 'mulgwang', 'éclat « dewy » de la peau (littéralement « lumière d’eau »)', 'dewy skin glow (literally “water light”)'],
  ['벚꽃', 'beotkkot', 'fleur de cerisier', 'cherry blossom'], ['화이팅', 'hwaiting', 'courage ! (tu peux le faire)', 'you can do it!'], ['피부', 'pibu', 'peau', 'skin'],
];
let wordIndex = Math.floor(Date.now() / 864e5) % WORDS.length;
function renderWord() {
  const [ko, rom, fr, en] = WORDS[wordIndex];
  $('#wordCard').innerHTML = `<svg class="word-bloom" viewBox="0 0 100 100" aria-hidden="true"><use href="#blossom" width="100" height="100"/></svg>
    <p class="word-ko" lang="ko">${ko}</p><p class="word-rom">[${rom}]</p><p class="word-mean">= ${LANG === 'en' ? en : fr}</p>`;
}
$('#wordNext').addEventListener('click', () => { wordIndex = (wordIndex + 1) % WORDS.length; renderWord(); });

/* ---------- Petals across the whole page ---------- */
(() => {
  if (reduceMotion) return;
  const layer = document.createElement('div');
  layer.className = 'petals-page'; layer.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    s.style.animationDuration = 14 + Math.random() * 12 + 's';
    s.style.animationDelay = -Math.random() * 20 + 's';
    layer.appendChild(s);
  }
  document.body.appendChild(layer);
})();

/* ---------- Boot ---------- */
function renderAll() {
  renderTicker(); renderTiles(); renderCatalogue(); renderCarousel(); renderQuiz(); formsState(); updateCart(); renderBooking(); renderWord();
  if ($('#cartDialog').open) renderCart();
  if ($('#productDialog').open) renderDetail();
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.addEventListener('langchange', renderAll);
applyLang();
startCountdown();
