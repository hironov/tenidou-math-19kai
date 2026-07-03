import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 台形ABCD。AD(上)=12, BC(下)=18, 高さ10（視覚化のための値）。
// A(0,10)-D(12,10)-C(18,0)-B(0,0)
const A = { x: 0, y: 10 }
const D = { x: 12, y: 10 }
const B = { x: 0, y: 0 }
const C = { x: 18, y: 0 }
const P_SPEED = 1 // AD上を往復
const Q_SPEED = 2 // BC上を往復
const T_MAX = 24

const SCALE = 13, PAD = 46, MATH_H = 10
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

export default function Practice4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance([A, D, A], P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance([B, C, B], Q_SPEED * t, true), [t])
  const areaABQP = useMemo(() => polygonArea([A, B, Q, P]), [P, Q])
  const totalArea = useMemo(() => polygonArea([A, B, C, D]), [])
  const isHalf = Math.abs(areaABQP - totalArea / 2) < 0.3

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 18 * SCALE
  const height = PAD * 2 + 10 * SCALE

  return (
    <div className="problem">
      <h2>練習問題4　台形の辺上を往復する2点と面積の2等分</h2>
      <div className="statement">
        <p className="setup">
          右の図の四角形ＡＢＣＤは，辺ＡＤと辺ＢＣが平行な台形です。点ＰはＡを出発して，秒速1cmで辺ＡＤ上を往復し続けます。
          点ＱはＢを出発して，秒速2cmで辺ＢＣ上を往復し続けます。いま，点Ｐと点Ｑが同時に出発しました。これについて，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>直線ＰＱがはじめて四角形ＡＢＣＤの面積を2等分するのは，2点が出発してから何秒後ですか。</li>
          <li>直線ＰＱが2回目に四角形ＡＢＣＤの面積を2等分するのは，2点が出発してから何秒後ですか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sD.x},${sD.y} ${sC.x},${sC.y} ${sB.x},${sB.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sQ.x},${sQ.y} ${sP.x},${sP.y}`}
            fill={isHalf ? 'rgba(56,161,105,0.35)' : 'rgba(66,153,225,0.3)'}
            stroke={isHalf ? '#38a169' : '#3182ce'} strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 16} y={sA.y - 6}>A</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={sB.x - 16} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sP.x - 4} y={sP.y - 10} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={sQ.x - 4} y={sQ.y + 18} fill="#dd6b20" fontWeight="bold">Q</text>
          <text x={(sA.x + sD.x) / 2 - 14} y={sA.y - 12} fontSize="11">12cm</text>
          <text x={(sB.x + sC.x) / 2 - 14} y={sB.y + 28} fontSize="11">18cm</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>四角形ＡＢＱＰの面積：<b>{areaABQP.toFixed(1)}</b> cm²（全体の半分：{(totalArea / 2).toFixed(1)}cm²）</p>
          {isHalf && <p className="highlight">面積が2等分されています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '(1) 1回目 5秒後', t: 5 },
          { label: '(2) 2回目 15秒後', t: 15 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 四角形ＡＢＱＰの面積が台形全体の半分になるのは、ＡＰ＋ＢＱ＝(12+18)÷2＝15cmのとき。
          Ｐは毎秒1cm、Ｑは毎秒2cm進むので、①+②=15より、<b>5秒後</b>です。
        </p>
        <p>
          (2) ＡＰとＢＱの変化をグラフ化し、その和を追うと、2回目に15cmとなるのは<b>15秒後</b>です
          （往復運動なので、途中で一度和が15cmから離れてから、再び戻ってきます）。
        </p>
      </div>
    </div>
  )
}
