// Certifications & Continuous Learning — renders data/certifications.json.
// Data lives in the JSON file; this module only handles display, search and filters.

const DATA_URL = 'data/certifications.json';
const DEFAULT_LIMIT = 6;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const section = document.getElementById('certifications');
if (section) init(section);

async function init(section) {
  const $ = (sel) => section.querySelector(sel);
  const total = $('[data-cert-total]');
  const featuredList = $('[data-cert-featured]');
  const controls = $('[data-cert-controls]');
  const search = $('[data-cert-search]');
  const catGroup = $('[data-cert-categories]');
  const yearGroup = $('[data-cert-years]');
  const count = $('[data-cert-count]');
  const clear = $('[data-cert-clear]');
  const grid = $('[data-cert-grid]');
  const empty = $('[data-cert-empty]');
  const more = $('[data-cert-more]');

  let data;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('Could not load certifications.', err);
    count.textContent = 'Certifications could not be loaded — see LinkedIn below.';
    return;
  }

  const { categories = {}, types = {}, issuers = {} } = data;
  const certs = sortNewest(dedupe(data.certifications || []));
  const featured = certs.filter((c) => c.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
  const years = [...new Set(certs.map((c) => c.issuedYear))].sort((a, b) => b - a);

  const state = { category: 'all', year: null, query: '', showAll: false };

  /* ---------- Static parts ---------- */
  total.textContent = `${certs.length} records · ${years[years.length - 1]}–${years[0]}`;
  featuredList.replaceChildren(...featured.map((c) => card(c, { featured: true })));

  catGroup.replaceChildren(
    chip('All', 'all', true),
    ...Object.entries(categories).map(([key, label]) => chip(label, key, false)),
  );
  yearGroup.replaceChildren(...years.map((y) => {
    const b = button(String(y), 'cert-year');
    b.dataset.year = String(y);
    b.setAttribute('aria-pressed', 'false');
    return b;
  }));
  controls.hidden = false;

  /* ---------- Events ---------- */
  catGroup.addEventListener('click', (e) => {
    const b = e.target.closest('[data-category]');
    if (!b) return;
    state.category = b.dataset.category;
    render();
  });
  yearGroup.addEventListener('click', (e) => {
    const b = e.target.closest('[data-year]');
    if (!b) return;
    const y = Number(b.dataset.year);
    state.year = state.year === y ? null : y; // click again to clear
    render();
  });
  let debounce = 0;
  search.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { state.query = search.value.trim().toLowerCase(); render(); }, 120);
  });
  const reset = () => {
    Object.assign(state, { category: 'all', year: null, query: '', showAll: false });
    search.value = '';
    render();
    search.focus();
  };
  clear.addEventListener('click', reset);
  $('[data-cert-clear-inline]').addEventListener('click', reset);
  more.addEventListener('click', () => {
    state.showAll = !state.showAll;
    render();
    if (!state.showAll) section.scrollIntoView({ block: 'start' });
  });

  /* ---------- Render ---------- */
  function filtering() {
    return state.category !== 'all' || state.year !== null || state.query !== '';
  }

  function matches(c) {
    if (state.category !== 'all' && c.category !== state.category) return false;
    if (state.year !== null && c.issuedYear !== state.year) return false;
    if (state.query) {
      const hay = `${c.title} ${c.issuer} ${(c.skills || []).join(' ')}`.toLowerCase();
      if (!hay.includes(state.query)) return false;
    }
    return true;
  }

  function render() {
    catGroup.querySelectorAll('[data-category]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.category === state.category)));
    yearGroup.querySelectorAll('[data-year]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.year) === state.year)));

    let shown;
    let label;
    if (filtering()) {
      shown = certs.filter(matches);
      label = `Showing ${shown.length} of ${certs.length}`;
    } else if (state.showAll) {
      shown = certs;
      label = `All ${certs.length}, newest first`;
    } else {
      // Default: the latest six that aren't already featured above.
      shown = certs.filter((c) => !c.featured).slice(0, DEFAULT_LIMIT);
      label = `Latest ${shown.length} of ${certs.length}`;
    }

    count.textContent = label;
    clear.hidden = !filtering();
    empty.hidden = shown.length > 0;
    grid.hidden = shown.length === 0;
    grid.replaceChildren(...shown.map((c, i) => card(c, { index: i })));

    more.hidden = filtering();
    more.textContent = state.showAll ? 'Show fewer' : `View all ${certs.length} certifications`;
    more.setAttribute('aria-expanded', String(state.showAll));
  }

  render();


  /* ---------- Pieces ---------- */
  function card(c, { featured: isFeatured = false, index = 0 } = {}) {
    const issuer = issuers[c.issuer] || {};
    const date = `${MONTHS[(c.issuedMonth || 1) - 1]} ${c.issuedYear}`;
    const li = el('li', { class: `cert-card${isFeatured ? ' is-featured' : ''}` });
    li.style.setProperty('--i', String(Math.min(index, 8)));

    const mark = issuer.logo
      ? el('img', { class: 'cert-logo', src: issuer.logo, alt: '', loading: 'lazy', decoding: 'async', width: 40, height: 40 })
      : el('span', { class: 'cert-mark', 'data-tone': issuer.tone || 'ink', 'aria-hidden': 'true', text: issuer.mark || c.issuer.slice(0, 1) });

    li.append(
      el('div', { class: 'cert-top' },
        mark,
        el('span', { class: 'cert-type', 'data-type': c.credentialType, text: types[c.credentialType] || c.credentialType })),
      el('h4', { class: 'cert-title', text: c.title }),
      el('p', { class: 'cert-meta' }, `${c.issuer} · `, el('time', { datetime: `${c.issuedYear}-${String(c.issuedMonth).padStart(2, '0')}`, text: date })),
    );
    if (c.skills?.length) {
      li.append(el('ul', { class: 'tags', role: 'list', 'aria-label': 'Skills' }, ...c.skills.map((s) => el('li', { text: s }))));
    }
    const foot = el('div', { class: 'cert-foot' });
    if (c.credentialId) foot.append(el('span', { class: 'mono cert-id', text: `ID ${c.credentialId}` }));
    if (isSafeUrl(c.credentialUrl)) {
      foot.append(el('a', { class: 'cert-link', href: c.credentialUrl, target: '_blank', rel: 'noopener noreferrer' },
        'View credential ↗', el('span', { class: 'visually-hidden', text: ` — ${c.title} (opens in a new tab)` })));
    }
    if (foot.childNodes.length) li.append(foot);
    return li;
  }

  function chip(label, key, pressed) {
    const b = button(label);
    b.dataset.category = key;
    b.setAttribute('aria-pressed', String(pressed));
    return b;
  }
}

/* ---------- Helpers ---------- */

function sortNewest(list) {
  return list
    .map((c, i) => ({ c, i }))
    .sort((a, b) => (b.c.issuedYear - a.c.issuedYear) || ((b.c.issuedMonth || 0) - (a.c.issuedMonth || 0)) || (a.i - b.i))
    .map(({ c }) => c);
}

// Guard against accidental duplicates when the list is edited by hand.
function dedupe(list) {
  const seen = new Set();
  return list.filter((c) => {
    const key = `${c.title}|${c.issuer}|${c.issuedYear}|${c.issuedMonth}`.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) {
      console.warn(`Duplicate certification skipped: ${c.title}`);
      return false;
    }
    seen.add(key);
    return true;
  });
}

function isSafeUrl(url) {
  if (typeof url !== 'string') return false;
  try { return new URL(url).protocol === 'https:'; } catch { return false; }
}

function button(text, className) {
  const b = document.createElement('button');
  b.type = 'button';
  if (className) b.className = className;
  b.textContent = text;
  return b;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}
