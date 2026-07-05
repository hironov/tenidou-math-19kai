import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 2400
const T_MAX = 30

function posA(t) { return Math.min(DIST, 160 * t) }
function posB(t) { return Math.max(0, DIST - 80 * t) }

export default function Basic2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題2　ダイヤグラムの読み取り</h2>
      <div className="statement">
        <p className="setup">グラフは，2人がＡ地点とＢ地点の間を，それぞれ一定の速さで進んだときのようすを表したものです。グラフのx，yにあてはまる数をそれぞれ求めなさい。</p>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '●', color: '#3182ce', pos: posA(t) }, { label: '○', color: '#dd6b20', pos: posB(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: 'x＝10分後（すれちがい・y＝1600m）', t: 10 }, { label: '15分後', t: 15 }, { label: '30分後', t: 30 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: 'Ａ→Ｂ', color: '#3182ce', fn: posA }, { label: 'Ｂ→Ａ', color: '#dd6b20', fn: posB }]}
          markLines={[{ t: 15, label: '15' }, { t: 30, label: '30' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>ＡからＢに進む人の速さは，太線で示した三角形に注目して，2400÷15＝160(m/分)</p>
        <p>ＢからＡに進む人の速さは，斜線で示した三角形に注目して，2400÷30＝80(m/分)</p>
        <p>この2人が向かい合って進みますので，2400÷(160＋80)＝<b>10(分)</b>…x</p>
        <p>また，yはＡからＢに進む人がx分で進んだ道のりなので，160×10＝<b>1600(m)</b>…y</p>
      </div>
    </div>
  )
}
