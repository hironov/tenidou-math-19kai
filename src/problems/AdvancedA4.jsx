import { useMemo } from 'react'
import { pointOnCircle, distanceBetween } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const O = { x: 0, y: 0 }
const R = 60
// A,B,Cは円周を3等分（120度ずつ）。すべて時計回りに移動。
const A_ANGLE = 90
const B_ANGLE = A_ANGLE - 120
const C_ANGLE = A_ANGLE - 240
const P_SPEED_DEG = 360 / 8 // 45度/秒
const Q_SPEED_DEG = 360 / 12 // 30度/秒
const R_SPEED_DEG = 360 / 15 // 24度/秒
const T_MAX = 90

const PAD = 46
const toSvg = (p) => ({ x: PAD + R + p.x, y: PAD + R - p.y })

export default function AdvancedA4() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const A0 = useMemo(() => pointOnCircle(O, R, A_ANGLE), [])
  const B0 = useMemo(() => pointOnCircle(O, R, B_ANGLE), [])
  const C0 = useMemo(() => pointOnCircle(O, R, C_ANGLE), [])
  const P = useMemo(() => pointOnCircle(O, R, A_ANGLE - P_SPEED_DEG * t), [t])
  const Q = useMemo(() => pointOnCircle(O, R, B_ANGLE - Q_SPEED_DEG * t), [t])
  const Rp = useMemo(() => pointOnCircle(O, R, C_ANGLE - R_SPEED_DEG * t), [t])
  const allMeeting = distanceBetween(P, Q) < 1 && distanceBetween(Q, Rp) < 1

  const sO = toSvg(O), sP = toSvg(P), sQ = toSvg(Q), sR = toSvg(Rp)
  const sA0 = toSvg(A0), sB0 = toSvg(B0), sC0 = toSvg(C0)
  const size = PAD * 2 + R * 2

  return (
    <div className="problem">
      <h2>応用問題A-4　円を3等分する点から出発する3点</h2>
      <div className="statement">
        <p className="setup">
          右の図のＡ，Ｂ，Ｃは円周を3等分する点です。3点Ｐ，Ｑ，ＲがそれぞれＡ，Ｂ，Ｃを同時に出発して，円周上を
          時計回りに動きます。1周するのにかかる時間は，点Ｐが8秒，点Ｑが12秒，点Ｒが15秒です。これについて，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>3点Ｐ，Ｑ，Ｒがはじめて重なるのは，出発してから何秒後ですか。</li>
          <li>3点Ｐ，Ｑ，Ｒが2回目に重なるのは，出発してから何秒後ですか。</li>
          <li>3点Ｐ，Ｑ，Ｒは，出発してから60分間に何回重なりますか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={size} height={size}>
          <circle cx={sO.x} cy={sO.y} r={R} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx={sA0.x} cy={sA0.y} r={2.5} fill="#a0aec0" />
          <circle cx={sB0.x} cy={sB0.y} r={2.5} fill="#a0aec0" />
          <circle cx={sC0.x} cy={sC0.y} r={2.5} fill="#a0aec0" />
          <circle cx={sO.x} cy={sO.y} r={3} fill="#333" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <circle cx={sR.x} cy={sR.y} r={5} fill="#38a169" />
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y + 4} fill="#dd6b20" fontWeight="bold">Q</text>
          <text x={sR.x + 8} y={sR.y + 4} fill="#38a169" fontWeight="bold">R</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          {allMeeting && <p className="highlight">3点が重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 1回目 80秒後', t: 80 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>角速度…点Ｐ45度/秒、点Ｑ30度/秒、点Ｒ24度/秒。はじめ3点は120度ずつ離れています。</p>
        <p>(1) 点Ｐと点Ｑ、点Ｑと点Ｒがそれぞれ重なる時間の条件を組み合わせると、3点がはじめて重なるのは<b>80秒後</b>です。</p>
        <p>(2) 2回目に重なるのは、24と60の最小公倍数120秒後なので、80+120＝<b>200秒後</b>です。</p>
        <p>(3) 3点が重なる時間は120×□+80(秒後)と表せるので、60分(3600秒)間には<b>30回</b>重なります。</p>
      </div>
    </div>
  )
}
