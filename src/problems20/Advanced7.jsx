import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1300
const SPEED_OTOUTO = 500 / 15 // ①/15分
const SPEED_ANI = SPEED_OTOUTO + 20
const T_MAX = 45

function pingpong(dist, d) {
  const period = 2 * d
  const raw = ((dist % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtouto(t) { return DIST - pingpong(SPEED_OTOUTO * t, DIST) }

export default function Advanced7() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>最難関7　速さの差と2回のすれちがい</h2>
      <div className="statement">
        <p className="setup">
          兄と弟は，Ａ地点とＢ地点を結ぶまっすぐな道を，それぞれ休まずに1往復しました。2人の速さはそれぞれ一定で，兄の速さは弟の速さよりも分速20mだけ速いです。兄はＡ地点から，弟はＢ地点から同時に歩き出したところ，2人は1回目にすれちがってから30分後に2回目にすれちがい，2回目にすれちがった地点はＡ地点から200mはなれていました。
        </p>
        <ol className="question-list">
          <li>Ａ地点とＢ地点は何mはなれていますか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: 200, label: '200m' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtouto(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '15分後（1回目にすれちがい）', t: 15 }, { label: '45分後（2回目・Aから200m）', t: 45 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtouto }]} markLines={[{ t: 15, label: '15' }, { t: 45, label: '45' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          1回目にすれちがうまでの時間は，30÷2＝15(分間)なので，1回目にすれちがうまでに兄と弟が進んだ道のりの差は，20×15＝300(m)。
          1回目にすれちがうまでに弟が進んだ道のりを①mとすると，1回目にすれちがうまでの兄の進んだ道のりは①＋300(m)，1回目にすれちがってから2回目にすれちがうまでに弟が進んだ道のりは②mです。
          ①＋300＝②－200，①＝500 より，ＡＢ間の道のりは，500×2＋300＝<b>1300(m)</b>
        </p>
      </div>
    </div>
  )
}
