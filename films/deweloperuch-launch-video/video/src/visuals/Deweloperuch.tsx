// Deweloperuch screens rebuilt from the product's code (apps/web): PlanSheet.tsx + lib/sun.ts, analyses/new/page.tsx,
// PriceSection.tsx (PriceScale), page.tsx (ARGUMENTS). Example data only, labelled "Przykład".
import React from "react";
import { Card } from "../components/Ui";
import { clampI } from "../lib/time";
import { C, DISPLAY, EASE, MONO, SANS, SERIF } from "../theme";

const RED = "#A8462A", ALERT = "#D88367", WARM = "#D7A56B", WARM_LINE = "#A8783F", SAGE = "#B5D2BD", MARKER = "#E5C39A", OFFER = "#1F3C88";
const INK2 = "#3D3A32", RULE = "rgba(26,25,21,.14)", RULE_STRONG = "rgba(26,25,21,.32)", PAPER2 = "#EBE6DB";
const p01 = (t: number, a: number, d: number) => clampI(t, [a, a + d], [0, 1], EASE.out);

export function cloudPath(cx: number, cy: number, rx: number, ry: number, n: number) {
  const p = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  const parts = [`M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}`];
  for (let i = 1; i <= n; i++) {
    const [px, py] = p[(i - 1) % n], [x, y] = p[i % n];
    const r = (Math.hypot(x - px, y - py) / 2) * 1.08;
    parts.push(`A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return parts.join(" ") + " Z";
}

const rad = (d: number) => (d * Math.PI) / 180, deg = (r: number) => (r * 180) / Math.PI;
function solar(min: number) {
  const lat = rad(52), dec = rad(23.44), h = rad(min / 4 - 180);
  const sa = Math.max(-1, Math.min(1, Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(h)));
  const az = Math.atan2(Math.sin(h), Math.cos(h) * Math.sin(lat) - Math.tan(dec) * Math.cos(lat));
  return { altitude: deg(Math.asin(sa)), azimuth: (((deg(az) + 180) % 360) + 360) % 360 };
}
const ang = (a: number, b: number) => Math.abs(((((a - b + 180) % 360) + 360) % 360) - 180);
const WINDOWS: { room: string; wall: number; a: [number, number]; b: [number, number] }[] = [
  { room: "salon", wall: 90, a: [30, 100], b: [30, 180] }, { room: "salon", wall: 180, a: [70, 60], b: [200, 60] },
  { room: "bedSouth", wall: 180, a: [320, 60], b: [410, 60] }, { room: "bedWest", wall: 270, a: [450, 240], b: [450, 290] },
];
const CLIPS: Record<string, [number, number, number, number]> = { salon: [34, 64, 234, 134], bedSouth: [272, 64, 174, 134], bedWest: [302, 202, 144, 114] };

/** Listing card with revision clouds drawn around two claims (hook). */
export const Listing: React.FC<{ t: number; x: number; y: number; c1: number; c2: number }> = ({ t, x, y, c1, c2 }) => {
  const Mark: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
    const d = p01(t, at, 0.55), q = p01(t, at + 0.5, 0.3);
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", left: -22, top: -16, width: "calc(100% + 44px)", height: "calc(100% + 32px)", overflow: "visible" }}>
          <path d={cloudPath(50, 20, 47, 17, 15)} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d}
            style={{ fill: `rgba(168,70,42,${0.08 * q})`, stroke: RED, strokeWidth: 0.8 }} />
        </svg>
        {children}
        <span style={{ position: "absolute", right: -46, top: -36, width: 50, height: 50, borderRadius: 25, background: C.card, border: `2.5px solid ${RED}`,
          font: `700 30px/45px ${SANS}`, color: RED, textAlign: "center", opacity: q, scale: String(0.6 + 0.4 * q) }}>?</span>
      </span>
    );
  };
  return (
    <Card style={{ position: "absolute", left: x, top: y, width: 900, padding: "52px 60px 58px", rotate: "-1.2deg", borderTop: `10px solid ${RULE_STRONG}` }} radius={10}>
      <div style={{ font: `italic 300 30px/1 ${SERIF}`, color: C.inkSoft, marginBottom: 30 }}>Przykład ogłoszenia</div>
      <div style={{ font: `400 60px/1.12 ${DISPLAY}`, letterSpacing: -1.4 }}><Mark at={c1}>Słoneczne</Mark> 3&nbsp;pokoje, 58,5&nbsp;m²</div>
      <div style={{ marginTop: 34, font: `500 34px/1.45 ${SANS}`, color: INK2 }}><Mark at={c2}>Funkcjonalny układ</Mark> · salon z aneksem · balkon 5,2&nbsp;m²</div>
      <div style={{ marginTop: 26, font: `400 28px/1.4 ${MONO}`, color: C.inkSoft }}>IV piętro · termin oddania: II kwartał 2027</div>
    </Card>
  );
};

/** The annotated floor plan from PlanSheet.tsx. `draw` 0..1 draws the walls; annotations follow their own times. */
export const Plan: React.FC<{ t: number; at: number; width: number; sunMin: number; clashAt?: number; calloutsAt?: number; showLight?: number }> = ({
  t, at, width, sunMin, clashAt, calloutsAt, showLight = 1,
}) => {
  const w = p01(t, at, 0.8), wi = p01(t, at + 0.15, 0.8), f = p01(t, at + 0.45, 0.4), r = p01(t, at + 0.65, 0.4), sp = p01(t, at + 0.65, 0.8);
  const cl = clashAt === undefined ? 0 : p01(t, clashAt, 0.7);
  const sun = solar(sunMin);
  const k = Math.min(1, Math.max(0, (sun.azimuth - 50) / 260)), u = 1 - k;
  const sx = u * u * 60 + 2 * u * k * 240 + k * k * 420, sy = u * u * 54 + 2 * u * k * -8 + k * k * 54;
  const az = rad(sun.azimuth), dx = Math.sin(az), dy = -Math.cos(az), cot = 1 / Math.tan(rad(Math.max(sun.altitude, 2)));
  const near = Math.min(0.9 * cot * 36, 600), far = Math.min(2.2 * cot * 36, 600);
  const pt = ([x, y]: [number, number], s: number) => `${(x + dx * s).toFixed(1)},${(y + dy * s).toFixed(1)}`;
  const line = { fill: "none", stroke: C.ink };
  const pop = (i: number) => (calloutsAt === undefined ? 0 : p01(t, calloutsAt + i * 0.18, 0.3));
  return (
    <svg viewBox="0 0 480 340" style={{ display: "block", width, height: (width * 340) / 480 }}>
      <defs>{Object.entries(CLIPS).map(([id, [x, y, w2, h]]) => <clipPath key={id} id={`lv-${id}`}><rect x={x} y={y} width={w2} height={h} /></clipPath>)}</defs>
      <g style={{ mixBlendMode: "multiply", opacity: f * showLight }}>
        {WINDOWS.map((win) => sun.altitude > 0 && ang(sun.azimuth, win.wall) < 89 ? (
          <polygon key={win.room + win.wall} clipPath={`url(#lv-${win.room})`} fill={WARM}
            fillOpacity={0.16 + 0.42 * Math.max(Math.cos(rad(ang(sun.azimuth, win.wall))), 0)}
            points={[pt(win.a, near), pt(win.b, near), pt(win.b, far), pt(win.a, far)].join(" ")} />) : null)}
      </g>
      <path d="M60 54 Q240 -8 420 54" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sp} style={{ fill: "none", stroke: WARM_LINE, strokeWidth: 1.2 }} />
      <circle cx={sx} cy={sy} r={7} style={{ fill: WARM, stroke: C.ink, strokeWidth: 1, opacity: f * showLight }} />
      <g style={{ fill: "none", stroke: C.inkSoft, strokeWidth: 0.9, opacity: f }}>
        <rect x="50" y="150" width="118" height="36" rx="3" /><path d="M50 177 H168" /><rect x="84" y="104" width="54" height="30" rx="2" />
        <rect x="360" y="80" width="80" height="92" rx="3" /><rect x="368" y="87" width="30" height="14" rx="2" /><rect x="402" y="87" width="30" height="14" rx="2" />
        <rect x="38" y="210" width="42" height="100" rx="8" /><rect x="118" y="208" width="40" height="22" rx="3" /><rect x="352" y="224" width="80" height="80" rx="3" />
      </g>
      <path d="M70 60 H30 V100 M30 180 V320 H450 V290 M450 240 V60 H410 M320 60 H200" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - w} style={{ ...line, strokeWidth: 5 }} />
      <path d="M30 200 H195 M265 200 H450 M170 200 V220 M170 300 V320 M300 200 V220 M300 300 V320 M270 60 V120 M270 180 V200" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - wi} style={{ ...line, strokeWidth: 2.4 }} />
      <path d="M70 57 H200 M70 63 H200 M320 57 H410 M320 63 H410 M27 100 V180 M33 100 V180 M447 240 V290 M453 240 V290" style={{ ...line, strokeWidth: 1, opacity: f }} />
      <g style={{ opacity: f }}>
        <path d="M170 300 H250 M300 300 H220 M265 200 V130 M270 120 H330" style={{ ...line, strokeWidth: 1.6 }} />
        <path d="M170 220 A80 80 0 0 1 250 300 M300 220 A80 80 0 0 0 220 300 M195 200 A70 70 0 0 1 265 130 M270 180 A60 60 0 0 0 330 120" style={{ fill: "none", stroke: INK2, strokeWidth: 0.9, strokeDasharray: "3 3" }} />
      </g>
      <g style={{ font: `650 7.5px ${SANS}`, letterSpacing: ".18em", fill: INK2, textAnchor: "middle", opacity: r }}>
        <text x="150" y="92">SALON</text><text x="400" y="190">SYPIALNIA</text><text x="124" y="262">ŁAZIENKA</text><text x="236" y="222">PRZEDPOKÓJ</text><text x="392" y="216">SYPIALNIA</text>
      </g>
      {clashAt !== undefined && <path d={cloudPath(236, 262, 36, 31, 13)} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cl}
        style={{ fill: `rgba(216,131,103,${0.18 * p01(t, clashAt + 0.7, 0.25)})`, stroke: RED, strokeWidth: 1.8, strokeLinejoin: "round" }} />}
      <g transform="translate(452 28)" style={{ opacity: f }}>
        <circle r="13" style={{ fill: C.card, stroke: C.ink, strokeWidth: 1.2 }} /><path d="M0 9 L5 -6 L0 -2 L-5 -6 Z" fill={C.ink} />
        <text x="-22" y="4" style={{ font: `700 10px ${SANS}`, fill: C.ink, textAnchor: "middle" }}>N</text>
      </g>
      {[[190, 152, SAGE, "1"], [282, 236, ALERT, "2"], [40, 34, WARM, "3"]].map(([cx, cy, fill, n], i) => (
        <g key={i} style={{ opacity: pop(i) }}>
          <circle cx={cx as number} cy={cy as number} r={11 * (0.6 + 0.4 * pop(i))} style={{ fill: fill as string, stroke: "#111311", strokeWidth: 1 }} />
          <text x={cx as number} y={(cy as number) + 4} style={{ font: `500 11px ${DISPLAY}`, fill: "#111311", textAnchor: "middle" }}>{n}</text>
        </g>
      ))}
    </svg>
  );
};

/** Folder cover with tabs, metadata bar and the plan (PlanSheet.tsx / home.css .folder). */
export const Folder: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const slip = p01(t, at + 2.4, 0.45);
  const tab = (bg: string, n: string, label: string) => (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 9, height: 58, padding: "15px 20px", borderRadius: "14px 14px 0 0", background: bg, color: "#111311", font: `650 21px/1 ${SANS}` }}>
      <b style={{ font: `500 24px/1 ${DISPLAY}` }}>{n}</b> {label}
    </span>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 1000, paddingTop: 54 }}>
      <div style={{ position: "absolute", top: 0, right: 70, display: "flex", gap: 6 }}>{tab(SAGE, "1", "Ustawność")}{tab(ALERT, "2", "Kolizja")}{tab(WARM, "3", "Słońce")}</div>
      <div style={{ padding: 20, borderRadius: 30, background: C.brand, boxShadow: "0 50px 80px -60px rgba(20,32,26,.8)" }}>
        <div style={{ borderRadius: 6, background: C.card, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 30px 14px", borderBottom: `1px solid ${RULE}`, font: `400 21px/1 ${MONO}` }}>
            <span><span style={{ color: C.inkSoft }}>Rysunek</span> <b style={{ fontWeight: 500 }}>Rzut z adnotacjami</b> &nbsp; <span style={{ color: C.inkSoft }}>Skala</span> <b style={{ fontWeight: 500 }}>1:100</b> &nbsp; <span style={{ color: C.inkSoft }}>Arkusz</span> <b style={{ fontWeight: 500 }}>02</b></span>
            <span style={{ color: C.green, fontWeight: 500 }}>● Gotowe</span>
          </div>
          <div style={{ padding: "8px 6px 0" }}><Plan t={t} at={at} width={948} sunMin={600} clashAt={at + 1.2} calloutsAt={at + 1.9} /></div>
        </div>
      </div>
      <div style={{ position: "absolute", left: -150, top: 690, width: 600, padding: "24px 32px 28px", borderTop: `8px solid ${ALERT}`, borderRadius: 6, background: C.card,
        boxShadow: "0 24px 40px -28px rgba(17,19,17,.55)", opacity: slip, translate: `0px ${(1 - slip) * 80}px`, rotate: `${-1.2 * slip}deg` }}>
        <div style={{ font: `400 21px/1 ${SANS}`, color: C.inkSoft }}><b style={{ font: `500 21px/1 ${MONO}`, color: C.ink }}>06</b> Argument do negocjacji · z rzutu</div>
        <div style={{ marginTop: 12, font: `400 38px/1.15 ${DISPLAY}` }}>Kolizja: <span style={{ background: `linear-gradient(to top, transparent .42em, ${MARKER} .42em, ${MARKER} .84em, transparent .84em)` }}>drzwi otwierają się na siebie</span></div>
      </div>
    </div>
  );
};

/** "Nowa analiza" form (analyses/new/page.tsx + Stepper.tsx): paste, PDF, then the stepper walks to the report. */
export const NewAnalysis: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const TEXT = "Mieszkanie 3-pokojowe, 58,5 m², IV piętro w budynku 7-kondygnacyjnym. Salon z aneksem kuchennym, dwie sypialnie, łazienka, przedpokój. Balkon 5,2 m².";
  const n = Math.round(clampI(t, [at, at + 1.0], [0, TEXT.length], EASE.inOut));
  const chip = p01(t, at + 1.3, 0.3);
  const steps = ["Ogłoszenie i rzut", "Płatność", "Sprawdzenie danych", "Raport"];
  const doneN = t < at + 2.2 ? 0 : Math.min(3, 1 + Math.floor((t - at - 2.2) / 0.3));
  return (
    <Card style={{ position: "absolute", left: x, top: y, width: 1000, padding: "40px 52px 46px" }} radius={18}>
      <div style={{ display: "flex", gap: 26, marginBottom: 32, font: `600 22px/1 ${SANS}`, color: C.inkSoft }}>
        {steps.map((s, i) => {
          const done = i < doneN, cur = i === doneN;
          return (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 11, color: cur || done ? C.ink : C.inkSoft }}>
              <span style={{ width: 36, height: 36, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", font: `600 19px/1 ${SANS}`,
                border: `1.5px solid ${done ? C.brand : cur ? C.ink : RULE_STRONG}`, background: done ? C.brand : C.card, color: done ? C.onBrand : cur ? C.ink : C.inkSoft }}>{done ? "✓" : i + 1}</span>{s}
            </span>
          );
        })}
      </div>
      <div style={{ font: `300 50px/1 ${DISPLAY}`, marginBottom: 26 }}>Nowa analiza</div>
      <div style={{ font: `650 25px/1.2 ${SANS}`, marginBottom: 12 }}>Treść ogłoszenia <span style={{ fontWeight: 400, color: C.inkSoft }}>(wymagane)</span></div>
      <div style={{ height: 180, padding: "16px 20px", border: `1.5px solid ${RULE_STRONG}`, borderRadius: 12, background: "#fff", font: `400 24px/1.45 ${SANS}` }}>{TEXT.slice(0, n)}</div>
      <div style={{ font: `650 25px/1.2 ${SANS}`, margin: "28px 0 12px" }}>Rzut mieszkania w PDF <span style={{ fontWeight: 400, color: C.inkSoft }}>(opcjonalnie, ale warto)</span></div>
      <div style={{ position: "relative", height: 96, border: `2px dashed ${RULE_STRONG}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, font: `650 24px/1 ${SANS}` }}>
        Wybierz plik PDF <span style={{ fontWeight: 400, color: C.inkSoft }}>albo przeciągnij go tutaj</span>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 14, padding: "0 24px", borderRadius: 10, background: PAPER2, font: `500 24px/1 ${SANS}`, opacity: chip }}>
          <span style={{ font: `500 19px/1 ${MONO}`, color: C.inkSoft }}>PDF</span>rzut-mieszkania.pdf</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
        <span style={{ padding: "20px 32px", borderRadius: 6, background: C.ink, color: C.paper, font: `650 26px/1 ${SANS}`, scale: String(t > at + 1.9 && t < at + 2.05 ? 0.97 : 1) }}>Dalej: płatność</span>
        <span style={{ font: `italic 300 26px/1 ${SERIF}`, color: C.inkSoft }}>Przykład</span>
      </div>
    </Card>
  );
};

/** Plan on a sheet with the time of day running (lib/sun.ts), plus the overheating note. */
export const SunSheet: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const min = clampI(t, [at, at + 3.0], [420, 1140], EASE.inOut);
  const m = Math.round(min / 30) * 30;
  const note = p01(t, at + 1.2, 0.45);
  return (
    <>
      <Card style={{ position: "absolute", left: x, top: y, width: 1000, padding: "20px 24px 6px" }} radius={8}>
        <div style={{ display: "flex", gap: 30, font: `400 23px/1 ${MONO}`, color: C.inkSoft, padding: "0 8px 10px", borderBottom: `1px solid ${RULE}` }}>
          <span>Pora dnia <b style={{ fontWeight: 500, color: C.ink }}>{String(Math.floor(m / 60)).padStart(2, "0")}:{String(m % 60).padStart(2, "0")}</b></span>
          <span>Sezon <b style={{ fontWeight: 500, color: C.ink }}>lato</b></span><span>Szerokość <b style={{ fontWeight: 500, color: C.ink }}>52°N</b></span><span>Przykład</span>
        </div>
        <Plan t={t} at={-10} width={950} sunMin={min} />
      </Card>
      <div style={{ position: "absolute", left: 150, top: 640, width: 560, padding: "22px 30px 26px", borderTop: `8px solid ${WARM}`, borderRadius: 6, background: C.card,
        boxShadow: "0 24px 40px -28px rgba(17,19,17,.55)", opacity: note, translate: `0px ${(1 - note) * 60}px`, rotate: `${-1.2 * note}deg` }}>
        <div style={{ font: `400 21px/1 ${SANS}`, color: C.inkSoft }}>ze słońca · lato</div>
        <div style={{ marginTop: 12, font: `400 37px/1.15 ${DISPLAY}` }}>Salon: wysokie ryzyko przegrzewania latem</div>
      </div>
    </>
  );
};

/** Price scale (PriceSection.tsx PriceScale): zones, median, dimension line, pin travelling from the median to the offer. */
export const PriceSheet: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const MEDIAN = 46.7, OFF_AT = 72.8, W = 880;
  const k = clampI(t, [at + 0.8, at + 1.7], [0, 1], EASE.inOut);
  const pos = ((MEDIAN + (OFF_AT - MEDIAN) * k) * W) / 100;
  const dim = p01(t, at + 0.4, 0.5), active = t > at + 1.7;
  return (
    <Card style={{ position: "absolute", left: x, top: y, width: 1000, padding: "42px 60px 50px" }} radius={18}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ width: 52, height: 52, borderRadius: 26, border: `1.6px solid ${C.ink}`, display: "inline-flex", alignItems: "center", justifyContent: "center", font: `500 21px/1 ${MONO}` }}>05</span>
        <span style={{ font: `300 46px/1 ${DISPLAY}` }}>Cena na tle transakcji</span>
        <span style={{ marginLeft: "auto", font: `italic 300 26px/1 ${SERIF}`, color: C.inkSoft }}>Przykład</span>
      </div>
      <div style={{ marginTop: 18, height: 7, borderTop: `3px solid ${C.ink}`, borderBottom: `1px solid ${C.ink}` }} />
      <div style={{ marginTop: 14, font: `400 20px/1.3 ${MONO}`, color: C.inkSoft }}>źródło: dane demonstracyjne, nie Rejestr Cen Nieruchomości · 24 transakcje</div>
      <div style={{ marginTop: 30, font: `400 31px/1.35 ${SANS}` }}>Cena za m² tej oferty: <b>13 419 zł</b> — <b>powyżej rynku</b>.</div>
      <div style={{ position: "relative", marginTop: 36, paddingTop: 92, width: W }}>
        <div style={{ position: "absolute", top: 0, left: pos, translate: "-50% 0px", textAlign: "center", color: OFFER, font: `700 18px/1.35 ${SANS}`, letterSpacing: ".1em", whiteSpace: "nowrap" }}>
          TA OFERTA<div style={{ font: `600 30px/1.2 ${DISPLAY}`, letterSpacing: 0 }}>13 419 zł/m²</div></div>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, height: 30 }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ background: i === 2 && active ? MARKER : PAPER2, border: `1.5px solid ${i === 2 && active ? WARM_LINE : RULE_STRONG}` }} />)}
          <span style={{ position: "absolute", top: -10, bottom: -10, left: (MEDIAN * W) / 100 - 1.5, width: 3, background: C.ink }} />
          <span style={{ position: "absolute", top: -18, bottom: -18, left: pos - 2.5, width: 5, background: OFFER }} />
          <span style={{ position: "absolute", top: -27, left: pos - 9, width: 18, height: 18, borderRadius: 9, background: OFFER }} />
        </div>
        <div style={{ position: "relative", margin: "26px 33.333% 0", height: 2, background: C.ink, scale: `${dim} 1` }}>
          <span style={{ position: "absolute", left: "50%", top: 12, translate: "-50% 0px", whiteSpace: "nowrap", font: `400 21px/1 ${SANS}`, color: INK2, opacity: dim }}>typowy przedział</span>
        </div>
        <div style={{ position: "relative", height: 34, marginTop: 30, font: `500 22px/1 ${MONO}` }}>
          <span style={{ position: "absolute", left: "33.333%", translate: "-50% 0px" }}>11 704 zł</span>
          <span style={{ position: "absolute", left: "66.667%", translate: "-50% 0px" }}>13 113 zł</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 18, font: `400 26px/1 ${SANS}`, textAlign: "center", color: C.inkSoft }}>
          <span>poniżej rynku</span><span>typowo</span><span style={{ color: C.ink, fontWeight: 700 }}>powyżej rynku</span>
        </div>
      </div>
    </Card>
  );
};

/** Negotiation arguments (page.tsx ARGUMENTS), as a document list. */
export const Arguments: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const rows = [
    { src: "z rzutu", fact: "Przedpokój węższy niż 90 cm" },
    { src: "ze słońca", fact: "Salon: wysokie ryzyko przegrzewania latem" },
    { src: "z transakcji, gdy jest dość danych", fact: "Nadwyżka ceny za m², której dane nie tłumaczą" },
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 1000 }}>
      {rows.map((r, i) => {
        const o = p01(t, at + i * 0.3, 0.35);
        return (
          <div key={r.fact} style={{ padding: "28px 0", borderTop: `1.5px solid ${RULE_STRONG}`, borderBottom: i === 2 ? `1.5px solid ${RULE_STRONG}` : undefined, opacity: o, translate: `${(1 - o) * 40}px 0px` }}>
            <div style={{ font: `400 21px/1 ${MONO}`, color: C.inkSoft }}>{r.src}</div>
            <div style={{ marginTop: 12, font: `400 42px/1.12 ${DISPLAY}` }}>{r.fact}</div>
            {i === 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 20, font: `400 25px/1.4 ${SANS}` }}>
                <div><div style={{ font: `650 21px/1.2 ${SANS}`, color: C.inkSoft, marginBottom: 8 }}>Możesz zapytać</div>Zapytaj, czy deweloper może zmienić układ (np. kierunek otwierania drzwi) albo uwzględnić to w cenie.</div>
                <div><div style={{ font: `650 21px/1.2 ${SANS}`, color: C.inkSoft, marginBottom: 8 }}>Możesz zaproponować</div>Możesz poprosić o rabat albo o zmianę lokatorską bez dodatkowej opłaty, która usunie ten problem.</div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ marginTop: 26, font: `italic 300 28px/1.3 ${SERIF}`, color: C.inkSoft, opacity: p01(t, at + 1.0, 0.3) }}>To propozycje do rozmowy, nie gwarancja obniżki.</div>
    </div>
  );
};
