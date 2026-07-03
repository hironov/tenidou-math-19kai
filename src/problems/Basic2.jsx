import { useMemo } from 'react'
import { pointOnCircle } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const O = { x: 0, y: 0 }
const R = 60
const START_ANGLE = 90
const P_SPEED_DEG = 360 / 18 // 20度/秒
const Q_SPEED_DEG = 360 / 72 // 5度/秒
const T_MAX = 30

const PAD = 40
const toSvg = (p) => ({ x: PAD + R + p.x, y: PAD + R - p.y })

const STATIC_R = 34
const STATIC_PAD = 16
const toStaticC = (p) => ({ x: STATIC_PAD + STATIC_R + p.x, y: STATIC_PAD + STATIC_R - p.y })
const STATIC_SIZE = STATIC_PAD * 2 + STATIC_R * 2

export default function Basic2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const A = useMemo(() => pointOnCircle(O, R, START_ANGLE), [])
  // PとQは同じ地点から同じ向き（時計回り）に進む
  const P = useMemo(() => pointOnCircle(O, R, START_ANGLE - P_SPEED_DEG * t), [t])
  const Q = useMemo(() => pointOnCircle(O, R, START_ANGLE - Q_SPEED_DEG * t), [t])

  const sO = toSvg(O), sA = toSvg(A), sP = toSvg(P), sQ = toSvg(Q)
  const size = PAD * 2 + R * 2
  const meeting = Math.hypot(P.x - Q.x, P.y - Q.y) < 1.5

  const gO = toStaticC(O)
  const gA = toStaticC(pointOnCircle(O, STATIC_R, START_ANGLE))

  return (
    <div className="problem">
      <h2>基本問題2　円周上を同じ向きにまわる2点</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような，Ｏを中心とする円の周上を，2点Ｐ，ＱがＡを同時に出発して，それぞれ一定の速さで矢印の方向に
              （同じ向きに）まわります。1周するのにかかる時間は，点Ｐは18秒，点Ｑは72秒です。これについて，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>点Ｐ，点Ｑは，Ｏを中心としてそれぞれ毎秒何度の割合で回転しますか。</li>
              <li>出発した後，点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。</li>
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
          <line x1={sO.x} y1={sO.y} x2={sP.x} y2={sP.y} stroke="#3182ce" strokeWidth="1.5" />
          <line x1={sO.x} y1={sO.y} x2={sQ.x} y2={sQ.y} stroke="#dd6b20" strokeWidth="1.5" />
          <circle cx={sO.x} cy={sO.y} r={3} fill="#333" />
          <circle cx={sA.x} cy={sA.y} r={4} fill="#805ad5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sO.x + 6} y={sO.y + 14}>O</text>
          <text x={sA.x + 8} y={sA.y - 8} fill="#805ad5">A</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y + 4} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          {meeting && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '0秒（出発）', t: 0 }, { label: '(2) 重なる 24秒後', t: 24 }]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>(1) 点Ｐ…360÷18＝<b>20度/秒</b>、点Ｑ…360÷72＝<b>5度/秒</b>です。</p>
        <p>
          (2) ＰとＱは同じ向きに進むので、点Ｐが点Ｑより1周分(360度)多く回ると重なります。
          360÷(20－5)＝<b>24秒後</b>です。
        </p>
      </div>
    </div>
  )
}
