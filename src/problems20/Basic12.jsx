import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { pointOnCircle } from '../utils/motion'

const CENTER = { x: 150, y: 150 }
const R_OUT = 110
const R_IN = 60
const T_MAX = 12

function angleP(t) { return -90 + 12 * t }
function angleQ(t) { return 90 - 18 * t }

export default function Basic12() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const p = pointOnCircle(CENTER, R_OUT, angleP(t))
  const q = pointOnCircle(CENTER, R_IN, angleQ(t))

  return (
    <div className="problem">
      <h2>基本問題12　同心円上を回転する2点</h2>
      <div className="statement">
        <p className="setup">
          Ｏを中心とする大小2つの円があります。点ＰはＡを，点ＱはＢを同時に出発して，それぞれ一定の速さで円周上を矢印の方向にまわります。1周するのにかかる時間は，点Ｐは30秒，点Ｑは20秒です。
        </p>
        <ol className="question-list">
          <li>点Ｐ，点Ｑは，Ｏを中心としてそれぞれ毎秒何度の割合で回転しますか。</li>
          <li>3点Ｐ，Ｑ，Ｏがはじめてこの順に一直線上にならぶのは，出発してから何秒後ですか。</li>
        </ol>
      </div>

      <svg width={300} height={300} className="tank-view">
        <circle cx={CENTER.x} cy={CENTER.y} r={R_OUT} fill="none" stroke="#cbd5e0" strokeWidth="1.5" />
        <circle cx={CENTER.x} cy={CENTER.y} r={R_IN} fill="none" stroke="#cbd5e0" strokeWidth="1.5" />
        <line x1={p.x} y1={p.y} x2={CENTER.x} y2={CENTER.y} stroke="#a0aec0" strokeDasharray="3 3" />
        <circle cx={CENTER.x} cy={CENTER.y} r={3} fill="#2d3748" /><text x={CENTER.x + 6} y={CENTER.y - 6} fontSize="12">O</text>
        <circle cx={p.x} cy={p.y} r={6} fill="#3182ce" /><text x={p.x + 8} y={p.y} fontSize="12" fill="#3182ce" fontWeight="bold">P</text>
        <circle cx={q.x} cy={q.y} r={6} fill="#dd6b20" /><text x={q.x + 8} y={q.y} fontSize="12" fill="#dd6b20" fontWeight="bold">Q</text>
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '6秒後（P,Q,Oが一直線）', t: 6 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ｐの角速度は，360÷30＝<b>12(度/秒)</b>。Ｑの角速度は，360÷20＝<b>18(度/秒)</b></p>
        <p>(2) ＰとＱが合わせて180度進めばよいので，180÷(12＋18)＝<b>6(秒後)</b></p>
        <p>円周上の点の移動は，角速度（動く角度の大きさ）で考えます。</p>
      </div>
    </div>
  )
}
