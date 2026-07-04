import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 2250
const SPEED_OTOTO = 50
const START_ANI = 15
const SPEED_ANI = 125
const T_MAX = 45

function posOtoto(t) { return Math.min(DIST, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : Math.min(DIST, SPEED_ANI * (t - START_ANI)) }

export default function Basic3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題3　家から学校までのダイヤグラム</h2>
      <div className="statement">
        <p className="setup">
          右のグラフは，兄と弟が家から学校までそれぞれ一定の速さで進んだときのようすを表したものです。
          （弟は45分で2250ｍ進み，兄は15分おくれて出発し，33分で到着します。）
        </p>
        <ol className="question-list">
          <li>兄，弟の速さはそれぞれ分速何ｍですか。</li>
          <li>グラフのxにあてはまる数を求めなさい。</li>
          <li>グラフのy，zにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '学校' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '15分後（兄が出発・x）', t: 15 }, { label: 'y＝25分後（追いつく）', t: 25 }, { label: '33分後（兄が到着）', t: 33 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="学校"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 15, label: '15' }, { t: 25, label: 'y' }, { t: 33, label: '33' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 兄は，33－15＝18(分)で2250ｍ進んでいるので，2250÷18＝<b>125(ｍ/分)</b>。弟は45分で2250ｍ進んでいるので，2250÷45＝<b>50(ｍ/分)</b>。</p>
        <p>(2) xは弟が15分間で進んだ道のりなので，50×15＝<b>750(ｍ)</b>。</p>
        <p>(3) 15分後に兄と弟は750ｍはなれていて，750÷(125－50)＝10(分)で追いつきます。y＝15＋10＝<b>25(分)</b>。z…兄に注目して，125×10＝<b>1250(ｍ)</b>。</p>
      </div>
    </div>
  )
}
