import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const AB = 1000
const BC = 600
const CD = 1200
const T_AB = 25
const T_BC = 10
const T_CD = 15
const T_MAX = T_AB + T_BC + T_CD

function pos(t) {
  if (t <= T_AB) return 40 * t
  if (t <= T_AB + T_BC) return AB + 60 * (t - T_AB)
  return Math.min(AB + BC + CD, AB + BC + 80 * (t - T_AB - T_BC))
}

export default function Basic2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題2　3区間で速さが変わる道のり</h2>
      <div className="statement">
        <p className="setup">
          道にそってＡ，Ｂ，Ｃ，Ｄの4つの地点があります。Ａ地点からＤ地点まで行くのに，Ａ地点からＢ地点までは分速40m，Ｂ地点からＣ地点までは分速60m，Ｃ地点からＤ地点までは分速80mで進みました。
        </p>
        <ol className="question-list">
          <li>Ａ地点からＤ地点まで行くのに，全部で何分かかりましたか。</li>
          <li>Ａ地点からＤ地点まで進んだときの平均の速さは分速何mですか。</li>
        </ol>
      </div>

      <LinearTrackView length={AB + BC + CD}
        markers={[{ pos: 0, label: 'A' }, { pos: AB, label: 'B' }, { pos: AB + BC, label: 'C' }, { pos: AB + BC + CD, label: 'D' }]}
        points={[{ label: '●', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '25分後（Bに到達）', t: 25 }, { label: '35分後（Cに到達）', t: 35 }, { label: '50分後（Dに到達）', t: 50 }]} />

      <div className="graph-block">
        <h3>道のりのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={AB + BC + CD} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="D"
          series={[{ label: '●', color: '#3182ce', fn: pos }]} markLines={[{ t: 25, label: '25' }, { t: 35, label: '35' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＡＢ間 1000÷40＝25(分)。ＢＣ間 600÷60＝10(分)。ＣＤ間 1200÷80＝15(分)。したがって，全部でかかった時間は，25＋10＋15＝<b>50(分)</b></p>
        <p>(2) (1000＋600＋1200)÷50＝<b>56(m/分)</b></p>
      </div>
    </div>
  )
}
