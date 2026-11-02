<template>
  <style>
    #root { position: absolute; inset: 0; overflow: hidden; }
    #{{ID}}-stage { position: absolute; inset: 0; background: #0b0b0b; }
    #{{ID}}-stage .shot { position: absolute; inset: 0; overflow: hidden; }
    #{{ID}}-stage .shot img { width: 1920px; height: 1080px; object-fit: cover; display: block; }
    #{{ID}}-stage .shot.pano img { width: 2920px; height: 1080px; }
    #{{ID}}-shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(8,8,8,.62) 0%, rgba(8,8,8,.25) 38%, rgba(8,8,8,0) 60%), linear-gradient(90deg, rgba(8,8,8,.45) 0%, rgba(8,8,8,0) 60%); }
    #{{ID}}-kicker { position: absolute; left: 140px; top: 640px; font: 600 28px/1 "Mulish"; letter-spacing: .5em; color: #fff; }
    #{{ID}}-rule { position: absolute; left: 140px; top: 688px; width: 120px; height: 3px; background: #96003a; transform-origin: left center; }
    #{{ID}}-title { position: absolute; left: 136px; top: 716px; width: 1200px; font: 200 92px/1.08 "Mulish"; color: #fff; }
    #{{ID}}-sub { position: absolute; left: 140px; top: 940px; display: {{SUBDISPLAY}}; font: 400 30px/1 "Mulish"; letter-spacing: .32em; color: rgba(255,255,255,.85); }
  </style>
  <div id="root" data-composition-id="{{ID}}" data-width="1920" data-height="1080">
    <div id="{{ID}}-stage" class="clip" data-start="0" data-duration="{{DUR}}" data-track-index="0" data-layout-allow-overlap>
      {{SHOTS}}
      <div id="{{ID}}-shade"></div>
      <p id="{{ID}}-kicker">{{KICKER}}</p>
      <div id="{{ID}}-rule"></div>
      <h2 id="{{ID}}-title">{{TITLE}}</h2>
      <p id="{{ID}}-sub">{{SUB}}</p>
    </div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      // Photos are the listing's own; the camera drifts slowly, copy lands once and holds.
      {{JS}}
      tl.fromTo("#{{ID}}-kicker", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" }, 0.25);
      tl.fromTo("#{{ID}}-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0.45);
      tl.fromTo("#{{ID}}-title", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, 0.55);
      tl.fromTo("#{{ID}}-sub", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.95);
      tl.to(["#{{ID}}-kicker", "#{{ID}}-rule", "#{{ID}}-title", "#{{ID}}-sub"], { opacity: 0, duration: 0.25, ease: "power2.in" }, {{DUR}} - 0.3);
      window.__timelines["{{ID}}"] = tl;
    })();
  </script>
</template>
