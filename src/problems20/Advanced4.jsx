import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const SCALE = 0.15
const CX = 220
const CY = 220
const T_MAX = 24

function posAx(t) { return -800 + 80 * t }
function posBy(t) { return 48 * t - 96 }

export default function Advanced4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const ax = posAx(t)
  const by = posBy(t)
  const sx = (x) => CX + x * SCALE
  const sy = (y) => CY - y * SCALE // 北が上になるようY反転

  return (
    <div className="problem">
      <h2>最難関4　直角に交わる道と方位</h2>
      <div className="statement">
        <p className="setup">
          直角に交わった2つの道があります。はじめ，Ａ君は交差点から西へ800mの地点に，Ｂ君は交差点より南の地点にいました。Ａ君は東西方向の道を西から東に向かって，Ｂ君は南北方向の道を南から北に向かって，それぞれ一定の速さで同時に歩き始めました。
          出発してから2分後にＢ君は交差点を通過しました。それから5分後，Ｂ君はＡ君から見てちょうど北東の位置に，さらにその3分後にはちょうど北の位置にいました。
        </p>
        <ol className="question-list">
          <li>Ａ君，Ｂ君の速さはそれぞれ分速何mですか。</li>
          <li>Ｂ君がＡ君から見てちょうど北西の位置にいるのは，出発してから何分後ですか。</li>
        </ol>
      </div>

      <svg width={440} height={440} className="tank-view">
        <line x1={0} y1={CY} x2={440} y2={CY} stroke="#4a5568" strokeWidth="2" />
        <line x1={CX} y1={0} x2={CX} y2={440} stroke="#4a5568" strokeWidth="2" />
        <text x={420} y={CY - 6} fontSize="11">東</text>
        <text x={CX + 6} y={16} fontSize="11">北</text>
        <line x1={sx(ax)} y1={sy(0)} x2={sx(0)} y2={sy(by)} stroke="#a0aec0" strokeDasharray="4 3" />
        <circle cx={sx(ax)} cy={sy(0)} r={6} fill="#3182ce" /><text x={sx(ax) + 8} y={sy(0) - 8} fontSize="12" fill="#3182ce" fontWeight="bold">A</text>
        <circle cx={sx(0)} cy={sy(by)} r={6} fill="#dd6b20" /><text x={sx(0) + 8} y={sy(by) - 8} fontSize="12" fill="#dd6b20" fontWeight="bold">B</text>
        <circle cx={CX} cy={CY} r={3} fill="#2d3748" />
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　Ａ君の交差点からの位置：<b>{ax.toFixed(0)}</b>m（東正）　Ｂ君：<b>{by.toFixed(0)}</b>m（北正）</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '2分後（Bが交差点を通過）', t: 2 }, { label: '7分後（北東の位置）', t: 7 }, { label: '10分後（ちょうど北）', t: 10 }, { label: '22分後（北西の位置）', t: 22 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          Ａ君は10分間で800m進んでいますので，800÷10＝<b>80(m/分)</b>。Ｂ君は，Ａ君が10－7＝3(分間)で進む道のりを，7－2＝5(分間)で進んでいますので，80×3÷5＝<b>48(m/分)</b>
        </p>
        <p>
          10分後にＡ君は交差点にいて，Ｂ君の位置は，交差点から北に，48×(10－2)＝384(m)の地点です。「ちょうど北西の位置」にいるとき，交差点からの道のりは等しいので，Ａ君がＢ君よりも384m多く進めばよいことがわかります。
          これより，384÷(80－48)＝12(分後)ですから，出発してからは，10＋12＝<b>22(分後)</b>
        </p>
      </div>
    </div>
  )
}
