import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1600
const T_MAX = 20

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}

function posAni(t) { return pingpong(180 * t, DIST) }
function posOtouto(t) { return DIST - pingpong(140 * t, DIST) }

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題2　自転車での往復とすれちがい</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は1600mはなれています。兄はＡ地点を，弟はＢ地点を自転車で同時に出発して，それぞれ一定の速さでＡＢ間を1往復しました。兄は，出発してから5分後に弟とはじめてすれちがい，その後，帰り道の途中，Ａ地点まであと500mの地点で弟と2回目にすれちがいました。
        </p>
        <ol className="question-list">
          <li>2人が2回目にすれちがったのは，出発してから何分後ですか。</li>
          <li>兄の速さは分速何mですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST - 500, label: '500m手前' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtouto(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '5分後（1回目にすれちがい）', t: 5 }, { label: '15分後（2回目にすれちがい）', t: 15 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtouto }]} markLines={[{ t: 5, label: '5' }, { t: 15, label: '15' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2人でＡＢ間1本分を進むのに5分かかります。2回目に出会うまでに，2人でＡＢ間3本分進みますので，5×3＝<b>15(分後)</b></p>
        <p>(2) 兄は15分で，1600×2－500＝2700(m)進んでいますので，2700÷15＝<b>180(m/分)</b></p>
      </div>
    </div>
  )
}
