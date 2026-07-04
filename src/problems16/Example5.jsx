import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 900
const SPEED_ANI = 90
const SPEED_OTOTO = 60
const T_MAX = 20

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtoto(t) { return pingpong(SPEED_OTOTO * t, DIST) }

export default function Example5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題5　1往復する旅人算</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は900ｍはなれています。兄と弟はＡ地点を同時に出発して，兄は分速90ｍ，弟は分速60ｍでそれぞれＡＢ間を1往復します。
        </p>
        <ol className="question-list"><li>2人がすれちがうのは，出発してから何分後ですか。</li></ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '12分後（すれちがい）', t: 12 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム（位置と時間の関係）</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 12, label: '12' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>状況図で表すと，兄はＢ地点で折り返してくるので，兄と弟の進んだ道のりの和は，ＡＢ間の道のり2本分になります。900×2＝1800(ｍ)。よって，1800÷(90＋60)＝<b>12(分後)</b>。</p>
      </div>
    </div>
  )
}
