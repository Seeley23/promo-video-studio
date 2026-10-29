// Static "page" for row-embed: the arguments section of apps/web/app/page.tsx (#argumenty), copy verbatim.
// Rendered once to public/textures/argue-full.png (2x); ROWS is its layout table (page px).
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, DISPLAY, MONO, SANS, SERIF } from "./kit";

export const ARGUE_PAGE_H = 1160;
export const ROWS = [
  { x: 180, y: 340, w: 1560, h: 340 },
  { x: 180, y: 700, w: 1560, h: 150 },
  { x: 180, y: 870, w: 1560, h: 150 },
];
const ITEMS = [
  { src: "z rzutu", fact: "Przedpokój węższy niż 90 cm",
    ask: "Zapytaj, czy deweloper może zmienić układ (np. kierunek otwierania drzwi) albo uwzględnić to w cenie.",
    offer: "Możesz poprosić o rabat albo o zmianę lokatorską bez dodatkowej opłaty, która usunie ten problem." },
  { src: "ze słońca", fact: "Salon: wysokie ryzyko przegrzewania latem" },
  { src: "z transakcji, gdy jest dość danych", fact: "Nadwyżka ceny za m², której dane nie tłumaczą" },
];
export const ArguePage: React.FC = () => (
  <AbsoluteFill style={{ background: C.paper, fontFamily: SANS, color: C.ink }}>
    <div style={{ position: "absolute", left: 180, top: 110, font: `300 88px/1 ${DISPLAY}`, letterSpacing: -2 }}>Z czym idziesz <i>do dewelopera</i></div>
    <div style={{ position: "absolute", left: 182, top: 236, width: 1300, font: `400 32px/1.4 ${SANS}`, color: "#3D3A32" }}>
      Raport zamienia to, co znajdzie na rzucie i w świetle, w argumenty do rozmowy o rabacie albo o dodatku w cenie.
    </div>
    {ROWS.map((r, i) => (
      <div key={i} style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, boxSizing: "border-box", padding: "30px 40px",
        background: C.card, borderRadius: 8, boxShadow: "0 0 0 1px rgba(26,25,21,.14)" }}>
        <div style={{ font: `400 24px/1 ${MONO}`, color: C.inkSoft }}>{ITEMS[i].src}</div>
        <div style={{ marginTop: 14, font: `400 50px/1.1 ${DISPLAY}`, letterSpacing: -1 }}>{ITEMS[i].fact}</div>
        {ITEMS[i].ask && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 26, font: `400 30px/1.4 ${SANS}` }}>
            <div><div style={{ font: `650 24px/1.2 ${SANS}`, color: C.inkSoft, marginBottom: 8 }}>Możesz zapytać</div>{ITEMS[i].ask}</div>
            <div><div style={{ font: `650 24px/1.2 ${SANS}`, color: C.inkSoft, marginBottom: 8 }}>Możesz zaproponować</div>{ITEMS[i].offer}</div>
          </div>
        )}
      </div>
    ))}
    <div style={{ position: "absolute", left: 182, top: 1070, font: `italic 300 32px/1 ${SERIF}`, color: C.inkSoft }}>To propozycje do rozmowy, nie gwarancja obniżki.</div>
  </AbsoluteFill>
);
