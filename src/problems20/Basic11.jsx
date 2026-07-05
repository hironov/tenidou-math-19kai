import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { pointAtDistance } from '../utils/motion'

const A = { x: 20, y: 20 }
const D = { x: 220, y: 20 }
const C = { x: 220, y: 220 }
const B = { x: 20, y: 220 }
const PATH_P = [A, D, C, B, A]
const PATH_Q = [B, C, D, A, B]
const T_MAX = 20

function posP(t) { return pointAtDistance(PATH_P, 5 * t, true) }
function posQ(t) { return pointAtDistance(PATH_Q, 2 * t, true) }

export default function Basic11() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const p = posP(t)
  const q = posQ(t)

  return (
    <div className="problem">
      <h2>基本問題11　正方形の辺上をまわる2点</h2>
      <div className="statement">
        <p className="setup">
          正方形ＡＢＣＤ（1辺14cm）があります。点ＰはＡを出発して秒速5cmで，点ＱはＢを出発して秒速2cmで，それぞれ矢印の方向（Ａ→Ｄ→Ｃ→Ｂ→Ａ，Ｂ→Ｃ→Ｄ→Ａ→Ｂ）に辺上をまわり続けます。
        </p>
        <ol className="question-list">
          <li>点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。</li>
          <li>点Ｐと点Ｑが2回目に重なるのは，2点が出発してから何秒後ですか。</li>
        </ol>
      </div>

      <svg width={240} height={240} className="tank-view">
        <polygon points={`${A.x},${A.y} ${D.x},${D.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <circle cx={p.x} cy={p.y} r={6} fill="#3182ce" /><text x={p.x + 8} y={p.y - 8} fontSize="12" fill="#3182ce" fontWeight="bold">P</text>
        <circle cx={q.x} cy={q.y} r={6} fill="#dd6b20" /><text x={q.x + 8} y={q.y + 16} fontSize="12" fill="#dd6b20" fontWeight="bold">Q</text>
        <text x={A.x - 12} y={A.y - 6} fontSize="12">A</text><text x={D.x + 4} y={D.y - 6} fontSize="12">D</text>
        <text x={C.x + 4} y={C.y + 16} fontSize="12">C</text><text x={B.x - 12} y={B.y + 16} fontSize="12">B</text>
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 秒後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '6秒後（1回目に重なる）', t: 6 }, { label: '14秒後（2回目に重なる）', t: 14 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＰとＱが重なるまでに進む長さの和は，14×3＝42(cm)。42÷(5＋2)＝<b>6(秒後)</b></p>
        <p>(2) 1回目に重なってから2回目に重なるまでに進む長さの和は，正方形1周分なので，14×4＝56(cm)。56÷(5＋2)＝8(秒後)より，6＋8＝<b>14(秒後)</b></p>
      </div>
    </div>
  )
}
