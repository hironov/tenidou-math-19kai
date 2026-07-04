import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1800
const START_ANI = 6
const SPEED_ANI = 100
const SPEED_OTOTO = 60
const T_MAX = 30

function posAni(t) { return t < START_ANI ? 0 : Math.min(DIST, SPEED_ANI * (t - START_ANI)) }
function posOtoto(t) { return Math.max(0, DIST - SPEED_OTOTO * t) }

export default function Example3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題3　旅人算とグラフ（ダイヤグラム）</h2>
      <div className="statement">
        <p className="setup">
          右のグラフは，兄がＡ地点からＢ地点まで，弟がＢ地点からＡ地点までそれぞれ一定の速さで進んだときのようすを表したものです。
          （兄はＡ地点を6分おくれて出発し，Ｂ地点までの1800ｍを18分で，弟はＢ地点からＡ地点までの1800ｍを30分で進みます。）
        </p>
        <ol className="question-list">
          <li>兄，弟の速さはそれぞれ分速何ｍですか。</li>
          <li>グラフのxにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '6分後（兄が出発）', t: 6 }, { label: 'x＝15分後（すれちがい）', t: 15 }, { label: '24分後（兄が到着）', t: 24 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム（位置と時間の関係）</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 6, label: '6' }, { t: 15, label: 'x' }, { t: 24, label: '24' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 兄は，24－6＝18(分)で1800ｍを進んでいるので，1800÷18＝<b>100(ｍ/分)</b>。弟は30分で1800ｍを進んでいるので，1800÷30＝<b>60(ｍ/分)</b>。</p>
        <p>(2) 弟は6分間で360ｍ進んでいるので，6分後の2人の間の道のりは1440ｍ。1440÷(100＋60)＝9(分後)にすれちがうので，x＝6＋9＝<b>15(分)</b>。</p>
      </div>
    </div>
  )
}
