// Deweloperuch tokens for the shotcraft film (apps/web/app/globals.css), plus the two helpers the screens use.
import React from "react";
import { Easing, interpolate } from "remotion";

export const C = {
  paper: "#F2F0EA", card: "#FBF9F4", ink: "#111311", inkSoft: "#625E53", line: "#DCD8CE", muted: "#EBE6DB",
  brand: "#14201A", onBrand: "#FBF9F4", green: "#2E6B3F",
};
export const DISPLAY = "Spectral, Georgia, serif";
export const SERIF = "Spectral, Georgia, serif";
export const SANS = "'Libre Franklin', Arial, sans-serif";
export const MONO = "'IBM Plex Mono', monospace";
export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
};
export const clampI = (t: number, input: number[], output: number[], easing = EASE.out) =>
  interpolate(t, input, output, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; radius?: number }> = ({ style, children, radius = 18 }) => (
  <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: radius, boxShadow: "0 1px 2px rgba(17,19,17,.06), 0 0 0 1px rgba(17,19,17,.05)", fontFamily: SANS, color: C.ink, ...style }}>
    {children}
  </div>
);
