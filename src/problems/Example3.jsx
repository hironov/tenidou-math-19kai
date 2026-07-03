import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

// 台形ABCD。A(0,10) - D(15,10)（上底15cm）、B(0,0) - C(24,0)（下底24cm）、ABが高さ10cmの垂直な辺。
const A = { x: 0, y: 10 }
const D = { x: 15, y: 10 }
const B = { x: 0, y: 0 }
const C = { x: 24, y: 0 }
const P_PATH = [A, D, A] // 点P: ADを秒速1cmで往復
const Q_PATH = [B, C, B] // 点Q: BCを秒速2cmで往復
const P_SPEED = 1
const Q_SPEED = 2
const T_MAX = 40

const SCALE = 11
const PAD = 46
const MATH_H = 10
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const STATIC_SCALE = 6
const STATIC_PAD = 20
const toStatic = (p) => ({ x: STATIC_PAD + p.x * STATIC_SCALE, y: STATIC_PAD + (MATH_H - p.y) * STATIC_SCALE })
const gA = toStatic(A), gD = toStatic(D), gB = toStatic(B), gC = toStatic(C)
const STATIC_W = STATIC_PAD * 2 + 24 * STATIC_SCALE
const STATIC_H = STATIC_PAD * 2 + 10 * STATIC_SCALE

function areaAt(t) {
  const P = pointAtDistance(P_PATH, P_SPEED * t, true)
  const Q = pointAtDistance(Q_PATH, Q_SPEED * t, true)
  return polygonArea([A, B, Q, P])
}

export default function Example3() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 1 })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])
  const area = useMemo(() => polygonArea([A, B, Q, P]), [P, Q])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D)
  const sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 24 * SCALE
  const height = PAD * 2 + 10 * SCALE

  const nearlyEqual = (a, b, eps = 0.3) => Math.abs(a - b) < eps
  // DCと平行 <=> PD = QC(残りの長さが等しい)
  const remPD = 15 - P.x
  const remQC = 24 - Q.x
  const pqParallelDC = nearlyEqual(remPD, remQC)
  // ABと平行 <=> AP = BQ
  const pqParallelAB = nearlyEqual(P.x, Q.x)

  return (
    <div className="problem">
      <h2>例題3　台形の辺上を往復する2点と面積・平行</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような台形ＡＢＣＤがあります。点ＰはＡを出発して，秒速1cmで辺ＡＤ上を往復し続けます。
              点ＱはＢを出発して，秒速2cmで辺ＢＣ上を往復し続けます。点Ｐと点Ｑが同時に出発するとき，
            </p>
            <ol className="question-list">
              <li>四角形ＡＢＱＰの面積がはじめて75cm²になるのは，2点が出発してから何秒後ですか。</li>
              <li>直線ＰＱがはじめて辺ＤＣと平行になるのは，2点が出発してから何秒後ですか。</li>
              <li>直線ＰＱがはじめて辺ＡＢと平行になるのは，2点が出発してから何秒後ですか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={STATIC_W} height={STATIC_H}>
            <polygon points={`${gA.x},${gA.y} ${gD.x},${gD.y} ${gC.x},${gC.y} ${gB.x},${gB.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 12} y={gA.y - 4} fontSize="11">A</text>
            <text x={gD.x + 4} y={gD.y - 4} fontSize="11">D</text>
            <text x={gB.x - 12} y={gB.y + 14} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
            <text x={(gA.x + gD.x) / 2 - 8} y={gA.y - 8} fontSize="10">15cm</text>
            <text x={(gB.x + gC.x) / 2 - 8} y={gB.y + 22} fontSize="10">24cm</text>
            <text x={gA.x - 34} y={(gA.y + gB.y) / 2} fontSize="10">10cm</text>
          </svg>
        </div>
      </div>

      <div className="stage">
        <svg width={width} height={height}>
          <polygon
            points={`${sA.x},${sA.y} ${sD.x},${sD.y} ${sC.x},${sC.y} ${sB.x},${sB.y}`}
            fill="none" stroke="#333" strokeWidth="2"
          />
          <polygon
            points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sQ.x},${sQ.y} ${sP.x},${sP.y}`}
            fill="rgba(66,153,225,0.3)" stroke="#3182ce" strokeWidth="1.5"
          />
          <line x1={sP.x} y1={sP.y} x2={sQ.x} y2={sQ.y}
            stroke={pqParallelDC || pqParallelAB ? '#38a169' : '#718096'} strokeWidth="2" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 14} y={sA.y - 6}>A</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={sB.x - 14} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sP.x - 4} y={sP.y - 10} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={sQ.x - 4} y={sQ.y + 18} fill="#dd6b20" fontWeight="bold">Q</text>
          <text x={(sA.x + sD.x) / 2 - 14} y={sA.y - 12} fontSize="11">15cm</text>
          <text x={(sB.x + sC.x) / 2 - 14} y={sB.y + 28} fontSize="11">24cm</text>
          <text x={sA.x - 38} y={(sA.y + sB.y) / 2} fontSize="11">10cm</text>
        </svg>

        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>四角形ＡＢＱＰの面積：<b>{area.toFixed(1)}</b> cm²</p>
          <p>ＰＱと辺ＤＣ：<b>{pqParallelDC ? '平行！' : '－'}</b>　／　ＰＱと辺ＡＢ：<b>{pqParallelAB ? '平行！' : '－'}</b></p>
        </div>
      </div>

      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 面積75cm² → 5秒後', t: 5 },
          { label: '(2) ＤＣと平行 → 9秒後', t: 9 },
          { label: '(3) ＡＢと平行 → 18秒後', t: 18 },
        ]}
      />

      <div className="graph-block">
        <h3>四角形ＡＢＱＰの面積と時間の関係</h3>
        <ValueGraph
          tMax={T_MAX} yMax={250} valueFn={areaAt} t={t}
          yLabel="面積(cm²)" xLabel="時間(秒)"
          markLines={[{ t: 5, label: '5' }, { t: 9, label: '9' }, { t: 18, label: '18' }]}
        />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 四角形ＡＢＱＰの高さは10cmなので、面積が75cm²になるのはＡＰ＋ＢＱ＝15cmのとき。
          Ｐは毎秒1cm、Ｑは毎秒2cm進むので、①＋②＝15より、<b>5秒後</b>です。
        </p>
        <p>
          (2) ＰＱがＤＣと平行になるのは、ＰＤ＝ＱＣ（ゴールまでの残りの長さが同じ）になるとき。
          上底と下底の差9cmから、<b>9秒後</b>と求められます。
        </p>
        <p>
          (3) ＰＱがＡＢと平行になるのは、ＡＰ＝ＢＱになるとき。ＰとＱがどちらも折り返した後の
          <b>18秒後</b>がこれにあたります（往復運動なので、他の見た目が近い時間は条件に合いません）。
        </p>
      </div>
    </div>
  )
}
