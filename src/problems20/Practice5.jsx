import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const DIST = 3780
const T_MAX = 40

function posA(t) { return Math.min(DIST, 84 * t) }
function posB(t) {
  if (t <= 20) return 0
  if (t <= 30) return 252 * (t - 20)
  return Math.max(0, 2520 - 252 * (t - 30))
}
function gap(t) { return Math.abs(posA(t) - posB(t)) }

export default function Practice5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題5　忘れ物を届けるＢ君</h2>
      <div className="statement">
        <p className="setup">
          Ａ君はＢ君の家で遊んだ後，Ｂ君の家から3780mはなれた自分の家まで歩いて帰りました。Ａ君が出発してからしばらくして，Ｂ君は，Ａ君が忘れ物をしたことに気付き，忘れ物を持って自転車でＡ君を追いかけました。そして，道の途中でＡ君に追いつき忘れ物をわたすと，2人はそれまでと同じ速さで，それぞれ自分の家に向かいました。
        </p>
        <ol className="question-list">
          <li>Ａ君，Ｂ君の速さはそれぞれ分速何mですか。</li>
          <li>グラフのx，yにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'Ｂ君の家' }, { pos: DIST, label: 'Ａ君の家' }]}
        points={[{ label: 'Ａ', color: '#3182ce', pos: posA(t) }, { label: 'Ｂ', color: '#dd6b20', pos: posB(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{gap(t).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '20分後（Bが出発・1680m）', t: 20 }, { label: '30分後（追いつく・受け渡し）', t: 30 }, { label: 'x＝40分後（Bが帰宅・y＝3360m）', t: 40 }]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={DIST} valueFn={gap} t={t} yLabel="m" xLabel="(分)" markLines={[{ t: 20, label: '20' }, { t: 30, label: '30' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>Ａ君の速さは，1680÷20＝<b>84(m/分)</b></p>
        <p>Ｂ君は出発してから10分でＡ君に追いつきますので，1680÷(Ｂ－84)＝10(分) より，Ｂ＝<b>252(m/分)</b></p>
        <p>Ｂ君は10分で進んだ道を，同じ速さでもどりますので，x＝30＋10＝<b>40(分)</b>。y＝84×40＝<b>3360(m)</b></p>
      </div>
    </div>
  )
}
