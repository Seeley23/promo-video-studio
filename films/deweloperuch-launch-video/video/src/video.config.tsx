// THE FILE TO EDIT PER PRODUCT. One entry per scene id in config/timeline.json, in order.
import React from "react";
import { End } from "./scenes/End";
import { Feature } from "./scenes/Feature";
import { Reveal, REVEAL_LEAD } from "./scenes/Reveal";
import { PRESET } from "./theme";
import { SIGNATURES } from "./visuals/signatures";
import { Arguments, Folder, Listing, NewAnalysis, PriceSheet, SunSheet } from "./visuals/Deweloperuch";

export type SceneDef = { C: React.FC; lead?: number };

export const SCENES: Record<string, SceneDef> = {
  // Hook: the listing's claims get revision clouds while the question lands.
  hook: { C: () => <Feature id="hook" perLine={3} visual={(c) => <Listing t={c.t} x={880} y={420} c1={0.9} c2={1.5} />} /> },
  // The plan draws itself, the clash gets its cloud, the argument slip slides out.
  plan: { C: () => <Feature id="plan" perLine={3} visual={(c) => <Folder t={c.t} x={880} y={110} at={0.3} />} /> },
  reveal: { C: Reveal, lead: REVEAL_LEAD },
  steps: { C: () => <Feature id="steps" perLine={2} visual={(c) => <NewAnalysis t={c.t} x={880} y={300} at={0.5} />} /> },
  sun: { C: () => <Feature id="sun" perLine={2} visual={(c) => <SunSheet t={c.t} x={880} y={130} at={0.4} />} /> },
  price: { C: () => <Feature id="price" perLine={3} visual={(c) => <PriceSheet t={c.t} x={880} y={400} at={0.3} />} /> },
  argue: { C: () => <Feature id="argue" perLine={3} visual={(c) => <Arguments t={c.t} x={880} y={150} at={0.3} />} /> },
  end: { C: () => <End /> },
};

// The active preset's signature scene takes one beat (visuals/signatures.tsx), so a render in any preset shows its own move.
// Clean Launch keeps the storyboard above as is: its signature is the Feature beat itself. Delete these lines to opt out.
const SIG = SIGNATURES[PRESET].beat;
if (SIG && SCENES[SIG.id]) SCENES[SIG.id] = { C: SIG.C, lead: SIG.lead };
