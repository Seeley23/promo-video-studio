# promo-video-studio

Studio promo-filmów produktowych robionych w kodzie. Wejście: kod strony (repo, wklejone pliki) albo adres strony + profil marki. Wyjście: MP4 (16:9, 1:1, 9:16).

Szablony są uniwersalne. Marka to wymienny wkład w `brands/<marka>/`. Nigdy nie wpisuj kolorów, fontów, logo ani tekstów marki na sztywno w `templates/`.

## Układ repo

- `brands/_template/brand.json` – wzór profilu marki. `brands/<marka>/` – profil, logo, fonty jednej marki.
- `templates/` – uniwersalne sceny i struktury filmów (w budowie, patrz `templates/README.md`).
- `examples/boostnow-hyperframes/` – pierwszy gotowy film (HyperFrames). Wzorzec jakości i tempa, nie podstawa do kopiowania tekstów.
- `.claude/skills/launch-video/` – skill launch-video (Remotion, MIT, harish-anumula/launch-video-skill).
- `.claude/skills/video-shotcraft/` – skill video-shotcraft (Remotion, Apache-2.0, Vincentwei1021/video-shotcraft).
- `films/<marka>-<nazwa>/` – projekty konkretnych filmów (tworzone przez agenta).

## Procedura dla agenta: „zrób film dla marki X”

1. **Profil marki.** Jeśli `brands/<marka>/brand.json` nie istnieje, utwórz go z kodu strony: kolory z CSS/Tailwind (przelicz oklch na hex), fonty, logo (plik marki, nigdy rysowany), URL, CTA, język. Pokaż go do akceptacji.
2. **Treść.** Wyciągnij z kodu: hasło główne, problemy, rozwiązanie, wyniki/liczby, CTA, interaktywne narzędzia (kalkulatory, panele). Liczby i hasła tylko ze źródła, dosłownie.
3. **Scenariusz.** Weź scenariusz od użytkownika albo napisz tabelę: czas | obraz | napis | lektor (~2,2 słowa/s). Pokaż do akceptacji przed budową.
4. **Budowa.** Dobierz sceny z `templates/` (albo skill launch-video / video-shotcraft), wstaw profil marki i treść. Ekrany produktu odtwórz z kodu 1:1 (te same teksty, wartości, style) – żadnych zmyślonych ekranów.
5. **Kontrola.** Sprawdź klatki każdej sceny i każdego cięcia, czytelność napisów, zgodność liczb ze źródłem.
6. **Dźwięk i lektor.** Efekty na widocznych akcjach. Lektor: HeyGen API v3 (`api.heygen.com`, klucz dokleja sieć środowiska jako `X-Api-Key`; saldo portfela API musi być > 0), ElevenLabs (launch-video, `ELEVENLABS_API_KEY`) albo darmowy Kokoro (bez języka polskiego).
7. **Render** do `films/<marka>-<nazwa>/renders/` i krótka notatka REVIEW.md.

## Zasady

- Nie commituj kluczy API ani plików kont usług (np. `*.json` z `private_key`).
- Kod repozytoriów klientów czytaj, ale nie instaluj i nie uruchamiaj ich zależności bez zgody użytkownika.
- Remotion (oba skille) ma własną licencję: darmowy dla osób i małych zespołów, firmy mogą potrzebować płatnej licencji. HyperFrames jest open source.
