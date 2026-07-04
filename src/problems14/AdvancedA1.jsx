import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { PositionDiagram } from '../components/PositionDiagram'

const AREA_A = 16 * 5 // 80cm2
const AREA_B = 12 * 4 // 48cm2
const RATE_A_TO_B = 2 // cm3/秒
const RATE_B_OUT = 3 // cm3/秒
const T_EQUAL = 120 // Aの栓を開いてから深さが等しくなるまで
const T_A_EMPTY = 600 // 絶対時間：Aが空になる（120＋480）
const T_MAX = 632 // 絶対時間：Bが空になる（120＋512）

function depthA(t) {
  return Math.max(0, 15 - (RATE_A_TO_B / AREA_A) * t)
}
function depthB(t) {
  if (t <= T_EQUAL) return 7 + (RATE_A_TO_B / AREA_B) * t
  const volAtEqual = 12 * AREA_B // 576cm3
  if (t <= T_A_EMPTY) {
    const vol = volAtEqual - (RATE_B_OUT - RATE_A_TO_B) * (t - T_EQUAL)
    return vol / AREA_B
  }
  const volAtAEmpty = volAtEqual - (RATE_B_OUT - RATE_A_TO_B) * (T_A_EMPTY - T_EQUAL) // 96cm3
  const vol = Math.max(0, volAtAEmpty - RATE_B_OUT * (t - T_A_EMPTY))
  return vol / AREA_B
}

export default function AdvancedA1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 20 })

  return (
    <div className="problem">
      <h2>応用問題A-1　栓でつながった2つの水そう</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の2つの水そうＡ，Ｂがあります。2つとも底面に栓があり，Ａの栓が開くと毎秒2cm3の割合でＡからＢに水が移り，Ｂの栓が開くと毎秒3cm3の割合でＢから水が出ていきます。はじめ，Ａには深さ15cm，Ｂには深さ7cmまで水が入っていて，栓は2つとも閉まっています。
        </p>
        <ol className="question-list">
          <li>まず，Ａの栓だけが開きます。ＡとＢの水の深さが等しくなるのは何秒後ですか。また，そのときの水の深さは何cmですか。</li>
          <li>(1)で，ＡとＢの水の深さが等しくなったと同時に，Ｂの栓も開きます。その何秒後にＢが空になりますか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={[{ height: 16, relWidth: 1 }]} depth={depthA(t)} width={140} height={200} />
        <TankProfileView segments={[{ height: 12, relWidth: 1 }]} depth={depthB(t)} width={140} height={200} />
        <div className="readout">
          <p>Ａの栓を開いてからの経過：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>Ａの深さ：<b>{depthA(t).toFixed(2)}</b> cm　／　Ｂの深さ：<b>{depthB(t).toFixed(2)}</b> cm</p>
          {t > T_EQUAL && <p>（Ｂの栓を開いてから：<b>{(t - T_EQUAL).toFixed(1)}</b> 秒後）</p>}
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        rateOptions={[1, 20, 60]}
        jumps={[
          { label: '120秒後（深さが等しくなる・Bの栓も開く）', t: 120 },
          { label: '600秒後（Aが空になる）', t: 600 },
          { label: '632秒後（Bが空になる）', t: 632 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={15} t={t}
          yLabel="深さ(cm)" xLabel="時間(秒)" yBottomLabel="0" yTopLabel="15"
          series={[{ label: 'A', color: '#3182ce', fn: depthA }, { label: 'B', color: '#dd6b20', fn: depthB }]}
          markLines={[{ t: 120, label: '120' }, { t: 600, label: '600' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 水そうＡの水の深さは，2÷(16×5)＝1/40(cm/秒)の速さで下がります。水そうＢの水の深さは，2÷(12×4)＝1/24(cm/秒)の速さで上がります。
          はじめのＡとＢの水の深さの差は，15－7＝8(cm)なので，ＡとＢの水の深さが等しくなるのは，8÷(1/40＋1/24)＝<b>120(秒後)</b>。
          また，そのときの水の深さは，15－1/40×120＝<b>12(cm)</b>です。
        </p>
        <p>
          (2) 120秒後のＢの水量は，12×4×12＝576(cm3)です。Ａの栓から毎秒2cm3で流入し，Ｂの栓から毎秒3cm3で排水されるので，
          1秒あたりに，3－2＝1(cm3)ずつ水が減っていきます。ただし，水そうＡは，12÷(1/40)＝480(秒後)に空になるので，このときに水そうＢに残っている水の量は，
          576－1×480＝96(cm3)。このあとはＢの栓から毎秒3cm3で排水されていくだけなので，空になるのは，Ｂの栓を開いてから，480＋96÷3＝<b>512(秒後)</b>です。
        </p>
      </div>
    </div>
  )
}
