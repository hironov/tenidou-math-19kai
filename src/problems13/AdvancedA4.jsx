import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const C_POS = 4200 // m, Aからのきょり
const B_POS = 1200
const LIB = 480
const T_ANI_OFF = 5 // 兄がBでバスを降りる
const T_OTOTO_OFF = 7 // 弟がAでバスを降りる
const T_ANI_ARRIVE = 14
const T_OTOTO_ARRIVE = 13
const T_MAX = 14

function busPos(t) {
  return C_POS - 600 * t
}
function posAni(t) {
  if (t <= T_ANI_OFF) return busPos(t)
  return Math.max(LIB, B_POS - 80 * (t - T_ANI_OFF))
}
function posOtouto(t) {
  if (t <= T_OTOTO_OFF) return busPos(t)
  return Math.min(LIB, 80 * (t - T_OTOTO_OFF))
}

export default function AdvancedA4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-4　バスと徒歩で図書館へ</h2>
      <div className="statement">
        <p className="setup">
          まっすぐな道にそって，Ａ，Ｂ，Ｃの3つのバス停留所があり，ＡとＢの間に図書館があります。兄と弟は図書館に行くために，Ｃからいっしょにバスに乗りました。兄はＢでバスを降りて，Ｂから図書館まで歩き，弟はＡでバスを降りて，Ａから図書館まで歩きました。バスの速さは時速36km，歩く速さは2人とも時速4.8kmです。
        </p>
        <ol className="question-list">
          <li>兄がバスを降りてから弟がバスを降りるまでの時間は何分でしたか。</li>
          <li>兄が歩いた時間は何分ですか。</li>
          <li>グラフのア，イにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={C_POS} markers={[{ pos: 0, label: 'A' }, { pos: LIB, label: '図書館' }, { pos: B_POS, label: 'B' }, { pos: C_POS, label: 'C' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t), row: 1 }, { label: '弟', color: '#dd6b20', pos: posOtouto(t) }]} />
      <div className="readout"><p>Ｃ出発からの経過：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '5分後（兄がBで下車）', t: 5 },
          { label: '7分後（弟がAで下車）', t: 7 },
          { label: '13分後（弟が図書館に到着・ア＝0.48km）', t: 13 },
          { label: '14分後（兄が図書館に到着）', t: 14 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム（Ａからのきょり）　※イ＝Ｃの位置＝4.2km</h3>
        <PositionDiagram tMax={T_MAX} yMax={C_POS} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="C"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtouto }]}
          markLines={[{ t: 5, label: '5' }, { t: 7, label: '7' }, { t: 13, label: '13' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 兄がバスを降りてから弟がバスを降りるまでの時間は，バスが停留所ＢからＡまで進む時間になります。したがって，1.2÷36＝1/30(時間) ⇒ <b>2分</b></p>
        <p>
          (2) 2人の歩いた距離の和は1.2kmなので，かかる時間は，1.2÷4.8＝1/4(時間) ⇒ 15分間。兄は弟より2分早くバスを降りて歩き始め，図書館には弟より1分遅く着きましたから，
          弟よりも，2＋1＝3(分)多く歩いています。したがって，兄が歩いた時間は和差算を使って，(15＋3)÷2＝<b>9(分)</b>
        </p>
        <p>
          (3) グラフのアは，弟が，15－9＝6(分間)歩いた距離なので，4.8×6/60＝0.48(km)。バスが停留所Ａに着くまでにかかった時間は，13－6＝7(分)。
          グラフのイは，バスが7分間走った距離なので，36×7/60＝<b>4.2(km)</b>
        </p>
      </div>
    </div>
  )
}
