import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'
import { computePartitionedDepth } from '../utils/tank'

const RATE = 400 // cm3/分
const WIDTHS = [30, 20] // Aの幅30cm, Bの幅x=20cm
const DIVIDERS = [12] // 仕切りの高さ12cm
const TOTAL_H = 20
const DEPTH_DIM = 10

const { depthAt, levelsAt, totalTime } = computePartitionedDepth({ widths: WIDTHS, dividerHeights: DIVIDERS, totalHeight: TOTAL_H, rate: RATE, depthDim: DEPTH_DIM })
const T_MAX = totalTime

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)
  const levels = levelsAt(t)

  return (
    <div className="problem">
      <h2>基本問題4　仕切りのある容器（続）</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器があります。容器の底は，側面と平行な長方形の仕切り板でＡ，Ｂの2つの部分に分けられています。グラフは，容器が空の状態から，Ａの部分に一定の割合で水を入れたときの，水を入れ始めてからの時間と，Ａの部分の水面の高さの関係を表したものです。仕切り板の厚さは考えないものとします。
        </p>
        <ol className="question-list">
          <li>毎分何cm3の割合で水を入れましたか。</li>
          <li>(図1)のxの長さは何cmですか。</li>
          <li>(図2)のyにあてはまる数を求めなさい。</li>
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
          { label: '9分後（divider高さ12cmに到達）', t: 9 },
          { label: '15分後（Bも追いつく）', t: 15 },
          { label: 'y＝25分後（満水）', t: 25 },
        ]} />

      <div className="graph-block">
        <h3>Ａの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 9, label: '9' }, { t: 15, label: '15' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) アの部分の容積は，30×10×12(cm3)なので，毎分の注水量は，30×10×12÷9＝<b>400(cm3/分)</b></p>
        <p>(2) イの部分の容積は，400×6(cm3)なので，xの長さは，400×6÷(12×10)＝<b>20(cm)</b></p>
        <p>(3) yは容器全体が満水になる時間なので，50×10×20÷400＝<b>25(分)</b>です。</p>
      </div>
    </div>
  )
}
