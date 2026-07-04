import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const ROUTE = 1530
const SPEED_ANI = 80
const SWITCH_T = 12
const SPEED_OTOTO_WALK = 75
const SPEED_OTOTO_RUN = 90
const T_MAX = 20

function posAni(t) { return Math.min(ROUTE, SPEED_ANI * t) }
function posOtoto(t) {
  if (t <= SWITCH_T) return SPEED_OTOTO_WALK * t
  return Math.min(ROUTE, SPEED_OTOTO_WALK * SWITCH_T + SPEED_OTOTO_RUN * (t - SWITCH_T))
}

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題2　途中で走り出す弟</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が，家を同時に出て駅に向かいました。兄はつねに分速80ｍで歩きました。弟ははじめ，一定の速さで歩いていましたが，
          12分歩いたところで兄と60ｍの差がついてしまったので，そこからは，それまでの1.2倍の速さで走って駅に向かったところ，
          駅まであと90ｍのところで兄に追いつきました。
        </p>
        <ol className="question-list">
          <li>弟ははじめ，分速何ｍで歩きましたか。</li>
          <li>家から駅までの道のりは何ｍですか。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: '家' }, { pos: ROUTE, label: '駅' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '12分後（弟が走り出す）', t: 12 }, { label: '18分後（追いつく）', t: 18 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={ROUTE} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="駅"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 12, label: '12' }, { t: 18, label: '18' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 60÷(80－□)＝12(分) より，□＝<b>75(ｍ/分)</b>。</p>
        <p>(2) 75×1.2＝90(ｍ/分)…弟の走る速さ。60÷(90－80)＝6(分)，12＋6＝18(分)で兄に追いつきます。これが駅まであと90ｍの地点なので，兄に注目して，80×18＋90＝<b>1530(ｍ)</b>。</p>
      </div>
    </div>
  )
}
