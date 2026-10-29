# Porównanie silników – Deweloperuch (ten sam scenariusz, ta sama marka)

Arkusz klatek: `deweloperuch-comparison.jpg` (wiersz 1 HyperFrames, 2 launch-video, 3 video-shotcraft; te same momenty filmu).

| | HyperFrames | launch-video | video-shotcraft |
|---|---|---|---|
| Plik | `deweloperuch-promo/renders/deweloperuch-v1.mp4` | `deweloperuch-launch-video/renders/deweloperuch-launch-video-v1.mp4` | `deweloperuch-shotcraft/renders/deweloperuch-shotcraft-v1.mp4` |
| Silnik | HTML + GSAP | Remotion (React) | Remotion (React) |
| Długość | 30 s | 30 s | 31,5 s (skill wymaga dłuższych zatrzymań) |
| Skąd ruch | pisany od zera wg zasad HyperFrames | szablon skilla: headline słowo po słowie + jedna karta UI na scenę | 7 kart z biblioteki 124 ujęć, kod demo dopasowany do marki |
| Zgodność z marką | najwyższa – ruch marki (rysowanie kreską, wsuwanie arkuszy) | średnia – preset Clean Launch: rozmycie przy słowach, poświata na końcu, ciemnozielona plansza logo | wysoka – „papier i tusz” skilla jest bliski marce; rozmycia usunięte |
| Najmocniejsze ujęcie | rzut rysujący się kreską + słońce | spójny rytm headline + karta | skan czytający rzut z etykietami; linia z paska analizy prowadząca do skali ceny |
| Słabsze miejsca | scena argumentów gęsta | Reveal/End gubią pierwsze słowo napisu; headline czasem napiera na kartę | układ scen zmieniony (cena przed słońcem); kilka scen bez karty z biblioteki |
| Nakład pracy agenta | średni | najmniejszy (gotowy szablon scen) | największy (czytanie kart i demo, przemalowanie) |

## Odstępstwa od procedur skilli (do wiadomości)
- Żaden skill nie dostał zrzutów działającej strony – w tej sesji nie wolno było uruchomić repo Deweloperucha. Ekrany odtworzone z kodu (`apps/web`), dla shotcraft wyrenderowane do tekstury 2x.
- launch-video: fonty z Google nie ładowały się przez certyfikat sieci środowiska – użyte lokalne pliki fontów marki.
- video-shotcraft: bez efektów dźwiękowych (jak w pozostałych wersjach), bez osobnego agenta-recenzenta i bez otwierania „workbencha”; zamiast `ui-strip-away-outro` (ciemny edytor) plansza końcowa z `paper-title-card`; styleframe pominięty, bo marka ma ścisły dokument stylu.
- Wszystkie trzy: bez lektora; dane przykładowe z fixtures, podpisane „Przykład / dane demonstracyjne”.
