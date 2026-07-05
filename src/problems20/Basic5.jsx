import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const DIST = 3300
const T_MAX = 26.4

function posSis(t) { return Math.min(DIST, 150 * t) }
function posImo(t) { return Math.max(0, DIST - 125 * t) }
function gap(t) { return Math.abs(posSis(t) - posImo(t)) }

export default function Basic5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題5　2人の間のきょりのグラフ</h2>
      <div className="statement">
        <p className="setup">
          姉はＡ地点からＢ地点に向かって，妹はＢ地点からＡ地点に向かって，それぞれ一定の速さで走ります。姉は妹より速く走ります。グラフは，2人が同時に出発してから妹がＡ地点に着くまでの時間と，2人の間のきょりの関係を表したものです。x，yにあてはまる数をそれぞれ求めなさい。
        </p>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '姉', color: '#3182ce', pos: posSis(t) }, { label: '妹', color: '#dd6b20', pos: posImo(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{gap(t).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '12分後（すれちがい）', t: 12 }, { label: '22分後（姉がBに到着）', t: 22 }, { label: 'x＝26.4分後（妹がAに到着）', t: 26.4 }]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={DIST} valueFn={gap} t={t} yLabel="m" xLabel="(分)" markLines={[{ t: 12, label: '12' }, { t: 22, label: '22' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>姉の速さは，3300÷22＝150(m/分)。12分後にすれちがっていますので，3300÷(150＋妹)＝12(分) より，妹＝125(m/分)</p>
        <p>x＝3300÷125＝<b>26.4(分)</b></p>
        <p>yは，12分後から22分後の10分間で姉と妹が進んだ道のりの和なので，(150＋125)×10＝<b>2750(m)</b></p>
      </div>
    </div>
  )
}
