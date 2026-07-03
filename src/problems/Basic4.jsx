import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 長方形ABCD。AB=DC=10(高さ), AD=BC=18(幅)。A(0,10)-D(18,10)-C(18,0)-B(0,0)
const A = { x: 0, y: 10 }
const D = { x: 18, y: 10 }
const B = { x: 0, y: 0 }
const C = { x: 18, y: 0 }
const P_SPEED = 1 // AからDまで
const Q_SPEED = 2 // CからBまで
const T_MAX = 9 // QがBに着くまで

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance([A, D], P_SPEED * t, false), [t])
  const Q = useMemo(() => pointAtDistance([C, B], Q_SPEED * t, false), [t])
  const area = useMemo(() => polygonArea([A, B, Q, P]), [P, Q])

  const SCALE = 13, PAD = 46, MATH_H = 10
  const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })
  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 18 * SCALE
  const height = PAD * 2 + 10 * SCALE

  const SS = 6, SPD = 18
  const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
  const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
  const SW = SPD * 2 + 18 * SS, SH = SPD * 2 + 10 * SS

  return (
    <div className="problem">
      <h2>基本問題4　長方形の辺上を動く2点と四角形の面積</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような長方形ＡＢＣＤがあります。点Ｐは秒速1cmで辺ＡＤ上をＡからＤまで動き，点Ｑは秒速2cmで辺ＢＣ上を
              ＣからＢまで動きます。点Ｐと点Ｑが同時に出発してから点ＱがＢに着くまでの間について，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>2点が出発してから4秒後の四角形ＡＢＱＰの面積は何cm²ですか。</li>
              <li>直線ＰＱが辺ＡＢと平行になるのは，2点が出発してから何秒後ですか。</li>
              <li>四角形ＡＢＱＰの面積が51cm²になるのは，2点が出発してから何秒後ですか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={SW} height={SH}>
            <polygon points={`${gA.x},${gA.y} ${gD.x},${gD.y} ${gC.x},${gC.y} ${gB.x},${gB.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 12} y={gA.y - 4} fontSize="11">A</text>
            <text x={gD.x + 4} y={gD.y - 4} fontSize="11">D</text>
            <text x={gB.x - 12} y={gB.y + 14} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
            <text x={(gA.x + gD.x) / 2 - 8} y={gA.y - 8} fontSize="10">18cm</text>
            <text x={gA.x - 30} y={(gA.y + gB.y) / 2} fontSize="10">10cm</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sD.x},${sD.y} ${sC.x},${sC.y} ${sB.x},${sB.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sQ.x},${sQ.y} ${sP.x},${sP.y}`} fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 16} y={sA.y - 6}>A</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={sB.x - 16} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sP.x - 4} y={sP.y - 10} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={sQ.x - 4} y={sQ.y + 18} fill="#dd6b20" fontWeight="bold">Q</text>
          <text x={(sA.x + sD.x) / 2 - 14} y={sA.y - 12} fontSize="11">18cm</text>
          <text x={sA.x - 36} y={(sA.y + sB.y) / 2} fontSize="11">10cm</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>四角形ＡＢＱＰの面積：<b>{area.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '(1) 4秒後', t: 4 },
          { label: '(2) ＡＢと平行 6秒後', t: 6 },
          { label: '(3) 面積51cm² 7.8秒後', t: 7.8 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>(1) 4秒後、ＡＰ=4cm、ＢＱ=10cmとなり、四角形ＡＢＱＰの面積は(4+10)×10÷2＝<b>70cm²</b>です。</p>
        <p>(2) ＰとＱの進んだ長さの和が18cmになるとき、ＰＱは辺ＡＢと平行になります。18÷(1+2)＝<b>6秒後</b>です。</p>
        <p>(3) ＡＰ＋ＢＱ＝51×2÷10＝10.2cmとなるのは<b>7.8秒後</b>です。</p>
      </div>
    </div>
  )
}
