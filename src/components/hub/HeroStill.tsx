import type { HeroStill as Still } from "@/data/spotlight-media";

// fixed spread, so the static export and the browser render the same sparks
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  d: 7 + ((i * 13) % 9),
  delay: -((i * 29) % 16),
  s: 2 + ((i * 7) % 4),
}));

/**
 * A hero slide for a game without video: its still, brought to life with CSS only —
 * slow camera drift, pointer parallax (--px/--py from the hero), a light sweep and rising sparks.
 * Every motion is off while the hub's Motion switch is off.
 */
export default function HeroStill({ still, alt, flip }: { still: Still; alt: string; flip: boolean }) {
  return (
    <div className={`hero-still ${still.style}`} data-flip={flip ? "1" : undefined}>
      <img className="still-back" src={still.src} alt="" aria-hidden="true" decoding="async" />
      <div className="still-frame">
        <img className="still-img" src={still.src} alt={alt} style={{ objectPosition: still.focus }} decoding="async" />
        <span className="still-glare" aria-hidden="true" />
      </div>
      <div className="still-sparks" aria-hidden="true">
        {SPARKS.map((p, i) => (
          <i
            key={i}
            style={{
              left: `${p.x}%`,
              width: p.s,
              height: p.s,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
