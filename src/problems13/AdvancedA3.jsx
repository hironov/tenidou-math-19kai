import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 5000
const SPEED = 200
const T_MAX = 32

// 1つの整合的な内訳（休けい2回・計7分、走行25分で全体と一致）：
// 走行0-10(2000m) 休0(10-13.5) 走13.5-22(2000-3700) 休1(22-25.5) 走25.5-32(3700-5000)
function pos(t) {
  if (t <= 10) return SPEED * t
  if (t <= 13.5) return 2000
  if (t <= 22) return 2000 + SPEED * (t - 13.5)
  if (t <= 25.5) return 3700
  return Math.min(DIST, 3700 + SPEED * (t - 25.5))
}

export default function AdvancedA3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-3　自転車で2回休けい</h2>
      <div className="statement">
        <p className="setup">
          Ａさんは自転車で家を出発して5kmはなれた公園に行きましたが，途中で2回休けいしました。グラフは，Ａさんの進んだようすを表しています。Ａさんの自転車の速さはいつも同じで，休けい時間は2回とも同じでした。
        </p>
        <ol className="question-list">
          <li>Ａさんの自転車の速さは分速何mですか。また，1回あたりの休けい時間は何分何秒でしたか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '家' }, { pos: 3700, label: '3.7km' }, { pos: DIST, label: '公園' }]}
        points={[{ label: 'Ａさん', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '22分後（3.7km）', t: 22 }, { label: '32分後（公園に到着）', t: 32 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="公園"
          series={[{ label: 'Ａさん', color: '#3182ce', fn: pos }]} markLines={[{ t: 22, label: '22' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          0～22分と22～32分では休けい時間は同じなので，かかった時間の差は進んだ道のりが違うからです。このことから，自転車の速さは，
          22－(32－22)＝12(分)。3.7－(5－3.7)＝2.4(km) ⇒ 2400m。2400÷12＝<b>200(m/分)</b>
        </p>
        <p>
          また，自転車で移動していた時間の合計は，5000÷200＝25(分間)。したがって，1回あたりの休けい時間は，(32－25)÷2＝3.5(分) ⇒ <b>3分30秒</b>
        </p>
      </div>
    </div>
  )
}
