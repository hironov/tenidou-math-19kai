import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 3200
const SPEED_WALK = 50
const REST_START = 28
const REST_END = 38
const SPEED_RUN = 150
const T_MAX = 50

function pos(t) {
  if (t <= REST_START) return SPEED_WALK * t
  if (t <= REST_END) return 1400
  return Math.min(DIST, 1400 + SPEED_RUN * (t - REST_END))
}

export default function Example3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題3　進行グラフ（ダイヤグラム）</h2>
      <div className="statement">
        <p className="setup">
          花子さんの家から駅までは3.2kmあります。花子さんは家から駅に向かって分速50mで歩き始めましたが，途中で友人に出会ったので，立ち止まって10分間お話をしました。お話を終えると，そこから駅までは走って行きました。
        </p>
        <ol className="question-list">
          <li>グラフのアにあてはまる数を求めなさい。</li>
          <li>花子さんの走る速さは分速何mですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '家' }, { pos: 1400, label: '1.4km' }, { pos: DIST, label: '駅' }]}
        points={[{ label: '花子', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: 'ア＝28分後（1.4kmに到達）', t: 28 }, { label: '38分後（話し終わる）', t: 38 }, { label: '50分後（駅に到着）', t: 50 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="駅"
          series={[{ label: '花子', color: '#3182ce', fn: pos }]} markLines={[{ t: 28, label: 'ア' }, { t: 38, label: '38' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1.4km＝1400mより，アの値は，1400÷50＝<b>28(分)</b></p>
        <p>(2) 花子さんが走り始めた時間は，家を出発してから，28＋10＝38(分後)。走った道のりは，3.2－1.4＝1.8(km) ⇒ 1800m。したがって，花子さんの走る速さは，1800÷(50－38)＝<b>150(m/分)</b></p>
      </div>
    </div>
  )
}
