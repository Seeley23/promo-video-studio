// draw-svg-trace —— 描边生长圈注（第二轮重设计 · 纸墨编辑风）
// 手法不变：一条带笔头的墨线沿元素轮廓跑一圈把它"画"出来 → 闭合瞬间加深加粗（白底上不用发光）→
// 描边交棒给元素自身边框、内容上墨 → 同一套路短版给重点词画一笔下划线。
//
// 设计决定
// - look = paper（暖白纸 · 墨 · 朱红）。主体放大到 1120×660（画宽 58%），内容是一张出版级 video-shotcraft 渲染报告卡：
//   眉题 mono、两段式大标题「Cuts on the beat / 100%」（100% 用 188px 黑体，是全镜头的重点词）、32px 说明、
//   右侧 12 根逐镜头能量柱（末三根朱红）、署名行（video-shotcraft 标志 + 字标）。
// - 开场就有东西：绘图纸点阵底 + 四角先长出裁切标记（印刷对位线）——观众先知道"这里要画一个东西"，笔再沿轮廓跑一圈。
// - 笔头：主线 6px 墨 + 三段渐细短 dash + 实心笔尖（按圆角矩形弧长精确定位，带落影）；
//   描边速度 in-out（起笔、收笔有呼吸），笔尖在四个圆角处自然减速（弧长参数化本身不减速，靠 in-out 整体曲线）。
// - 闭合：2f 冲纯黑 + 6→11px 加粗，6f 回落；裁切标记同时向外"弹"一下后退场。
// - 上墨：内容自上而下 3f 错峰由虚到实 + 上浮；柱子从基线长出（错峰 1.5f，末三根最后、朱红）；卡片从贴地升起（阴影长出来）。
// - 第二用法：100% 下一笔手绘朱红马克笔下划线（略带弧度的路径，18f out-cubic，笔头跟随），画完常驻。
//
// 时间表（30fps，共 132f）
//   0–12    裁切标记从四角长出（snappy，错峰 2f）
//   10–50   轮廓描边 40f（in-out cubic），笔头可见
//   50–58   闭合闪：50–52 冲黑加粗、52–58 回落；裁切标记外弹淡出
//   50–74   上墨：卡底 + 内容逐块（3f 错峰）、柱图长出、卡片升起
//   56–66   描边淡出 → 卡片自身发丝边淡入
//   74–92   100% 下划线 18f
//   92–132  hold 40f：0.9% 极缓推近
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { EASE, FONT, ramp, softShadow } from '../../_fixtures/Polish';
import { LOOKS, Stage, alpha, type } from '../../_fixtures/Look';

export const DRAW_SVG_TRACE_DURATION = 132;

const L = LOOKS.paper;
const CW = 1120;
const CH = 660;
const CX = (1920 - CW) / 2; // 400
const CY = (1080 - CH) / 2; // 210
const RX = 28; // 与卡片圆角一致（交棒不错型）
const PEN = 0.04; // 笔头 dash 长度（占整圈比例）
const INK = L.ink;
const TRACE0 = 10, TRACE1 = 50;

// 圆角矩形轮廓上弧长比例 u∈[0,1] 的点（与 SVG <rect> 的路径起点/方向一致：从上边 (x+rx, y) 顺时针）
const rrPoint = (u: number, x: number, y: number, w: number, h: number, r: number): [number, number] => {
  const sx = w - 2 * r, sy = h - 2 * r, arc = (Math.PI * r) / 2;
  const Ltot = 2 * sx + 2 * sy + 4 * arc;
  let s = (((u % 1) + 1) % 1) * Ltot;
  const segs: Array<[number, (k: number) => [number, number]]> = [
    [sx, (k) => [x + r + k * sx, y]],
    [arc, (k) => [x + w - r + r * Math.sin((k * Math.PI) / 2), y + r - r * Math.cos((k * Math.PI) / 2)]],
    [sy, (k) => [x + w, y + r + k * sy]],
    [arc, (k) => [x + w - r + r * Math.cos((k * Math.PI) / 2), y + h - r + r * Math.sin((k * Math.PI) / 2)]],
    [sx, (k) => [x + w - r - k * sx, y + h]],
    [arc, (k) => [x + r - r * Math.sin((k * Math.PI) / 2), y + h - r + r * Math.cos((k * Math.PI) / 2)]],
    [sy, (k) => [x, y + h - r - k * sy]],
    [arc, (k) => [x + r - r * Math.cos((k * Math.PI) / 2), y + r - r * Math.sin((k * Math.PI) / 2)]],
  ];
  for (const [len, f] of segs) {
    if (s <= len) return f(len > 0 ? s / len : 0);
    s -= len;
  }
  return [x + r, y];
};


// 下划线：略带弧度的手绘笔画（本地坐标，宽 300）
const UL_PATH = 'M4,14 C70,6 150,18 230,9 S290,10 300,8';

export const DrawSvgTrace: React.FC = () => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [TRACE0, TRACE1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });

  // 闭合闪：50–52 冲峰，52–58 回落（纯黑 + 加粗，不发光）
  const flash = frame < 52 ? ramp(frame, 50, 2, EASE.linear) : 1 - ramp(frame, 52, 6, EASE.out);
  const strokeW = 6 + flash * 5;
  const strokeColor = flash > 0.5 ? '#000000' : INK;

  const traceOp = 1 - ramp(frame, 56, 10, EASE.linear);
  const borderOp = 1 - traceOp;
  const lift = ramp(frame, 50, 22, EASE.out);
  const inkIn = (k: number) => ramp(frame, 52 + k * 3, 12, EASE.out);
  const rise = (k: number): React.CSSProperties => {
    const t = inkIn(k);
    // Deweloperuch: no blur (brand rule); ink-in is opacity + lift only.
    return { opacity: t, transform: `translateY(${((1 - t) * 14).toFixed(2)}px)` };
  };

  const penOp = interpolate(p, [0, 0.02, 0.97, 0.995], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const [nx, ny] = rrPoint(p, 0, 0, CW, CH, RX);

  // 裁切标记：0–12 长出，闭合时外弹 + 淡出
  const marksIn = (k: number) => ramp(frame, k * 2, 12, EASE.snappy);
  const marksPop = ramp(frame, 50, 10, EASE.out);
  const marksOp = 1 - ramp(frame, 52, 12, EASE.out);

  // 下划线
  const up = interpolate(frame, [74, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const upenOp = interpolate(up, [0, 0.04, 0.92, 0.99], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const push = 1 + 0.009 * ramp(frame, 60, 72, EASE.smooth);

  return (
    <AbsoluteFill style={{ fontFamily: FONT.sans, overflow: 'hidden' }}>
      <Stage look={L} keyLight={{ x: 0.42, y: 0.12 }} fill={{ x: 0.9, y: 0.9 }}>
        {/* 绘图纸点阵：48px 网格的墨点，中心清晰、四周隐去——描边阶段的"画板"，也给第 1 帧一个底 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle, ${alpha(L.ink, 0.24)} 2px, transparent 2.4px)`,
            backgroundSize: '48px 48px', backgroundPosition: '24px 18px',
            WebkitMaskImage: 'radial-gradient(ellipse 62% 66% at 50% 50%, #000 30%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 62% 66% at 50% 50%, #000 30%, transparent 100%)',
          }}
        />
      </Stage>

      <AbsoluteFill style={{ transform: `scale(${push.toFixed(5)})`, transformOrigin: '960px 540px' }}>
        {/* 卡片底面：闭合后上墨、从贴地升起 */}
        <div
          style={{
            position: 'absolute', left: CX, top: CY, width: CW, height: CH, borderRadius: RX,
            background: `linear-gradient(180deg, #fffefb 0%, ${L.surface} 100%)`,
            boxShadow: `inset 0 1px 0 #ffffff, ${softShadow(4 + lift * 26, { color: L.shadow, strength: 0.9 })}`,
            opacity: ramp(frame, 50, 10, EASE.out),
          }}
        />

        {/* 卡片内容 */}
        <div style={{ position: 'absolute', left: CX, top: CY, width: CW, height: CH, padding: '52px 64px 46px', boxSizing: 'border-box' }}>
          {/* Deweloperuch: example listing. Eyebrow, the claim with the marker underline, facts, open questions. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...rise(0) }}>
            <div style={{ ...type(30, 300, { serif: true }), fontStyle: 'italic', color: L.ink3 }}>Przykład ogłoszenia</div>
            <div style={{ flex: 1 }} />
            <div style={{ ...type(24, 400, { mono: true }), color: L.ink3 }}>IV piętro · II kw. 2027</div>
          </div>
          <div style={{ position: 'absolute', left: 64, top: 130, width: 600 }}>
            <div style={{ position: 'relative', display: 'inline-block', ...rise(1) }}>
              <div style={{ ...type(128, 400, { serif: true }), letterSpacing: '-0.035em', color: L.ink, lineHeight: 0.95 }}>Słoneczne</div>
              {up > 0.001 && (
                <svg width={300} height={24} viewBox="0 0 300 24" style={{ position: 'absolute', left: 6, bottom: -22, width: 'calc(100% - 12px)', overflow: 'visible' }} preserveAspectRatio="none">
                  <path d={UL_PATH} fill="none" stroke={L.accent} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - up} opacity={0.92} />
                  {upenOp > 0 && (
                    <path d={UL_PATH} fill="none" stroke={L.accent} strokeWidth={14} strokeLinecap="round" pathLength={1}
                      strokeDasharray={`${0.06} ${0.94}`} strokeDashoffset={0.06 - up} opacity={upenOp} />
                  )}
                </svg>
              )}
            </div>
            <div style={{ marginTop: 52, ...type(36, 500), lineHeight: 1.4, color: L.ink2, ...rise(2) }}>
              3 pokoje · 58,5 m² · funkcjonalny układ · balkon 5,2 m²
            </div>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 150, width: 356, ...rise(3) }}>
            {['O której godzinie?', 'Czy zmieszczą się meble?', 'Czy drzwi nie kolidują?'].map((q, i) => (
              <div key={q} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '18px 0', borderTop: i ? `1.5px solid ${L.line}` : undefined, opacity: inkIn(3 + i) }}>
                <span style={{ ...type(32, 700), color: L.accent }}>?</span>
                <span style={{ ...type(34, 400, { serif: true }), fontStyle: 'italic', color: L.ink }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 64, right: 64, bottom: 44, display: 'flex', alignItems: 'center', gap: 16, ...rise(5) }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: -26, height: 1, background: L.line }} />
            <div style={{ ...type(46, 300, { serif: true }), color: L.ink }}>Czy naprawdę znasz <span style={{ fontStyle: 'italic' }}>to mieszkanie?</span></div>
          </div>
        </div>

        {/* 卡片自身发丝边：描边淡出时接棒 */}
        <div style={{ position: 'absolute', left: CX, top: CY, width: CW, height: CH, borderRadius: RX, border: `1.5px solid ${alpha(L.ink, 0.14)}`, boxSizing: 'border-box', opacity: borderOp }} />

        {/* 裁切标记（印刷对位线）：四角外侧 */}
        {marksOp > 0.001 && (
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: marksOp }}>
            {[[CX, CY, -1, -1], [CX + CW, CY, 1, -1], [CX + CW, CY + CH, 1, 1], [CX, CY + CH, -1, 1]].map(([x, y, sx, sy], k) => {
              const t = marksIn(k);
              const off = 26 + 22 * marksPop;
              const len = 54 * t;
              const ox = x + sx * off, oy = y + sy * off;
              return (
                <g key={k} stroke={L.ink2} strokeWidth={2.5} strokeLinecap="round">
                  <line x1={ox} y1={oy} x2={ox - sx * len} y2={oy} opacity={t} />
                  <line x1={ox} y1={oy} x2={ox} y2={oy - sy * len} opacity={t} />
                  <circle cx={ox} cy={oy} r={3.5} fill={L.accent} stroke="none" opacity={t} />
                </g>
              );
            })}
          </svg>
        )}

        {/* 描边生长层：主线 + 渐细笔头 + 圆形笔尖 */}
        {traceOp > 0.001 && (
          <svg width={CW} height={CH} style={{ position: 'absolute', left: CX, top: CY, overflow: 'visible', opacity: traceOp }}>
            <rect x={0} y={0} width={CW} height={CH} rx={RX} fill="none" stroke={strokeColor} strokeWidth={strokeW}
              pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} strokeLinecap="round" />
            {penOp > 0 &&
              [
                { len: PEN, w: 6.4 },
                { len: PEN * 0.6, w: 8 },
                { len: PEN * 0.28, w: 9.6 },
              ].map(({ len, w }, k) => (
                <rect key={k} x={0} y={0} width={CW} height={CH} rx={RX} fill="none" stroke={INK} strokeWidth={w} opacity={penOp}
                  pathLength={1} strokeDasharray={`${len} ${1 - len}`} strokeDashoffset={len - p} strokeLinecap="round" />
              ))}
            {penOp > 0 && (
              <g opacity={penOp}>
                <circle cx={nx + 1.5} cy={ny + 4} r={10} fill={alpha(L.shadow, 0.16)} />
                <circle cx={nx} cy={ny} r={7.5} fill={INK} />
                <circle cx={nx - 2.2} cy={ny - 2.4} r={2} fill="rgba(255,255,255,0.4)" />
              </g>
            )}
          </svg>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

