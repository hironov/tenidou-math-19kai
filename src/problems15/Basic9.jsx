import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'
import { computePartitionedDepth } from '../utils/tank'

const RATE = 8000 // cm3/分
const WIDTHS = [80, 35] // Aの幅80cm, Bの幅x=35cm
const DIVIDERS = [32] // 仕切りの高さ32cm
const TOTAL_H = 50
const DEPTH_DIM = 50

const { depthAt, levelsAt, totalTime } = computePartitionedDepth({ widths: WIDTHS, dividerHeights: DIVIDERS, totalHeight: TOTAL_H, rate: RATE, depthDim: DEPTH_DIM })
const T_MAX = totalTime

export default function Basic9() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)
  const levels = levelsAt(t)

  return (
    <div className="problem">
      <h2>基本問題9　仕切りのある容器</h2>
      <div className="statement">
        <p className="setup">
          たて50cm，高さ50cmの直方体の形の容器があります。容器の底は，側面と平行な仕切り板でＡ，Ｂの2つの部分に分けられています。Ａの部分の幅は80cmです。この容器が空の状態から，Ａの部分に一定の割合で水を入れたところ，16分で仕切り板の高さ(32cm)に達し，そこからさらに7分でＢの部分の水面も仕切り板の高さに追いつきました。仕切り板の厚さは考えないものとします。
        </p>
        <ol className="question-list">
          <li>毎分何cm3の割合で水を入れましたか。</li>
          <li>Ｂの部分の幅(x)は何cmですか。</li>
        </ol>
      </div>

      <div className="stage">
        <PartitionedTankView widths={WIDTHS} dividerHeights={DIVIDERS} totalHeight={TOTAL_H} levels={levels} labels={['A', 'B']} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>Ａの部分の水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '16分後（仕切りの高さ32cmに到達）', t: 16 },
          { label: '23分後（Bも追いつく）', t: 23 },
        ]} />

      <div className="graph-block">
        <h3>Ａの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 16, label: '16' }, { t: 23, label: '23' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａの部分の容積は，80×50×32(cm3)なので，毎分の注水量は，80×50×32÷16＝<b>8000(cm3/分)</b>（＝8L/分）</p>
        <p>(2) Ｂの部分の容積は，8000×7(cm3)なので，xの長さは，8000×7÷(32×50)＝<b>35(cm)</b></p>
      </div>
    </div>
  )
}
