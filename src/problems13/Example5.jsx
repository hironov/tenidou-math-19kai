import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 5500
const REST_START = 35
const REST_END = 42
const T_MAX = 60

function pos(t) {
  if (t <= REST_START) return 80 * t
  if (t <= REST_END) return 2800
  return Math.min(DIST, 2800 + 150 * (t - REST_END))
}

export default function Example5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題5　速さのつるかめ算（休けいあり）</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点からＢ地点までは5500mあります。ゆうと君がＡ地点からＢ地点まで行くのに，はじめは歩いていましたが，途中で7分間休み，そこからは走って行きました。グラフは，ゆうと君の進んだようすを表したものです。
        </p>
        <ol className="question-list">
          <li>グラフのアにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: 'ゆうと', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '15分後（1200m）', t: 15 },
          { label: 'ア＝35分後（休けい開始・2800m）', t: 35 },
          { label: '42分後（休けい終了）', t: 42 },
          { label: '54分後（4600m）', t: 54 },
          { label: '60分後（Bに到着）', t: 60 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: 'ゆうと', color: '#3182ce', fn: pos }]} markLines={[{ t: 15, label: '15' }, { t: 54, label: '54' }, { t: 60, label: '60' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>グラフより，歩いたときの速さと走ったときの速さは，歩いたとき 1200÷15＝80(m/分)。走ったとき (5500－4600)÷(60－54)＝150(m/分)</p>
        <p>
          歩いた時間と走った時間の合計は，53(＝60－7)分で5500m進みます。すべて走った場合，進んだ道のりは，150×53＝7950(m)となります。
          実際には5500mですから，7950－5500＝2450(m)進みすぎたことになります。このことから歩いた時間は，2450÷(150－80)＝35(分)。
          したがって，グラフのアの値は，80×35＝<b>2800(m)</b>
        </p>
      </div>
    </div>
  )
}
