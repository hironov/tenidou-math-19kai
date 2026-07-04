import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1680
const SPEED_ANE = 80
const SPEED_IMOTO = 60
const T_MAX = 28

function posAne(t) { return Math.min(DIST, SPEED_ANE * t) }
function posImoto(t) { return Math.max(0, DIST - SPEED_IMOTO * t) }

export default function Basic2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題2　姉妹のダイヤグラム</h2>
      <div className="statement">
        <p className="setup">
          右のグラフは，姉が家から公園まで，妹が公園から家までそれぞれ一定の速さで進んだときのようすを表したものです。
          （姉は21分で1680ｍ，妹は28分で1680ｍ進みます。）
        </p>
        <ol className="question-list">
          <li>姉，妹の速さはそれぞれ分速何ｍですか。</li>
          <li>グラフのx，yにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '公園' }]}
        points={[{ label: '姉', color: '#3182ce', pos: posAne(t) }, { label: '妹', color: '#dd6b20', pos: posImoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: 'x＝12分後（すれちがい）', t: 12 }, { label: '21分後（姉が到着）', t: 21 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="公園"
          series={[{ label: '姉', color: '#3182ce', fn: posAne }, { label: '妹', color: '#dd6b20', fn: posImoto }]}
          markLines={[{ t: 12, label: 'x' }, { t: 21, label: '21' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 姉は21分で1680ｍ進んでいるので，1680÷21＝<b>80(ｍ/分)</b>。妹は28分で1680ｍ進んでいるので，1680÷28＝<b>60(ｍ/分)</b>。</p>
        <p>(2) x…1680÷(80＋60)＝<b>12(分)</b>。y…姉に注目して，80×12＝<b>960(ｍ)</b>。</p>
      </div>
    </div>
  )
}
