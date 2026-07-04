import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 840
const SPEED_ANI = 80
const SPEED_OTOTO = 60
const T_MAX = 24

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtoto(t) { return DIST - pingpong(SPEED_OTOTO * t, DIST) }

export default function Example7() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題7　往復の旅人算（両端から出発）</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は840ｍはなれています。兄はＡ地点を，弟はＢ地点を同時に出発して，それぞれＡＢ間を1往復します。兄の速さは分速80ｍ，弟の速さは分速60ｍです。
        </p>
        <ol className="question-list">
          <li>2人がはじめてすれちがうのは，出発してから何分後ですか。</li>
          <li>2人が2回目にすれちがう地点は，Ａ地点から何ｍはなれていますか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '(1) 6分後（1回目）', t: 6 }, { label: '(2) 18分後（2回目）', t: 18 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム（位置と時間の関係）</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 6, label: '6' }, { t: 18, label: '18' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) はじめてすれちがうのは，840÷(80＋60)＝<b>6(分後)</b>。</p>
        <p>(2) 1回目にすれちがってから2回目にすれちがうまでの様子は，840×2＝1680(ｍ)の長さなので，1680÷(80＋60)＝12(分)かかります。弟は2回目にすれちがうまでに，60×(6＋12)＝1080(ｍ)進んでいるので，この地点はＡ地点から，1080－840＝<b>240(ｍ)</b>。</p>
      </div>
    </div>
  )
}
