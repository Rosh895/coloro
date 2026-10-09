/* ---------- Falling petals ---------- */
(() => {
  const box = document.querySelector('.petals');
  if (!box || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    s.style.animationDuration = 9 + Math.random() * 9 + 's';
    s.style.animationDelay = -Math.random() * 16 + 's';
    s.style.transform = `rotate(${Math.random() * 180}deg)`;
    box.appendChild(s);
  }
})();

/* ---------- Product data ---------- */
const MINT = '#A8C3B4', PEACH = '#F9D5C8', BERRY = '#E0607E', LILAC = '#DCD3F2', BUTTER = '#F6E7A8';
const eur = n => n.toFixed(2).replace('.', ',') + ' €';

const PRODUCTS = [
  // Creams
  { cat: 'Creams', brand: 'Real Barrier', name: 'Extreme Cream 50 ml', price: 17.76, c: MINT, note: 'Very dry or barrier-compromised skin. Rich ceramide cream.' },
  { cat: 'Creams', brand: 'Real Barrier', name: 'Aqua Soothing Cream', price: 19.29, c: MINT, note: 'Soothing hydration for skin that feels tight.' },
  { cat: 'Creams', brand: 'Dr.G', name: 'R.E.D Blemish Clear Soothing Cream', price: 17.74, c: MINT, note: 'Sensitive, redness-prone and combination skin.' },
  { cat: 'Creams', brand: 'FATION', name: 'Nosca9 Trouble Cream', price: null, c: MINT, note: 'Oily and blemish-prone skin.' },
  { cat: 'Creams', brand: 'S.NATURE', name: 'Aqua Squalane Moisturizing Cream 60 ml', price: 14.95, c: PEACH, note: 'Dry or dehydrated skin. Day or night.' },
  // Serums
  { cat: 'Serums and cleansers', brand: 'WELLAGE', name: 'Real Hyaluronic Blue 100 Ampoule', price: 9.08, c: PEACH, note: 'Dry or dehydrated skin. A big drink of hydration.' },
  { cat: 'Serums and cleansers', brand: 'S.NATURE', name: 'Aqua Squalane Serum 50 ml', price: 13.14, c: PEACH, note: 'Light hydration for normal and combination skin.' },
  { cat: 'Serums and cleansers', brand: 'FATION', name: 'Nosca9 Trouble Serum', price: null, c: MINT, note: 'Lightweight care for oily, blemish-prone skin.' },
  { cat: 'Serums and cleansers', brand: 'FATION', name: 'Nosca9 Cleansing Water', price: 21.39, c: MINT, note: 'Gentle cleansing for troubled skin.' },
  { cat: 'Serums and cleansers', brand: 'FATION', name: 'Nosca9 Spot Patch', price: 13.80, c: MINT, note: 'For individual blemishes.' },
  // Masks
  { cat: 'Masks', brand: 'Real Barrier', name: 'Aqua Soothing Ampoule Mask', price: 1.80, per: '/ mask', c: PEACH, note: 'Dry, dehydrated and combination skin.' },
  { cat: 'Masks', brand: 'Dr.G', name: 'R.E.D Blemish Cool Soothing Mask', price: 15.88, c: MINT, note: 'Sensitive and redness-prone skin.' },
  { cat: 'Masks', brand: 'FATION', name: 'Nosca9 Trouble Clear Mask', price: 4.47, c: MINT, note: 'Oily and blemish-prone skin.' },
  { cat: 'Masks', brand: 'Real Barrier', name: 'Extreme Cream Mask', price: 14.21, c: MINT, note: 'Very dry skin and barrier repair.' },
  { cat: 'Masks', brand: 'S.NATURE', name: 'Aqua Squalane Cream Wrapping Mask, 4 pcs', price: 14.59, c: PEACH, note: 'A squalane wrap for dry, dehydrated skin.' },
  // Sun
  { cat: 'Sunscreen', brand: 'Real Barrier', name: 'Cera Moisture Barrier Sun Cream', price: 12.26, c: BUTTER, note: 'Dry, dehydrated and combination skin.' },
  { cat: 'Sunscreen', brand: 'Dr.G', name: 'Green Mild Up Sun+', price: 14.71, c: BUTTER, note: 'Sensitive and oily or blemish-prone skin.' },
  { cat: 'Sunscreen', brand: 'ZEROID', name: 'Daily Sun Cream', price: null, c: BUTTER, note: 'Very dry or barrier-compromised skin. A sensitive-skin alternative.' },
  // Lips
  { cat: 'Lips', brand: 'BRING GREEN', name: 'Bamboo Hyalu Lip Essence', price: null, c: BERRY, note: 'Intensive hydration for dry or chapped lips.' },
  { cat: 'Lips', brand: 'BRING GREEN', name: 'Bamboo Hyalu Lip Essence Stick', price: null, c: BERRY, note: 'Everyday hydration for normal lips.' },
  { cat: 'Lips', brand: 'NAMING.', name: 'Over Dew Glossy Lip Tint', price: null, c: BERRY, note: 'Six shades, from nude to deep rose.' },
  // Makeup
  { cat: 'Makeup', brand: 'JAVIN DE SEOUL', name: 'Wink Cushion Glow', price: null, c: BERRY, note: 'Dry, dehydrated or normal skin. Dewy finish.' },
  { cat: 'Makeup', brand: 'JAVIN DE SEOUL', name: 'Wink Cushion Matte', price: null, c: BERRY, note: 'Oily or combination skin. Matte finish.' },
  { cat: 'Makeup', brand: 'JUNGSAEMMOOL', name: 'Liquid / Cream Blush', price: null, c: BERRY, note: 'Dewy colour for dry skin. Four shades.' },
  { cat: 'Makeup', brand: 'NAMING.', name: 'Fluffy Powder Blush', price: null, c: BERRY, note: 'Soft powder finish for oily or combination skin. Four shades.' },
  { cat: 'Makeup', brand: 'JUNGSAEMMOOL', name: 'Touch Up Lash Maker', price: null, c: BERRY, note: 'Natural, everyday mascara.' },
  { cat: 'Makeup', brand: 'NAMING.', name: 'Lash Up Mascara', price: null, c: BERRY, note: 'More length and definition.' },
  // Sleep
  { cat: 'Sleep', brand: 'HAKOAL', name: '100% Mulberry Silk Pillowcase', price: null, c: LILAC, note: '6A-grade mulberry silk, 22 momme.' },
];

/* ---------- Catalogue ---------- */
(() => {
  const cats = ['All', ...new Set(PRODUCTS.map(p => p.cat))];
  const filters = document.getElementById('filters');
  const grid = document.getElementById('grid');
  let active = 'All';

  const render = () => {
    grid.innerHTML = PRODUCTS.filter(p => active === 'All' || p.cat === active).map(p => `
      <article class="product" style="--c:${p.c}">
        <p class="brand">${p.brand}</p>
        <h3>${p.name}</h3>
        <p class="for">${p.note}</p>
        <span class="price ${p.price == null ? 'soon' : ''}">${p.price == null ? 'Price soon' : eur(p.price) + (p.per ? ' ' + p.per : '')}</span>
      </article>`).join('');
    filters.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === active));
  };

  filters.innerHTML = cats.map(c => `<button class="chip" data-cat="${c}" aria-pressed="false">${c}</button>`).join('');
  filters.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    active = b.dataset.cat; render();
  });
  render();
})();

/* ---------- Shades ---------- */
(() => {
  const sw = (list) => list.map(([n, hex, sub]) =>
    `<li><b style="background:${hex}"></b>${n}${sub ? `<small>${sub}</small>` : ''}</li>`).join('');
  document.getElementById('lipShades').innerHTML = sw([
    ['Nude', '#D9A58F'], ['Coral', '#F07A62'], ['Rose pink', '#E98AA3'],
    ['Mauve', '#A8667A'], ['Red', '#C8283C'], ['Deep rose / brown', '#7A3B3F']]);
  document.getElementById('blushShades').innerHTML = sw([
    ['Peach / coral', '#F5A58A', 'Warm undertones'], ['Soft pink', '#F2A9C0', 'Cool undertones'],
    ['Rose', '#D9788F', 'Neutral undertones'], ['Deep rose / berry', '#A5385B', 'Deeper complexions']]);
})();

/* ---------- Skin quiz ---------- */
(() => {
  const root = document.getElementById('quiz');

  const QUESTIONS = [
    { key: 'skin', title: 'How does your skin feel most days?', options: [
      ['dry', 'Dry or dehydrated', 'Tight, flaky, or dull by afternoon'],
      ['sensitive', 'Sensitive or redness-prone', 'Stings or flushes easily'],
      ['normal', 'Normal or combination', 'A little shine in the T-zone, comfortable elsewhere'],
      ['oily', 'Oily or blemish-prone', 'Shiny, with breakouts'],
      ['barrier', 'Very dry, barrier-compromised', 'Raw, rough, or reactive to most products'],
    ]},
    { key: 'lips', title: 'And your lips?', options: [
      ['normal', 'Normal', 'Comfortable most of the time'],
      ['some', 'Occasionally dry', 'Dry in cold weather or after a long day'],
      ['dry', 'Dry or dehydrated', 'Often tight or flaky'],
      ['chapped', 'Very dry or chapped', 'Cracked or sore'],
    ]},
    { key: 'tone', title: 'Which undertone is closest to yours?', options: [
      ['warm', 'Warm', 'Gold jewellery suits you. Veins look greenish.'],
      ['cool', 'Cool', 'Silver jewellery suits you. Veins look bluish.'],
      ['neutral', 'Neutral', 'Both suit you, or you are not sure'],
      ['deep', 'Deeper complexion', 'Rich, deep skin tones'],
    ]},
  ];

  const P = {
    wellage: 'WELLAGE Real Hyaluronic Blue 100 Ampoule',
    snCream: 'S.NATURE Aqua Squalane Moisturizing Cream',
    snSerum: 'S.NATURE Aqua Squalane Serum',
    rbSun: 'Real Barrier Cera Moisture Barrier Sun Cream',
    drgCream: 'Dr.G R.E.D Blemish Clear Soothing Cream',
    drgSun: 'Dr.G Green Mild Up Sun+',
    drgMask: 'Dr.G R.E.D Blemish Cool Soothing Mask',
    fatCream: 'FATION Nosca9 Trouble Cream',
    fatSerum: 'FATION Nosca9 Trouble Serum',
    fatMask: 'FATION Nosca9 Trouble Clear Mask',
    rbCream: 'Real Barrier Extreme Cream',
    rbMask: 'Real Barrier Extreme Cream Mask',
    aquaMask: 'Real Barrier Aqua Soothing Ampoule Mask',
    zeroid: 'ZEROID Daily Sun Cream',
  };

  const SKIN = {
    dry: { label: 'Dry or dehydrated', need: 'Hydration plus barrier support.',
      am: [P.wellage, P.snCream, P.rbSun], pm: [P.wellage, P.snCream], mask: P.aquaMask, finish: 'glow' },
    sensitive: { label: 'Sensitive or redness-prone', need: 'Gentle, soothing products that support the barrier.',
      am: [P.drgCream, P.drgSun], pm: [P.drgCream], mask: P.drgMask, finish: 'glow' },
    normal: { label: 'Normal or combination', need: 'Lightweight hydration and a balanced routine.',
      am: [P.snSerum, P.drgCream, P.rbSun], pm: [P.snSerum, P.drgCream], mask: P.aquaMask, finish: 'either' },
    oily: { label: 'Oily or blemish-prone', need: 'Lightweight, soothing, problem-care products.',
      am: [P.fatSerum, P.fatCream, P.drgSun], pm: [P.fatSerum, P.fatCream], mask: P.fatMask, finish: 'matte' },
    barrier: { label: 'Very dry, barrier-compromised', need: 'Ceramides and a richer moisturiser.',
      am: [P.rbCream + ' (light layer)', P.zeroid], pm: [P.rbCream], mask: P.rbMask, finish: 'glow' },
  };

  const LIPS = {
    normal: 'BRING GREEN Bamboo Hyalu Lip Essence Stick – everyday hydration',
    some: 'BRING GREEN Bamboo Hyalu Lip Essence Stick – everyday hydration',
    dry: 'BRING GREEN Bamboo Hyalu Lip Essence – intensive hydration',
    chapped: 'BRING GREEN Bamboo Hyalu Lip Essence – intensive hydration',
  };

  const BLUSH = {
    warm: 'Peach / coral', cool: 'Soft pink', neutral: 'Rose', deep: 'Deep rose / berry',
  };

  let step = 0; const ans = {};

  const progress = () => `<div class="quiz-progress" aria-hidden="true">${
    QUESTIONS.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;

  function renderQuestion() {
    const q = QUESTIONS[step];
    root.innerHTML = `${progress()}
      <h3>${q.title}</h3>
      <div class="options">${q.options.map(([v, t, s]) =>
        `<button class="opt-btn" data-v="${v}"><strong>${t}</strong><span>${s}</span></button>`).join('')}</div>
      ${step ? '<button class="quiz-back" id="back">Back</button>' : ''}`;
  }

  function renderResult() {
    const s = SKIN[ans.skin];
    const sensitiveLips = ans.skin === 'sensitive'
      ? '<li>Check your ingredient sensitivities with our team before choosing a lip product.</li>' : '';
    const finish = s.finish === 'glow'
      ? ['JAVIN DE SEOUL Wink Cushion Glow', 'JUNGSAEMMOOL Liquid / Cream Blush']
      : s.finish === 'matte'
      ? ['JAVIN DE SEOUL Wink Cushion Matte', 'NAMING. Fluffy Powder Blush']
      : ['JAVIN DE SEOUL Wink Cushion Glow, or Matte if your T-zone shines', 'JUNGSAEMMOOL cream blush for dewy, or NAMING. powder blush for soft matte'];
    root.innerHTML = `<div class="result">
      <h3>Your skin: ${s.label}</h3>
      <p>${s.need}</p>
      <div class="result-cols">
        <div class="routine am"><h4>Morning</h4><ol>
          ${s.am.map(x => `<li>${x}</li>`).join('')}
          <li>${finish[0]} <small>Optional makeup</small></li></ol></div>
        <div class="routine pm"><h4>Evening</h4><ol>
          ${s.pm.map(x => `<li>${x}</li>`).join('')}</ol>
          <p style="margin:12px 0 0"><strong>Once or twice a week:</strong> ${s.mask}</p></div>
      </div>
      <div class="extras"><h4>For lips and cheeks</h4><ul>
        <li>${LIPS[ans.lips]}</li>${sensitiveLips}
        <li>Blush shade: <strong>${BLUSH[ans.tone]}</strong> – ${finish[1]}</li></ul></div>
      <p class="muted">This is a first guide. Book your free in-store skin test to confirm it.</p>
      <div class="hero-actions" style="justify-content:flex-start">
        <a class="btn btn-pine" href="#guest">Register for VIP access</a>
        <button class="btn btn-ghost" id="restart">Retake the quiz</button>
      </div></div>`;
  }

  root.addEventListener('click', e => {
    const opt = e.target.closest('.opt-btn');
    if (opt) {
      ans[QUESTIONS[step].key] = opt.dataset.v;
      step++;
      step < QUESTIONS.length ? renderQuestion() : renderResult();
      root.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.target.id === 'back') { step--; renderQuestion(); }
    else if (e.target.id === 'restart') { step = 0; renderQuestion(); }
  });
  renderQuestion();
})();

/* ---------- VIP form ---------- */
(() => {
  const form = document.getElementById('vipForm');
  const err = document.getElementById('formError');
  const ok = document.getElementById('formOk');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const missing = ['name', 'email', 'slot'].filter(k => !d[k].trim());
    const badEmail = d.email && !/^\S+@\S+\.\S+$/.test(d.email);
    form.querySelectorAll('input').forEach(i => i.removeAttribute('aria-invalid'));
    if (missing.length || badEmail) {
      (badEmail ? ['email'] : missing).forEach(k => form.elements[k].setAttribute('aria-invalid', 'true'));
      err.textContent = badEmail ? 'Enter a valid email address.' : 'Fill in your name, email and preferred day and time.';
      err.hidden = false; ok.hidden = true;
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    err.hidden = true;
    try {
      const list = JSON.parse(localStorage.getItem('coloro-vip') || '[]');
      list.push({ ...d, at: new Date().toISOString() });
      localStorage.setItem('coloro-vip', JSON.stringify(list));
    } catch (_) {}
    ok.textContent = `Thank you, ${d.name.trim().split(' ')[0]}. You are on the VIP list. We will email ${d.email} with your slot.`;
    ok.hidden = false; form.reset();
  });
})();
