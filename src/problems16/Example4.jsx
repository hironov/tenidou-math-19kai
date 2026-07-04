import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1600
const SPEED_OTOTO = 80
const START_ANI = 9
const SPEED_ANI = 200
const T_MAX = 20

function posOtoto(t) { return Math.min(DIST, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : Math.min(DIST, SPEED_ANI * (t - START_ANI)) }

export default function Example4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題4　旅人算とグラフ（追いつき）</h2>
      <div className="statement">
        <p className="setup">
          右のグラフは，兄と弟がＡ地点からＢ地点までそれぞれ一定の速さで進んだときのようすを表したもので，兄の速さは弟の速さの2.5倍です。
          （弟は出発してから20分でＢ地点（1600ｍ）に着き，兄は9分おくれて出発しました。）
        </p>
        <ol className="question-list"><li>グラフのxにあてはまる数を求めなさい。</li></ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '9分後（兄が出発）', t: 9 }, { label: '15分後（追いつく＝x地点）', t: 15 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム（位置と時間の関係）</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 9, label: '9' }, { t: 15, label: '' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>弟は20分で1600ｍ進んでいるので，1600÷20＝80(ｍ/分)。兄は弟の速さの2.5倍なので，80×2.5＝200(ｍ/分)。</p>
        <p>弟は9分間で720ｍ進んでいるので，9分後の2人の間の道のりは720ｍ。この道のりを同じ方向に追いかけるので，720÷(200－80)＝6(分後)に追いつきます。兄に注目して，x＝200×6＝<b>1200(ｍ)</b>。</p>
      </div>
    </div>
  )
}
