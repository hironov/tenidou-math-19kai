import { useMemo } from 'react'
import { pointAtDistance } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 正方形ABCD、1辺15cm。A(0,15) - D(15,15) - C(15,0) - B(0,0)
const A = { x: 0, y: 15 }
const B = { x: 0, y: 0 }
const C = { x: 15, y: 0 }
const D = { x: 15, y: 15 }
const P_PATH = [A, B, C, D, A] // 点P: A→B→C→D→A を繰り返す
const Q_PATH = [C, D, A, B, C] // 点Q: C→D→A→B→C を繰り返す
const P_SPEED = 5
const Q_SPEED = 3
const T_MAX = 180

const SCALE = 14
const PAD = 46
const MATH_H = 15
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const STATIC_SCALE = 7
const STATIC_PAD = 20
const toStatic = (p) => ({ x: STATIC_PAD + p.x * STATIC_SCALE, y: STATIC_PAD + (MATH_H - p.y) * STATIC_SCALE })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
const STATIC_W = STATIC_PAD * 2 + 15 * STATIC_SCALE
const STATIC_H = STATIC_PAD * 2 + 15 * STATIC_SCALE

export default function Example2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true, initialRate: 1 })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D)
  const sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 15 * SCALE
  const height = PAD * 2 + 15 * SCALE

  const nearlyEqual = (a, b, eps = 0.15) => Math.abs(a - b) < eps
  const pAtD = nearlyEqual(P.x, D.x) && nearlyEqual(P.y, D.y)
  const qAtD = nearlyEqual(Q.x, D.x) && nearlyEqual(Q.y, D.y)
  const pqParallelAD = nearlyEqual(P.y, Q.y)

  return (
    <div className="problem">
      <h2>例題2　正方形の辺上を動く2点と平行になる時間</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような正方形ＡＢＣＤがあります。点ＰはＡを出発して秒速5cmで，点ＱはＣを出発して秒速3cmで，
              それぞれ矢印の方向に辺上をまわり続けます。点Ｐと点Ｑが同時に出発するとき，
            </p>
            <ol className="question-list">
              <li>直線ＰＱがはじめて辺ＡＤと平行になるのは，2点が出発してから何秒後ですか。</li>
              <li>点Ｐと点ＱがはじめてＤを同時に通過するのは，2点が出発してから何秒後ですか。</li>
              <li>点Ｐと点Ｑが3回目にＤを同時に通過するのは，2点が出発してから何秒後ですか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={STATIC_W} height={STATIC_H}>
            <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y} ${gD.x},${gD.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 12} y={gA.y - 4} fontSize="11">A</text>
            <text x={gB.x - 12} y={gB.y + 12} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 12} fontSize="11">C</text>
            <text x={gD.x + 4} y={gD.y - 4} fontSize="11">D</text>
            <text x={(gA.x + gD.x) / 2 - 8} y={gA.y - 8} fontSize="10">15cm</text>
            <text x={gA.x + 4} y={gA.y + 14} fontSize="12" fill="#3182ce">↓P</text>
            <text x={gC.x - 16} y={gC.y - 6} fontSize="12" fill="#dd6b20">↑Q</text>
          </svg>
        </div>
      </div>

      <div className="stage">
        <svg width={width} height={height}>
          <polygon
            points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`}
            fill="none" stroke="#333" strokeWidth="2"
          />
          <line x1={sP.x} y1={sP.y} x2={sQ.x} y2={sQ.y}
            stroke={pqParallelAD ? '#38a169' : '#a0aec0'} strokeWidth="2"
            strokeDasharray={pqParallelAD ? '0' : '4 3'} />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 14} y={sA.y - 6}>A</text>
          <text x={sB.x - 14} y={sB.y + 14}>B</text>
          <text x={sC.x + 6} y={sC.y + 14}>C</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={(sA.x + sD.x) / 2 - 10} y={sA.y - 12} fontSize="11">15cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y + 4} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>

        <div className="readout">
          <p>経過時間：<b>{t.toFixed(2)}</b> 秒後</p>
          <p>ＰＱと辺ＡＤ：<b>{pqParallelAD ? '平行になっています！' : '平行ではありません'}</b></p>
          <p>Ｐの位置：{pAtD ? <b>Ｄに到着中</b> : '－'}　／　Ｑの位置：{qAtD ? <b>Ｄに到着中</b> : '－'}</p>
          {pAtD && qAtD && <p className="highlight">2点が同時にＤを通過しています！</p>}
        </div>
      </div>

      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        step={0.05}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 1と7/8秒後', t: 1.875 },
          { label: '(2) 45秒後', t: 45 },
          { label: '(3) 165秒後', t: 165 },
        ]}
      />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ＰとＱの進んだ長さの和が、正方形の1辺(15cm)になったとき、ＰＱは辺ＡＤと平行になります。
          15÷(5+3)＝<b>1と7/8秒後</b>です。上の図形が緑色の線になる瞬間を確認してみましょう。
        </p>
        <p>
          (2) 点ＰがはじめてＤを通るのは9秒後（以降12秒ごと）、点ＱがはじめてＤを通るのは5秒後（以降20秒ごと）。
          この2つがそろう最初の時間は<b>45秒後</b>です。
        </p>
        <p>
          (3) 45秒後の次にそろうのは、12と20の最小公倍数である60秒ごとなので、45+60×2＝<b>165秒後</b>です。
        </p>
      </div>
    </div>
  )
}
