# SPEC – BoostNow „0,4 sekundy”

GOAL:    właściciel firmy widzi, ile traci przez przeładowany marketing, i klika „Zboostuj wyniki TERAZ” na boostnow.pl.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps
TIME:    30 s x 30 fps = 900 klatek. Lektor (HeyGen, PL) jest zegarem; do czasu nagrania czasy wg tabeli SHOTS.

LOOK:    ground #020306 (tło strony), karty #06090F z obramowaniem #1F2227 2 px; tło planszy końcowej #05070C (tło logo).
         ink #EBEFF5, drugorzędny #7D8086. Akcent limonka #AEF512 – jedno słowo na kadr, przycisk CTA, wynik.
         Straty: czerwień kalkulatora #F87171 (text-red-400) na #7F1D1D @ 40–60% – kolor statusu ze strony, zostaje.
         Display Poppins 700, 96–120 px, tracking -2%. Tekst UI Inter 400/700, min. 28 px.
         Medium: prawdziwe komponenty strony boostnow.pl (Kalkulator Strat, sekcja Problem, Rozwiązanie, Case Studies)
         odtworzone 1:1 z kodu repo, pokazane w 1.6–2x skali. Bez grainu, winieta 0.
         Jedna lokalna poświata limonki tylko pod CTA (glow-lime ze strony: 0 0 40px #AEF512 @ 30%).

OBJECTS: przeładowana reklama (karta 900x620 z 9 hasłami, 4 przyciskami, 3 badge'ami – „ściana tekstu”);
         licznik 0.4 s (cyfry Poppins 700 320 px, pasek postępu);
         karty trzech błędów z sekcji Problem; Kalkulator Strat (5 suwaków, Rozbicie Strat, Całkowita strata miesięczna);
         karta case study E-commerce (Wzrost konwersji +156%, Redukcja porzuceń -42%, ROI kampanii 340%);
         logo boostnow (assets/logo.svg) i przycisk „Zboostuj wyniki TERAZ”.

MOTION:  wejścia expo.out 0.5 s; kamera power2.inOut 0.6 s; wyjścia power3.in 0.3 s.
         Tytuły: blur 8→0 px w 0.18 s, po wylądowaniu stoją. Liczniki 1.2–1.4 s, potem stop.
         Stagger słów 80 ms, wierszy listy 60 ms.

SHOTS (VO = lektor):
  S1 hook     0.0–3.6   Przeładowana reklama w kadrze od klatki 0, licznik 0.4 → 0.0, kciuk/scroll wyrzuca ją w górę (whip).
                        Tytuł „Masz 0.4 sekundy.” VO: „Tyle masz, zanim klient przewinie dalej.”
  S2 tension  3.6–8.0   Reklama rozpada się na trzy błędy – każdy osobno, inny układ: Przeładowanie (słowa się piętrzą),
                        Brak priorytetów (wzrok skacze), Wysiłek (pasek ładowania się wlecze).
                        VO: „Przeładowanie. Brak priorytetów. Wysiłek. To kosztuje.”
  S3 proof    8.0–14.6  Kalkulator Strat: suwaki ustawiają się (50 000 zł, 2.5%, 150 zł, 15%, 5 osób), Rozbicie Strat
                        się wypełnia, kwota „15 375 zł” liczy się 1.4 s. Potem „Finansujesz ignorancję rynku.”
                        VO: „Przy pięćdziesięciu tysiącach przychodu to ponad piętnaście tysięcy złotych miesięcznie.”
  S4 reveal   14.6–17.2 Kwota straty kurczy się w punkt, z którego wychodzi strzałka logo → „boostnow”. Pod spodem
                        „Masz 0.4 sekundy. My to zmieniamy.” VO: „BoostNow to zmienia.”
  S5 proof    17.2–22.4 Jeden czasownik naraz, jak automat (slot): Usuwamy opór → Hakujemy uwagę → Dowozimy ROI,
                        każdy z prawdziwym opisem ze strony. VO: „Usuwamy opór. Hakujemy uwagę. Dowozimy ROI.”
  S6 payoff   22.4–26.6 Karta case study E-commerce, trzy liczby liczą się po kolei, +156% największe.
                        VO: „W e-commerce: plus sto pięćdziesiąt sześć procent konwersji.”
  S7 end      26.6–30.0 Logo wjeżdża (strzałka wylatuje, napis wyciera się), przycisk „Zboostuj wyniki TERAZ”, boostnow.pl,
                        trzyma 2 s. VO: „BoostNow. Zboostuj wyniki teraz.”

BANNED:  ciemna pustka z małymi elementami pośrodku (UI zawsze ≥ 40% kadru); świecące kule, cząsteczki;
         fioletowe/niebieskie gradienty, karty glass; trzy karty w rzędzie (S2 i S5 pokazują po jednym);
         wszystko „fade + slide up”; tytuły pływające po wylądowaniu; logo w rogu; UI pochylone w 3D;
         liczby spoza strony boostnow.pl.

QA:      t=0.0 przeładowana reklama widoczna (miniatura); t=2.8 licznik bliski 0; t=6 karta błędu czytelna;
         t=13.5 „15 375 zł” w pełni; t=16 logo czytelne; t=20 jeden czasownik; t=25.5 „+156%”; t=29 CTA + boostnow.pl.

VOICEOVER (PL, ~55 słów, HeyGen):
  0.3  Tyle masz, zanim klient przewinie dalej.
  3.9  Przeładowanie. Brak priorytetów. Wysiłek. To kosztuje.
  8.3  Przy pięćdziesięciu tysiącach przychodu to ponad piętnaście tysięcy złotych miesięcznie.
  14.9 BoostNow to zmienia.
  17.4 Usuwamy opór. Hakujemy uwagę. Dowozimy ROI.
  22.6 W e-commerce: plus sto pięćdziesiąt sześć procent konwersji.
  27.0 BoostNow. Zboostuj wyniki teraz.

Źródła liczb: LossCalculator.tsx (domyślne wartości i wzór → 1875 / 7500 / 6000 / 15 375 zł), ResultsSection.tsx (E-commerce),
SolutionSection.tsx, ProblemSection.tsx, HeroSection.tsx (CTA).
