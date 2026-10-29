import React from "react";
import { Composition } from "remotion";
import "./fonts.css";
import { Promo, PROMO_DURATION } from "./Promo";
import { ArguePage, ARGUE_PAGE_H } from "./dw/ArguePage";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Promo" component={Promo} width={1920} height={1080} fps={30} durationInFrames={PROMO_DURATION} />
    <Composition id="ArguePage" component={ArguePage} width={1920} height={ARGUE_PAGE_H} fps={30} durationInFrames={1} />
  </>
);
