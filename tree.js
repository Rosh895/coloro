/* COLARO – "Watch Your Beauty Journey Bloom"
   A lightweight SVG cherry-blossom tree that grows smoothly with the status-points balance.

   Usage:
     const tree = ColaroTree.mount(document.getElementById('box'), { points: 120 });
     tree.setPoints(180);      // grows smoothly from the current drawing to the new balance
     tree.celebrate();         // a few falling petals (does nothing when reduced motion is on)
     ColaroTree.levelFor(120)  // { key: 'glow', name: 'Glow', min: 100, next: 250, progress: 0.13 }

   The tree only DRAWS a number it is given. It never stores, adds or changes points. */
(function () {
  'use strict';

  /* ---------- levels (status points) ---------- */
  const LEVELS = [
    { key: 'bloom', name: 'Bloom', min: 0, next: 100 },
    { key: 'glow', name: 'Glow', min: 100, next: 250 },
    { key: 'star', name: 'Seoul Star', min: 250, next: null },
  ];
  function levelFor(points) {
    const p = Math.max(0, Math.floor(Number(points) || 0));
    let lv = LEVELS[0];
    for (const l of LEVELS) if (p >= l.min) lv = l;
    const progress = lv.next ? Math.min(1, (p - lv.min) / (lv.next - lv.min)) : 1;
    return { key: lv.key, name: lv.name, min: lv.min, next: lv.next, progress, toNext: lv.next ? lv.next - p : 0, rank: LEVELS.indexOf(lv) };
  }

  /* ---------- growth curve: smooth through the milestones, monotone (no wobble) ---------- */
  const ANCHORS = [[0, 0], [10, 0.1], [50, 0.34], [100, 0.6], [150, 0.8], [250, 1]];
  const xs = ANCHORS.map(a => a[0]), ys = ANCHORS.map(a => a[1]);
  const slopes = (() => { // Fritsch–Carlson monotone cubic
    const n = xs.length, d = [], m = [];
    for (let i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
      const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
    }
    return m;
  })();
  function growth(points) {
    const p = Math.max(0, Number(points) || 0);
    if (p >= xs[xs.length - 1]) return 1;
    let i = 0; while (p > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (p - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return ys[i] * (2 * t3 - 3 * t2 + 1) + h * slopes[i] * (t3 - 2 * t2 + t) + ys[i + 1] * (-2 * t3 + 3 * t2) + h * slopes[i + 1] * (t3 - t2);
  }

  /* ---------- small helpers ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const clamp01 = x => Math.max(0, Math.min(1, x));
  const smooth = x => { x = clamp01(x); return x * x * (3 - 2 * x); };
  const ramp = (g, a, b) => smooth((g - a) / (b - a));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rng = seed => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const reduced = () => { if (window.ColaroTree && window.ColaroTree.reducedOverride != null) return window.ColaroTree.reducedOverride; try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; } };
  let uid = 0;

  /* ---------- the tree drawing ---------- */
  const TRUNK = 'M200 404 C196 366 207 332 201 300 C197 276 205 256 200 240 C198 226 202 215 200 205';
  const TRUNK_G = [0.03, 0.36];
  // [path, width, growFrom, growTo]  (grow ranges are in "growth" units 0..1, and start after the trunk reaches the attach point)
  const BRANCHES = [
    ['M201 300 C170 292 140 270 108 214', 8, 0.24, 0.46],
    ['M200 286 C232 276 262 252 298 196', 8, 0.27, 0.48],
    ['M201 252 C176 236 158 200 146 142', 7, 0.33, 0.54],
    ['M200 242 C226 226 250 196 262 134', 7, 0.36, 0.56],
    ['M200 207 C193 178 200 132 206 96', 7, 0.38, 0.60],
    ['M108 214 C88 200 66 176 56 132', 5, 0.46, 0.66],
    ['M298 196 C318 182 338 156 346 116', 5, 0.48, 0.68],
    ['M146 142 C132 126 120 100 119 70', 4, 0.56, 0.74],
    ['M262 134 C276 120 290 94 292 62', 4, 0.58, 0.76],
    ['M206 96 C218 82 230 62 232 38', 4, 0.62, 0.80],
    ['M197 166 C178 150 168 124 160 94', 4, 0.54, 0.72],
    ['M223 223 C246 222 272 208 304 216', 4, 0.60, 0.78],
    ['M180 232 C158 232 120 240 90 254', 4, 0.50, 0.70],
  ];

  function mount(container, options) {
    options = options || {};
    const id = 'ct' + (++uid), rand = rng(7);
    container.classList.add('ctree');
    container.innerHTML = '';
    const svg = el('svg', { viewBox: '0 0 400 460', role: 'img', class: 'ctree-svg', focusable: 'false' }, container);
    const title = el('title', {}, svg); svg.appendChild(title);
    const defs = el('defs', {}, svg);

    const glowG = el('radialGradient', { id: id + 'g', cx: '50%', cy: '42%', r: '55%' }, defs);
    el('stop', { offset: '0', 'stop-color': '#F8D3E0', 'stop-opacity': '.9' }, glowG); el('stop', { offset: '1', 'stop-color': '#F8D3E0', 'stop-opacity': '0' }, glowG);
    const soilG = el('linearGradient', { id: id + 's', x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#CFE2D8' }, soilG); el('stop', { offset: '1', 'stop-color': '#A8C3B4' }, soilG);
    // two blossom styles: light and deeper pink (same five-petal shape as the COLARO logo)
    const petal = 'M0 0 C-14 -9 -17 -30 -8 -38 L0 -32 L8 -38 C17 -30 14 -9 0 0Z';
    [['L', '#F7D4DF', '#E0607E'], ['D', '#F2B3C7', '#C94868']].forEach(([k, c, ctr]) => {
      const s = el('symbol', { id: id + 'f' + k, viewBox: '-44 -44 88 88' }, defs);
      const g = el('g', { fill: c }, s);
      for (let i = 0; i < 5; i++) el('path', { d: petal, transform: `rotate(${i * 72})` }, g);
      el('circle', { r: 6.5, fill: ctr }, s); el('circle', { r: 3, fill: '#fff', opacity: '.55' }, s);
    });

    // background glow + ground
    const glow = el('circle', { cx: 200, cy: 170, r: 190, fill: `url(#${id}g)`, opacity: 0 }, svg);
    el('ellipse', { cx: 200, cy: 418, rx: 150, ry: 26, fill: '#2F3B37', opacity: '.08' }, svg);
    el('ellipse', { cx: 200, cy: 410, rx: 138, ry: 24, fill: `url(#${id}s)` }, svg);
    el('path', { d: 'M150 408 q4 -12 8 0 M172 412 q3 -9 6 0 M232 410 q4 -12 8 0 M254 408 q3 -9 6 0', stroke: '#7FA891', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, svg);

    const sway = el('g', { class: 'ctree-sway' }, svg);
    const seed = el('g', {}, sway);
    el('ellipse', { cx: 200, cy: 404, rx: 7, ry: 4.5, fill: '#6B4A3E' }, seed);
    el('path', { d: 'M200 402 q3 -6 7 -7', stroke: '#7FA891', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, seed);

    const wood = '#6B4A3E';
    const trunk = el('path', { d: TRUNK, pathLength: 1, fill: 'none', stroke: wood, 'stroke-width': 13, 'stroke-linecap': 'round', 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, sway);
    const trunkLen = trunk.getTotalLength();
    const flare = el('path', { d: 'M184 408 Q196 396 200 380 Q204 396 216 408Z', fill: wood, opacity: 0 }, sway);

    const branches = BRANCHES.map(([d, w, a, b]) => {
      const p = el('path', { d, pathLength: 1, fill: 'none', stroke: wood, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, opacity: 0 }, sway);
      return { p, a, b, len: p.getTotalLength() };
    });

    // leaves: tip pair (seedling) + leaves along the trunk and a few on branch tips
    const leafPath = 'M0 0 C6 -4 14 -4 20 0 C14 5 6 5 0 0Z';
    const tip = el('g', {}, sway);
    const tipLeaves = [-28, 208].map(r => { const g = el('g', { transform: `rotate(${r})` }, tip); el('path', { d: leafPath, fill: '#8DB89F', stroke: '#6B9A83', 'stroke-width': 1 }, g); return g; });
    const leaves = [];
    [[0.5, -1], [0.62, 1], [0.76, -1], [0.88, 1]].forEach(([f, side], i) => {
      const pt = trunk.getPointAtLength(trunkLen * f);
      const g = el('g', { transform: `translate(${pt.x} ${pt.y}) rotate(${side < 0 ? 200 : -20 + (i % 2) * 6}) scale(1.05)` }, sway);
      const inner = el('g', {}, g); el('path', { d: leafPath, fill: '#8DB89F', stroke: '#6B9A83', 'stroke-width': 1 }, inner);
      leaves.push({ g: inner, a: TRUNK_G[0] + (TRUNK_G[1] - TRUNK_G[0]) * f + 0.01, b: TRUNK_G[0] + (TRUNK_G[1] - TRUNK_G[0]) * f + 0.08, keep: true });
    });
    branches.slice(5, 10).forEach((br, i) => {
      const pt = br.p.getPointAtLength(br.len * 0.95);
      const g = el('g', { transform: `translate(${pt.x} ${pt.y}) rotate(${-90 + (i % 2 ? 30 : -30)}) scale(.9)` }, sway);
      const inner = el('g', {}, g); el('path', { d: leafPath, fill: '#8DB89F', stroke: '#6B9A83', 'stroke-width': 1 }, inner);
      leaves.push({ g: inner, a: br.b - 0.02, b: br.b + 0.06, keep: false });
    });

    // buds then blossoms, placed along the outer part of each branch
    const buds = [], flowers = [];
    branches.forEach((br, bi) => {
      if (bi === 0 && false) return;
      const n = bi < 5 ? 4 : 5;
      for (let k = 0; k < n; k++) {
        const t = 0.45 + 0.55 * ((k + rand() * 0.6) / n);
        const pt = br.p.getPointAtLength(br.len * Math.min(1, t));
        const ox = (rand() - 0.5) * 22, oy = (rand() - 0.5) * 20 - 4;
        const x = pt.x + ox, y = pt.y + oy;
        const a = Math.max(0.44, br.b - 0.1) + rand() * 0.42, b = a + 0.1;
        const size = 17 + rand() * 11, rot = rand() * 72;
        const bud = el('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` }, sway);
        const bi2 = el('g', {}, bud); el('ellipse', { cx: 0, cy: -4, rx: 2.8, ry: 4.6, fill: '#E889A5', stroke: '#C94868', 'stroke-width': 0.8 }, bi2);
        buds.push({ g: bi2, a: a - 0.1, b: a, out: b });
        const f = el('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})` }, sway);
        const fi = el('g', {}, f);
        el('use', { href: '#' + id + 'f' + (rand() > 0.35 ? 'L' : 'D'), x: -size, y: -size, width: size * 2, height: size * 2 }, fi);
        flowers.push({ g: fi, a, b });
      }
    });
    // a canopy of tiny extra blossoms for the last stretch (full bloom)
    for (let k = 0; k < 16; k++) {
      const br = branches[5 + Math.floor(rand() * 8)], pt = br.p.getPointAtLength(br.len * (0.3 + rand() * 0.7));
      const x = pt.x + (rand() - 0.5) * 40, y = pt.y + (rand() - 0.5) * 34, size = 10 + rand() * 6;
      const f = el('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rand() * 72).toFixed(0)})` }, sway);
      const fi = el('g', {}, f);
      el('use', { href: '#' + id + 'f' + (rand() > 0.5 ? 'L' : 'D'), x: -size, y: -size, width: size * 2, height: size * 2 }, fi);
      const a = 0.72 + rand() * 0.2; flowers.push({ g: fi, a, b: a + 0.08 });
    }
    const petalsLayer = el('g', { class: 'ctree-petals', 'aria-hidden': 'true' }, svg);

    /* ---------- drawing for a given growth value ---------- */
    let shown = -1;
    function render(g) {
      shown = g;
      const c = smooth(g / 0.5);
      svg.setAttribute('viewBox', `${(130 * (1 - c)).toFixed(1)} ${(280 * (1 - c)).toFixed(1)} ${(140 + 260 * c).toFixed(1)} ${(161 + 299 * c).toFixed(1)}`);
      glow.setAttribute('opacity', (0.75 * ramp(g, 0.6, 1)).toFixed(3));
      const sd = 1 - ramp(g, 0.0, 0.05);
      seed.setAttribute('opacity', sd.toFixed(3));
      const tv = ramp(g, TRUNK_G[0], TRUNK_G[1]);
      trunk.setAttribute('stroke-dashoffset', (1 - tv).toFixed(4));
      trunk.setAttribute('opacity', tv > 0.002 ? 1 : 0);
      flare.setAttribute('opacity', (0.9 * ramp(g, 0.1, 0.3)).toFixed(3));
      // tip leaves follow the top of the growing stem, then fade as branches take over
      const tpt = trunk.getPointAtLength(trunkLen * Math.max(0.001, tv));
      const ts = ramp(g, 0.01, 0.09) * (1 - ramp(g, 0.28, 0.4));
      tip.setAttribute('transform', `translate(${tpt.x.toFixed(2)} ${tpt.y.toFixed(2)}) scale(${(0.05 + 0.95 * ts).toFixed(3)})`);
      tip.setAttribute('opacity', ts.toFixed(3));
      branches.forEach(br => {
        const v = ramp(g, br.a, br.b);
        br.p.setAttribute('stroke-dashoffset', (1 - v).toFixed(4));
        br.p.setAttribute('opacity', v > 0.002 ? 1 : 0);
      });
      leaves.forEach(l => {
        const v = ramp(g, l.a, l.b), fade = l.keep ? 1 - 0.7 * ramp(g, 0.6, 0.95) : 1 - 0.55 * ramp(g, 0.7, 1);
        l.g.setAttribute('transform', `scale(${(0.15 + 0.85 * v).toFixed(3)})`);
        l.g.setAttribute('opacity', (v * fade).toFixed(3));
      });
      buds.forEach(b => {
        const v = ramp(g, b.a, b.a + 0.08), gone = ramp(g, b.a + 0.06, b.out + 0.02);
        b.g.setAttribute('transform', `scale(${(0.3 + 0.7 * v).toFixed(3)})`);
        b.g.setAttribute('opacity', (v * (1 - gone)).toFixed(3));
      });
      flowers.forEach(f => {
        const v = ramp(g, f.a, f.b);
        f.g.setAttribute('transform', `scale(${(0.08 + 0.92 * v).toFixed(3)})`);
        f.g.setAttribute('opacity', v.toFixed(3));
      });
    }

    /* ---------- smooth animation of the shown value ---------- */
    let points = 0, raf = 0;
    function describe() {
      const lv = levelFor(points);
      title.textContent = `COLARO Beauty Passport: ${points} points, level ${lv.name}`;
    }
    function setPoints(p, opts) {
      opts = opts || {};
      points = Math.max(0, Math.floor(Number(p) || 0));
      describe();
      const target = growth(points);
      cancelAnimationFrame(raf);
      if (opts.animate === false || reduced() && !opts.force || options.animate === false || shown < 0) { render(target); return; }
      const from = shown, delta = Math.abs(target - from);
      if (delta < 0.0005) { render(target); return; }
      const dur = Math.min(2600, 700 + delta * 3600), t0 = performance.now();
      const step = now => {
        const t = clamp01((now - t0) / dur);
        render(from + (target - from) * ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    /* ---------- falling petals for a milestone ---------- */
    function celebrate() {
      if (reduced() && !options.forceMotion) return false;
      const cols = ['#F7D4DF', '#F2B3C7', '#FBE3EA', '#E889A5'];
      for (let i = 0; i < 26; i++) {
        const x = 40 + Math.random() * 320, y = 20 + Math.random() * 120, s = 0.8 + Math.random() * 0.9;
        const p = el('path', { d: 'M0 0 C5 -4 11 -3 14 3 C9 9 3 8 0 0Z', fill: cols[i % cols.length], opacity: 0, transform: `translate(${x} ${y}) scale(${s})` }, petalsLayer);
        const dx = (Math.random() - 0.5) * 90, drop = 330 + Math.random() * 90, r0 = Math.random() * 90, r1 = r0 + 160 + Math.random() * 200;
        const anim = p.animate([
          { opacity: 0, transform: `translate(${x}px,${y}px) rotate(${r0}deg) scale(${s})` },
          { opacity: 0.95, offset: 0.12 },
          { opacity: 0.9, offset: 0.8 },
          { opacity: 0, transform: `translate(${x + dx}px,${y + drop}px) rotate(${r1}deg) scale(${s})` },
        ], { duration: 3600 + Math.random() * 2800, delay: Math.random() * 900, easing: 'cubic-bezier(.35,.1,.5,1)', fill: 'forwards' });
        anim.onfinish = () => p.remove();
      }
      return true;
    }

    setPoints(options.points || 0, { animate: false });
    return {
      setPoints,
      celebrate,
      get points() { return points; },
      level: () => levelFor(points),
      destroy() { cancelAnimationFrame(raf); container.innerHTML = ''; },
    };
  }

  window.ColaroTree = { mount, levelFor, growth, LEVELS, reducedOverride: null };
})();
