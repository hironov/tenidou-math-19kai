import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 360
const SPEED_ANI = 50
const SPEED_OTOTO = 40
const T_MAX = 16

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtoto(t) { return DIST - pingpong(SPEED_OTOTO * t, DIST) }

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題4　両端から出発する往復の旅人算</h2>
      <div className="statement">
        <p className="setup">
          兄はＡ地点を，弟はＢ地点を同時に出発して，それぞれＡＢ間を1往復しました。兄の速さは分速50ｍ，弟の速さは分速40ｍです。2人は出発してから4分後にはじめてすれちがいました。
        </p>
        <ol className="question-list">
          <li>Ａ地点とＢ地点は何ｍはなれていますか。</li>
          <li>2人が2回目にすれちがったのは，出発してから何分後ですか。また，その地点は，Ａ地点から何ｍはなれていますか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '(1) 4分後（1回目）', t: 4 }, { label: '(2) 12分後（2回目）', t: 12 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 4, label: '4' }, { t: 12, label: '12' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) (50＋40)×4＝<b>360(ｍ)</b>。</p>
        <p>(2) 1回目にすれちがってから2回目にすれちがうまでに2人が進む道のりの和はＡＢ間の道のりの2倍なので，時間も2倍になり，4×2＝8分でふたたびすれちがいます。よって，4＋8＝<b>12(分後)</b>。弟に注目すると，12分間で480ｍ進んでいるので，480－360＝<b>120(ｍ)</b>。</p>
      </div>
    </div>
  )
}
