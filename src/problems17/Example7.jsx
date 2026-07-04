import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const ROUTE = 1440
const SPEED_OTOTO = 60
const START_ANI = 5
const SPEED_ANI = 80
const T_MAX = 24

function posOtoto(t) { return Math.min(ROUTE, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : Math.min(ROUTE, SPEED_ANI * (t - START_ANI)) }
function dist(t) { return Math.abs(posOtoto(t) - posAni(t)) }

export default function Example7() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>例題7　二者間グラフ（追いこして先に到着）</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が，家から駅までそれぞれ一定の速さで歩きました。弟は先に家を出ましたが，後から歩いてきた兄に追いこされ，
          駅には兄よりも1分おくれて着きました。下のグラフは，弟が家を出てから駅に着くまでの時間と，2人の間のきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>兄の速さは分速何ｍですか。</li>
          <li>家から駅までの道のりは何ｍですか。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: '家' }, { pos: ROUTE, label: '駅' }]}
        points={[{ label: '弟', color: '#dd6b20', pos: posOtoto(t) }, { label: '兄', color: '#3182ce', pos: posAni(t) }]}
      />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{d.toFixed(0)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '0〜5分（弟だけ）', t: 2.5 },
          { label: '5〜20分（兄が追う）', t: 12 },
          { label: '20分（兄が追いつく）', t: 20 },
          { label: '23分（兄が駅に到着）', t: 23 },
          { label: '24分（弟が駅に到着）', t: 24 },
        ]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={350} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)"
          markLines={[{ t: 5, label: '5' }, { t: 20, label: '20' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜5分…弟だけが進んで，5分で300m。弟の速さは300÷5＝60(ｍ/分)。5〜20分…兄が弟を追いかけて，15分で300m縮まる。速さの差は300÷15＝20。兄の速さは60＋20＝<b>80(ｍ/分)</b>。</p>
        <p>
          (2) 20分後に追いつき，そこから兄が60m先に進んで駅に着くまで60÷(80－60)＝3分間。よって兄は23分後に到着。
          弟は駅まであと1分（60m）かかるので，24分後に到着。家から駅までの道のりは，80×(23－5)＝<b>1440(ｍ)</b>です。
        </p>
      </div>
    </div>
  )
}
