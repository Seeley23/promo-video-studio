# Zewnętrzne komponenty

| Ścieżka | Źródło | Licencja | Wersja |
|---|---|---|---|
| `.claude/skills/launch-video/` | https://github.com/harish-anumula/launch-video-skill | MIT (Copyright 2026 Harish Reddy) | commit 5b9e5e5 |
| `.claude/skills/video-shotcraft/` | https://github.com/Vincentwei1021/video-shotcraft | Apache-2.0 (Wei Yihao) | commit 5a2e98d |
| `.claude/skills/ffmpeg-skill/` | https://github.com/kajisho5/ffmpeg-skill | MIT (Copyright 2026 kajisho5) | v3.1.1, commit 1ce2c18 (tylko SKILL.md, scripts, references, templates, docs/contract.md) |

Pliki licencji są w folderach skilli. launch-video i video-shotcraft używają Remotion, który ma własną licencję (https://www.remotion.dev/license): darmowy dla osób prywatnych i małych zespołów, firmy mogą potrzebować licencji firmowej.

Opcjonalne usługi zewnętrzne w skillach: ElevenLabs (lektor, launch-video, `ELEVENLABS_API_KEY`), upload-post.com (publikacja w social media, video-shotcraft, `UPLOAD_POST_API_KEY`). Bez kluczy nic nie jest wysyłane. ffmpeg-skill działa wyłącznie lokalnie (FFmpeg 6.1+, Python 3.10+, bez chmury).
