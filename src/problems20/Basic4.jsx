import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 2700
const T_MAX = 22

function posA(t) { return Math.min(DIST, 90 * t) }
function posB(t) { return Math.max(0, DIST - 60 * t) }
function posC(t) { return Math.max(0, DIST - 45 * t) }

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題4　2人とすれちがう</h2>
      <div className="statement">
        <p className="setup">
          Ａ君はＰ地点からＱ地点に向かって，Ｂ君とＣ君はＱ地点からＰ地点に向かって，同時に出発してそれぞれ一定の速さで進みました。Ａ君の速さは分速90m，Ｂ君の速さは分速60mで，出発してから18分後にＡ君とＢ君がすれちがいました。
        </p>
        <ol className="question-list">
          <li>Ｐ地点とＱ地点は何mはなれていますか。</li>
          <li>Ａ君は，Ｂ君とすれちがってから2分後にＣ君とすれちがいました。Ｃ君の速さは分速何mですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'P' }, { pos: DIST, label: 'Q' }]}
        points={[{ label: 'A', color: '#3182ce', pos: posA(t) }, { label: 'B', color: '#dd6b20', pos: posB(t), row: 1 }, { label: 'C', color: '#38a169', pos: posC(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '18分後（AとBがすれちがい）', t: 18 }, { label: '20分後（AとCがすれちがい）', t: 20 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="P" yTopLabel="Q"
          series={[{ label: 'A', color: '#3182ce', fn: posA }, { label: 'B', color: '#dd6b20', fn: posB }, { label: 'C', color: '#38a169', fn: posC }]}
          markLines={[{ t: 18, label: '18' }, { t: 20, label: '20' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａ君とＢ君に注目して，□÷(90＋60)＝18(分) より，□＝<b>2700(m)</b></p>
        <p>(2) Ａ君とＣ君がすれちがうのは，出発してから，18＋2＝20(分後)なので，2700÷(90＋Ｃ)＝20(分) より，Ｃ＝<b>45(m/分)</b></p>
      </div>
    </div>
  )
}
