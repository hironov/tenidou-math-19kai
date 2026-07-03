import { useMemo } from 'react'
import { pointOnCircle, angleAt } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const O = { x: 0, y: 0 }
const R = 60
const START_ANGLE = 90 // Aは円の真上
const P_SPEED_DEG = 360 / 40 // 9度/秒（時計回り）
const Q_SPEED_DEG = 360 / 24 // 15度/秒（反時計回り、Pと逆向き）
const T_MAX = 40

const PAD = 46
const toSvg = (p) => ({ x: PAD + R + p.x, y: PAD + R - p.y })

export default function Example5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const A = useMemo(() => pointOnCircle(O, R, START_ANGLE), [])
  const P = useMemo(() => pointOnCircle(O, R, START_ANGLE - P_SPEED_DEG * t), [t])
  const Q = useMemo(() => pointOnCircle(O, R, START_ANGLE + Q_SPEED_DEG * t), [t])
  const anglePOQ = useMemo(() => angleAt(O, P, Q), [P, Q])
  const anglePAQ = useMemo(() => angleAt(A, P, Q), [A, P, Q])

  const sO = toSvg(O), sA = toSvg(A), sP = toSvg(P), sQ = toSvg(Q)
  const size = PAD * 2 + R * 2

  const nearlyEqual = (a, b, eps = 1.5) => Math.abs(a - b) < eps
  const overlapping = nearlyEqual(P.x, Q.x) && nearlyEqual(P.y, Q.y)
  const isRightAngle = nearlyEqual(anglePAQ, 90, 2)

  return (
    <div className="problem">
      <h2>例題5　円周上を反対向きにまわる2点と角速度</h2>
      <div className="statement">
        <p className="setup">
          右の図のような，Ｏを中心とする円の周上を，2点Ｐ，ＱがＡを同時に出発して，それぞれ一定の速さで矢印の方向に
          （互いに反対向きに）まわります。1周するのにかかる時間は，点Ｐは40秒，点Ｑは24秒です。
        </p>
        <ol className="question-list">
          <li>2点が出発してから9秒後の角ＰＯＱの大きさは何度ですか。小さい方の角度を答えなさい。</li>
          <li>出発した後，点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。</li>
          <li>角ＰＡＱがはじめて直角になるのは，2点が出発してから何秒後ですか。</li>
        </ol>
      </div>

      <div className="stage">
        <svg width={size} height={size}>
          <circle cx={sO.x} cy={sO.y} r={R} fill="none" stroke="#333" strokeWidth="2" />
          <line x1={sO.x} y1={sO.y} x2={sP.x} y2={sP.y} stroke="#3182ce" strokeWidth="1.5" />
          <line x1={sO.x} y1={sO.y} x2={sQ.x} y2={sQ.y} stroke="#dd6b20" strokeWidth="1.5" />
          <line x1={sP.x} y1={sP.y} x2={sQ.x} y2={sQ.y}
            stroke={isRightAngle ? '#38a169' : '#a0aec0'} strokeWidth="2"
            strokeDasharray={isRightAngle ? '0' : '4 3'} />
          <line x1={sA.x} y1={sA.y} x2={sP.x} y2={sP.y} stroke="#cbd5e0" strokeDasharray="2 3" />
          <line x1={sA.x} y1={sA.y} x2={sQ.x} y2={sQ.y} stroke="#cbd5e0" strokeDasharray="2 3" />
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
          <p>角ＰＯＱ：<b>{anglePOQ.toFixed(1)}</b> 度</p>
          <p>角ＰＡＱ：<b>{anglePAQ.toFixed(1)}</b> 度　{isRightAngle && <span className="highlight">直角！</span>}</p>
          {overlapping && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>

      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 9秒後', t: 9 },
          { label: '(3) 直角 7.5秒後', t: 7.5 },
          { label: '(2) 重なる 15秒後', t: 15 },
        ]}
      />

      <div className="explain">
        <h3>解説</h3>
        <p>
          点Ｐの角速度は 360÷40＝<b>9度/秒</b>、点Ｑの角速度は 360÷24＝<b>15度/秒</b>です。
        </p>
        <p>
          (1) 9秒後の角ＰＯＱは、(9+15)×9＝216度＞180度なので、360－216＝<b>144度</b>です。
        </p>
        <p>
          (2) 2点が重なるのは、合わせて360度回ったときなので、360÷(9+15)＝<b>15秒後</b>です。
        </p>
        <p>
          (3) 角ＰＡＱが直角になるとき、直線ＰＱは円の直径になります。合わせて180度回ったときなので、
          180÷(9+15)＝<b>7.5秒後</b>です。
        </p>
      </div>
    </div>
  )
}
