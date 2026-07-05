import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'
import { computePartitionedDepth } from '../utils/tank'

const RATE = 6000 // cm3/分
const WIDTHS = [30, 30] // Aの幅30cm, Bの幅30cm
const DIVIDERS = [12] // 仕切りの高さ12cm
const TOTAL_H = 22
const DEPTH_DIM = 50

const { depthAt, levelsAt, totalTime } = computePartitionedDepth({ widths: WIDTHS, dividerHeights: DIVIDERS, totalHeight: TOTAL_H, rate: RATE, depthDim: DEPTH_DIM })
const T_MAX = totalTime

export default function Practice1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)
  const levels = levelsAt(t)

  return (
    <div className="problem">
      <h2>練習問題1　仕切りのある容器（応用）</h2>
      <div className="statement">
        <p className="setup">
          たて50cmの直方体の形の容器があります。容器の底は，側面と平行な仕切り板でＡ，Ｂの2つの部分に分けられています（Ａ，Ｂの幅はどちらも30cm）。この容器が空の状態から，Ａの部分に毎分6000cm3の割合で水を入れます。仕切り板の高さは12cmです。
        </p>
        <ol className="question-list">
          <li>Ａの部分の水面の高さが仕切り板の高さ(12cm)になるのは，水を入れ始めてから何分後ですか。</li>
          <li>Ｂの部分の水面もＡの部分の水面に追いつくのは，水を入れ始めてから何分後ですか。</li>
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
          { label: '3分後（仕切りの高さに到達）', t: 3 },
          { label: '6分後（Bも追いつく）', t: 6 },
        ]} />

      <div className="graph-block">
        <h3>Ａの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 3, label: '3' }, { t: 6, label: '6' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａの部分の容積は，30×50×12(cm3)なので，かかる時間は，30×50×12÷6000＝<b>3(分後)</b></p>
        <p>(2) Ｂの部分も同じ幅・容積なので，仕切りの高さまで追いつくのにさらに3分かかります。3＋3＝<b>6(分後)</b></p>
      </div>
    </div>
  )
}
