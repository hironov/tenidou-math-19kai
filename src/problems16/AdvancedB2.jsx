import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const ROUTE = 6000
const SPEED_CART = 30
const SPEED_P = 90
const P_START = 30 // 荷車出発からP君が出発するまで（分）
const T_MAX = 240

function posCart(T) { return Math.min(ROUTE, SPEED_CART * T) }
function posP(T) {
  if (T < P_START) return 0
  const tau = T - P_START
  if (tau <= 15) return SPEED_P * tau
  if (tau <= 30) return 1350 - SPEED_P * (tau - 15)
  if (tau <= 60) return SPEED_P * (tau - 30)
  if (tau <= 90) return 2700 - SPEED_P * (tau - 60)
  if (tau <= 150) return SPEED_P * (tau - 90)
  return Math.max(0, 5400 - SPEED_P * (tau - 150))
}

export default function AdvancedB2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題B-2　ボールを運ぶＰ君と荷車</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点からＢ地点まで6000ｍはなれた道を，ボールを積んだ荷車が分速30ｍで走ります。荷車がＡ地点から900ｍ進んだところで，Ｐ君はＡ地点を出発し，
          分速90ｍで荷車を追いかけます。Ｐ君は荷車に追いついてボールを1個受け取るとＡ地点まで走って戻り，またＡ地点から荷車を追いかける，ということをくり返します。
        </p>
        <ol className="question-list">
          <li>荷車がＢ地点に着くのは，荷車が出発してから何分後ですか。</li>
          <li>Ｐ君が最後にボールを受け取ったのは，Ｐ君が出発してから何分後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: 'A' }, { pos: ROUTE, label: 'B' }]}
        points={[{ label: '荷車', color: '#dd6b20', pos: posCart(t) }, { label: 'P', color: '#3182ce', pos: posP(t) }]}
      />
      <div className="readout"><p>荷車が出発してからの経過：<b>{t.toFixed(1)}</b> 分後（Ｐ君自身の経過：<b>{Math.max(0, t - P_START).toFixed(1)}</b> 分後）</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[
          { label: '30分後（Pが出発）', t: 30 },
          { label: '45分後（1回目に受け取る）', t: 45 },
          { label: '90分後（2回目に受け取る）', t: 90 },
          { label: '180分後（最後に受け取る）', t: 180 },
          { label: '200分後（荷車がBに到着）', t: 200 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={ROUTE} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '荷車', color: '#dd6b20', fn: posCart }, { label: 'P', color: '#3182ce', fn: posP }]}
          markLines={[{ t: 200, label: '200' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 荷車がＢ地点に着くのは，6000÷30＝<b>200(分後)</b>。</p>
        <p>
          (2) Ｐ君が出発するのは，荷車が900÷30＝30(分後)。ここからＰ君自身の経過時間で考えます。
          1回目に追いつくのは，900÷(90－30)＝15(分後)。そこからＡ地点まで戻るのに15分かかるので，30分後にＡ地点に戻ります。
          このとき荷車は，30×(30＋30)＝1800(ｍ)の地点にいます。2回目に追いつくのは，1800÷60＝30分かかるので60分後，
          Ａ地点まで戻る(2700ｍ)のに30分かかるので90分後。このとき荷車は，30×(30＋90)＝3600(ｍ)の地点にいます。
          3回目に追いつくのは，3600÷60＝60分かかるので150分後です。ここでＡ地点まで戻るには60分かかり210分後になりますが，
          荷車がＢ地点に着くのはＰ君の出発から200－30＝170分後なので，210分後には荷車はすでにＢ地点に着いています。
          よって，Ｐ君が最後にボールを受け取ったのは，出発してから<b>150分後</b>です。
        </p>
      </div>
    </div>
  )
}
