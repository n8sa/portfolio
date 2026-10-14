// "A little curious. Always building." — a 70-second film rendered with HTML/CSS.
// The state of every scene is derived from the current time, so play, pause,
// seek and replay always land in the right place.
//
// Modes:  film.html            full film with controls
//         film.html?teaser     ~14 s silent loop for the homepage hero (autoplays, muted)
//         film.html?record     full-screen, no UI — for screen-recording to MP4

import { generatedMusic } from './sound.js';

const DURATION = 70;
const params = new URLSearchParams(location.search);
const MODE = params.has('teaser') ? 'teaser' : params.has('record') ? 'record' : 'full';
// Teaser: live sites → AI that helps → closing words, stitched into one loop.
const TEASER = [[14.3, 19.3], [39.3, 44.8], [63.5, 67.5]];
const TEASER_LENGTH = TEASER.reduce((sum, [a, b]) => sum + (b - a), 0);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add(MODE);

const stage = document.querySelector('[data-stage]');
const scenes = [...stage.querySelectorAll('.scene')].map((el) => ({
  el,
  start: Number(el.dataset.start),
  end: Number(el.dataset.end),
  title: el.dataset.title,
  cues: [...el.querySelectorAll('[data-in]')].map((n) => ({
    n,
    tin: Number(n.dataset.in),
    tout: n.dataset.out ? Number(n.dataset.out) : Infinity,
  })),
}));

const ui = {
  overlay: document.querySelector('[data-start-overlay]'),
  toggle: document.querySelector('[data-toggle]'),
  time: document.querySelector('[data-time]'),
  scrub: document.querySelector('[data-scrub]'),
  chapters: document.querySelector('[data-chapters]'),
  mute: document.querySelector('[data-mute]'),
  restart: document.querySelector('[data-restart]'),
  now: document.querySelector('[data-now]'),
  transcript: document.querySelector('[data-transcript]'),
};

let t = 0;          // film time in seconds
let clock = 0;      // teaser clock
let playing = false;
let last = 0;
let muted = false;

/* ---------- Render: everything follows from t ---------- */
function render(time) {
  for (const s of scenes) {
    const active = time >= s.start && time < s.end;
    s.el.classList.toggle('is-active', active);
    if (!active) continue;
    const local = time - s.start;
    s.el.style.setProperty('--p', Math.min(1, Math.max(0, local / (s.end - s.start))).toFixed(4));
    for (const c of s.cues) c.n.classList.toggle('in', local >= c.tin && local < c.tout);
  }
  if (ui.scrub && document.activeElement !== ui.scrub) ui.scrub.value = String(time.toFixed(1));
  if (ui.time) ui.time.textContent = `${fmt(time)} / ${fmt(DURATION)}`;
  const current = scenes.find((s) => time >= s.start && time < s.end);
  if (ui.now && current && ui.now.dataset.scene !== current.title) {
    ui.now.dataset.scene = current.title;
    ui.now.textContent = `${scenes.indexOf(current) + 1} / ${scenes.length} · ${current.title}`;
  }
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function teaserTime(c) {
  let rest = c % TEASER_LENGTH;
  for (const [a, b] of TEASER) {
    if (rest < b - a) return a + rest;
    rest -= b - a;
  }
  return TEASER[0][0];
}

/* ---------- Loop ---------- */
function frame(now) {
  if (!playing) return;
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (MODE === 'teaser') {
    clock += dt;
    render(teaserTime(clock));
  } else {
    const prev = t;
    t = Math.min(DURATION, t + dt);
    fireCues(prev, t);
    render(t);
    if (t >= DURATION) { pause(); return; }
    if (t > DURATION - 3.2) fadeMusic(0, DURATION - t);
  }
  requestAnimationFrame(frame);
}

function play() {
  if (playing) return;
  if (MODE !== 'teaser' && t >= DURATION) seek(0);
  playing = true;
  last = performance.now();
  ui.overlay?.classList.add('is-hidden');
  setToggle();
  startMusic();
  requestAnimationFrame(frame);
}

function pause() {
  if (!playing) return;
  playing = false;
  setToggle();
  stopMusic();
}

function seek(time) {
  t = Math.max(0, Math.min(DURATION, time));
  render(t);
}

function setToggle() {
  if (!ui.toggle) return;
  ui.toggle.textContent = playing ? '❚❚' : '▶';
  ui.toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

/* ---------- Sound: generated lo-fi + a few quiet cues ---------- */
let ctx = null;
let master = null;
let music = null;
const SFX = [
  ...[1.25, 1.4, 1.55, 1.7, 1.9, 2.05, 2.2].map((at) => ({ at, kind: 'key' })), // "hi, i'm farah."
  ...[3.45, 3.6, 3.8, 3.95, 4.15].map((at) => ({ at, kind: 'key' })),
  { at: 7.1, kind: 'paper' },
  { at: 10.2, kind: 'pop' }, { at: 10.45, kind: 'pop' }, { at: 10.7, kind: 'pop' }, { at: 10.95, kind: 'pop' },
  { at: 14.6, kind: 'click' }, { at: 16.2, kind: 'click' },
  { at: 23.5, kind: 'key' }, { at: 24.0, kind: 'key' }, { at: 25.4, kind: 'key' }, { at: 25.8, kind: 'key' },
  { at: 39.6, kind: 'ping' }, { at: 40.6, kind: 'ping' }, { at: 41.7, kind: 'ping' }, { at: 42.8, kind: 'ping' },
  { at: 48.1, kind: 'paper' },
  { at: 65.9, kind: 'chime' },
];

function ensureAudio() {
  if (ctx || MODE === 'teaser') return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  ctx = new AudioCtx();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  music = generatedMusic(ctx, master);
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch { /* ignore */ }
}

function startMusic() {
  if (!ctx || muted) return;
  ctx.resume().catch(() => {});
  music.start();
  fadeMusic(t > DURATION - 3.2 ? 0 : 0.42, 1.5);
}

function stopMusic() {
  if (!ctx) return;
  fadeMusic(0, 0.4);
  setTimeout(() => { if (!playing) { music.stop(); ctx.suspend().catch(() => {}); } }, 450);
}

function fadeMusic(value, seconds) {
  if (!ctx) return;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(value, now + Math.max(0.05, seconds));
}

function fireCues(from, to) {
  if (!ctx || muted || to < from) return;
  for (const cue of SFX) if (cue.at > from && cue.at <= to) sfx(cue.kind);
}

function sfx(kind) {
  const t0 = ctx.currentTime + 0.01;
  const out = ctx.createGain();
  out.gain.value = 0.5;
  out.connect(master);
  const tone = (f1, f2, dur, gain, type = 'sine', at = t0) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, at);
    o.frequency.exponentialRampToValueAtTime(f2, at + dur * 0.7);
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(gain, at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(out);
    o.start(at);
    o.stop(at + dur + 0.05);
  };
  const noise = (dur, freq, gain, type = 'bandpass') => {
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i += 1) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(f).connect(g).connect(out);
    src.start(t0);
  };
  if (kind === 'key') noise(0.03, 3200 + Math.random() * 1200, 0.18);
  if (kind === 'click') { noise(0.02, 2500, 0.2); tone(1400, 900, 0.04, 0.05); }
  if (kind === 'paper') noise(0.35, 1800, 0.12, 'highpass');
  if (kind === 'pop') tone(520, 880, 0.12, 0.08);
  if (kind === 'ping') { tone(1175, 1175, 0.25, 0.06); tone(1568, 1568, 0.35, 0.05, 'sine', t0 + 0.08); }
  if (kind === 'chime') [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, f, 0.8, 0.05, 'sine', t0 + i * 0.09));
}

/* ---------- Controls ---------- */
function setupControls() {
  document.querySelector('[data-play-sound]')?.addEventListener('click', () => { muted = false; ensureAudio(); syncMute(); play(); });
  document.querySelector('[data-play-muted]')?.addEventListener('click', () => { muted = true; syncMute(); play(); });
  ui.toggle?.addEventListener('click', () => { if (playing) pause(); else { ensureAudio(); play(); } });
  ui.restart?.addEventListener('click', () => { seek(0); ensureAudio(); play(); });
  ui.mute?.addEventListener('click', () => {
    muted = !muted;
    ensureAudio();
    syncMute();
    if (muted) fadeMusic(0, 0.3);
    else if (playing) startMusic();
  });
  ui.scrub?.addEventListener('input', () => seek(Number(ui.scrub.value)));

  // Chapter ticks on the scrubber
  if (ui.chapters) {
    ui.chapters.replaceChildren(...scenes.slice(1).map((s) => {
      const i = document.createElement('i');
      i.style.left = `${(s.start / DURATION) * 100}%`;
      return i;
    }));
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, a, summary')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); if (playing) pause(); else { ensureAudio(); play(); } }
    if (e.key === 'ArrowRight') seek(t + 5);
    if (e.key === 'ArrowLeft') seek(t - 5);
    if (e.key === 'm') ui.mute?.click();
    if (e.key === 'Home') seek(0);
  });

  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
}

function syncMute() {
  if (!ui.mute) return;
  ui.mute.setAttribute('aria-pressed', String(muted));
  ui.mute.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
  ui.mute.textContent = muted ? '♪̸' : '♪';
}

/* ---------- Transcript (same words as on screen) ---------- */
function buildTranscript() {
  if (!ui.transcript) return;
  ui.transcript.replaceChildren(...scenes.map((s) => {
    const li = document.createElement('li');
    const b = document.createElement('b');
    b.textContent = `${fmt(s.start)}`;
    const words = [...s.el.querySelectorAll('.cap, .cap-sub, .cap-hand, .hand, .hand-note, .typed, .tag, .mono-line, .words p, .ec-name, .ec-role, .ec-skills, .ec-tag')]
      .map((n) => n.textContent.trim()).filter(Boolean);
    li.append(b, `${s.title} — ${words.join(' / ')}`);
    return li;
  }));
}

/* ---------- Start ---------- */
buildTranscript();
setupControls();
render(MODE === 'teaser' ? teaserTime(0) : 0);

if (MODE === 'teaser') {
  muted = true;
  if (!reduced) play(); else render(TEASER[2][0] + 3.9); // still frame of the end card
}
if (MODE === 'record') {
  // Click once to start (browsers need a gesture for sound), then the UI stays out of the way.
  ui.overlay?.querySelector('.start-note')?.replaceChildren('Click to start — recording mode hides all controls.');
}
