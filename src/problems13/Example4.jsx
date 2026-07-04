import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 800
const SWITCH_T = 9
const T_MAX = 14

function pos(t) {
  if (t <= SWITCH_T) return 50 * t
  return Math.min(DIST, 450 + 70 * (t - SWITCH_T))
}

export default function Example4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題4　速さのつるかめ算</h2>
      <div className="statement">
        <p className="setup">
          ひかる君の家から学校までは800mあります。ひかる君が家から学校まで行くのに，はじめは分速50mで歩き，途中からは分速70mで歩いたところ，家を出てから14分後に学校に着きました。
        </p>
        <ol className="question-list">
          <li>分速70mで歩いた時間は何分ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '学校' }]}
        points={[{ label: 'ひかる', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '9分後（分速70mに切りかえ）', t: 9 }, { label: '14分後（学校に到着）', t: 14 }]} />

      <div className="graph-block">
        <h3>道のりのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="学校"
          series={[{ label: 'ひかる', color: '#3182ce', fn: pos }]} markLines={[{ t: 9, label: '9' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          2種類の速さ(分速50m，分速70m)で合わせて14分間で800m進みます。すべて分速50mで歩いたとすると，進んだ道のりは，50×14＝700(m)。
          実際には800mですから，あと，800－700＝100(m)足りません。したがって，分速70mで歩いた時間は，100÷(70－50)＝<b>5(分)</b>
        </p>
      </div>
    </div>
  )
}
