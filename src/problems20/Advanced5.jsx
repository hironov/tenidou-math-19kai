import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { pointAtDistance } from '../utils/motion'

const A = { x: 140, y: 100 }
const B = { x: 140, y: 220 }
const C = { x: 260, y: 220 }
const D = { x: 260, y: 100 }
const E = { x: 140 - 12 * 8.66, y: 160 }
const PATH_P = [A, B, C, D, A]
const PATH_Q = [A, E, B, A]
const T_MAX = 20

function posP(t) { return pointAtDistance(PATH_P, 6 * t, true) }
function posQ(t) { return pointAtDistance(PATH_Q, 4 * t, true) }

export default function Advanced5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const p = posP(t)
  const q = posQ(t)

  return (
    <div className="problem">
      <h2>最難関5　正方形と正三角形をまわる2点</h2>
      <div className="statement">
        <p className="setup">
          1辺12cmの正方形ＡＢＣＤと正三角形ＡＥＢを組み合わせた図形があります。点ＰはＡを出発して秒速6cmで，正方形の辺上をＡ→Ｂ→Ｃ→Ｄ→Ａ→……の順にまわり続けます。点ＱはＡを出発して秒速4cmで正三角形の辺上をＡ→Ｅ→Ｂ→Ａ→……の順にまわり続けます。いま，点Ｐと点Ｑが同時に出発しました。
        </p>
        <ol className="question-list">
          <li>出発した後，点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。</li>
          <li>(1)を1回目として，点Ｐと点Ｑが10回目に重なるのは，2点が出発してから何秒後ですか。</li>
        </ol>
      </div>

      <svg width={280} height={260} className="tank-view">
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points={`${A.x},${A.y} ${E.x},${E.y} ${B.x},${B.y}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <circle cx={p.x} cy={p.y} r={6} fill="#3182ce" /><text x={p.x + 8} y={p.y} fontSize="12" fill="#3182ce" fontWeight="bold">P</text>
        <circle cx={q.x} cy={q.y} r={6} fill="#dd6b20" /><text x={q.x - 16} y={q.y} fontSize="12" fill="#dd6b20" fontWeight="bold">Q</text>
        <text x={A.x + 4} y={A.y - 6} fontSize="11">A</text><text x={B.x + 4} y={B.y + 14} fontSize="11">B</text>
        <text x={C.x + 4} y={C.y + 14} fontSize="11">C</text><text x={D.x + 4} y={D.y - 6} fontSize="11">D</text>
        <text x={E.x - 10} y={E.y} fontSize="11">E</text>
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 秒後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '8.4秒後（1回目に重なる）', t: 8.4 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>Ｐは1周するのに，12×4÷6＝8(秒)かかり，Ｑは1周するのに，12×3÷4＝9(秒)かかりますので，8と9の公倍数である72秒周期であることがわかります。</p>
        <p>ＰとＱが重なるのは，どちらもＡＢ上にあるときしかありません。ＡＢ上にいる時間帯を調べていくと，はじめて重なるのは8～10秒後のところで，8秒後にＱはＢから，4×(8－6)＝8(cm)の位置にいます。このときＰとＱの間の長さは，12－8＝4(cm)なので，4÷(6＋4)＝0.4(秒後)に重なります。よって，8＋0.4＝<b>8.4(秒後)</b></p>
        <p>1周期（72秒）にＰとＱは6回重なります。10回目に重なるのは，2周期目の4回目ですから，33秒後に，ＰはＡから，6×(33－32)＝6(cm)の位置にいます。このときＰとＱの間の長さは，12－6＝6(cm)なので，6÷(6＋4)＝0.6(秒後)に重なります。よって，33＋0.6＋72＝<b>105.6(秒後)</b></p>
      </div>
    </div>
  )
}
