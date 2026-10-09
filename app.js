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
  { id: 'rb-extreme', cat: 'creams', brand: 'Real Barrier', name: 'Extreme Cream 50 ml', price: 17.76, c: MINT, note: ['Peaux très sèches ou à barrière fragilisée. Crème riche aux céramides.', 'Very dry or barrier-compromised skin. Rich ceramide cream.'] },
  { id: 'rb-aqua', cat: 'creams', brand: 'Real Barrier', name: 'Aqua Soothing Cream', price: 19.29, c: MINT, note: ['Crème hydratante apaisante.', 'Soothing moisturising cream.'] },
  { id: 'drg-cream', cat: 'creams', brand: 'Dr.G', name: 'R.E.D Blemish Clear Soothing Cream', price: 17.74, c: MINT, note: ['Peaux sensibles, sujettes aux rougeurs, et peaux mixtes.', 'Sensitive, redness-prone and combination skin.'] },
  { id: 'fat-cream', cat: 'creams', brand: 'FATION', name: 'Nosca9 Trouble Cream', price: null, c: MINT, note: ['Peaux grasses et sujettes aux imperfections.', 'Oily and blemish-prone skin.'] },
  { id: 'sn-cream', cat: 'creams', brand: 'S.NATURE', name: 'Aqua Squalane Moisturizing Cream 60 ml', price: 14.95, c: PEACH, note: ['Peaux sèches ou déshydratées. Jour ou nuit.', 'Dry or dehydrated skin. Day or night.'] },
  { id: 'wl-ampoule', cat: 'serums', brand: 'WELLAGE', name: 'Real Hyaluronic Blue 100 Ampoule', price: 9.08, c: PEACH, note: ['Peaux sèches ou déshydratées. Une grande dose d’hydratation.', 'Dry or dehydrated skin. A big drink of hydration.'] },
  { id: 'sn-serum', cat: 'serums', brand: 'S.NATURE', name: 'Aqua Squalane Serum 50 ml', price: 13.14, c: PEACH, note: ['Hydratation légère pour peaux normales et mixtes.', 'Light hydration for normal and combination skin.'] },
  { id: 'fat-serum', cat: 'serums', brand: 'FATION', name: 'Nosca9 Trouble Serum', price: null, c: MINT, note: ['Soin léger pour peaux grasses sujettes aux imperfections.', 'Lightweight care for oily, blemish-prone skin.'] },
  { id: 'fat-water', cat: 'serums', brand: 'FATION', name: 'Nosca9 Cleansing Water', price: 21.39, c: MINT, note: ['Nettoyage doux pour peaux à imperfections.', 'Gentle cleansing for troubled skin.'] },
  { id: 'fat-patch', cat: 'serums', brand: 'FATION', name: 'Nosca9 Spot Patch', price: 13.80, c: MINT, note: ['Pour les imperfections localisées.', 'For individual blemishes.'] },
  { id: 'rb-ampmask', cat: 'masks', brand: 'Real Barrier', name: 'Aqua Soothing Ampoule Mask', price: 1.80, per: true, c: PEACH, note: ['Peaux sèches, déshydratées et mixtes.', 'Dry, dehydrated and combination skin.'] },
  { id: 'drg-mask', cat: 'masks', brand: 'Dr.G', name: 'R.E.D Blemish Cool Soothing Mask', price: 15.88, c: MINT, note: ['Peaux sensibles et sujettes aux rougeurs.', 'Sensitive and redness-prone skin.'] },
  { id: 'fat-mask', cat: 'masks', brand: 'FATION', name: 'Nosca9 Trouble Clear Mask', price: 4.47, c: MINT, note: ['Peaux grasses et sujettes aux imperfections.', 'Oily and blemish-prone skin.'] },
  { id: 'rb-exmask', cat: 'masks', brand: 'Real Barrier', name: 'Extreme Cream Mask', price: 14.21, c: MINT, note: ['Peaux très sèches et réparation de la barrière.', 'Very dry skin and barrier repair.'] },
  { id: 'sn-wrap', cat: 'masks', brand: 'S.NATURE', name: 'Aqua Squalane Cream Wrapping Mask, 4 pcs', price: 14.59, c: PEACH, note: ['Masque enveloppant au squalane. 4 masques.', 'Squalane wrapping mask. 4 masks.'] },
  { id: 'rb-sun', cat: 'sun', brand: 'Real Barrier', name: 'Cera Moisture Barrier Sun Cream', price: 12.26, c: BUTTER, note: ['Peaux sèches, déshydratées et mixtes.', 'Dry, dehydrated and combination skin.'] },
  { id: 'drg-sun', cat: 'sun', brand: 'Dr.G', name: 'Green Mild Up Sun+', price: 14.71, c: BUTTER, note: ['Peaux sensibles, grasses ou sujettes aux imperfections.', 'Sensitive and oily or blemish-prone skin.'] },
  { id: 'zeroid-sun', cat: 'sun', brand: 'ZEROID', name: 'Daily Sun Cream', price: null, c: BUTTER, note: ['Peaux très sèches ou à barrière fragilisée. Alternative pour peaux sensibles.', 'Very dry or barrier-compromised skin. A sensitive-skin alternative.'] },
  { id: 'bg-essence', cat: 'lips', brand: 'BRING GREEN', name: 'Bamboo Hyalu Lip Essence', price: null, c: BERRY, note: ['Hydratation intense pour lèvres sèches ou gercées.', 'Intensive hydration for dry or chapped lips.'] },
  { id: 'bg-stick', cat: 'lips', brand: 'BRING GREEN', name: 'Bamboo Hyalu Lip Essence Stick', price: null, c: BERRY, note: ['Hydratation quotidienne pour lèvres normales.', 'Everyday hydration for normal lips.'] },
  { id: 'nm-tint', cat: 'lips', brand: 'NAMING.', name: 'Over Dew Glossy Lip Tint', price: null, c: BERRY, note: ['Six teintes, du nude au rose profond.', 'Six shades, from nude to deep rose.'] },
  { id: 'jv-glow', cat: 'makeup', brand: 'JAVIN DE SEOUL', name: 'Wink Cushion Glow', price: null, c: BERRY, note: ['Peaux sèches, déshydratées ou normales. Fini éclatant.', 'Dry, dehydrated or normal skin. Dewy finish.'] },
  { id: 'jv-matte', cat: 'makeup', brand: 'JAVIN DE SEOUL', name: 'Wink Cushion Matte', price: null, c: BERRY, note: ['Peaux grasses ou mixtes. Fini mat.', 'Oily or combination skin. Matte finish.'] },
  { id: 'js-blush', cat: 'makeup', brand: 'JUNGSAEMMOOL', name: 'Liquid / Cream Blush', price: null, c: BERRY, note: ['Une couleur éclatante pour peaux sèches. Quatre teintes.', 'Dewy colour for dry skin. Four shades.'] },
  { id: 'nm-blush', cat: 'makeup', brand: 'NAMING.', name: 'Fluffy Powder Blush', price: null, c: BERRY, note: ['Fini poudré doux pour peaux grasses ou mixtes. Quatre teintes.', 'Soft powder finish for oily or combination skin. Four shades.'] },
  { id: 'js-lash', cat: 'makeup', brand: 'JUNGSAEMMOOL', name: 'Touch Up Lash Maker', price: null, c: BERRY, note: ['Mascara naturel du quotidien.', 'Natural, everyday mascara.'] },
  { id: 'nm-lash', cat: 'makeup', brand: 'NAMING.', name: 'Lash Up Mascara', price: null, c: BERRY, note: ['Plus de longueur et de définition.', 'More length and definition.'] },
  { id: 'hk-silk', cat: 'sleep', brand: 'HAKOAL', name: '100% Mulberry Silk Pillowcase', price: null, c: LILAC, note: ['Soie de mûrier 6A, 22 momme.', '6A-grade mulberry silk, 22 momme.'] },
];
const CATS = ['creams', 'serums', 'masks', 'sun', 'lips', 'makeup', 'sleep'];
/* Skin types each product is recommended for (from the COLARO product sheet). Untagged products show under "all". */
const SKIN_TAGS = {
  'rb-extreme': ['barrier', 'sensitive'], 'drg-cream': ['sensitive', 'normal'], 'fat-cream': ['oily'], 'sn-cream': ['dry'],
  'wl-ampoule': ['dry'], 'sn-serum': ['normal'], 'fat-serum': ['oily'], 'fat-water': ['oily'], 'fat-patch': ['oily'],
  'rb-ampmask': ['dry', 'normal'], 'drg-mask': ['sensitive'], 'fat-mask': ['oily'], 'rb-exmask': ['barrier'],
  'rb-sun': ['dry', 'normal'], 'drg-sun': ['sensitive', 'oily'], 'zeroid-sun': ['barrier', 'sensitive'],
  'jv-glow': ['dry', 'normal'], 'jv-matte': ['oily', 'normal'], 'js-blush': ['dry'], 'nm-blush': ['oily', 'normal'],
};
const SKINS = ['dry', 'sensitive', 'normal', 'oily', 'barrier'];
const LIP_SHADES = [['lip.nude', '#D9A58F'], ['lip.coral', '#F07A62'], ['lip.rose', '#E98AA3'], ['lip.mauve', '#A8667A'], ['lip.red', '#C8283C'], ['lip.deep', '#7A3B3F']];
const BLUSH_SHADES = [['bl.peach', '#F5A58A'], ['bl.pink', '#F2A9C0'], ['bl.rose', '#D9788F'], ['bl.berry', '#A5385B']];
const SHADES = { 'nm-tint': LIP_SHADES, 'js-blush': BLUSH_SHADES, 'nm-blush': BLUSH_SHADES };
const PICKS = ['rb-extreme', 'drg-cream', 'wl-ampoule', 'sn-cream', 'sn-serum', 'drg-sun', 'rb-sun', 'fat-water'];

/* Wishlist, shared by the carousel, catalogue and detail view. Stored only in this browser. */
let hearts = [];
try { hearts = JSON.parse(localStorage.getItem('colaro-hearts') || '[]'); } catch (_) {}
const byId = id => PRODUCTS.find(p => p.id === id);
const heartBtn = p => `<button class="heart" type="button" aria-pressed="${hearts.includes(p.id)}" aria-label="${t('save', { name: p.name })}" data-id="${p.id}">
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg></button>`;

/* Shade choice (memory only, per visit) */
const chosen = {};
const shadePicker = p => {
  const list = SHADES[p.id]; if (!list) return '';
  const sel = chosen[p.id];
  return `<div class="shade-pick" data-id="${p.id}">
    <div class="shade-row" role="group" aria-label="${t('shade.pick')}">${list.map(([k, hex], i) =>
      `<button type="button" class="shade" aria-pressed="${sel === i}" aria-label="${t(k)}" title="${t(k)}" data-i="${i}" style="--hex:${hex}"></button>`).join('')}</div>
    <span class="shade-name">${sel == null ? t('shade.count', { n: list.length }) : t(list[sel][0])}</span></div>`;
};
const shadeText = p => chosen[p.id] != null && SHADES[p.id] ? ' (' + t(SHADES[p.id][chosen[p.id]][0]) + ')' : '';

function wishText() {
  const lines = hearts.map(byId).map(p => `- ${p.brand} ${p.name}${shadeText(p)} – ${p.price == null ? t('price.soon') : eur(p.price)}`);
  return [t('w.head'), '', ...lines, '', t('w.foot')].join('\n');
}
function renderWish() {
  const list = hearts.map(byId);
  $('#wishBody').innerHTML = list.length ? `
    <ul class="wish-list">${list.map(p => `<li><span class="wish-dot" style="background:${p.c}"></span>
      <div><b>${p.brand}</b><br>${p.name}${shadeText(p)}</div>
      <span class="wish-price">${p.price == null ? t('price.soon') : eur(p.price)}</span>${heartBtn(p)}</li>`).join('')}</ul>
    <div class="wish-actions"><button type="button" class="btn btn-pine" id="wishCopy">${t('w.copy')}</button>
      <a class="btn btn-ghost" href="mailto:?subject=${encodeURIComponent(t('w.head'))}&body=${encodeURIComponent(wishText())}">${t('w.mail')}</a></div>
    <p class="muted small">${t('w.note')}</p>` : `<p>${t('w.empty')}</p>`;
}
function updateWish() {
  hearts = hearts.filter(byId);
  $('#wishCount').textContent = hearts.length; $('#wishCount').hidden = !hearts.length;
  document.querySelectorAll('.heart').forEach(h => h.setAttribute('aria-pressed', hearts.includes(h.dataset.id)));
  if ($('#wishDialog').open) renderWish();
}
document.addEventListener('click', e => {
  const b = e.target.closest('.heart'); if (!b) return;
  const id = b.dataset.id;
  hearts = hearts.includes(id) ? hearts.filter(x => x !== id) : [...hearts, id];
  try { localStorage.setItem('colaro-hearts', JSON.stringify(hearts)); } catch (_) {}
  updateWish();
});
$('#wishBtn').addEventListener('click', () => { renderWish(); $('#wishDialog').showModal(); });
$('#wishBody').addEventListener('click', async e => {
  if (e.target.id !== 'wishCopy') return;
  try { await navigator.clipboard.writeText(wishText()); e.target.textContent = t('w.copied'); } catch (_) {}
});

/* Shade clicks anywhere (cards, detail view) */
document.addEventListener('click', e => {
  const s = e.target.closest('.shade'); if (!s) return;
  const id = s.closest('.shade-pick').dataset.id, i = +s.dataset.i;
  chosen[id] = chosen[id] === i ? null : i;
  document.querySelectorAll(`.shade-pick[data-id="${id}"]`).forEach(el => { el.outerHTML = shadePicker(byId(id)); });
  const again = document.querySelector(`.shade-pick[data-id="${id}"] .shade[data-i="${i}"]`); if (again) again.focus();
  if ($('#wishDialog').open) renderWish();
});

/* Dialogs: close button, backdrop click */
document.addEventListener('click', e => {
  const c = e.target.closest('[data-close]'); if (c) c.closest('dialog').close();
  else if (e.target.tagName === 'DIALOG') e.target.close();
});

const priceTag = p => p.price == null
  ? `<span class="price soon">${t('price.soon')}</span>`
  : `<span class="price">${eur(p.price)}${p.per ? ' ' + t('per.mask') : ''}</span>`;

const SHAPES = {
  jar: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 92h60V62a30 30 0 0 0-60 0z" fill="#F7F6F2"/><rect x="14" y="50" width="72" height="16" rx="7" fill="#2F3B37"/></svg>',
  tube: '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="38" y="30" width="24" height="64" rx="8" fill="#F7F6F2"/><rect x="42" y="8" width="16" height="26" rx="4" fill="#2F3B37"/></svg>',
  sun: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M34 94V34h32v60z" fill="#F7F6F2"/><rect x="38" y="12" width="24" height="24" rx="4" fill="#2F3B37"/><circle cx="50" cy="64" r="9" fill="#F6E7A8"/></svg>',
  round: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="38" fill="#F7F6F2"/><circle cx="50" cy="52" r="26" fill="#E0607E" opacity=".75"/></svg>',
  mask: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M22 18h56l7 46a35 35 0 0 1-70 0z" fill="#F7F6F2"/><circle cx="40" cy="46" r="5" fill="#2F3B37"/><circle cx="60" cy="46" r="5" fill="#2F3B37"/></svg>',
  pillow: '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="10" y="28" width="80" height="48" rx="14" fill="#F7F6F2"/><path d="M22 46q28 12 56 0" stroke="#DCD3F2" stroke-width="5" fill="none"/></svg>',
};
const shapeFor = p => ({ creams: 'jar', serums: 'tube', masks: 'mask', sun: 'sun', lips: 'tube', makeup: 'round', sleep: 'pillow' })[p.cat];

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
  masks: ['t-lilac', '<path d="M30 20h60l8 50a38 38 0 0 1-76 0z" fill="#F7F6F2"/><circle cx="48" cy="48" r="5" fill="#2F3B37"/><circle cx="72" cy="48" r="5" fill="#2F3B37"/>', '마스크'],
  sun: ['t-butter', '<path d="M40 90V30h40v60z" fill="#F7F6F2"/><rect x="44" y="12" width="32" height="20" rx="4" fill="#2F3B37"/><circle cx="60" cy="62" r="10" fill="#F6E7A8"/>', '선케어'],
  lips: ['t-berry', '<rect x="48" y="30" width="24" height="64" rx="8" fill="#F7F6F2"/><rect x="52" y="8" width="16" height="26" rx="4" fill="#2F3B37"/>', '립'],
  makeup: ['t-peach', '<circle cx="60" cy="52" r="38" fill="#F7F6F2"/><circle cx="60" cy="52" r="26" fill="#E0607E" opacity=".75"/>', '메이크업'],
  sleep: ['t-lilac', '<rect x="14" y="26" width="92" height="56" rx="14" fill="#F7F6F2"/><path d="M26 44q34 14 68 0" stroke="#DCD3F2" stroke-width="5" fill="none"/>', '실크 베개커버'],
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
      <div class="product-top"><p class="brand">${p.brand}</p>${heartBtn(p)}</div>
      <h3><button type="button" class="open-detail">${p.name}</button></h3>
      <p class="for">${p.note[LANG === 'en' ? 1 : 0]}</p>
      ${shadePicker(p)}
      ${priceTag(p)}
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
    <div class="pd-art" style="--c:${p.c}">${SHAPES[shapeFor(p)]}</div>
    <div class="pd-info">
      <p class="brand">${p.brand}</p>
      <h2 id="pdTitle">${p.name}</h2>
      <p>${p.note[LANG === 'en' ? 1 : 0]}</p>
      ${tags.length ? `<p class="skin-line"><b>${t('pd.skin')}</b> ${tags.map(s => t('sk.' + s)).join(' · ')}</p>` : ''}
      ${shadePicker(p)}
      <div class="pd-buy">${priceTag(p)}${heartBtn(p)}</div>
      <p class="muted small">${t('pd.try')}</p>
    </div>`;
}
function openDetail(id) { detailId = id; renderDetail(); $('#productDialog').showModal(); }
$('#grid').addEventListener('click', e => {
  if (e.target.id === 'resetFilters') { activeCat = 'all'; activeSkin = 'all'; query = ''; $('#searchInput').value = ''; renderCatalogue(); return; }
  if (e.target.closest('.heart, .shade')) return;
  const card = e.target.closest('.product'); if (card) openDetail(card.dataset.id);
});

/* ---------- Carousel ---------- */
function renderCarousel() {
  $('#favGrid').innerHTML = PICKS.map(id => PRODUCTS.find(p => p.id === id)).map(p => `
    <article class="fav-card" data-id="${p.id}">
      <div class="fav-art" style="--c:${p.c}"><span class="pick">${t('pick')}</span>${heartBtn(p)}${SHAPES[shapeFor(p)]}</div>
      <div class="fav-body"><p class="brand">${p.brand}</p><h3><button type="button" class="open-detail">${p.name}</button></h3>${priceTag(p)}</div>
    </article>`).join('');
  $('#favPrev').setAttribute('aria-label', t('carousel.prev'));
  $('#favNext').setAttribute('aria-label', t('carousel.next'));
}
$('#favGrid').addEventListener('click', e => {
  if (e.target.closest('.heart')) return;
  const card = e.target.closest('.fav-card'); if (card) openDetail(card.dataset.id);
});
const slide = dir => $('#favGrid').scrollBy({ left: dir * 280, behavior: reduceMotion ? 'auto' : 'smooth' });
$('#favPrev').addEventListener('click', () => slide(-1));
$('#favNext').addEventListener('click', () => slide(1));

/* ---------- Shades ---------- */
function renderShades() {
  const sw = list => list.map(([key, hex, sub]) =>
    `<li><b style="background:${hex}"></b>${t(key)}${sub ? `<small>${t(sub)}</small>` : ''}</li>`).join('');
  $('#lipShades').innerHTML = sw([['lip.nude', '#D9A58F'], ['lip.coral', '#F07A62'], ['lip.rose', '#E98AA3'],
    ['lip.mauve', '#A8667A'], ['lip.red', '#C8283C'], ['lip.deep', '#7A3B3F']]);
  $('#blushShades').innerHTML = sw([['bl.peach', '#F5A58A', 'bl.warm'], ['bl.pink', '#F2A9C0', 'bl.cool'],
    ['bl.rose', '#D9788F', 'bl.neutral'], ['bl.berry', '#A5385B', 'bl.deep']]);
}

/* ---------- Skin and scalp quiz ---------- */
const QUESTIONS = {
  goals: { multi: true, q: 'q.goals', hint: 'q.goals.hint', values: ['skin', 'makeup', 'scalp'], prefix: 'g.' },
  skin: { q: 'q.skin', prefix: 'o.', values: ['dry', 'sensitive', 'normal', 'oily', 'barrier'] },
  lips: { q: 'q.lips', prefix: 'o.l.', values: ['normal', 'some', 'dry', 'chapped'] },
  tone: { q: 'q.tone', prefix: 'o.', values: ['warm', 'cool', 'neutral', 'deep'] },
  scalp: { q: 'q.scalp', prefix: 'o.sc.', values: ['normal', 'dry', 'oily', 'itchy'] },
};
/* Routines use product ids from PRODUCTS (recommendations come from the COLARO product sheet). */
const ROUTINES = {
  dry: { am: ['wl-ampoule', 'sn-cream', 'rb-sun'], pm: ['wl-ampoule', 'sn-cream'], mask: 'rb-ampmask', finish: 'glow' },
  sensitive: { am: ['drg-cream', 'drg-sun'], pm: ['drg-cream'], mask: 'drg-mask', finish: 'glow' },
  normal: { am: ['sn-serum', 'drg-cream', 'rb-sun'], pm: ['sn-serum', 'drg-cream'], mask: 'rb-ampmask', finish: 'either' },
  oily: { am: ['fat-serum', 'fat-cream', 'drg-sun'], pm: ['fat-serum', 'fat-cream'], mask: 'fat-mask', finish: 'matte' },
  barrier: { am: ['rb-extreme', 'zeroid-sun'], pm: ['rb-extreme'], mask: 'rb-exmask', finish: 'glow' },
};
const BLUSH = { warm: 'bl.peach', cool: 'bl.pink', neutral: 'bl.rose', deep: 'bl.berry' };
let step = 0, ans = { goals: [] };

const hasGoal = g => ans.goals.includes(g);
const flow = (goals = ans.goals) => ['goals',
  ...(goals.some(g => g === 'skin' || g === 'makeup') ? ['skin'] : []),
  ...(goals.includes('makeup') ? ['lips', 'tone'] : []),
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
    const light = ans.skin === 'barrier' ? ' ' + t('r.lightlayer') : '';
    html += `<div class="result-cols">
      <div class="routine am"><h4>${t('r.am')}</h4><ol>${r.am.map((id, k) => `<li>${prodLink(add(id))}${k === 0 ? light : ''}</li>`).join('')}</ol></div>
      <div class="routine pm"><h4>${t('r.pm')}</h4><ol>${r.pm.map(id => `<li>${prodLink(add(id))}</li>`).join('')}</ol>
        <p class="weekly"><strong>${t('r.mask')}</strong> ${prodLink(add(r.mask))}</p></div></div>`;
  }
  if (r && hasGoal('makeup')) {
    const cushion = { glow: ['jv-glow'], matte: ['jv-matte'], either: ['jv-glow', 'jv-matte'] }[r.finish];
    const blush = { glow: ['js-blush'], matte: ['nm-blush'], either: ['js-blush', 'nm-blush'] }[r.finish];
    const lip = ['normal', 'some'].includes(ans.lips) ? 'bg-stick' : 'bg-essence';
    html += `<div class="extras"><h4>${t('r.makeupBlock')}</h4><ul>
      <li><strong>${t('r.cushion')}</strong> ${cushion.map(id => prodLink(add(id))).join(' ' + (LANG === 'en' ? 'or' : 'ou') + ' ')}</li>
      <li><strong>${t('r.blushLabel')}</strong> ${blush.map(id => prodLink(add(id))).join(' ' + (LANG === 'en' ? 'or' : 'ou') + ' ')} – <em>${t(BLUSH[ans.tone])}</em></li>
      <li><strong>${t('r.lip')}</strong> ${prodLink(add(lip))}</li>
      ${ans.skin === 'sensitive' ? `<li>${t('r.sens')}</li>` : ''}</ul></div>`;
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
      const ids = quizRoot.dataset.picks.split(',').filter(Boolean);
      hearts = [...new Set([...hearts, ...ids])];
      try { localStorage.setItem('colaro-hearts', JSON.stringify(hearts)); } catch (_) {}
      updateWish(); e.target.textContent = t('r.added'); e.target.disabled = true; break;
    }
  }
});

/* ---------- Forms ---------- */
function mailTo(kind, data) {
  const subject = { vip: 'Inscription VIP COLARO', booking: 'Demande de créneau VIP COLARO' }[kind] || 'Inscription newsletter COLARO';
  const labels = { name: 'Nom', email: 'E-mail', phone: 'Téléphone', experience: 'Expérience', date: 'Jour souhaité', window: 'Moment souhaité', allergies: 'Allergies / sensibilités' };
  const body = Object.keys(data).filter(k => labels[k] && data[k]).map(k => labels[k] + ' : ' + data[k]).join('\n') +
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
  $('#vipSubmit').disabled = !open;
  $('#loopForm button').disabled = !open;
  if (!open) {
    $('#formOk').hidden = false; $('#formOk').textContent = t('f.closed');
    $('#loopMsg').hidden = false; $('#loopMsg').textContent = t('f.closed');
  }
}

$('#vipForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target, err = $('#formError'), ok = $('#formOk');
  const d = Object.fromEntries(new FormData(form));
  form.querySelectorAll('input').forEach(i => i.removeAttribute('aria-invalid'));
  const missing = ['name', 'email'].filter(k => !(d[k] || '').trim());
  let msg = '', bad = missing;
  if (missing.length) msg = t('f.err.fields');
  else if (!validEmail(d.email)) { msg = t('f.err.email'); bad = ['email']; }
  else if (!d.consent) { msg = t('f.err.consent'); bad = ['consent']; }
  if (msg) {
    bad.forEach(k => form.elements[k].setAttribute('aria-invalid', 'true'));
    err.textContent = msg; err.hidden = false; ok.hidden = true;
    form.elements[bad[0]].focus(); return;
  }
  err.hidden = true;
  const btn = $('#vipSubmit'); btn.disabled = true; btn.textContent = t('f.sending');
  try {
    const how = await send('vip', { name: d.name, email: d.email, phone: d.phone, allergies: d.allergies, consent: true, lang: LANG });
    ok.textContent = how === 'mail' ? t('f.ok.mail', { to: CONFIG.contactEmail }) : t('f.ok.vip', { name: d.name.trim().split(' ')[0], email: d.email });
    ok.hidden = false; form.reset();
  } catch (_) { err.textContent = t('f.err.send'); err.hidden = false; }
  btn.disabled = false; btn.textContent = LANG === 'en' ? btn.dataset.en : btn.dataset.frdataen;
});

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
const bk = { step: 0, exp: 'vip', date: null, win: null, name: '', email: '', phone: '', allergies: '', consent: false, done: null, err: '' };
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
  const steps = t('bk.steps');
  const stepper = bk.done ? '' : `<ol class="stepper" aria-label="${steps[bk.step]}">${steps.map((s, i) =>
    `<li class="${i === bk.step ? 'now' : i < bk.step ? 'past' : ''}" ${i === bk.step ? 'aria-current="step"' : ''}><span>${i + 1}</span>${s}</li>`).join('')}</ol>`;
  let body = '';
  if (bk.done) {
    const mail = bk.done === 'mail';
    body = `<div class="bk-done"><h3 tabindex="-1" id="bkHeading">${t(mail ? 'bk.done.mail.title' : 'bk.done.title')}</h3>
      <p>${mail ? t('bk.done.mail', { to: CONFIG.contactEmail }) : t('bk.done', { name: esc(bk.name.split(' ')[0]) })}</p>
      ${recapHTML()}<p class="muted small">${t('bk.nonbinding')}</p>
      <button type="button" class="btn btn-ghost" id="bkAgain">${t('bk.again')}</button></div>`;
  } else if (bk.step === 0) {
    body = `<h3 tabindex="-1" id="bkHeading">${t('bk.exp.title')}</h3>
      <div class="exp-pick" role="group" aria-label="${t('bk.exp.title')}">
        ${['walk', 'vip'].map(k => `<button type="button" class="exp-opt" aria-pressed="${bk.exp === k}" data-exp="${k}">
          <strong>${t('bk.exp.' + k)}</strong><span>${t('bk.exp.' + k + '.s')}</span></button>`).join('')}</div>
      ${bk.exp === 'walk'
        ? `<p class="bk-info">${t('bk.walk.info')}</p><a class="btn btn-pine" href="#visit">${t('bk.address')}</a>`
        : `<button type="button" class="btn btn-berry" data-next>${t('q.next')}</button>`}`;
  } else if (bk.step === 1) {
    body = `<h3 tabindex="-1" id="bkHeading">${t('bk.date.title')}</h3><p class="muted small">${t('bk.date.note')}</p>
      <div class="cals">${calendarHTML()}</div>
      <h3 class="bk-sub">${t('bk.time.title')}</h3>
      <div class="windows" role="group" aria-label="${t('bk.time.title')}">${WINDOWS.map(w =>
        `<button type="button" class="win" aria-pressed="${bk.win === w}" data-win="${w}">${t(w)}</button>`).join('')}</div>
      ${bk.err ? `<p class="form-error" role="alert">${bk.err}</p>` : ''}
      <div class="bk-nav"><button type="button" class="quiz-back" data-prev>${t('r.back')}</button>
        <button type="button" class="btn btn-berry" data-next>${t('q.next')}</button></div>`;
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
  if (el.dataset.exp) { bk.exp = el.dataset.exp; renderBooking(); return; }
  if (el.dataset.date) { bk.date = el.dataset.date; bk.err = ''; renderBooking(); $(`.day[data-date="${bk.date}"]`).focus(); return; }
  if (el.dataset.win) { bk.win = el.dataset.win; bk.err = ''; renderBooking(); $(`.win[data-win="${bk.win}"]`).focus(); return; }
  if (el.dataset.prev !== undefined) return go(bk.step - 1);
  if (el.id === 'bkAgain') { Object.assign(bk, { step: 0, exp: 'vip', date: null, win: null, done: null, err: '' }); return renderBooking(true); }
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

/* ---------- Share (referral concept) ---------- */
$('#shareBtn').addEventListener('click', async e => {
  const data = { title: t('share.title'), text: t('share.text'), url: location.href.split('#')[0] };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(data.url); e.target.textContent = t('share.copied'); setTimeout(() => { e.target.textContent = t('share.btn'); }, 2500); }
  } catch (_) {}
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
  renderTicker(); renderTiles(); renderCatalogue(); renderCarousel(); renderShades(); renderQuiz(); formsState(); updateWish(); renderBooking(); renderWord();
  if ($('#productDialog').open) renderDetail();
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.addEventListener('langchange', renderAll);
applyLang();
startCountdown();
