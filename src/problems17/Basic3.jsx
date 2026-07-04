import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const ROUTE = 1575
const SPEED_OTOTO = 45
const START_ANI = 10
const SPEED_ANI = 63
const T_MAX = 35

function posOtoto(t) { return Math.min(ROUTE, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : Math.min(ROUTE, SPEED_ANI * (t - START_ANI)) }
function dist(t) { return Math.abs(posOtoto(t) - posAni(t)) }

export default function Basic3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>基本問題3　二者間グラフ（同時に到着）</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が家から駅までそれぞれ一定の速さで歩きました。兄は弟よりもおくれて家を出ましたが，駅には2人同時に着きました。
          右のグラフは，弟が家を出てから2人が駅に着くまでの時間と，2人の間のきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>弟の速さは分速何ｍですか。</li>
          <li>家から駅までの道のりは何ｍですか。</li>
          <li>兄の速さは分速何ｍですか。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: '家' }, { pos: ROUTE, label: '駅' }]}
        points={[{ label: '弟', color: '#dd6b20', pos: posOtoto(t) }, { label: '兄', color: '#3182ce', pos: posAni(t) }]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{d.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '10分後（兄が出発）', t: 10 }, { label: '35分後（2人とも到着）', t: 35 }]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={500} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 10, label: '10' }, { t: 35, label: '35' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜10分…弟だけが進んで，10分で450m。弟の速さは，450÷10＝<b>45(ｍ/分)</b>。</p>
        <p>(2) 弟は駅に着くまでに35分間かかっているので，45×35＝<b>1575(ｍ)</b>。</p>
        <p>(3) 10〜35分…兄が弟を追いかけて，25分で450m。速さの差は450÷25＝18。兄の速さは45＋18＝<b>63(ｍ/分)</b>。</p>
      </div>
    </div>
  )
}
