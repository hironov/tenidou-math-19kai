import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 直角三角形ABC（Cが直角）。B(0,0) - C(18,0) - A(18,12)
const B = { x: 0, y: 0 }
const C = { x: 18, y: 0 }
const A = { x: 18, y: 12 }
const PATH = [B, C, A] // 点PはB→C→Aの順に進む
const SPEED = 2
const T_MAX = 15

const SCALE = 16
const PAD = 46
const MATH_H = 12
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

// 問題文に添える、動かない静止図（教科書の図そのもの）
const STATIC_SCALE = 8
const STATIC_PAD = 20
const toStatic = (p) => ({ x: STATIC_PAD + p.x * STATIC_SCALE, y: STATIC_PAD + (MATH_H - p.y) * STATIC_SCALE })
const gB = toStatic(B), gC = toStatic(C), gA = toStatic(A)
const STATIC_W = STATIC_PAD * 2 + 18 * STATIC_SCALE
const STATIC_H = STATIC_PAD * 2 + 12 * STATIC_SCALE

function areaAt(t) {
  const P = pointAtDistance(PATH, SPEED * t, false)
  return polygonArea([A, B, P])
}

export default function Example1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance(PATH, SPEED * t, false), [t])
  const area = useMemo(() => polygonArea([A, B, P]), [P])

  const sB = toSvg(B)
  const sC = toSvg(C)
  const sA = toSvg(A)
  const sP = toSvg(P)
  const width = PAD * 2 + 18 * SCALE
  const height = PAD * 2 + 12 * SCALE
  const onBC = t * SPEED <= 18

  return (
    <div className="problem">
      <h2>例題1　三角形の辺上を動く点と面積の変化</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような直角三角形ＡＢＣがあります。点ＰはＢを出発して，秒速2cmで辺上をＢ→Ｃ→Ａの順に動きます。
            </p>
            <ol className="question-list">
              <li>点Ｐが出発してから11秒後の三角形ＡＢＰの面積は何cm²ですか。</li>
              <li>三角形ＡＢＰの面積が36cm²になるのは，点Ｐが出発してから何秒後と何秒後ですか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={STATIC_W} height={STATIC_H}>
            <polygon points={`${gB.x},${gB.y} ${gC.x},${gC.y} ${gA.x},${gA.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gB.x - 12} y={gB.y + 4} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 4} fontSize="11">C</text>
            <text x={gA.x + 4} y={gA.y + 4} fontSize="11">A</text>
            <text x={(gB.x + gC.x) / 2 - 8} y={gB.y + 14} fontSize="10">18cm</text>
            <text x={gC.x + 6} y={(gC.y + gA.y) / 2} fontSize="10">12cm</text>
          </svg>
        </div>
      </div>

      <div className="stage">
        <svg width={width} height={height}>
          <polygon
            points={`${sB.x},${sB.y} ${sC.x},${sC.y} ${sA.x},${sA.y}`}
            fill="none" stroke="#333" strokeWidth="2"
          />
          <polygon
            points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sP.x},${sP.y}`}
            fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5"
          />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <text x={sB.x - 16} y={sB.y + 4}>B</text>
          <text x={sC.x + 6} y={sC.y + 4}>C</text>
          <text x={sA.x + 6} y={sA.y + 4}>A</text>
          <text x={sP.x + 8} y={sP.y - 6} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={(sB.x + sC.x) / 2 - 10} y={sB.y + 18} fontSize="11">18cm</text>
          <text x={sC.x + 10} y={(sC.y + sA.y) / 2} fontSize="11">12cm</text>
        </svg>

        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>点Ｐの位置：辺 <b>{onBC ? 'ＢＣ' : 'ＣＡ'}</b> 上</p>
          <p>三角形ＡＢＰの面積：<b>{area.toFixed(1)}</b> cm²</p>
        </div>
      </div>

      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 11秒後', t: 11 },
          { label: '(2) 1回目 3秒後', t: 3 },
          { label: '面積が最大 9秒後', t: 9 },
          { label: '(2) 2回目 13秒後', t: 13 },
          { label: '15秒後（Ａに到着）', t: 15 },
        ]}
      />

      <div className="graph-block">
        <h3>面積と時間の関係（グラフ）</h3>
        <ValueGraph
          tMax={T_MAX} yMax={120} valueFn={areaAt} t={t}
          yLabel="面積(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 9, label: '9' }, { t: 15, label: '15' }]}
        />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 11秒後は、Ｐが 2×11＝22(cm) 動いた地点です。ＢＣ(18cm)を通り過ぎ、ＣＡ上をＣから4cm進んだところにいます。
          三角形ＡＢＰの面積は 8×18÷2＝<b>72(cm²)</b> です。
        </p>
        <p>
          (2) ＢからＣに向かう間は面積が増え、ＣからＡに向かう間は面積が減ります。面積が36cm²になるのは、
          ＢＣ上（<b>3秒後</b>）とＣＡ上（<b>13秒後</b>）の1回ずつです。上のグラフの赤い点をこの2つの時間に動かして確かめてみましょう。
        </p>
      </div>
    </div>
  )
}
