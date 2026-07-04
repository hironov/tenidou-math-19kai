import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const SWITCH_T = 6
const T_MAX = 20

function pos(t) {
  if (t <= SWITCH_T) return 180 * t
  return 1080 + 65 * (t - SWITCH_T)
}

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const dist = pos(t)

  return (
    <div className="problem">
      <h2>基本問題4　走って→歩く（グラフの読み取り）</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点からＢ地点まで行くのに，はじめは分速180mで走り，途中からは分速65mで歩きました。グラフは，そのときの進んだようすを表したものです。
        </p>
        <ol className="question-list">
          <li>グラフのアにあてはまる数を求めなさい。</li>
          <li>グラフのイにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={pos(T_MAX)} markers={[{ pos: 0, label: 'A' }, { pos: 1080, label: '1080m' }, { pos: pos(T_MAX), label: 'B' }]}
        points={[{ label: '●', color: '#3182ce', pos: dist }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　道のり：<b>{dist.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: 'ア＝6分後（1080mに到達）', t: 6 }, { label: 'イ＝20分後（Bに到着・1990m）', t: 20 }]} />

      <div className="graph-block">
        <h3>道のりのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={pos(T_MAX)} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '●', color: '#3182ce', fn: pos }]} markLines={[{ t: 6, label: 'ア' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1080÷180＝<b>6</b> …ア</p>
        <p>(2) 分速65mで歩いた時間は，20－6＝14(分)。したがって，イの値は，1080＋65×14＝<b>1990</b></p>
      </div>
    </div>
  )
}
