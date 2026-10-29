# REVIEW – Deweloperuch promo v1

Plik: renders/deweloperuch-v1.mp4 (30 s, 1920x1080, 30 fps, bez dźwięku – lektor odłożony na później).

## Decyzje
- Scenariusz: SCRIPT.md (zaakceptowany, hak zmieniony na pytanie).
- Wygląd i ruch z marki (docs/design-language.md): papier, teczka, tabliczka rysunkowa, chmurka rewizji, linia wymiarowa, żółty zakreślacz tylko na pozycji ceny. Ruch: rysowanie kreską, pojawianie się, wsuwanie arkuszy. Bez rozmyć, emoji i nabijających się liczników.
- Rzut i model słońca przeniesione 1:1 z PlanSheet.tsx i lib/sun.ts; w scenie słońca pora dnia przesuwa się 07:00 → 19:00.
- Dane przykładowe: fixtures/listings/ls-001 (bez ceny i adresu), fixtures/rcn/scenario-001 (24 syntetyczne transakcje; p25 11 704, mediana 12 270, p75 13 113 zł/m², bez korekt). Na ekranie podpisane „Przykład” / „dane demonstracyjne”.
- Domena deweloperuch.dev – jedyna znaleziona w repo.

## Sprawdzone
- `check`: 0 błędów. Klatki każdej sceny obejrzane na arkuszu i z wyrenderowanego MP4.

## Ostrzeżenia zostawione celowo
- Drobny tekst na rzucie (podpisy pokoi): część rysunku, jak na stronie.
- film_silent: lektor i dźwięk na życzenie później.

## Słabsze miejsca
- Kwartyle cen liczone bez korekt z rcn-specification.md §4 – prawdziwy raport może dać inne liczby.
- Scena argumentów (3,5 s) jest gęsta; drugi i trzeci argument pokazane tylko z faktem.
