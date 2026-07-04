import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const TURN_T = 6
const HOME_T = 9
const RESUME_T = 10
const STATION = 1200
const SPEED_WALK = 60
const SPEED_RUN = 120
const T_MAX = 20

function posAni(t) {
  if (t <= TURN_T) return SPEED_WALK * t
  if (t <= HOME_T) return Math.max(0, 360 - SPEED_RUN * (t - TURN_T))
  if (t <= RESUME_T) return 0
  return Math.min(STATION, SPEED_RUN * (t - RESUME_T))
}
function posOtouto(t) {
  return Math.min(STATION, SPEED_WALK * t)
}

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題2　忘れ物を取りにもどる兄</h2>
      <div className="statement">
        <p className="setup">
          兄と弟はいっしょに家を出て，同じ速さで駅に向かって歩いていましたが，兄が途中で忘れ物に気づいたので，兄は走って家にもどり，弟はそのまま駅に向かいました。兄は家で忘れ物をさがすのに1分かかり，忘れ物を見つけるとすぐに，家にもどってきたときと同じ速さで走って駅に向かいました。すると，兄と弟は同時に駅に着きました。
        </p>
        <ol className="question-list">
          <li>グラフのアにあてはまる数を求めなさい。</li>
          <li>兄が忘れ物を取りにもどったときの速さは分速何mですか。</li>
          <li>グラフのイにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={STATION} markers={[{ pos: 0, label: '家' }, { pos: 360, label: '360m' }, { pos: STATION, label: '駅' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtouto(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '6分後（兄が引き返す・360m）', t: 6 },
          { label: '9分後（兄が家に到着）', t: 9 },
          { label: 'イ＝10分後（さがし終わり再出発）', t: 10 },
          { label: '20分後（2人とも駅に到着）', t: 20 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={STATION} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="駅"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtouto }]}
          markLines={[{ t: 6, label: '6' }, { t: 9, label: '9' }, { t: 10, label: 'イ' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 360÷6＝60(m/分)。60×20＝<b>1200</b> …ア</p>
        <p>(2) 兄が走った道のりは，360＋1200＝1560(m)。また，兄が走った時間は，20－(6＋1)＝13(分)。したがって，兄が走った速さは，1560÷13＝<b>120(m/分)</b></p>
        <p>(3) 兄が家から駅まで走ったときにかかる時間は，1200÷120＝10(分)。したがって，イの値は，20－10＝<b>10</b></p>
      </div>
    </div>
  )
}
