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
  { id: 'rb-aqua', cat: 'creams', brand: 'Real Barrier', name: 'Aqua Soothing Cream', price: 19.29, c: MINT, note: ['Hydratation apaisante pour les peaux qui tiraillent.', 'Soothing hydration for skin that feels tight.'] },
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
  { id: 'sn-wrap', cat: 'masks', brand: 'S.NATURE', name: 'Aqua Squalane Cream Wrapping Mask, 4 pcs', price: 14.59, c: PEACH, note: ['Un masque au squalane pour peaux sèches et déshydratées. 4 masques.', 'A squalane wrap for dry, dehydrated skin. 4 masks.'] },
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
const PICKS = ['rb-extreme', 'drg-cream', 'wl-ampoule', 'sn-cream', 'sn-serum', 'drg-sun', 'rb-sun', 'fat-water'];

/* Wishlist, shared by the carousel and the catalogue. Stored only in this browser. */
let hearts = [];
try { hearts = JSON.parse(localStorage.getItem('colaro-hearts') || '[]'); } catch (_) {}
const heartBtn = p => `<button class="heart" type="button" aria-pressed="${hearts.includes(p.id)}" aria-label="${t('save', { name: p.name })}" data-id="${p.id}">
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg></button>`;
document.addEventListener('click', e => {
  const b = e.target.closest('.heart'); if (!b) return;
  const on = b.getAttribute('aria-pressed') !== 'true';
  hearts = on ? [...hearts, b.dataset.id] : hearts.filter(x => x !== b.dataset.id);
  document.querySelectorAll(`.heart[data-id="${b.dataset.id}"]`).forEach(h => h.setAttribute('aria-pressed', on));
  try { localStorage.setItem('colaro-hearts', JSON.stringify(hearts)); } catch (_) {}
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
let activeCat = 'all', query = '';
function renderCatalogue() {
  const filters = $('#filters');
  filters.innerHTML = ['all', ...CATS].map(c =>
    `<button type="button" class="chip" data-cat="${c}" aria-pressed="${c === activeCat}">${t('cat.' + c)}</button>`).join('');
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (activeCat === 'all' || p.cat === activeCat) &&
    (!q || (p.brand + ' ' + p.name + ' ' + p.note.join(' ')).toLowerCase().includes(q)));
  $('#grid').innerHTML = list.length ? list.map(p => `
    <article class="product" style="--c:${p.c}">
      <div class="product-top"><p class="brand">${p.brand}</p>${heartBtn(p)}</div>
      <h3>${p.name}</h3>
      <p class="for">${p.note[LANG === 'en' ? 1 : 0]}</p>
      ${priceTag(p)}
    </article>`).join('') : `<p>${t('shop.empty')}</p>`;
}
function goShop(cat, q) {
  activeCat = cat; query = q; renderCatalogue();
  $('#shop').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  activeCat = b.dataset.cat; renderCatalogue();
});
$('#tiles').addEventListener('click', e => { const b = e.target.closest('.tile'); if (b) goShop(b.dataset.cat, ''); });
$('#searchForm').addEventListener('submit', e => { e.preventDefault(); goShop('all', $('#searchInput').value); });

/* ---------- Carousel ---------- */
function renderCarousel() {
  $('#favGrid').innerHTML = PICKS.map(id => PRODUCTS.find(p => p.id === id)).map(p => `
    <article class="fav-card">
      <div class="fav-art" style="--c:${p.c}"><span class="pick">${t('pick')}</span>${heartBtn(p)}${SHAPES[shapeFor(p)]}</div>
      <div class="fav-body"><p class="brand">${p.brand}</p><h3>${p.name}</h3>${priceTag(p)}</div>
    </article>`).join('');
  $('#favPrev').setAttribute('aria-label', t('carousel.prev'));
  $('#favNext').setAttribute('aria-label', t('carousel.next'));
}
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

/* ---------- Skin quiz ---------- */
const QUIZ = [
  { key: 'skin', q: 'q.skin', prefix: 'o.', values: ['dry', 'sensitive', 'normal', 'oily', 'barrier'] },
  { key: 'lips', q: 'q.lips', prefix: 'o.l.', values: ['normal', 'some', 'dry', 'chapped'] },
  { key: 'tone', q: 'q.tone', prefix: 'o.', values: ['warm', 'cool', 'neutral', 'deep'] },
];
const N = {
  wellage: 'WELLAGE Real Hyaluronic Blue 100 Ampoule', snCream: 'S.NATURE Aqua Squalane Moisturizing Cream', snSerum: 'S.NATURE Aqua Squalane Serum',
  rbSun: 'Real Barrier Cera Moisture Barrier Sun Cream', drgCream: 'Dr.G R.E.D Blemish Clear Soothing Cream', drgSun: 'Dr.G Green Mild Up Sun+',
  drgMask: 'Dr.G R.E.D Blemish Cool Soothing Mask', fatCream: 'FATION Nosca9 Trouble Cream', fatSerum: 'FATION Nosca9 Trouble Serum',
  fatMask: 'FATION Nosca9 Trouble Clear Mask', rbCream: 'Real Barrier Extreme Cream', rbMask: 'Real Barrier Extreme Cream Mask',
  aquaMask: 'Real Barrier Aqua Soothing Ampoule Mask', zeroid: 'ZEROID Daily Sun Cream',
};
const ROUTINES = {
  dry: { am: [N.wellage, N.snCream, N.rbSun], pm: [N.wellage, N.snCream], mask: N.aquaMask, finish: 'glow' },
  sensitive: { am: [N.drgCream, N.drgSun], pm: [N.drgCream], mask: N.drgMask, finish: 'glow' },
  normal: { am: [N.snSerum, N.drgCream, N.rbSun], pm: [N.snSerum, N.drgCream], mask: N.aquaMask, finish: 'either' },
  oily: { am: [N.fatSerum, N.fatCream, N.drgSun], pm: [N.fatSerum, N.fatCream], mask: N.fatMask, finish: 'matte' },
  barrier: { am: [N.rbCream + ' ', N.zeroid], pm: [N.rbCream], mask: N.rbMask, finish: 'glow' },
};
const BLUSH = { warm: 'bl.peach', cool: 'bl.pink', neutral: 'bl.rose', deep: 'bl.berry' };
let step = 0, ans = {};

function renderQuiz() {
  const root = $('#quiz');
  if (step >= QUIZ.length) return renderResult(root);
  const q = QUIZ[step];
  root.innerHTML = `
    <div class="quiz-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${QUIZ.length}" aria-valuenow="${step + 1}">
      ${QUIZ.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>
    <h3>${t(q.q)}</h3>
    <div class="options">${q.values.map(v => `<button type="button" class="opt-btn" data-v="${v}">
      <strong>${t(q.prefix + v)}</strong><span>${t(q.prefix + v + '.s')}</span></button>`).join('')}</div>
    ${step ? `<button type="button" class="quiz-back" id="quizBack">${t('r.back')}</button>` : ''}`;
}
function renderResult(root) {
  const r = ROUTINES[ans.skin];
  const f = { glow: [t('f.glow'), t('b.cream')], matte: [t('f.matte'), t('b.powder')], either: [t('f.either'), t('b.either')] }[r.finish];
  const lip = ['normal', 'some'].includes(ans.lips) ? t('lip.stick') : t('lip.essence');
  const light = ans.skin === 'barrier' ? ' ' + t('r.lightlayer') : '';
  root.innerHTML = `<div class="result">
    <h3>${t('r.title', { label: t('o.' + ans.skin) })}</h3>
    <p>${t('need.' + ans.skin)}</p>
    <div class="result-cols">
      <div class="routine am"><h4>${t('r.am')}</h4><ol>
        ${r.am.map((x, i) => `<li>${x.trim()}${i === 0 ? light : ''}</li>`).join('')}
        <li>${f[0]} <small>${t('r.optional')}</small></li></ol></div>
      <div class="routine pm"><h4>${t('r.pm')}</h4><ol>${r.pm.map(x => `<li>${x}</li>`).join('')}</ol>
        <p class="weekly"><strong>${t('r.mask')}</strong> ${r.mask}</p></div>
    </div>
    <div class="extras"><h4>${t('r.extras')}</h4><ul>
      <li>BRING GREEN Bamboo Hyalu ${lip}</li>
      ${ans.skin === 'sensitive' ? `<li>${t('r.sens')}</li>` : ''}
      <li>${t('r.blush')} <strong>${t(BLUSH[ans.tone])}</strong> – ${f[1]}</li></ul></div>
    <p class="muted">${t('r.note')}</p>
    <div class="hero-actions"><a class="btn btn-berry" href="#vip">${t('r.vip')}</a>
      <button type="button" class="btn btn-ghost" id="quizRestart">${t('r.retake')}</button></div></div>`;
}
$('#quiz').addEventListener('click', e => {
  const opt = e.target.closest('.opt-btn');
  if (opt) { ans[QUIZ[step].key] = opt.dataset.v; step++; renderQuiz(); return; }
  if (e.target.id === 'quizBack') { step--; renderQuiz(); }
  if (e.target.id === 'quizRestart') { step = 0; ans = {}; renderQuiz(); }
});

/* ---------- Forms ---------- */
function mailTo(kind, data) {
  const subject = kind === 'vip' ? 'Inscription VIP COLARO' : 'Inscription newsletter COLARO';
  const labels = { name: 'Nom', email: 'E-mail', phone: 'Téléphone', slot: 'Créneau souhaité', allergies: 'Allergies / sensibilités' };
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
  const missing = ['name', 'email', 'slot'].filter(k => !(d[k] || '').trim());
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
    const how = await send('vip', { name: d.name, email: d.email, phone: d.phone, slot: d.slot, allergies: d.allergies, consent: true, lang: LANG });
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

/* ---------- Boot ---------- */
function renderAll() {
  renderTicker(); renderTiles(); renderCatalogue(); renderCarousel(); renderShades(); renderQuiz(); formsState();
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.addEventListener('langchange', renderAll);
applyLang();
startCountdown();
