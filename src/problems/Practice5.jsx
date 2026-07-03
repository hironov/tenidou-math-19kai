import { useMemo } from 'react'
import { pointOnCircle, angleAt } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const O = { x: 0, y: 0 }
const R = 60
const START_ANGLE = 90
const P_SPEED_DEG = 360 / 45 // 8度/秒
const Q_SPEED_DEG = 360 / 36 // 10度/秒（Pと反対向き）
const T_MAX = 36 // Qが1周し終えるまで

const PAD = 46
const toSvg = (p) => ({ x: PAD + R + p.x, y: PAD + R - p.y })

const STATIC_R = 34
const STATIC_PAD = 16
const toStaticC = (p) => ({ x: STATIC_PAD + STATIC_R + p.x, y: STATIC_PAD + STATIC_R - p.y })
const STATIC_SIZE = STATIC_PAD * 2 + STATIC_R * 2

export default function Practice5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const A = useMemo(() => pointOnCircle(O, R, START_ANGLE), [])
  const P = useMemo(() => pointOnCircle(O, R, START_ANGLE - P_SPEED_DEG * t), [t])
  const Q = useMemo(() => pointOnCircle(O, R, START_ANGLE + Q_SPEED_DEG * t), [t])
  const anglePAQ = useMemo(() => angleAt(A, P, Q), [A, P, Q])
  const isRight = Math.abs(anglePAQ - 90) < 1.5

  const sO = toSvg(O), sA = toSvg(A), sP = toSvg(P), sQ = toSvg(Q)
  const size = PAD * 2 + R * 2

  const gO = toStaticC(O)
  const gA = toStaticC(pointOnCircle(O, STATIC_R, START_ANGLE))

  return (
    <div className="problem">
      <h2>練習問題5　円周上を反対向きにまわる2点と直角三角形</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
        <p className="setup">
          右の図のような，Ｏを中心とする円の周上を，2点Ｐ，ＱがＡを同時に出発して，それぞれ一定の速さで矢印の方向に
          （反対向きに）まわります。1周するのにかかる時間は，点Ｐは45秒，点Ｑは36秒です。
        </p>
        <ol className="question-list">
          <li>点Ｑが1周し終えるまでの間で，三角形ＡＰＱが直角三角形になるのは，2点が出発してから何秒後ですか。すべて求めなさい。</li>
        </ol>
          </div>
          <svg className="statement-figure" width={STATIC_SIZE} height={STATIC_SIZE}>
            <circle cx={gO.x} cy={gO.y} r={STATIC_R} fill="none" stroke="#333" strokeWidth="1.5" />
            <circle cx={gO.x} cy={gO.y} r={2} fill="#333" />
            <circle cx={gA.x} cy={gA.y} r={3.5} fill="#805ad5" />
            <text x={gO.x + 4} y={gO.y + 12} fontSize="10">O</text>
            <text x={gA.x + 5} y={gA.y - 5} fontSize="11" fill="#805ad5">A</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={size} height={size}>
          <circle cx={sO.x} cy={sO.y} r={R} fill="none" stroke="#333" strokeWidth="2" />
          <line x1={sA.x} y1={sA.y} x2={sP.x} y2={sP.y} stroke="#cbd5e0" strokeDasharray="2 3" />
          <line x1={sA.x} y1={sA.y} x2={sQ.x} y2={sQ.y} stroke="#cbd5e0" strokeDasharray="2 3" />
          <line x1={sP.x} y1={sP.y} x2={sQ.x} y2={sQ.y}
            stroke={isRight ? '#38a169' : '#a0aec0'} strokeWidth="2" strokeDasharray={isRight ? '0' : '4 3'} />
          <circle cx={sO.x} cy={sO.y} r={3} fill="#333" />
          <circle cx={sA.x} cy={sA.y} r={5} fill="#805ad5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sO.x + 6} y={sO.y + 14}>O</text>
          <text x={sA.x + 8} y={sA.y - 8} fill="#805ad5" fontWeight="bold">A</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y + 4} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>角ＰＡＱ：<b>{anglePAQ.toFixed(1)}</b> 度　{isRight && <span className="highlight">直角三角形！</span>}</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '1回目 10秒後', t: 10 },
          { label: '2回目 18秒後', t: 18 },
          { label: '3回目 22.5秒後', t: 22.5 },
          { label: '4回目 30秒後', t: 30 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>点Ｐの角速度…360÷45＝<b>8度/秒</b>、点Ｑの角速度…360÷36＝<b>10度/秒</b>です。</p>
        <p>
          三角形ＡＰＱが直角三角形になるのは、いずれかの辺が円の直径になるときです。
          ①ＰＱが直径：10秒後・30秒後、②ＡＱが直径：18秒後、③ＡＰが直径：22.5秒後の、
          合わせて<b>4回（10秒後、18秒後、22.5秒後、30秒後）</b>です。
        </p>
      </div>
    </div>
  )
}
