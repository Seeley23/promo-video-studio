# Generates the scene files from one table (single source of copy and timing).
import json
IMG = "assets/img/willa-na-sprzedaz-cala-domingos-mallorca-{}.jpg"
# (id, start, duration, kicker, title, sub, shots[(photo, from, to)], mode)
# move: (scale0, scale1, x0, x1, y0, y1) in px; photos are covered to 1920x1080.
SCENES = [
 ("hook", 0, 4.2, "07:00", "Budzisz się minutę od plaży", "CALA DOMINGOS", [(18, 0, 4.2, (1.12, 1.0, 0, 0, -20, 20))]),
 ("place", 4.2, 4.0, "MAJORKA · WSCHODNIE WYBRZEŻE", "W granicach chronionego parku krajobrazowego", "", [(19, 0, 4.0, (1.0, 1.1, 0, 0, 30, -30))]),
 ("roof", 8.2, 4.4, "09:00", "Taras na dachu z widokiem na morze", "", [(3, 0, 2.2, (1.04, 1.1, -40, 20, 0, 0)), (4, 2.2, 4.4, (1.1, 1.04, 20, -30, 0, 0))]),
 ("pool", 12.6, 4.4, "13:00", "Podgrzewany basen", "1 MIN DO PLAŻY", [(2, 0, 2.2, (1.02, 1.1, 0, 0, 0, -20)), (22, 2.2, 4.4, (1.0, 1.0, 0, 0, 0, 0))]),
 ("inside", 17.0, 4.6, "16:00", "358 m² · 4 sypialnie", "WYKOŃCZENIE PORCELANOSA · AGD SIEMENS", [(8, 0, 2.3, (1.1, 1.02, 30, -10, 0, 0)), (26, 2.3, 4.6, (1.02, 1.1, -20, 20, 0, 0))]),
 ("dusk", 21.6, 4.0, "20:30", "Gotowa do zamieszkania", "W PEŁNI UMEBLOWANA", [(15, 0, 4.0, (1.0, 1.08, 0, -30, 0, 0))]),
 ("night", 25.6, 3.8, "VILLA TRAMUNTANA", "1 395 000 EUR", "DZIAŁKA 586 m² · NR OFERTY 933642", [(17, 0, 3.8, (1.08, 1.0, 0, 0, 0, 0))]),
]
TPL = open("tools/scene.tpl").read()
for sid, start, dur, kicker, title, sub, shots in SCENES:
    shot_html, js = [], []
    for k, (n, a, b, mv) in enumerate(shots):
        s0, s1, x0, x1, y0, y1 = mv
        sid_k = f"{sid}-s{k}"
        cls = "shot pano" if n == 22 else "shot"
        hide = ' style="opacity:0"' if k > 0 else ""
        shot_html.append(f'<div class="{cls}" id="{sid_k}"{hide}><img src="{IMG.format(n)}" alt="Villa Tramuntana, Cala Domingos – zdjęcie {n}" /></div>')
        if n == 22:  # panorama: slow horizontal travel across the wide frame
            js.append(f'tl.fromTo("#{sid_k} img", {{ x: 0 }}, {{ x: -1000, duration: {b-a:.2f}, ease: "none" }}, {a});')
        else:
            js.append(f'tl.fromTo("#{sid_k} img", {{ scale: {s0}, x: {x0}, y: {y0} }}, {{ scale: {s1}, x: {x1}, y: {y1}, duration: {b-a:.2f}, ease: "none" }}, {a});')
        if k > 0:
            js.append(f'tl.set("#{sid_k}", {{ opacity: 1 }}, {a});')
    html = (TPL.replace("{{ID}}", sid).replace("{{DUR}}", str(dur)).replace("{{KICKER}}", kicker)
            .replace("{{TITLE}}", title).replace("{{SUB}}", sub).replace("{{SHOTS}}", "\n      ".join(shot_html))
            .replace("{{JS}}", "\n      ".join(js)).replace("{{SUBDISPLAY}}", "block" if sub else "none"))
    open(f"compositions/{sid}.html", "w").write(html)
json.dump([[s[0], s[1], s[2]] for s in SCENES], open("scenes.json", "w"))
print("ok", len(SCENES))
