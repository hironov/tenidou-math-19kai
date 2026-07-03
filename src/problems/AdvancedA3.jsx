import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 長方形ABCD。AB=30(縦), AD=20(横)。A(0,0)-B(0,30)-C(20,30)-D(20,0)
const A = { x: 0, y: 0 }
const B = { x: 0, y: 30 }
const C = { x: 20, y: 30 }
const D = { x: 20, y: 0 }
const P_PATH = [A, D, C, B] // 点P: A→D→C→Bの順（Bで停止）
const Q_PATH = [B, C, D, A] // 点Q: B→C→D→Aの順
const P_SPEED = 5
const Q_SPEED = 4
const T_MAX = 14 // PがBに着くまで

function diffAt(t) {
  const P = pointAtDistance(P_PATH, P_SPEED * t, false)
  const Q = pointAtDistance(Q_PATH, Q_SPEED * t, false)
  return Math.abs(polygonArea([A, P, B]) - polygonArea([A, Q, B]))
}

const SCALE = 8, PAD = 46, MATH_H = 30
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

export default function AdvancedA3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, false), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, false), [t])
  const areaAPB = useMemo(() => polygonArea([A, P, B]), [P])
  const areaAQB = useMemo(() => polygonArea([A, Q, B]), [Q])
  const diff = Math.abs(areaAPB - areaAQB)

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 20 * SCALE
  const height = PAD * 2 + 30 * SCALE

  return (
    <div className="problem">
      <h2>応用問題A-3　長方形の辺上を動く2点と面積の差</h2>
      <div className="statement">
        <p className="setup">
          （図1）のような，辺ＡＤが20cmの長方形ＡＢＣＤがあります。この長方形の辺上を，点ＰはＡ→Ｄ→Ｃ→Ｂの順に，
          点ＱはＢ→Ｃ→Ｄ→Ａの順に，それぞれ一定の速さで移動しました。（図2）のグラフは，点ＰがＡを出発してから
          Ｂに着くまでの時間と，三角形ＡＰＢと三角形ＡＱＢの面積の差の関係を表したものです。ただし，点Ｐと点Ｑは
          同時に出発し，点Ｐは点Ｑより速いものとします。これについて，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>点Ｐの速さは秒速何cmですか。</li>
          <li>辺ＡＢの長さは何cmですか。</li>
          <li>（図2）のア，イにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sD.x},${sD.y} ${sC.x},${sC.y} ${sB.x},${sB.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sA.x},${sA.y} ${sP.x},${sP.y} ${sB.x},${sB.y}`} fill="rgba(66,153,225,0.25)" stroke="#3182ce" strokeWidth="1.5" />
          <polygon points={`${sA.x},${sA.y} ${sQ.x},${sQ.y} ${sB.x},${sB.y}`} fill="rgba(221,107,32,0.2)" stroke="#dd6b20" strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 16} y={sA.y + 4}>A</text>
          <text x={sB.x - 16} y={sB.y + 4}>B</text>
          <text x={sC.x + 6} y={sC.y + 4}>C</text>
          <text x={sD.x + 6} y={sD.y + 4}>D</text>
          <text x={(sA.x + sD.x) / 2 - 14} y={sA.y - 6} fontSize="11">20cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>三角形ＡＰＢ：{areaAPB.toFixed(1)}cm²　／　三角形ＡＱＢ：{areaAQB.toFixed(1)}cm²</p>
          <p>面積の差：<b>{diff.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '(1)(3) 4秒後（ＰがＤに到着）', t: 4 },
          { label: '5秒後（ＱがＣに到着）', t: 5 },
          { label: '(2) 10秒後（ＰがＣに到着）', t: 10 },
          { label: '(3) 12.5秒後（ＱがＤに到着）', t: 12.5 },
        ]}
      />
      <div className="graph-block">
        <h3>面積の差と時間の関係</h3>
        <ValueGraph tMax={T_MAX} yMax={200} valueFn={diffAt} t={t}
          yLabel="面積の差(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 4, label: '4' }, { t: 5, label: '5' }, { t: 10, label: '10' }, { t: 12.5, label: '12.5' }]} />
      </div>
      <div className="explain">
        <h3>解説</h3>
        <p>(1) グラフより、Ｐは4秒後にＤに、Ｑは5秒後にＣに着くので、点Ｐの速さは 20÷4＝<b>秒速5cm</b>です。</p>
        <p>(2) ＰとＱがともに辺ＣＤ上にある間、2つの三角形の面積はどちらも長方形の半分になり、差は0になります。再び差が広がる10秒後はＰがＣに着いたときなので、辺ＡＢの長さは 5×(10－4)＝<b>30cm</b>です。</p>
        <p>(3) 4秒後の面積の差（ア）は<b>60cm²</b>、ＱがＤに着く12.5秒後の面積の差（イ）は<b>187.5cm²</b>です。</p>
      </div>
    </div>
  )
}
