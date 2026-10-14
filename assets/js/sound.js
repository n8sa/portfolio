// Lo-fi mode — optional background music and quiet interface sounds.
// Off by default: nothing loads or plays until the visitor turns it on.
//
// Music source: set data-src on the [data-lofi] element in index.html to a licensed,
// loopable track (e.g. assets/audio/lofi-loop.mp3). With no file — or if it can't play —
// a gentle lo-fi loop is generated in the browser instead (nothing to download).
const DEFAULT_VOLUME = 12; // percent
const MAX_VOLUME = 50;
const FADE_IN = 1.5; // seconds
const FADE_OUT = 1.0;
const KEY_ENABLED = 'lofi:enabled';
const KEY_VOLUME = 'lofi:volume';

const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } },
};

const root = document.querySelector('[data-lofi]');
if (root && !window.__lofi) {
  window.__lofi = true; // one player per page, ever
  init(root);
}

function init(root) {
  const toggle = root.querySelector('[data-lofi-toggle]');
  const label = root.querySelector('[data-lofi-label]');
  const expand = root.querySelector('[data-lofi-expand]');
  const panel = root.querySelector('[data-lofi-panel]');
  const slider = root.querySelector('[data-lofi-volume]');
  const status = root.querySelector('[data-lofi-status]');
  const MUSIC_SRC = root.dataset.src || '';
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return; // leave the control hidden on very old browsers
  root.hidden = false;

  let ctx = null;
  let master = null;    // visitor volume
  let musicGain = null; // fade envelope for music
  let sfxGain = null;
  let music = null;     // { start(): Promise|void, stop(): void }
  let enabled = false;  // visitor wants music on
  let playing = false;
  let armed = store.get(KEY_ENABLED) === '1'; // remembered "on", waiting for a gesture
  let pausedForHidden = false;
  let stopTimer = 0;

  const stored = parseInt(store.get(KEY_VOLUME), 10);
  let volume = Number.isFinite(stored) ? Math.min(MAX_VOLUME, Math.max(0, stored)) : DEFAULT_VOLUME;
  slider.max = String(MAX_VOLUME);
  slider.value = String(volume);
  slider.setAttribute('aria-valuetext', `${volume}%`);

  /* ---------- Audio graph (created inside a user gesture) ---------- */
  function ensureContext() {
    if (ctx) return;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = volume / 100;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(master);
    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.6;
    sfxGain.connect(master);
    // iOS: play even when the ring/silent switch is on (Safari 16.4+).
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch { /* ignore */ }
  }

  function fileMusic() {
    const el = new Audio();
    el.src = MUSIC_SRC;
    el.loop = true;
    el.preload = 'auto';
    el.setAttribute('playsinline', '');
    // Route through Web Audio so volume and fades also work on iOS (where element.volume is read-only).
    ctx.createMediaElementSource(el).connect(musicGain);
    let failed = false;
    el.addEventListener('error', () => { if (!failed) { failed = true; useGenerated(); } });
    return {
      start: () => el.play().catch((err) => {
        if (err && err.name === 'NotAllowedError') throw err;
        if (!failed) { failed = true; useGenerated(); }
      }),
      stop: () => el.pause(),
    };
  }

  function useGenerated() {
    music?.stop();
    music = generatedMusic(ctx, musicGain);
    if (enabled && !document.hidden) music.start();
  }

  function startMusic() {
    if (!music) music = MUSIC_SRC ? fileMusic() : generatedMusic(ctx, musicGain);
    const result = music.start();
    if (result && result.catch) {
      result.catch(() => {
        // Autoplay blocked (e.g. returning to the tab on iOS): wait for the next interaction.
        playing = false;
        armed = true;
        listenForGesture();
        render();
      });
    }
  }

  function fadeTo(value, seconds) {
    const now = ctx.currentTime;
    const g = musicGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(value, now + seconds);
  }

  /* ---------- On / off ---------- */
  function enable() {
    clearTimeout(stopTimer);
    enabled = true;
    armed = false;
    pausedForHidden = false;
    store.set(KEY_ENABLED, '1');
    ensureContext();
    ctx.resume().catch(() => {});
    startMusic();
    fadeTo(1, FADE_IN);
    playing = true;
    announce('Lo-fi music on');
    render();
  }

  function disable({ remember = true } = {}) {
    enabled = false;
    armed = false;
    if (remember) store.set(KEY_ENABLED, '0');
    if (ctx) {
      fadeTo(0, FADE_OUT);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        if (enabled) return;
        music?.stop();
        ctx.suspend().catch(() => {});
      }, FADE_OUT * 1000 + 50);
    }
    playing = false;
    announce('Lo-fi music off');
    render();
  }

  toggle.addEventListener('click', () => {
    if (enabled) disable();
    else enable();
  });

  expand.addEventListener('click', () => {
    const open = expand.getAttribute('aria-expanded') !== 'true';
    expand.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) slider.focus();
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      panel.hidden = true;
      expand.setAttribute('aria-expanded', 'false');
      expand.focus();
    }
  });
  document.addEventListener('pointerdown', (e) => {
    if (!panel.hidden && !root.contains(e.target)) {
      panel.hidden = true;
      expand.setAttribute('aria-expanded', 'false');
    }
  });

  slider.addEventListener('input', () => {
    volume = Number(slider.value);
    slider.setAttribute('aria-valuetext', `${volume}%`);
    store.set(KEY_VOLUME, String(volume));
    if (master) master.gain.setTargetAtTime(volume / 100, ctx.currentTime, 0.05);
  });

  // Remembered preference: browsers block sound before any interaction,
  // so resume on the visitor's first click, tap or key press.
  function listenForGesture() {
    const resume = (e) => {
      if (root.contains(e.target)) return; // the toggle handles its own click
      document.removeEventListener('pointerdown', resume, true);
      document.removeEventListener('keydown', resume, true);
      if (armed) enable();
    };
    document.addEventListener('pointerdown', resume, true);
    document.addEventListener('keydown', resume, true);
  }
  if (armed) listenForGesture();

  // Pause in background tabs; resume when the visitor comes back.
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !enabled) return;
    if (document.hidden) {
      pausedForHidden = true;
      fadeTo(0, 0.25);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        if (!document.hidden) return;
        music?.stop();
        ctx.suspend().catch(() => {});
      }, 300);
    } else if (pausedForHidden) {
      pausedForHidden = false;
      clearTimeout(stopTimer);
      ctx.resume().catch(() => {}).then(() => {
        if (ctx.state === 'running') return;
        // Some mobile browsers need a fresh tap before sound can restart.
        playing = false;
        armed = true;
        listenForGesture();
        render();
      });
      startMusic();
      fadeTo(1, FADE_IN);
    }
  });

  /* ---------- UI ---------- */
  function render() {
    root.classList.toggle('is-on', enabled);
    root.classList.toggle('is-playing', enabled && playing);
    toggle.setAttribute('aria-pressed', String(enabled));
    label.textContent = enabled ? 'Lo-fi Mode' : armed ? 'Resume lo-fi' : 'Lo-fi off';
    expand.hidden = !enabled;
    if (!enabled) {
      panel.hidden = true;
      expand.setAttribute('aria-expanded', 'false');
    }
  }

  function announce(text) {
    status.textContent = text;
  }

  render();

  /* ---------- Interface sounds (only while lo-fi mode is on) ---------- */
  let lastSfx = 0;
  let lastTransition = 0;
  function sfx(kind) {
    if (!enabled || !ctx || ctx.state !== 'running') return;
    const nowMs = performance.now();
    if (nowMs - lastSfx < 120) return;
    if (kind === 'transition' && nowMs - lastTransition < 800) return;
    lastSfx = nowMs;
    if (kind === 'transition') lastTransition = nowMs;
    const t = ctx.currentTime + 0.01;
    if (kind === 'click') tone(t, 880, 660, 0.07, 0.22);
    if (kind === 'transition') { tone(t, 523, 587, 0.22, 0.12); tone(t + 0.09, 784, 784, 0.3, 0.08); }
    if (kind === 'chime') [1047, 1319, 1568].forEach((f, i) => tone(t + i * 0.08, f, f, 0.5, 0.1));
  }

  function tone(t, from, to, dur, gain) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur * 0.6);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(sfxGain);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target || root.contains(target)) return;
    if (target.matches('[data-hotspot], .row, .plist button, a[data-project]')) sfx('click');
    else if (target.matches('.pillnav a, .brand, .world-actions a, .footer a[href^="#"]')) sfx('transition');
  }, true);
  document.addEventListener('portfolio:copied', () => sfx('chime'));
}

/* ==========================================================================
   Generated lo-fi loop (fallback when no audio file is present)
   ========================================================================== */
export function generatedMusic(ctx, out) {
  const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

  const bus = ctx.createGain();
  bus.gain.value = 0.9;
  const tape = ctx.createBiquadFilter();
  tape.type = 'lowpass';
  tape.frequency.value = 3200;
  tape.Q.value = 0.4;
  bus.connect(tape).connect(out);

  // Soft echo for the keys and melody.
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.405;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.28;
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(tape);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i += 1) nd[i] = Math.random() * 2 - 1;

  // Vinyl: low hiss with sparse crackles, looped.
  const vinyl = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const vd = vinyl.getChannelData(0);
  for (let i = 0; i < vd.length; i += 1) {
    vd[i] = (Math.random() * 2 - 1) * 0.012 + (Math.random() < 0.0004 ? (Math.random() * 2 - 1) * 0.6 : 0);
  }
  const vinylGain = ctx.createGain();
  vinylGain.gain.value = 0.18;
  const vinylTone = ctx.createBiquadFilter();
  vinylTone.type = 'bandpass';
  vinylTone.frequency.value = 2400;
  vinylTone.Q.value = 0.5;
  vinylTone.connect(vinylGain).connect(tape);
  let vinylSrc = null;

  // Fmaj7 – Em7 – Dm7 – Cmaj7
  const chords = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]];
  const roots = [41, 40, 38, 36];
  const scale = [72, 74, 76, 79, 81, 84];
  const bpm = 74;
  const sixteenth = 60 / bpm / 4;

  function keys(t, notes, dur) {
    notes.forEach((m, i) => {
      for (const [type, level] of [['sine', 0.05], ['triangle', 0.018]]) {
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.value = mtof(m);
        o.detune.value = (Math.random() - 0.5) * 10;
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = 1400;
        const g = ctx.createGain();
        const s = t + i * 0.025; // slight strum
        g.gain.setValueAtTime(0, s);
        g.gain.linearRampToValueAtTime(level, s + 0.03);
        g.gain.setTargetAtTime(level * 0.45, s + 0.05, 0.6);
        g.gain.setTargetAtTime(0, s + dur, 0.35);
        o.connect(f).connect(g);
        g.connect(bus);
        g.connect(delay);
        o.start(s);
        o.stop(s + dur + 2);
      }
    });
  }

  function bass(t, m, dur) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = mtof(m);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.16, t + 0.02);
    g.gain.setTargetAtTime(0, t + dur * 0.8, 0.12);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + dur + 1);
  }

  function kick(t) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(0.32, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.35);
  }

  function noiseHit(t, type, freq, level, decay) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    src.connect(f).connect(g).connect(bus);
    src.start(t, Math.random());
    src.stop(t + decay + 0.05);
  }

  function melody(t, m) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = mtof(m);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.035, t + 0.02);
    g.gain.setTargetAtTime(0, t + 0.15, 0.25);
    o.connect(g);
    g.connect(bus);
    g.connect(delay);
    o.start(t);
    o.stop(t + 1.5);
  }

  function step(i, t) {
    const bar = Math.floor(i / 16) % 4;
    const pos = i % 16;
    if (pos === 0) keys(t, chords[bar], sixteenth * 15);
    if (pos === 0) bass(t, roots[bar], sixteenth * 6);
    if (pos === 10) bass(t, roots[bar] + 7, sixteenth * 4);
    if (pos === 0 || pos === 7 || pos === 10) kick(t);
    if (pos === 4 || pos === 12) noiseHit(t, 'bandpass', 1800, 0.08, 0.18);
    if (pos % 2 === 0) noiseHit(t, 'highpass', 7000, pos % 4 === 0 ? 0.025 : 0.015, 0.045);
    if (pos % 2 === 0 && pos !== 0 && Math.random() < 0.16) melody(t, scale[Math.floor(Math.random() * scale.length)]);
  }

  let timer = 0;
  let index = 0;
  let next = 0;
  function schedule() {
    while (next < ctx.currentTime + 0.3) {
      step(index, next);
      next += sixteenth * (index % 2 === 0 ? 1.12 : 0.88); // swing
      index += 1;
    }
  }

  return {
    start() {
      if (timer) return;
      if (!vinylSrc) {
        vinylSrc = ctx.createBufferSource();
        vinylSrc.buffer = vinyl;
        vinylSrc.loop = true;
        vinylSrc.connect(vinylTone);
        vinylSrc.start();
      }
      next = ctx.currentTime + 0.1;
      timer = setInterval(schedule, 60);
      schedule();
    },
    stop() {
      clearInterval(timer);
      timer = 0;
    },
  };
}
