import { useEffect, useRef } from "react";

// Ported from the provided "Countdown orbit — self-drawing tails" prototype.
// The motion is pure CSS; the effect only stamps out the tapered tail layers,
// keeps the two comets locked half a lap apart, and runs the live countdown.
const ORBIT_D =
  "M 21.5 160.9 A 158 50 -12 1 1 330.5 95.1 A 158 50 -12 1 1 21.5 160.9";
const STAR_D =
  "M20 0 C21.6 9.2, 24.4 14.6, 30 16.4 C36 18.2, 38.6 19.2, 40 20 C38.6 20.8, 36 21.8, 30 23.6 C24.4 25.4, 21.6 30.8, 20 40 C18.4 30.8, 15.6 25.4, 10 23.6 C4 21.8, 1.4 20.8, 0 20 C1.4 19.2, 4 18.2, 10 16.4 C15.6 14.6, 18.4 9.2, 20 0 Z";

const CSS = `
.cdo-root{
  --orbit-dur: 6s;
  --breathe-dur: 7s;
  --lead: 0.4;
  --gap: 0.06;             /* star sits this fraction of a lap ahead of its tail, in the clear gap */
  --ink: #28282A;
  --ink-soft: #888888;
  --sage: #7B9261;
  --gold-line: rgba(201,168,106,.4);
  --cream: #FBF7F1;
  --glow: 124,139,92;
  font-family:'Libre Baskerville:Regular','Libre Baskerville',Georgia,serif;
}
.cdo-stage{position:relative;width:376px;height:276px}
.cdo-glow{
  position:absolute;left:50%;top:50%;
  width:340px;height:170px;border-radius:50%;
  transform:translate(-50%,-50%) rotate(-12deg);
  background:radial-gradient(ellipse at center,
             rgba(var(--glow),.32) 0%,
             rgba(var(--glow),.12) 46%,
             transparent 72%);
  filter:blur(2px);
  animation:cdo-breathe var(--breathe-dur) ease-in-out infinite;
}
@keyframes cdo-breathe{
  0%,100%{opacity:.75;transform:translate(-50%,-50%) rotate(-12deg) scale(1)}
  50%    {opacity:1;  transform:translate(-50%,-50%) rotate(-12deg) scale(1.045)}
}
.cdo-timer{
  position:absolute;inset:0;margin:auto;
  width:max-content;height:max-content;
  display:flex;gap:10px;align-items:stretch;
}
.cdo-cell{display:flex;flex-direction:column;gap:6px;align-items:center}
/* Lift ONLY the days cell above the orbiting tails (z3) and stars (z4). */
.cdo-cell--days{position:relative;z-index:5}
.cdo-num{
  font-family:'Libre Baskerville:Italic','Libre Baskerville',Georgia,serif;
  font-style:italic;font-size:56px;line-height:1.06;
  letter-spacing:-.07em;color:var(--ink);white-space:nowrap;
  position:relative;text-align:center;
  clip-path:inset(0 -.25em 0 -.05em);
}
.cdo-num .cdo-v{display:inline-block}
.cdo-num .cdo-v.cdo-out{position:absolute;left:0;right:0;top:0;animation:cdo-num-out .42s cubic-bezier(.45,0,.55,1) forwards}
.cdo-num .cdo-v.cdo-in {animation:cdo-num-in  .42s cubic-bezier(.22,.9,.3,1) both}
@keyframes cdo-num-out{to{transform:translateY(-58%);opacity:0}}
@keyframes cdo-num-in {from{transform:translateY(58%);opacity:0}to{transform:translateY(0);opacity:1}}
.cdo-cell--sec .cdo-num{color:var(--ink-soft)}
.cdo-unit{display:flex;flex-direction:column;gap:4px;align-items:center;width:100%}
.cdo-unit .cdo-rule{height:1px;width:100%;background:var(--gold-line)}
.cdo-unit .cdo-label{
  font-family:'Libre Baskerville:Bold','Libre Baskerville',Georgia,serif;
  font-weight:700;font-size:10px;line-height:15px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--sage);
}
.cdo-orbit-svg{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:visible}
/* Registered so the countdown tail's sweep interpolates smoothly — animating
   stroke-dashoffset directly between calc(var()) values does NOT interpolate. */
@property --cdo-dash { syntax: '<number>'; inherits: false; initial-value: 0; }
.cdo-tail{
  fill:none;stroke:var(--cream);stroke-linecap:round;
  stroke-dasharray:var(--L) calc(100 - var(--L));
  stroke-dashoffset:calc(var(--L) - var(--lead) + var(--cdo-dash));
  animation:cdo-tail-draw var(--orbit-dur) linear infinite;
}
@keyframes cdo-tail-draw{
  from{--cdo-dash: 0}
  to  {--cdo-dash: -100}
}
.cdo-tail--b{animation-delay:calc(var(--orbit-dur) / -2)}
.cdo-sparkle{
  position:absolute;left:0;top:0;width:1px;height:1px;z-index:4;
  pointer-events:none;
  offset-path:path("M 21.5 160.9 A 158 50 -12 1 1 330.5 95.1 A 158 50 -12 1 1 21.5 160.9");
  offset-anchor:center;offset-rotate:0deg;
  animation:cdo-orbit-travel var(--orbit-dur) linear infinite;
  /* advance the star ahead of its own tail so it floats in the clear gap */
  animation-delay:calc(var(--orbit-dur) * (0 - var(--gap)));
}
.cdo-sparkle--b{animation-delay:calc(var(--orbit-dur) * (-0.5 - var(--gap)))}
@keyframes cdo-orbit-travel{to{offset-distance:100%}}
.cdo-core{display:block;transform:translate(-50%,-50%)}
.cdo-star{display:block;width:34px;height:34px;color:var(--cream)}
.cdo-star--sm{width:34px;height:34px}
@media (prefers-reduced-motion: reduce){
  .cdo-num .cdo-v.cdo-out{display:none}
  .cdo-num .cdo-v.cdo-in{animation:none}
  .cdo-glow,.cdo-tail,.cdo-sparkle{animation:none}
  .cdo-sparkle   {offset-distance:36%}
  .cdo-sparkle--b{offset-distance:86%}
  .cdo-tail--a{--cdo-dash: -36}
  .cdo-tail--b{--cdo-dash: -86}
}
`;

// Live countdown target: the wedding date shown on the invitation.
const TARGET = new Date("2026-10-21T16:00:00");

const TAIL = { layers: 12, length: 40, baseW: 11, tipW: 0.6, minL: 2.2 };

export function CountdownOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ---- build the tapered comet tails (12 interpolated stroked copies) ----
    const svg = root.querySelector<SVGSVGElement>(".cdo-orbit-svg");
    const NS = "http://www.w3.org/2000/svg";
    if (svg) {
      svg.innerHTML = "";
      for (const variant of ["a", "b"] as const) {
        for (let i = 0; i < TAIL.layers; i++) {
          const t = i / (TAIL.layers - 1);
          const L = TAIL.minL + (TAIL.length - TAIL.minL) * t;
          const w = TAIL.tipW + (TAIL.baseW - TAIL.tipW) * Math.pow(1 - t, 1.35);
          const p = document.createElementNS(NS, "path");
          p.setAttribute("d", ORBIT_D);
          p.setAttribute("pathLength", "100");
          p.setAttribute("class", `cdo-tail cdo-tail--${variant}`);
          p.style.setProperty("--L", L.toFixed(2));
          p.style.strokeWidth = w.toFixed(2);
          svg.appendChild(p);
        }
      }
    }

    // Lock every orbit animation to the same timeline origin so the two
    // comets stay exactly half a lap apart.
    requestAnimationFrame(() => {
      const getAnimations = (
        document as unknown as { getAnimations?: () => Animation[] }
      ).getAnimations;
      getAnimations?.call(document).forEach((a) => {
        const name = (a as unknown as { animationName?: string }).animationName;
        if (name === "cdo-tail-draw" || name === "cdo-orbit-travel") {
          a.startTime = 0;
        }
      });
    });

    // ---- live countdown with the soft digit roll ----
    const cells: Record<string, HTMLElement> = {};
    root.querySelectorAll<HTMLElement>(".cdo-num[data-unit]").forEach((n) => {
      const unit = n.dataset.unit;
      if (unit) cells[unit] = n;
    });

    let widestDigit = "0";
    const meas = document.createElement("span");
    meas.style.cssText =
      "position:absolute;visibility:hidden;white-space:nowrap";

    const lockWidth = (cell: HTMLElement, len: number) => {
      cell.appendChild(meas);
      meas.textContent = widestDigit.repeat(len);
      cell.style.width =
        Math.ceil(meas.getBoundingClientRect().width + 1) + "px";
      cell.dataset.len = String(len);
      meas.remove();
    };

    const setVal = (unit: string, text: string) => {
      const cell = cells[unit];
      if (!cell) return;
      const cur = cell.querySelector<HTMLElement>(".cdo-v:not(.cdo-out)");
      if (!cur || cur.textContent === text) return;
      if (text.length !== Number(cell.dataset.len || 0))
        lockWidth(cell, text.length);
      cur.classList.add("cdo-out");
      cur.addEventListener("animationend", () => cur.remove(), { once: true });
      const next = document.createElement("span");
      next.className = "cdo-v cdo-in";
      next.textContent = text;
      cell.appendChild(next);
      next.addEventListener(
        "animationend",
        () => next.classList.remove("cdo-in"),
        { once: true }
      );
    };

    const tick = () => {
      const ms = Math.max(0, TARGET.getTime() - Date.now());
      const s = Math.floor(ms / 1000);
      setVal("days", String(Math.floor(s / 86400)));
      setVal("hrs", String(Math.floor(s / 3600) % 24).padStart(2, "0"));
      setVal("min", String(Math.floor(s / 60) % 60).padStart(2, "0"));
      setVal("sec", String(s % 60).padStart(2, "0"));
    };

    let intervalId = 0;
    const start = () => {
      // Size cells to the widest digit so proportional italics never reflow.
      const probe = Object.values(cells)[0];
      if (probe) {
        probe.appendChild(meas);
        let wmax = 0;
        for (const d of "0123456789") {
          meas.textContent = d.repeat(3);
          const w = meas.getBoundingClientRect().width;
          if (w > wmax) {
            wmax = w;
            widestDigit = d;
          }
        }
        meas.remove();
        for (const cell of Object.values(cells)) {
          const v = cell.querySelector<HTMLElement>(".cdo-v:not(.cdo-out)");
          lockWidth(cell, v?.textContent?.length ?? 2);
        }
      }
      tick();
      intervalId = window.setInterval(tick, 1000);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div ref={rootRef} className="cdo-root">
      <style>{CSS}</style>
      <div className="cdo-stage">
        <div className="cdo-glow" aria-hidden="true" />
        <div
          className="cdo-timer"
          role="timer"
          aria-label="Countdown to the wedding"
        >
          <div className="cdo-cell cdo-cell--days">
            <div className="cdo-num" data-unit="days">
              <span className="cdo-v">118</span>
            </div>
            <div className="cdo-unit">
              <div className="cdo-rule" />
              <div className="cdo-label">Days</div>
            </div>
          </div>
          <div className="cdo-cell">
            <div className="cdo-num" data-unit="hrs">
              <span className="cdo-v">08</span>
            </div>
            <div className="cdo-unit">
              <div className="cdo-rule" />
              <div className="cdo-label">Hrs</div>
            </div>
          </div>
          <div className="cdo-cell">
            <div className="cdo-num" data-unit="min">
              <span className="cdo-v">23</span>
            </div>
            <div className="cdo-unit">
              <div className="cdo-rule" />
              <div className="cdo-label">Min</div>
            </div>
          </div>
          <div className="cdo-cell cdo-cell--sec">
            <div className="cdo-num" data-unit="sec">
              <span className="cdo-v">23</span>
            </div>
            <div className="cdo-unit">
              <div className="cdo-rule" />
              <div className="cdo-label">Sec</div>
            </div>
          </div>
        </div>

        <svg className="cdo-orbit-svg" viewBox="0 0 376 276" aria-hidden="true" />

        <div className="cdo-sparkle" aria-hidden="true">
          <span className="cdo-core">
            <svg className="cdo-star" viewBox="0 0 40 40">
              <path fill="currentColor" d={STAR_D} />
            </svg>
          </span>
        </div>
        <div className="cdo-sparkle cdo-sparkle--b" aria-hidden="true">
          <span className="cdo-core">
            <svg className="cdo-star cdo-star--sm" viewBox="0 0 40 40">
              <path fill="currentColor" d={STAR_D} />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
