import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const SPEED_HANAKO = 65
const TURN_T = 20
const OUT_DIST = 65 * TURN_T // 1300
const START_MOM = 25
const SPEED_MOM = 260
const T_MAX = 30

function posHanako(t) {
  if (t <= TURN_T) return SPEED_HANAKO * t
  return Math.max(0, OUT_DIST - SPEED_HANAKO * (t - TURN_T))
}
function posMom(t) { return t < START_MOM ? 0 : SPEED_MOM * (t - START_MOM) }

export default function Practice1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題1　忘れ物を届けるお母さん</h2>
      <div className="statement">
        <p className="setup">
          花子さんは家から歩いて学校に向かいましたが，20分歩いたところで，家に忘れ物をしたことに気づいたので，すぐに家に向かって引き返しました。
          お母さんは，花子さんが出発してから25分後に家を出て，花子さんに忘れ物をわたすために自転車で学校に向かいました。
          花子さんの速さは分速65ｍ，お母さんの自転車の速さは分速260ｍです。
        </p>
        <ol className="question-list">
          <li>お母さんが家を出たとき，花子さんは家から何ｍはなれた地点にいましたか。</li>
          <li>2人は家から何ｍはなれた地点で出会いましたか。</li>
        </ol>
      </div>

      <LinearTrackView length={OUT_DIST}
        markers={[{ pos: 0, label: '家' }]}
        points={[{ label: '花子', color: '#dd6b20', pos: posHanako(t) }, { label: '母', color: '#3182ce', pos: posMom(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '20分後（花子が引き返す）', t: 20 }, { label: '25分後（母が出発）', t: 25 }, { label: '28分後（出会う）', t: 28 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={OUT_DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="家"
          series={[{ label: '花子', color: '#dd6b20', fn: posHanako }, { label: '母', color: '#3182ce', fn: posMom }]}
          markLines={[{ t: 20, label: '20' }, { t: 25, label: '25' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 65×20＝1300(ｍ)進んだ後，65×(25－20)＝325(ｍ)戻るので，1300－325＝<b>975(ｍ)</b>。</p>
        <p>(2) お母さんが出発してから，975÷(65＋260)＝3(分)で出会います。お母さんに注目して，260×3＝<b>780(ｍ)</b>。</p>
      </div>
    </div>
  )
}
