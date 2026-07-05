import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 900
const T_MAX = 15

function pos(t) {
  return Math.min(DIST, 60 * t)
}

export default function Basic7() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題7　グラフの読み取り</h2>
      <div className="statement">
        <p className="setup">
          兄が家から900m離れた駅まで一定の速さで歩いたところ，15分かかりました。下のグラフは，そのときの時間と道のりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>兄の歩く速さは分速何mですか。</li>
          <li>兄が家を出発してから360m進んだ地点にいるのは，家を出発してから何分後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '駅' }]}
        points={[{ label: '●', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　道のり：<b>{pos(t).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '360m地点', t: 6 }, { label: '駅に到着', t: 15 }]} />

      <div className="graph-block">
        <h3>時間と道のりのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="駅"
          series={[{ label: '●', color: '#3182ce', fn: pos }]} markLines={[{ t: 6, label: '6' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) グラフより，900mを15分で歩いています。900÷15＝<b>60(m/分)</b></p>
        <p>(2) 360÷60＝<b>6(分後)</b></p>
      </div>
    </div>
  )
}
