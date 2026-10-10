/* Language handling.
   - French is the default and is written directly in index.html (good for search engines).
   - English for those elements lives in data-en / data-en-ph / data-en-aria attributes.
   - Strings created by JavaScript use T[key] = [french, english] and t(key). */

let LANG = 'fr';
try { const s = localStorage.getItem('colaro-lang'); if (s === 'en' || s === 'fr') LANG = s; } catch (_) {}

const t = (key, vars) => {
  const pair = T[key];
  let s = pair ? pair[LANG === 'en' ? 1 : 0] : key;
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  // French typography: non-breaking space before : ; ! ? and in "10 h"
  if (typeof s === 'string' && LANG === 'fr') s = s.replace(/ ([:;!?»])/g, '\u00a0$1').replace(/« /g, '«\u00a0').replace(/(\d) h\b/g, '$1\u00a0h');
  return s;
};

function applyLang() {
  const en = LANG === 'en';
  document.documentElement.lang = LANG;
  [['data-en', null], ['data-en-ph', 'placeholder'], ['data-en-aria', 'aria-label']].forEach(([attr, target]) => {
    document.querySelectorAll('[' + attr + ']').forEach(el => {
      const store = 'fr' + attr.replace(/-/g, '');
      if (el.dataset[store] === undefined) el.dataset[store] = target ? (el.getAttribute(target) || '') : el.textContent;
      const value = en ? el.getAttribute(attr) : el.dataset[store];
      if (target) el.setAttribute(target, value); else el.textContent = value;
    });
  });
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    if (meta.dataset.fr === undefined) meta.dataset.fr = meta.content;
    meta.content = en ? meta.dataset.enDesc : meta.dataset.fr;
  }
  if (document.documentElement.dataset.frTitle === undefined) document.documentElement.dataset.frTitle = document.title;
  document.title = en ? document.documentElement.dataset.enTitle : document.documentElement.dataset.frTitle;
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === LANG));
  document.dispatchEvent(new Event('langchange'));
}

function setLang(l) {
  LANG = l;
  try { localStorage.setItem('colaro-lang', l); } catch (_) {}
  applyLang();
}

/* ---------- Strings used by JavaScript: [français, English] ---------- */
const T = {
  /* categories */
  'cat.all': ['Tout', 'All'], 'cat.creams': ['Crèmes', 'Creams'], 'cat.serums': ['Sérums et nettoyants', 'Serums and cleansers'],
  'cat.masks': ['Masques', 'Masks'], 'cat.sun': ['Solaires', 'Sunscreen'], 'cat.lips': ['Lèvres', 'Lips'],
  'cat.makeup': ['Maquillage', 'Makeup'], 'cat.sleep': ['Sommeil', 'Sleep'],
  /* shop */
  'price.soon': ['Prix bientôt', 'Price soon'], 'per.mask': ['/ masque', '/ mask'],
  'shop.empty': ['Aucun produit ne correspond à ces filtres.', 'No products match these filters.'],
  'shop.reset': ['Réinitialiser les filtres', 'Reset filters'],
  'pick': ['sélection', 'pick'], 'save': ['Enregistrer {name}', 'Save {name}'],
  'carousel.prev': ['Produits précédents', 'Previous products'], 'carousel.next': ['Produits suivants', 'Next products'],
  'sk.all': ['Toutes peaux', 'All skin types'], 'sk.dry': ['Sèche', 'Dry'], 'sk.sensitive': ['Sensible', 'Sensitive'],
  'sk.normal': ['Normale / mixte', 'Normal / combination'], 'sk.oily': ['Grasse', 'Oily'], 'sk.barrier': ['Très sèche', 'Very dry'],
  'shade.pick': ['Choisir une teinte', 'Choose a shade'], 'shade.count': ['{n} teintes', '{n} shades'],
  'shop.count': ['{n} produits', '{n} products'], 'shop.count1': ['1 produit', '1 product'],
  'pd.skin': ['Convient aux peaux :', 'Suits skin types:'],
  'pd.try': ['À découvrir et à essayer au pop-up, 64 rue de Turenne.', 'To discover and try at the pop-up, 64 rue de Turenne.'],
  'w.empty': ['Votre liste est vide. Touchez le cœur d’un produit pour l’enregistrer.', 'Your list is empty. Tap the heart on a product to save it.'],
  'w.copy': ['Copier ma liste', 'Copy my list'], 'w.copied': ['Liste copiée !', 'List copied!'], 'w.mail': ['Envoyer par e-mail', 'Send by email'],
  'w.note': ['Cette liste est enregistrée sur votre appareil. Ce n’est pas une réservation.', 'This list is saved on your device. It is not a reservation.'],
  'w.head': ['Ma liste COLARO', 'My COLARO list'],
  'w.foot': ['À retrouver au pop-up : 64 rue de Turenne, Paris, du 1er mars au 1er avril 2027, de 10 h à 18 h.', 'Find them at the pop-up: 64 rue de Turenne, Paris, 1 March – 1 April 2027, 10am – 6pm.'],
  'r.shop': ['Voir les produits adaptés', 'See matching products'],
  /* shades */
  'lip.nude': ['Nude', 'Nude'], 'lip.coral': ['Corail', 'Coral'], 'lip.rose': ['Rose', 'Rose pink'],
  'lip.mauve': ['Mauve', 'Mauve'], 'lip.red': ['Rouge', 'Red'], 'lip.deep': ['Rose profond / brun', 'Deep rose / brown'],
  'bl.peach': ['Pêche / corail', 'Peach / coral'], 'bl.pink': ['Rose tendre', 'Soft pink'], 'bl.rose': ['Rose', 'Rose'], 'bl.berry': ['Rose profond / baie', 'Deep rose / berry'],
  'bl.warm': ['Sous-tons chauds', 'Warm undertones'], 'bl.cool': ['Sous-tons froids', 'Cool undertones'],
  'bl.neutral': ['Sous-tons neutres', 'Neutral undertones'], 'bl.deep': ['Teints plus foncés', 'Deeper complexions'],
  /* quiz */
  'q.goals': ['Que souhaitez-vous découvrir ?', 'What would you like to discover?'],
  'q.goals.hint': ['Plusieurs choix possibles.', 'You can choose several.'],
  'g.skin': ['Soin du visage', 'Facial skincare'], 'g.skin.s': ['Une routine matin et soir', 'A morning and evening routine'],
  'g.makeup': ['Maquillage et lèvres', 'Makeup and lips'], 'g.makeup.s': ['Cushion, blush et soin des lèvres', 'Cushion, blush and lip care'],
  'g.scalp': ['Cuir chevelu', 'Scalp'], 'g.scalp.s': ['Test et massage au lounge VIP', 'Test and massage in the VIP lounge'],
  'q.scalp': ['Comment est votre cuir chevelu ?', 'How does your scalp feel?'],
  'o.sc.normal': ['Confortable', 'Comfortable'], 'o.sc.normal.s': ['Ni tiraillements, ni démangeaisons', 'No tightness, no itching'],
  'o.sc.dry': ['Sec ou qui tiraille', 'Dry or tight'], 'o.sc.dry.s': ['Sensation de tiraillement ou de peau sèche', 'A feeling of tightness or dry skin'],
  'o.sc.oily': ['Qui graisse vite', 'Quickly oily'], 'o.sc.oily.s': ['Cheveux gras au bout d’un jour ou deux', 'Hair feels oily after a day or two'],
  'o.sc.itchy': ['Sensible ou qui démange', 'Sensitive or itchy'], 'o.sc.itchy.s': ['Démangeaisons ou sensation d’inconfort', 'Itching or discomfort'],
  'sc.title': ['Votre cuir chevelu : {label}', 'Your scalp: {label}'],
  'sc.text': ['Le test du cuir chevelu du lounge VIP permet d’en parler avec notre équipe. Il est suivi d’un massage du cuir chevelu par Seoul Salon.', 'The scalp test in the VIP lounge lets you talk it through with our team. It is followed by a scalp massage by Seoul Salon.'],
  'sc.itchy': ['En cas d’irritation ou de démangeaisons persistantes, consultez un professionnel de santé.', 'If irritation or itching persists, see a health professional.'],
  'sc.vip': ['Accéder au lounge VIP', 'Get VIP lounge access'],
  'p.step': ['Étape {n} sur {total}', 'Step {n} of {total}'], 'q.next': ['Continuer', 'Continue'],
  'r.add': ['Ajouter la routine à ma liste', 'Add this routine to my list'], 'r.added': ['Ajoutée à votre liste !', 'Added to your list!'],
  'r.skinBlock': ['Votre routine', 'Your routine'], 'r.makeupBlock': ['Maquillage et lèvres', 'Makeup and lips'],
  'r.cushion': ['Cushion :', 'Cushion:'], 'r.lip': ['Lèvres :', 'Lips:'], 'r.blushLabel': ['Blush :', 'Blush:'],
  'q.skin': ['Comment est votre peau au quotidien ?', 'How does your skin feel most days?'],
  'q.lips': ['Et vos lèvres ?', 'And your lips?'],
  'q.tone': ['Quel sous-ton se rapproche le plus du vôtre ?', 'Which undertone is closest to yours?'],
  'o.dry': ['Sèche ou déshydratée', 'Dry or dehydrated'], 'o.dry.s': ['Tiraillements, teint terne dans l’après-midi', 'Tight, flaky, or dull by afternoon'],
  'o.sensitive': ['Sensible ou sujette aux rougeurs', 'Sensitive or redness-prone'], 'o.sensitive.s': ['Picotements ou rougeurs faciles', 'Stings or flushes easily'],
  'o.normal': ['Normale ou mixte', 'Normal or combination'], 'o.normal.s': ['Un peu de brillance sur la zone T, confortable ailleurs', 'A little shine in the T-zone, comfortable elsewhere'],
  'o.oily': ['Grasse ou sujette aux imperfections', 'Oily or blemish-prone'], 'o.oily.s': ['Brillante, avec des boutons', 'Shiny, with breakouts'],
  'o.barrier': ['Très sèche, barrière cutanée fragilisée', 'Very dry, barrier-compromised'], 'o.barrier.s': ['À vif, rugueuse ou réactive à la plupart des produits', 'Raw, rough, or reactive to most products'],
  'o.l.normal': ['Normales', 'Normal'], 'o.l.normal.s': ['Confortables la plupart du temps', 'Comfortable most of the time'],
  'o.l.some': ['Parfois sèches', 'Occasionally dry'], 'o.l.some.s': ['Sèches par temps froid ou après une longue journée', 'Dry in cold weather or after a long day'],
  'o.l.dry': ['Sèches ou déshydratées', 'Dry or dehydrated'], 'o.l.dry.s': ['Souvent tiraillées ou qui pèlent', 'Often tight or flaky'],
  'o.l.chapped': ['Très sèches ou gercées', 'Very dry or chapped'], 'o.l.chapped.s': ['Craquelées ou douloureuses', 'Cracked or sore'],
  'o.warm': ['Chaud', 'Warm'], 'o.warm.s': ['Les bijoux dorés vous vont bien. Veines plutôt vertes.', 'Gold jewellery suits you. Veins look greenish.'],
  'o.cool': ['Froid', 'Cool'], 'o.cool.s': ['Les bijoux argentés vous vont bien. Veines plutôt bleues.', 'Silver jewellery suits you. Veins look bluish.'],
  'o.neutral': ['Neutre', 'Neutral'], 'o.neutral.s': ['Les deux vous vont, ou vous hésitez', 'Both suit you, or you are not sure'],
  'o.deep': ['Teint plus foncé', 'Deeper complexion'], 'o.deep.s': ['Carnations riches et profondes', 'Rich, deep skin tones'],
  'need.dry': ['Hydratation et soutien de la barrière cutanée.', 'Hydration plus barrier support.'],
  'need.sensitive': ['Des soins doux et apaisants qui soutiennent la barrière cutanée.', 'Gentle, soothing products that support the barrier.'],
  'need.normal': ['Une hydratation légère et une routine équilibrée.', 'Lightweight hydration and a balanced routine.'],
  'need.oily': ['Des textures légères et apaisantes, pour peaux à imperfections.', 'Lightweight, soothing, problem-care products.'],
  'need.barrier': ['Des céramides et une crème plus riche.', 'Ceramides and a richer moisturiser.'],
  'r.title': ['Votre peau : {label}', 'Your skin: {label}'],
  'r.am': ['Matin', 'Morning'], 'r.pm': ['Soir', 'Evening'],
  'r.mask': ['Une à deux fois par semaine :', 'Once or twice a week:'],
  'r.optional': ['Maquillage facultatif', 'Optional makeup'],
  'r.extras': ['Pour les lèvres et les joues', 'For lips and cheeks'],
  'r.lightlayer': ['(couche légère)', '(light layer)'],
  'r.sens': ['Vérifiez vos sensibilités aux ingrédients avec notre équipe avant de choisir un produit pour les lèvres.', 'Check your ingredient sensitivities with our team before choosing a lip product.'],
  'r.blush': ['Teinte de blush :', 'Blush shade:'],
  'r.note': ['Ceci est une première piste. Le test de peau offert sur place la confirmera.', 'This is a first guide. The free in-store skin test will confirm it.'],
  'r.vip': ['Rejoindre la liste VIP', 'Join the VIP list'], 'r.retake': ['Refaire le quiz', 'Retake the quiz'], 'r.back': ['Retour', 'Back'],
  'lip.stick': ['Lip Essence Stick – hydratation au quotidien', 'Lip Essence Stick – everyday hydration'],
  'lip.essence': ['Lip Essence – hydratation intense', 'Lip Essence – intensive hydration'],
  'f.glow': ['Wink Cushion Glow', 'Wink Cushion Glow'], 'f.matte': ['Wink Cushion Matte', 'Wink Cushion Matte'],
  'f.either': ['Wink Cushion Glow, ou Matte si votre zone T brille', 'Wink Cushion Glow, or Matte if your T-zone shines'],
  'b.cream': ['blush liquide / crème JUNGSAEMMOOL', 'JUNGSAEMMOOL liquid / cream blush'],
  'b.powder': ['blush poudre NAMING. Fluffy Powder Blush', 'NAMING. Fluffy Powder Blush'],
  'b.either': ['blush crème JUNGSAEMMOOL pour un fini éclatant, ou poudre NAMING. pour un fini mat doux', 'JUNGSAEMMOOL cream blush for dewy, or NAMING. powder blush for soft matte'],
  /* passport + share */
  'pp.count': ['Aperçu : {n} sur 4 étapes', 'Preview: {n} of 4 stops'],
  'share.title': ['COLARO – Pop-up K-beauty à Paris', 'COLARO – K-beauty pop-up in Paris'],
  'share.text': ['Découvre COLARO, le pop-up K-beauty à Paris (du 1er mars au 1er avril 2027) !', 'Discover COLARO, the K-beauty pop-up in Paris (1 March – 1 April 2027)!'],
  'share.copied': ['Lien copié !', 'Link copied!'], 'share.btn': ['Partager COLARO', 'Share COLARO'],
  /* booking */
  'bk.steps': [['Expérience', 'Date et heure', 'Coordonnées', 'Récapitulatif'], ['Experience', 'Date and time', 'Details', 'Summary']],
  'bk.exp.title': ['Quelle visite souhaitez-vous ?', 'Which visit would you like?'],
  'bk.exp.walk': ['Visite libre', 'Walk-in visit'], 'bk.exp.walk.s': ['Sans réservation. Test de peau, roue de la chance et passeport.', 'No booking needed. Skin test, spinning wheel and passport.'],
  'bk.exp.vip': ['Lounge VIP', 'VIP lounge'], 'bk.exp.vip.s': ['Sur demande. Tout le parcours, plus le test et le massage du cuir chevelu au lounge VIP.', 'On request. The full experience, plus the scalp test and massage in the VIP lounge.'],
  'bk.walk.info': ['Pas besoin de réserver : passez nous voir du 1er mars au 1er avril 2027, de 10 h à 18 h, au 64 rue de Turenne.', 'No need to book: drop by from 1 March to 1 April 2027, 10am to 6pm, at 64 rue de Turenne.'],
  'bk.date.title': ['Quel jour vous conviendrait ?', 'Which day suits you?'],
  'bk.date.note': ['Le pop-up est ouvert de 10 h à 18 h. Choisissez un jour : nous confirmerons selon les disponibilités.', 'The pop-up is open 10am to 6pm. Pick a day: we will confirm depending on availability.'],
  'bk.time.title': ['À quel moment de la journée ?', 'What time of day?'],
  'bk.w1': ['Matin · 10 h – 12 h', 'Morning · 10am – 12pm'], 'bk.w2': ['Midi · 12 h – 14 h', 'Midday · 12pm – 2pm'],
  'bk.w3': ['Après-midi · 14 h – 16 h', 'Afternoon · 2pm – 4pm'], 'bk.w4': ['Fin de journée · 16 h – 18 h', 'Late afternoon · 4pm – 6pm'],
  'bk.month.2': ['mars 2027', 'March 2027'], 'bk.month.3': ['avril 2027', 'April 2027'],
  'bk.days': [['L', 'M', 'M', 'J', 'V', 'S', 'D'], ['M', 'T', 'W', 'T', 'F', 'S', 'S']],
  'bk.details': ['Vos coordonnées', 'Your details'], 'bk.name': ['Nom', 'Name'], 'bk.email': ['E-mail', 'Email'],
  'bk.phone': ['Téléphone (facultatif)', 'Phone (optional)'], 'bk.allergies': ['Allergies ou sensibilités (facultatif)', 'Allergies or sensitivities (optional)'],
  'bk.consent': ['J’accepte que COLARO utilise mes coordonnées pour répondre à ma demande. Je peux me rétracter à tout moment.', 'I agree that COLARO uses my details to answer my request. I can withdraw at any time.'],
  'bk.review': ['Vérifiez votre demande', 'Check your request'],
  'bk.l.exp': ['Expérience', 'Experience'], 'bk.l.date': ['Jour souhaité', 'Preferred day'], 'bk.l.time': ['Moment souhaité', 'Preferred time'],
  'bk.l.name': ['Nom', 'Name'], 'bk.l.email': ['E-mail', 'Email'],
  'bk.nonbinding': ['Il s’agit d’une demande : le créneau n’est réservé qu’après notre confirmation par e-mail.', 'This is a request: the slot is only booked once we confirm by email.'],
  'bk.send': ['Envoyer ma demande', 'Send my request'],
  'bk.err.slot': ['Choisissez un jour et un moment pour continuer.', 'Choose a day and a time to continue.'],
  'bk.done.mail.title': ['Plus qu’un clic !', 'One more click!'],
  'bk.done.mail': ['Votre application e-mail s’ouvre avec votre demande. Envoyez le message pour qu’elle nous parvienne. Si rien ne s’ouvre, écrivez-nous à {to}.', 'Your email app is opening with your request. Send the message so it reaches us. If nothing opens, write to us at {to}.'],
  'bk.done.title': ['Demande envoyée', 'Request sent'],
  'bk.done': ['Merci {name} ! Nous revenons vers vous par e-mail. Ce n’est pas encore une réservation confirmée.', 'Thank you {name}! We will come back to you by email. This is not a confirmed booking yet.'],
  'bk.address': ['Voir l’adresse', 'See the address'],
  'bk.again': ['Faire une autre demande', 'Make another request'],
  /* forms */
  'f.err.fields': ['Renseignez votre nom et votre e-mail.', 'Fill in your name and email.'],
  'f.err.email': ['Saisissez une adresse e-mail valide.', 'Enter a valid email address.'],
  'f.err.consent': ['Cochez la case de consentement pour continuer.', 'Tick the consent box to continue.'],
  'f.err.send': ['L’envoi a échoué. Réessayez dans un instant.', 'Sending failed. Please try again in a moment.'],
  'f.ok.vip': ['Merci {name} ! Votre inscription VIP a bien été envoyée. Nous vous écrirons à {email}.', 'Thank you {name}! Your VIP registration was sent. We will write to {email}.'],
  'f.ok.loop': ['Merci ! Vous recevrez les dates d’ouverture dès qu’elles seront connues.', 'Thank you! You will get the opening dates as soon as they are known.'],
  'f.ok.mail': ['Votre application e-mail s’ouvre avec votre demande : envoyez le message pour finaliser. Sinon, écrivez-nous à {to}.', 'Your email app is opening with your request: send the message to finish. Otherwise, write to us at {to}.'],
  'f.closed': ['Les inscriptions ouvrent très bientôt.', 'Registrations open very soon.'],
  'f.sending': ['Envoi…', 'Sending…'],
  /* countdown */
  'cd.d': ['jours', 'days'], 'cd.h': ['heures', 'hours'], 'cd.m': ['minutes', 'minutes'],
  'cd.open': ['Le pop-up est ouvert !', 'The pop-up is open!'],
  'cd.label': ['Ouverture dans', 'Opening in'],
  /* ticker */
  'tick': [['콜라로', 'Test de peau offert', '물광 피부', 'Lounge VIP', '두피 케어', 'K-beauty à Paris', '촉촉', '1er mars – 1er avril 2027'],
           ['콜라로', 'Free skin test', '물광 피부', 'VIP lounge', '두피 케어', 'K-beauty in Paris', '촉촉', '1 March – 1 April 2027']],
  'ring': ['TEST DE PEAU OFFERT ✿ 무료 피부 진단 ✿ ', 'FREE SKIN TEST ✿ 무료 피부 진단 ✿ '],
};
