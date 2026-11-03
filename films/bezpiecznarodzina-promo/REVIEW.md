# Bezpieczna Rodzina – v1 (30 s, 16:9, bez lektora)

Plik: `renders/bezpiecznarodzina-v1.mp4` (1920×1080, 30,0 s, 10,8 MB). Silnik: HyperFrames 0.8.214.

## Co jest w filmie
- 7 scen: hook (3 karty „Zobacz…”), hero z animacją aplikacji z nagłówka strony (`header.mp4`), Opaska SOS, Smartwatch Kids, Lokalizator dla Pupila, statystyki, plansza końcowa.
- Wszystkie napisy dosłownie ze strony głównej; zdjęcia, ekrany aplikacji, logo i animacja z CDN marki. Nic nie jest rysowane ani generowane.
- Font DM Sans (lokalnie, OFL), kolory z profilu `brands/bezpiecznarodzina/brand.json`.
- Efekty dźwiękowe: pinezki (pop), cięcia (whoosh), klik na przycisku.

## Kontrola
- `hyperframes check`: OK. Jedno ostrzeżenie: dopisek o wyrobie medycznym (21 słów) jest na ekranie 4,9 s, a narzędzie liczy 5,1 s na przeczytanie. To drobny druk prawny na całą scenę, zostawiony świadomie.
- Ekrany aplikacji na CDN mają tylko 276×460 px, więc pokazane są w umiarkowanym rozmiarze (ok. 1,4×).

## Do decyzji klienta
- Pominięte: „Aplikacja #1 dla bezpieczeństwa rodziny” (twierdzenie porównawcze), ceny pakietów (dotyczą przedłużenia).
- Lektor: tekst w `SCRIPT.md`; ElevenLabs czeka na poprawny klucz `sk_…` w sekrecie sieci.
