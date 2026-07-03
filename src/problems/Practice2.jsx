import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 台形ABCD。AB(左)=15, BC(下)=12, DC(右)=9。A(0,15)-B(0,0)-C(12,0)-D(12,9)
const A = { x: 0, y: 15 }
const B = { x: 0, y: 0 }
const C = { x: 12, y: 0 }
const D = { x: 12, y: 9 }
const PATH = [A, B, C, D] // 点PはAを出発してA→B→C→Dの順
const SPEED = 3
const T_MAX = 12

const SCALE = 13, PAD = 46, MATH_H = 15
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const SS = 6, SPD = 18
const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
const SW = SPD * 2 + 12 * SS, SH = SPD * 2 + 15 * SS

const GRAPH_W = 180, GRAPH_H = 130, GPAD = { l: 34, r: 10, t: 10, b: 24 }
const gx = (t) => GPAD.l + (t / 12) * (GRAPH_W - GPAD.l - GPAD.r)
const gy = (v) => GPAD.t + (1 - v / 90) * (GRAPH_H - GPAD.t - GPAD.b)

function areaAt(t) {
  const P = pointAtDistance(PATH, SPEED * t, false)
  return polygonArea([A, P, D])
}

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const P = useMemo(() => pointAtDistance(PATH, SPEED * t, false), [t])
  const area = useMemo(() => polygonArea([A, P, D]), [P])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P)
  const width = PAD * 2 + 12 * SCALE
  const height = PAD * 2 + 15 * SCALE

  return (
    <div className="problem">
      <h2>練習問題2　台形の辺上を動く点と三角形の面積のグラフ</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              （図1）のような台形ＡＢＣＤがあります。点ＰはＡを出発して，秒速3cmで辺上をＡ→Ｂ→Ｃ→Ｄの順に動きます。
              （図2）のグラフは，点Ｐが出発してからの時間と，三角形ＡＰＤの面積の関係を表したものです。これについて，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>（図2）のx，yにあてはまる数をそれぞれ求めなさい。</li>
              <li>三角形ＡＰＤの面積が63cm²になるのは，点Ｐが出発してから何秒後と何秒後ですか。</li>
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
              <line x1={gx(0)} y1={gy(0)} x2={gx(0)} y2={gy(90)} stroke="#888" />
              <line x1={gx(0)} y1={gy(0)} x2={gx(12)} y2={gy(0)} stroke="#888" />
              <path d={`M ${gx(0)} ${gy(0)} L ${gx(5)} ${gy(90)} L ${gx(9)} ${gy(54)} L ${gx(12)} ${gy(0)}`} fill="none" stroke="#3182ce" strokeWidth="2" />
              <text x={gx(0) - 14} y={gy(90) + 3} fontSize="9">90</text>
              <text x={gx(5) - 4} y={GRAPH_H - 10} fontSize="9">5</text>
              <text x={gx(9) - 4} y={GRAPH_H - 10} fontSize="9">x</text>
              <text x={gx(12) - 4} y={GRAPH_H - 10} fontSize="9">y</text>
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
          { label: '(1) 5秒後（Ｂに到着）', t: 5 },
          { label: '(2) 1回目 3.5秒後', t: 3.5 },
          { label: '(1) 9秒後（Ｃに到着）', t: 9 },
          { label: '(2) 2回目 8秒後', t: 8 },
          { label: '12秒後（Ｄに到着）', t: 12 },
        ]}
      />
      <div className="graph-block">
        <h3>三角形ＡＰＤの面積と時間の関係</h3>
        <ValueGraph tMax={T_MAX} yMax={100} valueFn={areaAt} t={t}
          yLabel="面積(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 5, label: '5' }, { t: 9, label: '9' }, { t: 12, label: '12' }]} />
      </div>
      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ＡＢ＝3×5＝15cmより、ＢＣ＝90×2÷15＝12cmなので、x＝5+12÷3＝<b>9秒後</b>。
          9秒後の面積は54cm²なので、ＣＤ＝54×2÷12＝9cm。よって、y＝9+9÷3＝<b>12秒後</b>。
        </p>
        <p>
          (2) ＰがＡ→Ｂを進む間は1秒あたり18cm²ずつ増え、1回目に63cm²になるのは<b>3.5秒後</b>。
          ＰがＢ→Ｃを進む間は1秒あたり9cm²ずつ減り、2回目は<b>8秒後</b>です。
        </p>
      </div>
    </div>
  )
}
