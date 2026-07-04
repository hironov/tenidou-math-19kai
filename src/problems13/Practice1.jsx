import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 6.6 // km
const T_GO = 1 + 50 / 60 // 1時間50分
const T_BACK = 1 + 6 / 60 // 1時間6分
const SPEED_BACK = 6
const T_MAX = T_GO + T_BACK

function pos(t) {
  if (t <= T_GO) return 3.6 * t
  return Math.max(0, DIST - SPEED_BACK * (t - T_GO))
}

export default function Practice1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題1　往復の平均の速さ</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点の間を1往復しました。行きは時速3.6kmで進み，1時間50分かかりました。帰りは行きとはことなる速さで進み，1時間6分かかりました。
        </p>
        <ol className="question-list">
          <li>Ａ地点とＢ地点は何kmはなれていますか。</li>
          <li>帰りの速さは時速何kmですか。</li>
          <li>往復の平均の速さは時速何kmですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '●', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 時間後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} step={0.02}
        jumps={[{ label: '1時間50分後（Bに到着）', t: T_GO }, { label: '2時間56分後（Aに帰着）', t: T_MAX }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(km)" xLabel="時間(時間)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '●', color: '#3182ce', fn: pos }]} markLines={[{ t: T_GO, label: '1h50' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 3.6×1と5/6＝<b>6.6(km)</b></p>
        <p>(2) 6.6÷1と1/10＝<b>6(km/時)</b></p>
        <p>(3) 往復にかかった時間は，1時間50分＋1時間6分＝2時間56分。往復の平均の速さは，6.6×2÷2と14/15＝<b>4.5(km/時)</b></p>
      </div>
    </div>
  )
}
