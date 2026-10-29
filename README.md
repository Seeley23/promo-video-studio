# promo-video-studio

Szablony i agent (Claude Code) do robienia promo-filmów produktowych z kodu strony. Wklejasz kod albo link do repo, wybierasz markę, dostajesz MP4.

## Jak użyć

W Claude Code, w tym repo:

> Zrób 30-sekundowy film 16:9 dla marki X. Kod strony: <repo albo wklejone pliki>.

Agent działa wg `CLAUDE.md`: tworzy profil marki, pisze scenariusz do akceptacji, buduje sceny, sprawdza klatki, dodaje dźwięk i lektora, renderuje.

## Zawartość

| Folder | Co to jest |
|---|---|
| `brands/` | profile marek (kolory, fonty, logo, CTA, głos). `_template/` to wzór |
| `templates/` | uniwersalne sceny (w budowie) |
| `examples/boostnow-hyperframes/` | pierwszy gotowy film: `renders/boostnow-v1.mp4` |
| `.claude/skills/launch-video/` | skill [launch-video](https://github.com/harish-anumula/launch-video-skill) (MIT) |
| `.claude/skills/video-shotcraft/` | skill [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) (Apache-2.0) |

Szczegóły licencji zewnętrznych skilli: `THIRD_PARTY.md`.

## Wymagania środowiska

- Node 22+, FFmpeg, Chromium (w chmurze Claude Code są dostępne).
- HyperFrames: plugin `hyperframes@hyperframes` (`claude plugin marketplace add "heygen-com/hyperframes#v0.8.214"`).
- Lektor HeyGen: sekret sieciowy dla `api.heygen.com` z nagłówkiem `X-Api-Key` i dodatnie saldo portfela API.
