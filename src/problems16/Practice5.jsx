import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const ROUTE = 2800 // 解説で求まる値
const SPEED_OTOTO = 40
const START_ANI = 10
const SPEED_ANI = 90
const T_MAX = 60

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posOtoto(t) { return Math.min(ROUTE, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : pingpong(SPEED_ANI * (t - START_ANI), ROUTE) }

export default function Practice5() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題5　1往復する兄と一方通行の弟</h2>
      <div className="statement">
        <p className="setup">
          弟は分速40ｍで公園から駅に向かいました。兄は，弟よりおくれて公園を出発し，分速90ｍで公園と駅の間を1往復しました。
        </p>
        <ol className="question-list">
          <li>グラフのxにあてはまる数を求めなさい。</li>
          <li>グラフのy，zにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: '公園' }, { pos: ROUTE, label: '駅' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[{ label: '10分後（兄が出発）', t: 10 }, { label: 'x＝18分後（1回目）', t: 18 }, { label: 'y＝50分後（2回目）', t: 50 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={ROUTE} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="駅" yTopLabel="公園"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 18, label: 'x' }, { t: 50, label: 'y' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 弟は，出発してから10分間で400ｍ進んでいます。兄はこの道のりを追いかけるので，400÷(90－40)＝8(分)で追いつきます。よって，x＝10＋8＝<b>18(分)</b>。</p>
        <p>(2) 兄が弟に追いついてからの様子を状況図で表すと，兄と弟の進んだ道のりの差は，800×2＝1600(ｍ)です。xからyまでの時間は，1600÷(90－40)＝32(分)。y＝18＋32＝<b>50(分)</b>。z…弟に注目して，40×50＋800＝<b>2800(ｍ)</b>。</p>
      </div>
    </div>
  )
}
