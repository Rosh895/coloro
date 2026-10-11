/* COLARO Beauty Passport (digital stamp card).
   Stamps are saved only on the visitor's phone. Each stamp is validated by a team member who types the code
   of that stop. The codes are stored here only as SHA-256 hashes. This is a fun pop-up mechanic, not a secure
   system: the team checks the screen before handing out the gift. */
const STOP_HASHES = ["37f1c526e0c1832a9f7e880700280fc477cf0129c807f4273a6692e22a539d01", "5a23d0d9cc85734ca5f9f7e1a59d0e5790af612ab635fbda0d0552d9c455beb0", "2c103dcf38b1d0d34ed9940c4b4c27a088f7d1950109b8022cb4072cfd64f6f6", "79d1a699835a8db2b9af7b662533c3027c042571dc76b3d3d335b774d37d824a"];
const STORE = 'colaro-passport';

Object.assign(T, {
  'p.count': ['{n} tampons sur 4', '{n} of 4 stamps'],
  'p.count1': ['{n} tampon sur 4', '{n} of 4 stamps'],
  's1.t': ['1 · Photobooth K-pop', '1 · K-pop photo booth'], 's1.d': ['Prenez la pose dans un décor K-pop, puis faites valider votre tampon.', 'Strike a pose in a K-pop setting, then get your stamp validated.'],
  's2.t': ['2 · Roue de la chance', '2 · Spinning wheel'], 's2.d': ['Tournez la roue et tentez votre chance, puis faites valider votre tampon.', 'Spin the wheel and try your luck, then get your stamp validated.'],
  's3.t': ['3 · Instagram', '3 · Instagram'], 's3.d': ['Suivez COLARO sur Instagram pour tenter de gagner un produit, puis montrez-le à l’équipe.', 'Follow COLARO on Instagram for a chance to win a product, then show the team.'],
  's3.n': ['Notre compte sera annoncé prochainement.', 'Our account will be announced soon.'],
  's4.t': ['4 · Cadeau surprise', '4 · Surprise gift'], 's4.d': ['Réunissez les tampons 1, 2 et 3, puis passez récupérer votre cadeau surprise.', 'Collect stamps 1, 2 and 3, then come and pick up your surprise gift.'],
  'p.validate': ['Faire valider', 'Get validated'], 'p.claim': ['Récupérer mon cadeau', 'Claim my gift'],
  'p.done': ['✓ Tampon validé', '✓ Stamp validated'], 'p.gifted': ['✓ Cadeau remis', '✓ Gift handed over'],
  'p.locked': ['Réunissez d’abord les tampons 1, 2 et 3.', 'Collect stamps 1, 2 and 3 first.'],
  'p.pin.t': ['Valider : {stop}', 'Validate: {stop}'], 'p.pin.h': ['Un membre de l’équipe COLARO saisit le code de ce poste.', 'A COLARO team member enters this stop’s code.'],
  'p.pin.bad': ['Code incorrect. Réessayez.', 'Wrong code. Please try again.'], 'p.pin.wait': ['Trop d’essais. Patientez {s} secondes.', 'Too many tries. Please wait {s} seconds.'],
  'p.pin.short': ['Saisissez le code à 4 chiffres.', 'Enter the 4-digit code.'],
  'p.full.t': ['Bravo, votre passeport est complet !', 'Well done, your passport is complete!'], 'p.full.d': ['Votre cadeau surprise a été remis. Merci d’être passé(e) chez COLARO.', 'Your surprise gift has been handed over. Thank you for visiting COLARO.'],
  'p.reset.ask': ['Réinitialiser le passeport sur ce téléphone ?', 'Reset the passport on this phone?'],
});

const ICONS = {
  camera: '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="37" width="48" height="33" rx="6"/><circle cx="50" cy="54" r="10"/><path d="M38 37l4-8h16l4 8"/></g>',
  wheel: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="54" r="24"/><path d="M50 30v48M26 54h48M33 37l34 34M67 37L33 71"/><path d="M45 22h10l-5 10z" fill="currentColor"/></g>',
  at: '<text x="50" y="68" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="52" fill="none" stroke="currentColor" stroke-width="1.8">@</text>',
  gift: '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="50" width="40" height="24" rx="3"/><rect x="26" y="40" width="48" height="12" rx="3"/><path d="M50 40v34"/><path d="M50 40c-5-13-20-10-16-3 3 5 11 3 16 3zm0 0c5-13 20-10 16-3-3 5-11 3-16 3z"/></g>',
};
const STOPS = [
  { key: 's1', icon: 'camera', fill: '#FDEEE8', stroke: '#F2B8A2', ink: '#D98A72' },
  { key: 's2', icon: 'wheel', fill: '#F1ECFA', stroke: '#BFB0E6', ink: '#8D7BCB' },
  { key: 's3', icon: 'at', fill: '#FCE9EE', stroke: '#EFA3B8', ink: '#D8506F' },
  { key: 's4', icon: 'gift', fill: '#E8F2EC', stroke: '#A8C3B4', ink: '#6E9A80' },
];

const $ = (s, r = document) => r.querySelector(s);
let state = { stamps: [false, false, false, false], rot: [-8, 6, -5, 9] };
try { const s = JSON.parse(localStorage.getItem(STORE)); if (s && Array.isArray(s.stamps) && s.stamps.length === 4) state = { ...state, ...s }; } catch (_) {}
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (_) {} };
let fresh = -1, pinFor = -1, wrong = 0, lockedUntil = 0;

function flowerSVG(st, stamped, i) {
  const n = 8, R = 40, d = R * .62, r = R * .52, c = 50, parts = [];
  for (let k = 0; k < n; k++) { const a = 2 * Math.PI * k / n - Math.PI / 2; parts.push(`<circle cx="${(c + d * Math.cos(a)).toFixed(1)}" cy="${(c + d * Math.sin(a)).toFixed(1)}" r="${r + 1.6}" fill="${st.stroke}"/>`); }
  parts.push(`<circle cx="${c}" cy="${c}" r="${d + 1.6}" fill="${st.stroke}"/>`);
  for (let k = 0; k < n; k++) { const a = 2 * Math.PI * k / n - Math.PI / 2; parts.push(`<circle cx="${(c + d * Math.cos(a)).toFixed(1)}" cy="${(c + d * Math.sin(a)).toFixed(1)}" r="${r}" fill="${st.fill}"/>`); }
  parts.push(`<circle cx="${c}" cy="${c}" r="${d}" fill="${st.fill}"/>`);
  const icon = `<g style="color:${st.ink}" opacity="${stamped ? .25 : .6}">${ICONS[st.icon]}</g>`;
  const mark = stamped ? `<g class="stamp-mark" style="--rot:${state.rot[i]}deg;transform-origin:50px 50px">
      <circle cx="50" cy="50" r="31" fill="rgba(255,255,255,.55)" stroke="${st.ink}" stroke-width="2.6"/><circle cx="50" cy="50" r="26" fill="none" stroke="${st.ink}" stroke-width="1"/>
      <use href="#blossom" x="35" y="35" width="30" height="30"/>
      <text x="50" y="23.5" text-anchor="middle" font-size="7.5" font-weight="700" letter-spacing="1.6" fill="${st.ink}" font-family="Pretendard Variable, sans-serif">COLARO</text>
      <text x="50" y="82" text-anchor="middle" font-size="7" font-weight="700" letter-spacing="1.6" fill="${st.ink}" font-family="Pretendard Variable, sans-serif">PARIS</text></g>` : '';
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${parts.join('')}${icon}${mark}</svg>`;
}

function render() {
  const n = state.stamps.filter(Boolean).length, first3 = state.stamps.slice(0, 3).every(Boolean);
  $('#ppDots').innerHTML = [1, 2, 3, 4].map((x, i) => `<span class="pp-dot${state.stamps[i] ? ' on' : ''}">${state.stamps[i] ? '✿' : x}</span>`).join('');
  $('#ppCount').textContent = t(n <= 1 ? 'p.count1' : 'p.count', { n });
  $('#ppBar').setAttribute('aria-valuenow', n);
  $('#stops').innerHTML = STOPS.map((st, i) => {
    const done = state.stamps[i], locked = i === 3 && !first3 && !done;
    let action;
    if (done) action = `<span class="stop-done">${t(i === 3 ? 'p.gifted' : 'p.done')}</span>`;
    else if (locked) action = `<p class="small">${t('p.locked')}</p>`;
    else action = `<button type="button" class="stop-btn" data-stop="${i}">${t(i === 3 ? 'p.claim' : 'p.validate')}</button>`;
    return `<li class="stop${locked ? ' locked' : ''}${fresh === i ? ' fresh' : ''}">
      <div class="stop-art">${flowerSVG(st, done, i)}</div>
      <div><h2>${t(st.key + '.t')}</h2><p>${t(st.key + '.d')}</p>${i === 2 && !done ? `<p class="small">${t('s3.n')}</p>` : ''}${action}</div></li>`;
  }).join('') + (n === 4 ? `<li class="pp-celebrate"><h2>${t('p.full.t')}</h2><p>${t('p.full.d')}</p></li>` : '');
  fresh = -1;
}

async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function openPin(i) {
  pinFor = i; $('#pinInput').value = ''; $('#pinMsg').hidden = true;
  $('#pinTitle').textContent = t('p.pin.t', { stop: t(STOPS[i].key + '.t') }); $('#pinHelp').textContent = t('p.pin.h');
  $('#pinDialog').showModal(); $('#pinInput').focus();
}
$('#stops').addEventListener('click', e => { const b = e.target.closest('[data-stop]'); if (b) openPin(+b.dataset.stop); });
$('#pinForm').addEventListener('submit', async e => {
  e.preventDefault();
  const msg = $('#pinMsg'), pin = $('#pinInput').value.trim(); msg.hidden = false;
  const wait = Math.ceil((lockedUntil - Date.now()) / 1000);
  if (wait > 0) { msg.textContent = t('p.pin.wait', { s: wait }); return; }
  if (!/^\d{4}$/.test(pin)) { msg.textContent = t('p.pin.short'); return; }
  if ((await sha(`colaro|${pinFor}|${pin}`)) === STOP_HASHES[pinFor]) {
    state.stamps[pinFor] = true; save(); wrong = 0; fresh = pinFor; msg.hidden = true; msg.textContent = ''; $('#pinDialog').close(); render();
  } else {
    wrong++; $('#pinInput').value = '';
    if (wrong >= 5) { lockedUntil = Date.now() + 30000; wrong = 0; msg.textContent = t('p.pin.wait', { s: 30 }); } else msg.textContent = t('p.pin.bad');
    $('#pinInput').focus();
  }
});
document.addEventListener('click', e => {
  const c = e.target.closest('[data-close]'); if (c) c.closest('dialog').close(); else if (e.target.tagName === 'DIALOG') e.target.close();
});
$('#ppReset').addEventListener('click', () => {
  if (!confirm(t('p.reset.ask'))) return;
  state = { stamps: [false, false, false, false], rot: state.rot }; save(); render();
});
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.addEventListener('langchange', render);
applyLang();
