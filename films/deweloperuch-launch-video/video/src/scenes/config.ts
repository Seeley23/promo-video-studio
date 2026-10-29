// Per-scene HUD label and tone. Keep ids in sync with config/timeline.json.
export const SCENE_LABELS: Record<string, string> = {
  hook: "arkusz 01 — ogłoszenie",
  plan: "arkusz 02 — rzut",
  reveal: "deweloperuch",
  steps: "arkusz 03 — nowa analiza",
  sun: "arkusz 04 — słońce",
  price: "arkusz 05 — cena",
  argue: "arkusz 06 — argumenty",
  end: "raport jednej oferty",
};
export type Tone = "light" | "brand";
export const SCENE_TONE: Record<string, Tone> = { reveal: "brand", payoff: "brand" }; // default light
export const toneOf = (id: string): Tone => SCENE_TONE[id] ?? "light";
export const CTA = { button: "Zamów raport — 179 zł", url: "deweloperuch.dev" };
