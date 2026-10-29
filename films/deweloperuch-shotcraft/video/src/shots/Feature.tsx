// Product shots without a matching library card: the rebuilt screen on a slow PageCam-style push
// (scale 1.00 → 1.05, transform-origin on the screen), with the brand's serif title on the left.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, DISPLAY, clampI, EASE } from "../dw/kit";
import { NewAnalysis, SunSheet } from "../dw/screens";

const Title: React.FC<{ a: string; b: string; t: number }> = ({ a, b, t }) => {
  const o = clampI(t, [0.15, 0.6], [0, 1]);
  return (
    <div style={{ position: "absolute", left: 120, top: 300, width: 640, font: `300 92px/1.06 ${DISPLAY}`, letterSpacing: -2.4, color: C.ink, opacity: o, translate: `0px ${(1 - o) * 16}px` }}>
      {a} <i>{b}</i>
    </div>
  );
};
const Push: React.FC<{ t: number; dur: number; children: React.ReactNode }> = ({ t, dur, children }) => {
  const s = 1 + 0.05 * clampI(t, [0, dur], [0, 1], EASE.inOut);
  const enter = clampI(t, [0, 0.5], [0, 1]);
  return <AbsoluteFill style={{ scale: String(s), transformOrigin: "1380px 540px", translate: `${(1 - enter) * 160}px 0px`, opacity: enter }}>{children}</AbsoluteFill>;
};

export const StepsShot: React.FC = () => {
  const t = useCurrentFrame() / 30;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Push t={t} dur={3.5}><NewAnalysis t={t} x={860} y={130} at={0.45} /></Push>
      <Title a="Wklejasz" b="ogłoszenie i rzut" t={t} />
    </AbsoluteFill>
  );
};
export const SunShot: React.FC = () => {
  const t = useCurrentFrame() / 30;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Push t={t} dur={3.5}><SunSheet t={t} x={860} y={120} at={0.4} /></Push>
      <Title a="Godziny słońca" b="w każdym pokoju" t={t} />
    </AbsoluteFill>
  );
};
