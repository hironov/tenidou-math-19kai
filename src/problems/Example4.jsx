import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 台形ABCD。AB(左)=4cm、DC(右)=12cm、BC(下)=20cmの直角台形。
// A(0,4) - B(0,0) - C(20,0) - D(20,12)
const A = { x: 0, y: 4 }
const B = { x: 0, y: 0 }
const C = { x: 20, y: 0 }
const D = { x: 20, y: 12 }
const PATH = [B, C, D] // 点PはB→C→Dの順に進む
const SPEED = 2
const T_MAX = 16

const SCALE = 13
const PAD = 46
const MATH_H = 12
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const STATIC_SCALE = 7
const STATIC_PAD = 20
const toStatic = (p) => ({ x: STATIC_PAD + p.x * STATIC_SCALE, y: STATIC_PAD + (MATH_H - p.y) * STATIC_SCALE })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
const STATIC_W = STATIC_PAD * 2 + 20 * STATIC_SCALE
const STATIC_H = STATIC_PAD * 2 + 12 * STATIC_SCALE

// 図2（面積グラフ）の静止版。形は解説の値と一致（10秒でC、16秒でDに到着）。
const GRAPH_W = 180, GRAPH_H = 130, GPAD = { l: 34, r: 10, t: 10, b: 24 }
const gx = (t) => GPAD.l + (t / 16) * (GRAPH_W - GPAD.l - GPAD.r)
const gy = (v) => GPAD.t + (1 - v / 120) * (GRAPH_H - GPAD.t - GPAD.b)

function areaAt(t) {
  const P = pointAtDistance(PATH, SPEED * t, false)
  return polygonArea([A, P, D])
}

export default function Example4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance(PATH, SPEED * t, false), [t])
  const area = useMemo(() => polygonArea([A, P, D]), [P])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P)
  const width = PAD * 2 + 20 * SCALE
  const height = PAD * 2 + 12 * SCALE

  return (
    <div className="problem">
      <h2>例題4　台形の辺上を動く点と三角形の面積のグラフ</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図（図1）のような台形ＡＢＣＤがあります。点ＰはＢを出発して，秒速2cmで辺上をＢ→Ｃ→Ｄの順に動きます。
              下のグラフ（図2）は，点Ｐが出発してからの時間と，三角形ＡＰＤの面積の関係を表したものです。
            </p>
            <ol className="question-list">
              <li>（図1）の辺ＡＢ，辺ＤＣの長さはそれぞれ何cmですか。</li>
              <li>（図2）のxにあてはまる数を求めなさい。</li>
              <li>三角形ＡＰＤの面積が80cm²になるのは，点Ｐが出発してから何秒後と何秒後ですか。</li>
            </ol>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg className="statement-figure" width={STATIC_W} height={STATIC_H}>
              <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y} ${gD.x},${gD.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
              <text x={gA.x - 12} y={gA.y + 4} fontSize="11">A</text>
              <text x={gB.x - 12} y={gB.y + 4} fontSize="11">B</text>
              <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
              <text x={gD.x + 4} y={gD.y + 4} fontSize="11">D</text>
              <text x={STATIC_W / 2 - 12} y={STATIC_H - 4} fontSize="9" fill="#718096">図1</text>
            </svg>
            <svg className="statement-figure" width={GRAPH_W} height={GRAPH_H}>
              <line x1={gx(0)} y1={gy(0)} x2={gx(0)} y2={gy(120)} stroke="#888" />
              <line x1={gx(0)} y1={gy(0)} x2={gx(16)} y2={gy(0)} stroke="#888" />
              <path d={`M ${gx(0)} ${gy(40)} L ${gx(10)} ${gy(120)} L ${gx(16)} ${gy(0)}`} fill="none" stroke="#3182ce" strokeWidth="2" />
              <text x={gx(0) - 22} y={gy(40) + 3} fontSize="9">40</text>
              <text x={gx(0) - 26} y={gy(120) + 3} fontSize="9">120</text>
              <text x={gx(10) - 4} y={GRAPH_H - 10} fontSize="9">10</text>
              <text x={gx(16) - 4} y={GRAPH_H - 10} fontSize="9">x</text>
              <text x={GRAPH_W / 2 - 12} y={GRAPH_H - 2} fontSize="9" fill="#718096">図2</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="stage">
        <svg width={width} height={height}>
          <polygon
            points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`}
            fill="none" stroke="#333" strokeWidth="2"
          />
          <polygon
            points={`${sA.x},${sA.y} ${sP.x},${sP.y} ${sD.x},${sD.y}`}
            fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5"
          />
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
          { label: '0秒（Ｂを出発）', t: 0 },
          { label: '(3) 1回目 5秒後', t: 5 },
          { label: '10秒後（Ｃに到着）', t: 10 },
          { label: '(3) 2回目 12秒後', t: 12 },
          { label: '(2) 16秒後（Ｄに到着）', t: 16 },
        ]}
      />

      <div className="graph-block">
        <h3>三角形ＡＰＤの面積と時間の関係</h3>
        <ValueGraph
          tMax={T_MAX} yMax={130} valueFn={areaAt} t={t}
          yLabel="面積(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 10, label: '10' }, { t: 16, label: '16' }]}
        />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ＢＣ＝2×10＝20(cm)なので、辺ＡＢの長さは 40×2÷20＝<b>4(cm)</b>、辺ＤＣの長さは 120×2÷20＝<b>12(cm)</b>です。
        </p>
        <p>
          (2) ＰがＣからＤまで移動するのに12÷2＝6秒かかるので、Ｄに到着するのは10＋6＝<b>16秒後</b>です。
        </p>
        <p>
          (3) ＰがＢ→Ｃを進む間、面積は1秒あたり8cm²ずつ増え、1回目に80cm²になるのは<b>5秒後</b>。
          ＰがＣ→Ｄを進む間は1秒あたり20cm²ずつ減り、2回目に80cm²になるのは<b>12秒後</b>です。
        </p>
      </div>
    </div>
  )
}
