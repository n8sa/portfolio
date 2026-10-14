// My Digital Workspace — core behaviour (no framework).
// Everything works without WebGL; the 3D studio is a lazy-loaded enhancement.

const DATA_URL = 'data/projects.json';
const EMAIL = 'farahnisasyahindah@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/farahnisasyahindah';

const CATEGORY_LABELS = {
  professional: 'Professional',
  client: 'Client work',
  'ai-automation': 'AI & Automation',
  experiments: 'Experiment',
  concept: 'Concept',
};

// "Professional" filter also covers client work.
const FILTERS = {
  featured: (p) => p.featured,
  all: () => true,
  professional: (p) => ['professional', 'client'].includes(p.category),
  'ai-automation': (p) => p.category === 'ai-automation',
  experiments: (p) => p.category === 'experiments',
  concept: (p) => p.category === 'concept',
};

const HOTSPOTS = {
  computer: {
    kicker: 'Computer', title: 'Websites',
    intro: 'Production websites and microsites, built for real audiences.',
    filter: FILTERS.professional,
  },
  robot: {
    kicker: 'Robot', title: 'AI & automation',
    intro: 'Prototypes and tools that use AI to take repetitive work off people’s plates.',
    filter: FILTERS['ai-automation'],
  },
  notebook: { kicker: 'Notebook', title: 'About me', view: 'about' },
  console: {
    kicker: 'Console', title: 'Experiments',
    intro: 'Small apps I build and ship on my own time.',
    filter: FILTERS.experiments,
  },
  wall: {
    kicker: 'Pinboard', title: 'Every project',
    intro: 'Everything in one place — client work, AI tools and personal experiments.',
    filter: FILTERS.all,
  },
  certs: { kicker: 'Frame', title: 'Certifications', view: 'certs' },
  poster: { kicker: 'Poster', title: 'Why hire me', view: 'why' },
  mail: { kicker: 'Mail', title: 'Say hi', view: 'contact' },
};

// Case-study fields, in template order. Missing ones are listed honestly as "still being written up".
const CASE_FIELDS = [
  ['problem', 'Problem'],
  ['role', 'My role'],
  ['approach', 'Approach'],
  ['implementation', 'Implementation'],
  ['challenges', 'Technical challenges'],
  ['outcomes', 'Outcomes'],
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

let projects = [];
let world = null; // 3D controller, once loaded

/* ---------- Helpers ---------- */

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

const pad = (n) => String(n).padStart(2, '0');

function statusGroup(status = '') {
  const s = status.toLowerCase();
  if (/\b(live|deployed)\b/.test(s)) return 'live';
  if (/prototype|testing|staging|developed|integrated/.test(s)) return 'progress';
  if (/planning|design|concept/.test(s)) return 'planning';
  return 'other';
}

const statusEl = (status, tag = 'span', cls = '') =>
  el(tag, { class: `status ${cls}`.trim(), 'data-group': statusGroup(status), text: status || 'Status to confirm' });

function isSafeUrl(url) {
  if (typeof url !== 'string') return false;
  try {
    const { protocol } = new URL(url, window.location.href);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

const newTab = { target: '_blank', rel: 'noopener noreferrer' };
const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '');

/* ---------- Index ---------- */

let activeFilter = 'featured';

function renderIndex() {
  const list = document.querySelector('[data-grid]');
  const count = document.querySelector('[data-count]');
  const visible = projects.filter(FILTERS[activeFilter]);

  list.replaceChildren(...(visible.length
    ? visible.map((p, i) => indexRow(p, i))
    : [el('li', { class: 'row-empty', text: 'Nothing here yet.' })]));
  count.textContent = `${visible.length} of ${projects.length} projects`;
}

function indexRow(project, i) {
  const category = CATEGORY_LABELS[project.category] || project.category;
  const row = el('button', {
    class: 'row', type: 'button', 'aria-haspopup': 'dialog',
    onclick: (e) => openProject(project.id, e.currentTarget),
  },
  el('span', { class: 'row-num', text: pad(i + 1) }),
  el('span', {},
    el('span', { class: 'row-title', text: project.title }),
    el('span', { class: 'row-meta' }, el('span', { text: category }), statusEl(project.status))),
  el('span', { class: 'row-cat', text: category }),
  statusEl(project.status, 'span', 'row-status'),
  el('span', { class: 'row-arrow', 'aria-hidden': 'true', text: '→' }));

  const image = project.images?.[0];
  if (image) {
    row.addEventListener('pointerenter', (e) => showPeek(image.src, e));
    row.addEventListener('pointermove', movePeek);
    row.addEventListener('pointerleave', hidePeek);
  }

  return el('li', {},
    el('div', { class: 'row-item' },
      row,
      isSafeUrl(project.url)
        ? el('a', { class: 'row-live', href: project.url, ...newTab },
          'Live ↗', el('span', { class: 'visually-hidden', text: ` — ${project.title} (opens in a new tab)` }))
        : el('span', { class: 'row-live', 'aria-hidden': 'true' })));
}

function setupFilters() {
  const wrap = document.querySelector('[data-filters]');
  wrap.hidden = false;
  wrap.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      wrap.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      renderIndex();
    });
  });
}

// Screenshot that follows the cursor over index rows (mouse only).
const peek = document.querySelector('[data-peek]');
function showPeek(src, e) {
  if (!finePointer.matches) return;
  peek.src = src;
  peek.classList.add('is-visible');
  movePeek(e);
}
function movePeek(e) {
  if (!peek.classList.contains('is-visible')) return;
  const x = Math.min(e.clientX + 24, window.innerWidth - 300);
  const y = Math.min(e.clientY - 90, window.innerHeight - 200);
  peek.style.transform = `translate(${x}px, ${y}px)`;
}
function hidePeek() { peek.classList.remove('is-visible'); }

/* ---------- Panel ---------- */

const drawer = document.querySelector('[data-drawer]');
const drawerTitle = drawer.querySelector('#drawer-title');
const drawerKicker = drawer.querySelector('[data-drawer-kicker]');
const drawerBody = drawer.querySelector('[data-drawer-body]');
const drawerBack = drawer.querySelector('[data-drawer-back]');
let drawerTrigger = null;
let drawerHistory = [];
let albumStep = null; // set while a project album is showing

function showView(view, { push = true } = {}) {
  if (push) drawerHistory.push(view);
  albumStep = null;
  const { kicker, title, content } = buildView(view);
  drawerKicker.textContent = kicker || '';
  drawerTitle.textContent = title;
  drawerBody.replaceChildren(...content);
  drawerBody.scrollTop = 0;
  drawerBack.hidden = drawerHistory.length < 2;
  syncUrl(view);

  if (!drawer.open) {
    document.documentElement.classList.add('is-locked');
    hidePeek();
    drawer.showModal();
  }
  drawerTitle.focus({ preventScroll: true });
}

function openDrawer(view, trigger) {
  drawerTrigger = trigger || document.activeElement;
  drawerHistory = [];
  showView(view);
}

function openProject(id, trigger) {
  if (!projects.some((p) => p.id === id)) return;
  openDrawer({ type: 'project', id }, trigger);
}

function openHotspot(key, trigger) {
  if (!HOTSPOTS[key]) return;
  world?.focus(key);
  openDrawer({ type: 'hotspot', key }, trigger);
}

function closeDrawer() {
  if (drawer.open) drawer.close();
}

drawer.addEventListener('close', () => {
  document.documentElement.classList.remove('is-locked');
  world?.release();
  drawerHistory = [];
  albumStep = null;
  syncUrl(null);
  if (drawerTrigger && document.contains(drawerTrigger)) drawerTrigger.focus({ preventScroll: true });
  drawerTrigger = null;
});
drawer.querySelector('[data-drawer-close]').addEventListener('click', closeDrawer);
drawerBack.addEventListener('click', () => {
  drawerHistory.pop();
  showView(drawerHistory[drawerHistory.length - 1], { push: false });
});
drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
drawer.addEventListener('keydown', (e) => {
  if (!albumStep || e.target.closest('input, textarea, select')) return;
  if (e.key === 'ArrowLeft') albumStep(-1);
  if (e.key === 'ArrowRight') albumStep(1);
});

function buildView(view) {
  if (view.type === 'project') return buildProject(projects.find((p) => p.id === view.id));
  const spot = HOTSPOTS[view.key];
  if (spot.view === 'about') return buildAbout(spot);
  if (spot.view === 'contact') return buildContact(spot);
  if (spot.view === 'why') return buildWhy(spot);
  if (spot.view === 'certs') return buildCerts(spot);
  return buildList(spot);
}

function buildList(spot) {
  const items = projects.filter(spot.filter);
  return {
    kicker: spot.kicker,
    title: spot.title,
    content: [
      el('p', { class: 'panel-intro', text: spot.intro }),
      el('ol', { class: 'plist' },
        items.map((p, i) => el('li', {},
          el('button', { type: 'button', onclick: () => showView({ type: 'project', id: p.id }) },
            el('span', { class: 'row-num', text: pad(i + 1) }),
            el('span', {}, el('strong', { text: p.title }), statusEl(p.status)),
            el('span', { 'aria-hidden': 'true', text: '→' }))))),
    ],
  };
}

function buildAbout(spot) {
  return {
    kicker: spot.kicker,
    title: spot.title,
    content: [
      el('p', { class: 'panel-intro', text: 'I started out in enterprise IT — automation, Azure, back-end and infrastructure — and now build interactive websites and AI-assisted tools.' }),
      el('dl', { class: 'pfacts' },
        factRow('2025 →', 'Interactive microsites, a website and AI editorial tools for Astro AWANI'),
        factRow('2024', 'Data, dashboards, UI/UX and AI workflows'),
        factRow('2020', 'Fujitsu, Parkson, Petronas Digital — automation, Azure, back-end, infrastructure support'),
        factRow('2017', 'UiTM')),
      el('div', { class: 'pactions' },
        el('a', { class: 'pill pill-ink', href: '#about', onclick: closeDrawer }, 'Read more'),
        el('a', { class: 'pill', href: `mailto:${EMAIL}?subject=Resume%20request` }, 'Request my resume')),
    ],
  };
}

// Reuses the "Why hire me" section from the page, so the copy lives in one place.
function buildWhy(spot) {
  const list = document.querySelector('[data-why]').cloneNode(true);
  list.removeAttribute('data-why');
  list.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  wireProjectLinks(list, true);
  list.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      const target = document.querySelector(a.getAttribute('href'));
      requestAnimationFrame(() => target?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
    });
  });
  return {
    kicker: spot.kicker,
    title: spot.title,
    content: [
      list,
      el('div', { class: 'pactions' },
        el('a', { class: 'pill pill-ink', href: 'film.html' }, '▶ Watch the film'),
        el('a', { class: 'pill', href: `mailto:${EMAIL}?subject=Hiring%20enquiry` }, 'Get in touch'),
        el('a', { class: 'pill', href: `mailto:${EMAIL}?subject=Resume%20request` }, 'Request my resume')),
    ],
  };
}

// Featured certifications, read from the same data file as the section.
let certData = null;
const CERT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function buildCerts(spot) {
  const list = el('ol', { class: 'plist' });
  const intro = el('p', { class: 'panel-intro', text: 'Always curious, always learning. Here are the highlights:' });
  const seeAll = el('a', { class: 'pill pill-ink', href: '#certifications' }, 'See all certifications');
  seeAll.addEventListener('click', (e) => {
    e.preventDefault();
    closeDrawer();
    requestAnimationFrame(() => document.getElementById('certifications')
      .scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
  });

  certData ??= fetch('data/certifications.json').then((r) => (r.ok ? r.json() : null)).catch(() => null);
  certData.then((data) => {
    if (!data) { intro.textContent = 'Certifications could not be loaded right now.'; return; }
    const all = data.certifications || [];
    const featured = all.filter((c) => c.featured).sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
    const types = data.types || {};
    seeAll.textContent = `See all ${all.length} certifications`;
    list.replaceChildren(...featured.map((c, i) => el('li', {},
      el('div', { class: 'plist-static' },
        el('span', { class: 'row-num', text: pad(i + 1) }),
        el('span', {},
          el('strong', { text: c.title }),
          el('span', { class: 'plist-meta', text: `${c.issuer} · ${CERT_MONTHS[c.issuedMonth - 1]} ${c.issuedYear} · ${types[c.credentialType] || c.credentialType}` }))))));
  });

  return {
    kicker: spot.kicker,
    title: spot.title,
    content: [intro, list, el('div', { class: 'pactions' }, seeAll,
      el('a', { class: 'pill', href: 'https://www.linkedin.com/in/farahnisasyahindah/details/certifications/', ...newTab }, 'Verify on LinkedIn ↗'))],
  };
}

// "?project=<id>" links open the case study in the panel instead of reloading the page.
function wireProjectLinks(root, inPanel = false) {
  root.querySelectorAll('a[data-project]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!projects.some((p) => p.id === a.dataset.project)) return;
      e.preventDefault();
      if (inPanel) showView({ type: 'project', id: a.dataset.project });
      else openProject(a.dataset.project, a);
    });
  });
}

function buildContact(spot) {
  return {
    kicker: spot.kicker,
    title: spot.title,
    content: [
      el('p', { class: 'panel-intro', text: 'Hiring, or have a project in mind? Email is the quickest way to reach me.' }),
      el('dl', { class: 'pfacts' },
        factRow('Email', el('a', { href: `mailto:${EMAIL}?subject=Hello`, text: EMAIL })),
        factRow('LinkedIn', el('a', { href: LINKEDIN, ...newTab, text: 'farahnisasyahindah ↗' }))),
      el('div', { class: 'pactions' },
        el('a', { class: 'pill pill-ink', href: `mailto:${EMAIL}?subject=New%20project` }, 'Start a Project'),
        el('button', { class: 'pill', type: 'button', onclick: (e) => copyEmail(e.currentTarget) }, 'Copy email')),
    ],
  };
}

function factRow(label, value) {
  return el('div', {}, el('dt', { text: label }), el('dd', {}, value));
}

function textBlock(value) {
  if (Array.isArray(value)) return el('ul', {}, value.map((v) => el('li', { text: v })));
  return el('p', { text: value });
}

function buildAlbum(project) {
  const images = project.images || [];
  if (!images.length) return null;

  let index = 0;
  const img = el('img', { src: images[0].src, alt: images[0].alt || '', decoding: 'async' });
  const counter = el('span', { class: 'mono', 'aria-live': 'polite' });
  const prev = el('button', { class: 'round', type: 'button', onclick: () => step(-1) },
    el('span', { 'aria-hidden': 'true', text: '←' }), el('span', { class: 'visually-hidden', text: 'Previous image' }));
  const next = el('button', { class: 'round', type: 'button', onclick: () => step(1) },
    el('span', { 'aria-hidden': 'true', text: '→' }), el('span', { class: 'visually-hidden', text: 'Next image' }));

  const markPortrait = () => img.classList.toggle('is-portrait', img.naturalHeight > img.naturalWidth);
  img.addEventListener('load', markPortrait);
  if (img.complete) markPortrait();

  function show() {
    img.src = images[index].src;
    img.alt = images[index].alt || '';
    counter.textContent = `${pad(index + 1)} / ${pad(images.length)}`;
    prev.disabled = index === 0;
    next.disabled = index === images.length - 1;
  }
  function step(dir) {
    const to = Math.max(0, Math.min(images.length - 1, index + dir));
    if (to !== index) { index = to; show(); }
  }

  const frame = el('div', { class: 'album-frame' }, img);
  // Swipe to turn.
  let startX = null;
  frame.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  frame.addEventListener('pointerup', (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  });

  show();
  if (images.length > 1) albumStep = step;
  return el('figure', { class: 'album' },
    frame,
    images.length > 1 && el('div', { class: 'album-bar' },
      counter,
      el('span', { class: 'mono', 'aria-hidden': 'true', text: finePointer.matches ? 'Use ← →' : 'Swipe to turn' }),
      el('div', { class: 'album-ctrl' }, prev, next)));
}

function buildProject(project) {
  const content = [buildAlbum(project)].filter(Boolean);

  const facts = [
    factRow('Status', statusEl(project.status)),
    factRow('Type', CATEGORY_LABELS[project.category] || project.category),
    project.client && factRow('Client', project.client),
    project.year && factRow('Year', String(project.year)),
    project.stack?.length && factRow('Stack', project.stack.join(', ')),
    isSafeUrl(project.url) && factRow('Live', el('a', { href: project.url, ...newTab }, `${hostOf(project.url)} ↗`)),
    ...(project.links || []).filter((l) => isSafeUrl(l.url))
      .map((l) => factRow('Link', el('a', { href: l.url, ...newTab }, `${l.label || 'Related link'} ↗`))),
  ];
  content.push(el('dl', { class: 'pfacts' }, facts));

  const overview = project.overview || project.summary;
  if (overview) content.push(el('section', { class: 'psec' }, el('h3', { text: 'Overview' }), el('p', { text: overview })));

  for (const [key, label] of CASE_FIELDS) {
    if (project[key]) content.push(el('section', { class: 'psec' }, el('h3', { text: label }), textBlock(project[key])));
  }
  if (project.features?.length) {
    content.push(el('section', { class: 'psec' }, el('h3', { text: 'Key features' }), textBlock(project.features)));
  }
  if (project.confidential) content.push(el('p', { class: 'pnote pnote-warm', text: project.confidential }));

  return { kicker: CATEGORY_LABELS[project.category] || 'Project', title: project.title, content };
}

// Shareable case-study links: ?project=<id>
function syncUrl(view) {
  const url = new URL(window.location.href);
  if (view?.type === 'project') url.searchParams.set('project', view.id);
  else url.searchParams.delete('project');
  if (url.href !== window.location.href) history.replaceState(null, '', url);
}

/* ---------- Light / night ---------- */

function setupTheme() {
  const root = document.documentElement;
  const button = document.querySelector('[data-theme-toggle]');
  const meta = document.querySelector('meta[name="theme-color"]');
  const scheme = document.querySelector('meta[name="color-scheme"]');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch { /* private mode */ }

  function apply(theme, { animate = false } = {}) {
    if (animate && !reducedMotion.matches) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 450);
    }
    root.dataset.theme = theme;
    const night = theme === 'dark';
    button.setAttribute('aria-label', night ? 'Switch to light mode' : 'Switch to night mode');
    button.title = night ? 'Light mode' : 'Night mode';
    meta?.setAttribute('content', night ? '#14131D' : '#F8F6F2');
    scheme?.setAttribute('content', night ? 'dark' : 'light');
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch { /* private mode */ }
    saved = next;
    apply(next, { animate: true });
  });
  // Follow the system setting until the visitor makes a choice.
  system.addEventListener?.('change', (e) => { if (!saved) apply(e.matches ? 'dark' : 'light', { animate: true }); });
  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');
}

/* ---------- Page chrome ---------- */

function setupTopbar() {
  const bar = document.querySelector('[data-topbar]');
  const hero = document.getElementById('home');
  const onScroll = () => bar.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = [...document.querySelectorAll('.pillnav a')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((a) => {
        if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'work', 'about', 'contact'].forEach((id) => observer.observe(document.getElementById(id)));
}

async function copyEmail(button) {
  const label = button.querySelector('[data-copy-label]') || button;
  const status = document.querySelector('[data-copy-status]');
  const original = label.textContent;
  try {
    await navigator.clipboard.writeText(EMAIL);
    label.textContent = 'Copied!';
    status.textContent = 'Email address copied to clipboard.';
    document.dispatchEvent(new CustomEvent('portfolio:copied'));
  } catch {
    label.textContent = 'Copy failed';
    status.textContent = `Could not copy. The email address is ${EMAIL}.`;
  }
  setTimeout(() => { label.textContent = original; }, 2400);
}

function setupHotspots() {
  document.querySelectorAll('[data-hotspot]').forEach((btn) => {
    btn.addEventListener('click', () => openHotspot(btn.dataset.hotspot, btn));
  });
  document.querySelector('[data-copy]')?.addEventListener('click', (e) => copyEmail(e.currentTarget));

  // "Explore My Workspace" points out the objects and moves focus to the first one.
  document.querySelector('[data-explore]')?.addEventListener('click', () => {
    const pins = document.querySelector('[data-pins]');
    pins.classList.remove('is-pulsing');
    void pins.offsetWidth;
    pins.classList.add('is-pulsing');
    pins.querySelector('.pin').focus({ preventScroll: true });
    world?.nudge();
  });
}

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

function setupStudio() {
  const stage = document.querySelector('[data-stage]');
  if (!webglAvailable() || navigator.connection?.saveData) return;

  Promise.all([import('./workspace3d.js'), projectsReady, document.fonts?.ready])
    .then(([{ initWorkspace }]) => {
      world = initWorkspace(stage, {
        reducedMotion: reducedMotion.matches,
        // Real screenshots only: professional work on the monitor, everything else on the pinboard.
        monitorImages: projects.filter(FILTERS.professional).flatMap((p) => p.images?.[0] || []).map((i) => i.src),
        boardImages: projects.filter((p) => !FILTERS.professional(p)).flatMap((p) => p.images || []).map((i) => i.src),
        onSelect: (key) => openHotspot(key, stage.querySelector(`[data-hotspot="${key}"]`)),
      });
    })
    .catch((err) => {
      // Keep the static illustration; the labels still work as buttons.
      console.warn('3D studio unavailable, using the illustration.', err);
    });
}

async function loadProjects() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    projects = await res.json();
  } catch (err) {
    console.error('Could not load projects.', err);
    document.querySelector('[data-grid]').replaceChildren(el('li', { class: 'row-empty' },
      'Projects could not be loaded. ', el('a', { href: DATA_URL, text: 'View the project list directly' }), '.'));
    return projects;
  }

  setupFilters();
  renderIndex();
  wireProjectLinks(document.getElementById('why'));

  const deepLink = new URLSearchParams(window.location.search).get('project');
  if (deepLink) openProject(deepLink, document.getElementById('work'));
  return projects;
}

// "A little more about me" cards: animate once on view, so touch screens see it too.
function setupMeCards() {
  const cards = document.querySelectorAll('[data-me]');
  if (!cards.length || reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      io.unobserve(card);
      setTimeout(() => {
        card.classList.add('is-play');
        setTimeout(() => card.classList.remove('is-play'), 1600);
      }, 150 * [...cards].indexOf(card));
    });
  }, { threshold: 0.6 });
  cards.forEach((c) => io.observe(c));
}

document.querySelectorAll('[data-year]').forEach((n) => { n.textContent = new Date().getFullYear(); });
setupTheme();
setupMeCards();
setupTopbar();
setupHotspots();
const projectsReady = loadProjects();
setupStudio();
