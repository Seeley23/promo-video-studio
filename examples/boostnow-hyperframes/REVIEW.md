# REVIEW – BoostNow „0,4 sekundy” v1

Plik: renders/boostnow-v1.mp4 (30 s, 1920x1080, 30 fps, efekty dźwiękowe, bez lektora i muzyki).

## Decyzje
- Fabuła A z STORYLINES.md. B („Twoje 50 000 zł”) i C („Kogo poleca AI?”) niezbudowane.
- Ekrany odtworzone z kodu repo Seeley23/boostnow (LossCalculator, ProblemSection, SolutionSection, ResultsSection, HeroSection); strony nie dało się uruchomić w sesji.
- Liczby z Kalkulatora Strat liczone tym samym wzorem co na stronie, z domyślnych wartości suwaków (15 375 zł/msc).
- Opisy pod „Usuwamy opór / Hakujemy uwagę / Dowozimy ROI” usunięte: na ekranie byłyby za krótko, żeby je przeczytać.
- Na stronie jest literówka „Dowożimy ROI”; w filmie „Dowozimy ROI”.
- Tło całego filmu #05070C (tło pliku logo), żeby logo nie miało widocznego prostokąta.

## Sprawdzone
- `check` przechodzi. Klatki z każdej sceny i każdego cięcia obejrzane.
- Dźwięk zmierzony, nie odsłuchany: -14.3 LUFS, true peak -1.3 dBTP, bez przesterów.

## Ostrzeżenia zostawione celowo
- Drobny tekst w Kalkulatorze Strat (8–10.4 s): ujęcie całego narzędzia przed zbliżeniem na kwotę.
- Kontrast drobnego druku w przeładowanej reklamie (0–2.5 s): ma być nieczytelny.

## Najsłabsze ujęcie i co dalej
- Scena z czasownikami (17.2–22.4 s) jest najprostsza: emoji + słowo na ciemnym tle.
- Do zrobienia: lektor HeyGen (PL) wg SPEC.md, muzyka z katalogu HeyGen, potem dopasowanie czasów scen do nagrania.
