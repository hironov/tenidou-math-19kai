import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'
import { computePartitionedDepth } from '../utils/tank'

const RATE = 5000 // cm3/分
const WIDTHS = [40, 60] // Aの幅40cm, Bの幅y=60cm
const DIVIDERS = [30] // 仕切りの高さ x=30cm
const TOTAL_H = 50
const DEPTH_DIM = 50

const { depthAt, levelsAt, totalTime } = computePartitionedDepth({ widths: WIDTHS, dividerHeights: DIVIDERS, totalHeight: TOTAL_H, rate: RATE, depthDim: DEPTH_DIM })
const T_MAX = totalTime

export default function Example4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)
  const levels = levelsAt(t)

  return (
    <div className="problem">
      <h2>例題4　仕切りのある容器</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器があります。容器の底は，側面と平行な長方形の仕切り板でＡ，Ｂの2つの部分に分けられています。グラフは，容器が空の状態から，Ａの部分に毎分5Ｌの割合で水を入れたときの，水を入れ始めてからの時間と，Ａの部分の水面の高さの関係を表したものです。仕切り板の厚さは考えないものとします。
        </p>
        <ol className="question-list">
          <li>(図1)のx（仕切り板の高さ）は何cmですか。</li>
          <li>(図1)のyの長さは何cmですか。</li>
          <li>(図2)のzにあてはまる数を求めなさい。</li>
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
          { label: '12分後（x＝30cmに到達）', t: 12 },
          { label: '30分後（Bも追いつく）', t: 30 },
          { label: 'z＝50分後（満水）', t: 50 },
        ]} />

      <div className="graph-block">
        <h3>Ａの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 12, label: '12' }, { t: 30, label: '30' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) アの部分の容積は，5000×12(cm3)なので，xの長さは，5000×12÷(40×50)＝<b>30(cm)</b>。</p>
        <p>(2) イの部分の容積は，5000×18(cm3)なので，yの長さは，5000×18÷(30×50)＝<b>60(cm)</b>。</p>
        <p>(3) zに入る数は，容器全体に水を入れるときにかかる時間なので，(100×50×50)÷5000＝<b>50(分)</b>。</p>
      </div>
    </div>
  )
}
