// Deweloperuch promo made with video-shotcraft (autonomous mode). SHOTS is the single source of timing.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import "./fonts.css";
import { DrawSvgTrace } from "./demos/ui-entrance/draw-svg-trace/DrawSvgTrace";
import { ScanlineAnnotateFocus } from "./demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus";
import { BrandInkOpen } from "./demos/typography/brand-ink-open/BrandInkOpen";
import { LineCarryTransition } from "./demos/transition/line-carry-transition/LineCarryTransition";
import { RowEmbed } from "./demos/ui-entrance/row-embed/RowEmbed";
import { PaperTitleCard } from "./demos/typography/paper-title-card/PaperTitleCard";
import { StepsShot, SunShot } from "./shots/Feature";

export const SHOTS = [
  { id: "hook", from: 0, duration: 115, C: DrawSvgTrace },
  { id: "plan", from: 115, duration: 140, C: ScanlineAnnotateFocus },
  { id: "reveal", from: 255, duration: 104, C: BrandInkOpen },
  { id: "steps", from: 359, duration: 105, C: StepsShot },
  { id: "price", from: 464, duration: 166, C: LineCarryTransition },
  { id: "sun", from: 630, duration: 105, C: SunShot },
  { id: "argue", from: 735, duration: 90, C: RowEmbed },
  {
    id: "end", from: 825, duration: 120,
    C: () => (
      <PaperTitleCard lockup fade={false} duration={120} digits=""
        words={[{ text: "Zamów" }, { text: "raport", accent: true }, { text: "—" }, { text: "179 zł" }]}
        sub="Jedna oferta · bez abonamentu · deweloperuch.dev" />
    ),
  },
] as const;
export const PROMO_DURATION = 945;

export const Promo: React.FC = () => (
  <AbsoluteFill style={{ background: "#f2f0ea" }}>
    {SHOTS.map((s) => (
      <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}>
        <s.C />
      </Sequence>
    ))}
  </AbsoluteFill>
);
