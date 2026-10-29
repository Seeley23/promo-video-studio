// paper-title-card —— 一句话逐词 letterpress 压印上纸字卡
// 章节转场/价值主张呼吸位：单句文案逐词压印入场（scale 大→1 + blur→0），
// 每句恰一个强调色斜体重点词，强调色下划线 scaleX 收束，尾部整卡淡出。
// 全片多张字卡统一 50–55f；纸底+中心暖光与纸墨风格产品画面同色系。
// 参数化：words/sub/subDigits 可换成目标产品文案；subDigits 走 DigitRoll
// 数字滚动（必须在本卡淡出前落定）。渲染本 demo 前把 text 复制进项目即可。
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const PAPER_TITLE_CARD_DURATION = 55; // ≈1.8s @30fps

// Deweloperuch reskin: brand fonts and inks; no blur (brand rule); words/sub/hold as props; optional mark lockup.
import { ShotcraftMark } from '../../_fixtures/Brand';
const SERIF = 'Spectral, Georgia, serif';
const MONO = '"Libre Franklin", Arial, sans-serif';
const ACCENT = '#14201A';

// 每句恰好一个 accent：功能名/收益词（C2）
// br：该词后强制换行（让两行长度接近原版 "All your team’s research, / one place to go." 的分行，避免孤词）
const WORDS: { text: string; accent?: boolean; br?: boolean }[] = [
  { text: 'Direct' },
  { text: 'the' },
  { text: 'film.', br: true },
  { text: 'Let' },
  { text: 'the' },
  { text: 'agent' },
  { text: 'shoot', accent: true },
  { text: 'it.' },
];
// 副行：video-shotcraft 的渲染队列语境（示意数据）
const SUB = 'shots rendered today';
const SUB_DIGITS = '12';

// 数字滚动列（odometer 风格，复制自 template DigitRoll，数字带双份拼接保证
// 任何目标位都有滚感；tabular-nums 防横向抖）
const DIGITS = '0123456789';
const DigitColumn: React.FC<{ ch: string; delay: number; lineH: number; color: string }> = ({ ch, delay, lineH, color }) => {
  const frame = useCurrentFrame();
  if (ch < '0' || ch > '9') {
    return <span style={{ fontSize: 26, lineHeight: `${lineH}px`, color }}>{ch}</span>;
  }
  const target = DIGITS.indexOf(ch);
  const t = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.8, 0.25, 1),
  });
  const offset = (10 + target) * t * lineH;
  return (
    <span style={{ display: 'inline-block', height: lineH }}>
      <span style={{ display: 'block', transform: `translateY(${-offset}px)` }}>
        {(DIGITS + DIGITS).split('').map((d, j) => (
          <span
            key={j}
            style={{
              display: 'block',
              fontSize: 26,
              lineHeight: `${lineH}px`,
              color,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
};

const DigitRoll: React.FC<{ value: string; delay: number; color: string }> = ({ value, delay, color }) => {
  const lineH = 26 * 1.15;
  return (
    <span style={{ display: 'inline-flex', overflow: 'hidden', height: lineH, verticalAlign: 'bottom' }}>
      {value.split('').map((c, i) => (
        <DigitColumn key={i} ch={c} delay={delay + i * 4} lineH={lineH} color={color} />
      ))}
    </span>
  );
};

type Word = { text: string; accent?: boolean; br?: boolean };
export const PaperTitleCard: React.FC<{ words?: Word[]; sub?: string; digits?: string; duration?: number; fade?: boolean; lockup?: boolean }> = ({
  words = WORDS, sub = SUB, digits = SUB_DIGITS, duration = PAPER_TITLE_CARD_DURATION, fade = true, lockup = false,
}) => {
  const frame = useCurrentFrame();
  const fadeOut = !fade ? 1 : interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const underline = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const subT = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f2f0ea',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        backgroundImage:
          'none',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1500 }}>
        {lockup && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 26, marginBottom: 56, opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <ShotcraftMark size={110} tone="light" frameProgress={interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} cutProgress={interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
            <span style={{ fontFamily: SERIF, fontSize: 92, fontWeight: 400, color: '#111311', letterSpacing: '-0.02em' }}>Deweloperuch</span>
          </div>
        )}
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 116,
            fontWeight: 300,
            lineHeight: 1.14,
            color: '#111311',
            letterSpacing: '-0.012em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '0.26em',
          }}
        >
          {words.map((w, i) => {
            const delay = 4 + i * 4;
            const t = interpolate(frame, [delay, delay + 9], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.75, 0.3, 1),
            });
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    opacity: t,
                    transform: `scale(${1.28 - 0.28 * t})`,
                    display: 'inline-block',
                    fontStyle: w.accent ? 'italic' : 'normal',
                    color: w.accent ? ACCENT : undefined,
                  }}
                >
                  {w.text}
                </span>
                {w.br && <span style={{ flexBasis: '100%', height: 0 }} />}
              </React.Fragment>
            );
          })}
        </div>
        <div
          style={{
            height: 6,
            width: 220,
            margin: '38px auto 0',
            borderRadius: 3,
            background: ACCENT,
            transform: `scaleX(${underline})`,
          }}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 34,
            letterSpacing: '0.01em',
            color: '#3d3a32',
            marginTop: 34,
            opacity: subT,
            
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '0.5em',
          }}
        >
          {digits && <DigitRoll value={digits} delay={12} color={ACCENT} />}
          <span>{sub}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
