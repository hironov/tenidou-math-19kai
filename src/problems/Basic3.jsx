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

const SS = 7, SPD = 18
const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
const SW = SPD * 2 + 20 * SS, SH = SPD * 2 + 12 * SS

const GRAPH_W = 180, GRAPH_H = 130, GPAD = { l: 34, r: 10, t: 10, b: 24 }
const gx = (t) => GPAD.l + (t / 11) * (GRAPH_W - GPAD.l - GPAD.r)
const gy = (v) => GPAD.t + (1 - v / 130) * (GRAPH_H - GPAD.t - GPAD.b)

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
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              （図1）のような長方形ＡＢＣＤがあります。点ＰはＡを出発して，秒速4cmで辺上をＡ→Ｂ→Ｃ→Ｄの順に動きます。
              （図2）のグラフは，点Ｐが出発してからの時間と，三角形ＡＰＤの面積の関係を表したものです。これについて，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>（図1）の辺ＡＢの長さは何cmですか。</li>
              <li>（図2）のxにあてはまる数を求めなさい。</li>
            </ol>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg className="statement-figure" width={SW} height={SH}>
              <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y} ${gD.x},${gD.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
              <text x={gA.x - 12} y={gA.y + 4} fontSize="11">A</text>
              <text x={gB.x - 12} y={gB.y + 4} fontSize="11">B</text>
              <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
              <text x={gD.x + 4} y={gD.y + 4} fontSize="11">D</text>
              <text x={SW / 2 - 12} y={SH - 4} fontSize="9" fill="#718096">図1</text>
            </svg>
            <svg className="statement-figure" width={GRAPH_W} height={GRAPH_H}>
              <line x1={gx(0)} y1={gy(0)} x2={gx(0)} y2={gy(130)} stroke="#888" />
              <line x1={gx(0)} y1={gy(0)} x2={gx(11)} y2={gy(0)} stroke="#888" />
              <path d={`M ${gx(0)} ${gy(0)} L ${gx(3)} ${gy(120)} L ${gx(8)} ${gy(120)} L ${gx(11)} ${gy(0)}`} fill="none" stroke="#3182ce" strokeWidth="2" />
              <text x={gx(0) - 14} y={gy(120) + 3} fontSize="9">x</text>
              <text x={gx(3) - 4} y={GRAPH_H - 10} fontSize="9">3</text>
              <text x={gx(8) - 4} y={GRAPH_H - 10} fontSize="9">8</text>
              <text x={gx(11) - 6} y={GRAPH_H - 10} fontSize="9">11</text>
              <text x={GRAPH_W / 2 - 12} y={GRAPH_H - 2} fontSize="9" fill="#718096">図2</text>
            </svg>
          </div>
        </div>
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
