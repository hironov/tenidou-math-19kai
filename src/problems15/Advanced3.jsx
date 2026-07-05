import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { PositionDiagram } from '../components/PositionDiagram'

const AREA_A = 100
const AREA_B = 100
const RATE_IN = 100 // cm3/秒
const HOLE_RATE = 20 // cm3/秒
const HOLE_H = 8
const DIVIDER_H = 12
const T1 = 8 // Aが穴の高さ8cmに到達
const T2 = 13 // Aがしきりの高さ12cmに到達
const T3 = 24 // BもAに追いつき満水
const T_MAX = T3

function depthA(t) {
  if (t <= T1) return (RATE_IN / AREA_A) * t
  if (t <= T2) return HOLE_H + ((RATE_IN - HOLE_RATE) / AREA_A) * (t - T1)
  return DIVIDER_H
}
function depthB(t) {
  if (t <= T1) return 0
  if (t <= T2) return (HOLE_RATE / AREA_B) * (t - T1)
  return Math.min(DIVIDER_H, ((T2 - T1) * (HOLE_RATE / AREA_B)) + (RATE_IN / AREA_B) * (t - T2))
}

export default function Advanced3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const dA = depthA(t)
  const dB = depthB(t)

  return (
    <div className="problem">
      <h2>最難関問題集3　しきり板に穴のある容器</h2>
      <div className="statement">
        <p className="setup">
          直方体の容器がＡ，Ｂ2つの部分にしきられています（Ａ，Ｂの底面積はどちらも100cm2）。しきり板には，底から8cmの高さに小さな穴があいていて，Ａの水面が穴の高さをこえると，穴から一定の割合でＢに水がもれていきます。この容器のＡの部分に一定の割合で水を入れたところ，8秒後にＡの水面が穴の高さ(8cm)に達し，13秒後にＡの水面がしきり板の高さに達しました。しきり板の高さをこえた後は，Ａの水面の高さは変わらず，あふれた分がすべてＢに流れこみます。
        </p>
        <ol className="question-list">
          <li>毎秒何cm3の割合でＡに水を入れましたか。</li>
          <li>しきり板の高さは何cmですか。</li>
          <li>穴から毎秒何cm3の割合で水がもれましたか。</li>
        </ol>
      </div>

      <div className="stage">
        <PartitionedTankView widths={[1, 1]} dividerHeights={[DIVIDER_H]} totalHeight={DIVIDER_H} levels={[dA, dB]} labels={['A', 'B']} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>Ａの水面：<b>{dA.toFixed(2)}</b> cm　Ｂの水面：<b>{dB.toFixed(2)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '8秒後（Aが穴の高さ8cm）', t: T1 },
          { label: '13秒後（Aがしきりの高さ12cm）', t: T2 },
          { label: '24秒後（Bも12cmに追いつく）', t: T3 },
        ]} />

      <div className="graph-block">
        <h3>Ａ・Ｂの水面の高さのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIVIDER_H} t={t} yLabel="cm" xLabel="(秒)" yBottomLabel="0" yTopLabel={String(DIVIDER_H)}
          series={[{ label: 'A', color: '#3182ce', fn: depthA }, { label: 'B', color: '#dd6b20', fn: depthB }]}
          markLines={[{ t: T1, label: '8' }, { t: T2, label: '13' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 穴の高さに達するまで，Ａだけに水がたまります。100×8÷8＝<b>100(cm3/秒)</b></p>
        <p>
          (3を先に考えます) 8秒後から13秒後までの5秒間で，穴がなければＡの水面は，100×5÷100＝5(cm)上昇するはずです。しかし，実際にグラフから読み取れる上昇は4cm(8cm→12cm)なので，
          その差1cm分の水(100×1＝100cm3)が5秒間でもれたことになります。よって，毎秒のもれる量は，100÷5＝<b>20(cm3/秒)</b>
        </p>
        <p>
          (2) しきり板の高さは，8秒後から13秒後までの5秒間にＡの水面が上昇した分を，8cmに足したものです。この5秒間の実際の上昇は，(100－20)×5÷100＝4(cm)なので，
          しきり板の高さは，8＋4＝<b>12(cm)</b>です。
        </p>
      </div>
    </div>
  )
}
