import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const AB = 1080 // 解説で求まる値
const SPEED_NATSUKO = 180
const START_FUYUKO = 5
const SPEED_FUYUKO = 72
const T_MAX = 26

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posNatsuko(t) { return pingpong(SPEED_NATSUKO * t, AB) }
function posFuyuko(t) { return t < START_FUYUKO ? 0 : Math.min(AB, SPEED_FUYUKO * (t - START_FUYUKO)) }

export default function AdvancedA2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-2　2往復する夏子さんと歩く冬子さん</h2>
      <div className="statement">
        <p className="setup">
          夏子さんはＡ地点を出発して，Ａ地点とＢ地点を結ぶ道を分速180ｍで走って2往復しました。冬子さんは，夏子さんよりも5分おくれてＡ地点を出発して，Ｂ地点まで分速72ｍで歩きました。
          冬子さんは，夏子さんとはじめてすれちがってから480ｍ歩いたところで夏子さんに追いこされました。
        </p>
        <ol className="question-list">
          <li>グラフのxにあてはまる数を求めなさい。</li>
          <li>グラフのyにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={AB}
        markers={[{ pos: 0, label: 'A' }, { pos: AB, label: 'B' }]}
        points={[{ label: '夏子', color: '#3182ce', pos: posNatsuko(t) }, { label: '冬子', color: '#dd6b20', pos: posFuyuko(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '5分後（冬子が出発）', t: 5 }, { label: '10分後（1回目すれちがい・x）', t: 10 }, { label: '16分40秒後（追いこし・y）', t: 50 / 3 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={AB} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '夏子', color: '#3182ce', fn: posNatsuko }, { label: '冬子', color: '#dd6b20', fn: posFuyuko }]}
          markLines={[{ t: 5, label: '5' }, { t: 10, label: '' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 冬子さんは480ｍ進むのに，480÷72＝6と2/3(分)かかります。この間に夏子さんは，180×6と2/3＝1200(ｍ)進みます。これが太線部分になるので，x＝(1200－480)÷2＝<b>360(ｍ)</b>。</p>
        <p>(2) 冬子さんは360ｍ進むのに，360÷72＝5(分)かかるので，夏子さんと冬子さんが出会ったのは，夏子さんが出発してから，5＋5＝10(分後)です。これより，y＝(180×10＋360)÷2＝<b>1080(ｍ)</b>。</p>
      </div>
    </div>
  )
}
