import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 正方形ABCD、1辺12cm。A(0,12)-B(0,0)-C(12,0)-D(12,12)
const A = { x: 0, y: 12 }
const B = { x: 0, y: 0 }
const C = { x: 12, y: 0 }
const D = { x: 12, y: 12 }
const P_PATH = [A, B, C, D, A] // 点P: A→B→C→D→A
const Q_PATH = [A, D, C, B, A] // 点Q: A→D→C→B→A（Pと逆向き）
const P_SPEED = 4
const Q_SPEED = 3
const T_MAX = 24

const SCALE = 14, PAD = 40, MATH_H = 12
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

export default function Practice1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])
  const area = useMemo(() => polygonArea([A, P, Q]), [P, Q])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 12 * SCALE
  const height = PAD * 2 + 12 * SCALE

  return (
    <div className="problem">
      <h2>練習問題1　正方形の辺上を動く2点と三角形の面積</h2>
      <div className="statement">
        <p className="setup">
          右の図のような正方形ＡＢＣＤがあります。点Ｐと点ＱはＡを同時に出発して，点Ｐは秒速4cm，点Ｑは秒速3cmで，
          それぞれ矢印の方向に辺上をまわり続けます。
        </p>
        <ol className="question-list">
          <li>2点が出発してから5秒後の三角形ＡＰＱの面積は何cm²ですか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sA.x},${sA.y} ${sP.x},${sP.y} ${sQ.x},${sQ.y}`} fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 16} y={sA.y - 6}>A</text>
          <text x={sB.x - 16} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={(sB.x + sC.x) / 2 - 14} y={sB.y + 18} fontSize="11">12cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>三角形ＡＰＱの面積：<b>{area.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '0秒（出発）', t: 0 }, { label: '5秒後（答え）', t: 5 }]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>
          5秒後までに、点Ｐ…4×5＝20(cm)、点Ｑ…3×5＝15(cm)動いています。三角形ＡＰＱの面積は、
          正方形全体(144cm²)から周りの3つの三角形を引いて、144－(48+18+18)＝<b>60(cm²)</b>と求められます。
        </p>
      </div>
    </div>
  )
}
