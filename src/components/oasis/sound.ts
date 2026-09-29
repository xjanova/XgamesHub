/**
 * Tiny WebAudio synth for UI feedback — no audio files to download.
 * Must be first called from a user gesture (browsers block autoplay).
 */
let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Rising whoosh + shimmer for the warp jump. */
export function playWarp(durationSec: number) {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.35, now + 0.4);
  master.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
  master.connect(ac.destination);

  // Filtered noise = air rush
  const noise = ac.createBufferSource();
  const buffer = ac.createBuffer(1, ac.sampleRate * durationSec, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noise.buffer = buffer;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 1.2;
  band.frequency.setValueAtTime(200, now);
  band.frequency.exponentialRampToValueAtTime(3200, now + durationSec * 0.7);
  noise.connect(band).connect(master);
  noise.start(now);
  noise.stop(now + durationSec);

  // Synth sweep = engine
  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(55, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + durationSec * 0.8);
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  const oscGain = ac.createGain();
  oscGain.gain.value = 0.25;
  osc.connect(lp).connect(oscGain).connect(master);
  osc.start(now);
  osc.stop(now + durationSec);
}

/** Short arpeggio blip for hover/select. */
export function playBlip(high = false) {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  const notes = high ? [660, 880, 1320] : [520, 780];
  notes.forEach((freq, i) => {
    const t = now + i * 0.05;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  });
}
