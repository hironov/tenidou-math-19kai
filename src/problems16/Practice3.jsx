import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 2000
const SPEED_RIKU = 100 // 分速（時速6km）
const SPEED_SORA = 2000 / 12 - SPEED_RIKU
const T_MAX = 40

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posRiku(t) { return pingpong(SPEED_RIKU * t, DIST) }
function posSora(t) { return DIST - pingpong(SPEED_SORA * t, DIST) }

export default function Practice3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題3　2km区間を1往復するすれちがい</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は2kmはなれています。りく君はＡ地点を，そら君はＢ地点を同時に出発して，それぞれ一定の速さでＡＢ間を1往復しました。
          りく君は，出発してから12分後にそら君とはじめてすれちがい，その後，帰り道の途中，Ａ地点まであと0.4kmの地点でそら君と2回目にすれちがいました。
        </p>
        <ol className="question-list">
          <li>2人が2回目にすれちがったのは，出発してから何分後ですか。</li>
          <li>りく君の速さは時速何kmですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }, { pos: 400, label: '0.4km' }]}
        points={[{ label: 'りく', color: '#3182ce', pos: posRiku(t) }, { label: 'そら', color: '#dd6b20', pos: posSora(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '12分後（1回目）', t: 12 }, { label: '36分後（2回目）', t: 36 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: 'りく', color: '#3182ce', fn: posRiku }, { label: 'そら', color: '#dd6b20', fn: posSora }]}
          markLines={[{ t: 12, label: '12' }, { t: 36, label: '36' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1回目にすれちがってから2回目にすれちがうまでにかかる時間は，12×2＝24(分)です。よって，12＋24＝<b>36(分後)</b>。</p>
        <p>(2) りく君は36分間で，2000×2－400＝3600(ｍ)進んでいます。36分＝0.6時間，3600ｍ＝3.6kmより，3.6÷0.6＝<b>6(km/時)</b>。</p>
      </div>
    </div>
  )
}
