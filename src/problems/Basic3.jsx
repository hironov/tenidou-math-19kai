import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 長方形ABCD。AB=12(縦), BC=20(横)。A(0,12)-B(0,0)-C(20,0)-D(20,12)
const A = { x: 0, y: 12 }
const B = { x: 0, y: 0 }
const C = { x: 20, y: 0 }
const D = { x: 20, y: 12 }
const PATH = [A, B, C, D] // 点PはA→B→C→Dの順（Aから出発）
const SPEED = 4
const T_MAX = 11

const SCALE = 13, PAD = 46, MATH_H = 12
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

function areaAt(t) {
  const P = pointAtDistance(PATH, SPEED * t, false)
  return polygonArea([A, P, D])
}

export default function Basic3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance(PATH, SPEED * t, false), [t])
  const area = useMemo(() => polygonArea([A, P, D]), [P])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P)
  const width = PAD * 2 + 20 * SCALE
  const height = PAD * 2 + 12 * SCALE

  return (
    <div className="problem">
      <h2>基本問題3　長方形の辺上を動く点と面積のグラフ</h2>
      <div className="statement">
        <p className="setup">
          （図1）のような長方形ＡＢＣＤがあります。点ＰはＡを出発して，秒速4cmで辺上をＡ→Ｂ→Ｃ→Ｄの順に動きます。
          （図2）のグラフは，点Ｐが出発してからの時間と，三角形ＡＰＤの面積の関係を表したものです。これについて，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>（図1）の辺ＡＢの長さは何cmですか。</li>
          <li>（図2）のxにあてはまる数を求めなさい。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sA.x},${sA.y} ${sP.x},${sP.y} ${sD.x},${sD.y}`} fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <text x={sA.x - 16} y={sA.y + 4}>A</text>
          <text x={sB.x - 16} y={sB.y + 4}>B</text>
          <text x={sC.x + 6} y={sC.y + 14}>C</text>
          <text x={sD.x + 6} y={sD.y + 4}>D</text>
          <text x={sP.x + 8} y={sP.y - 6} fill="#e53e3e" fontWeight="bold">P</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>三角形ＡＰＤの面積：<b>{area.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '0秒（Ａを出発）', t: 0 },
          { label: '(1) 3秒後（Ｂに到着）', t: 3 },
          { label: '(2) 8秒後（Ｃに到着）', t: 8 },
          { label: '11秒後（Ｄに到着）', t: 11 },
        ]}
      />
      <div className="graph-block">
        <h3>三角形ＡＰＤの面積と時間の関係</h3>
        <ValueGraph tMax={T_MAX} yMax={130} valueFn={areaAt} t={t}
          yLabel="面積(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 3, label: '3' }, { t: 8, label: '8' }, { t: 11, label: '11' }]} />
      </div>
      <div className="explain">
        <h3>解説</h3>
        <p>(1) グラフより3秒後にＢに到達するので、辺ＡＢの長さは 4×3＝<b>12cm</b>です。</p>
        <p>
          (2) Ｃ→Ｄの移動はＡ→Ｂと同じく3秒かかるので、Ｃに到達するのは11－3＝8秒後。ＢＣの長さは4×(8－3)＝20cm。
          したがって、グラフの最大値ｘは、20×12÷2＝<b>120cm²</b>です。
        </p>
      </div>
    </div>
  )
}
