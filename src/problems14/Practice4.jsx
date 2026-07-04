import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'
import { computePartitionedDepth } from '../utils/tank'

const RATE = 1500 // cm3/分（毎分1.5Ｌ）
const WIDTHS = [20, 30, 30] // a, b, c
const DIVIDERS = [15, 25]
const TOTAL_H = 40
const DEPTH_DIM = 30

const { depthAt, levelsAt, totalTime } = computePartitionedDepth({ widths: WIDTHS, dividerHeights: DIVIDERS, totalHeight: TOTAL_H, rate: RATE, depthDim: DEPTH_DIM })
const T_MAX = totalTime

export default function Practice4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)
  const levels = levelsAt(t)

  return (
    <div className="problem">
      <h2>練習問題4　3つに仕切られた容器</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器があります。容器の底は，側面と平行な長方形の仕切り板でＡ，Ｂ，Ｃの3つの部分に分けられています。グラフは，容器が空の状態から，Ａの部分に一定の割合で水を入れたときの，水を入れ始めてからの時間と，Ａの部分の水面の高さの関係を表したものです。仕切り板の厚さは考えないものとします。
        </p>
        <ol className="question-list">
          <li>毎分何Ｌの割合で水を入れましたか。</li>
          <li>a，b，cの長さはそれぞれ何cmですか。</li>
          <li>x，yにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <div className="stage">
        <PartitionedTankView widths={WIDTHS} dividerHeights={DIVIDERS} totalHeight={TOTAL_H} levels={levels} labels={['A', 'B', 'C']} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>Ａの部分の水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '6分後（Aが15cmに到達）', t: 6 },
          { label: 'x＝15分後（Bも追いつく）', t: 15 },
          { label: '25分後（A+Bが25cmに到達）', t: 25 },
          { label: 'y＝40分後（Cも追いつく）', t: 40 },
          { label: '64分後（満水）', t: 64 },
        ]} />

      <div className="graph-block">
        <h3>Ａの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 6, label: '6' }, { t: 25, label: '25' }, { t: 64, label: '64' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 正面から見た図に整理すると，ア→イ→ウ→エ→オの順に水が入ります。容器全体の容積は，80×30×40(cm3)で，全体に水を入れるのに64分かかっていますから，80×30×40÷64＝<b>1500(cm3)</b> → 毎分1.5Ｌです。</p>
        <p>(2) アの部分の容積は，1500×6(cm3)なので，aの部分は，1500×6÷(15×30)＝<b>20(cm)</b>。ア+イ+ウの部分の容積は，1500×25(cm3)なので，a+bの部分は，1500×25÷(25×30)＝50(cm)。したがって，bの長さは，50－20＝<b>30(cm)</b>なので，cの部分の長さは，80－50＝<b>30(cm)</b>です。</p>
        <p>(3) ア+イの部分にかかる時間は，50×30×15÷1500＝<b>15(分)</b>…x。ア+イ+ウ+エの部分にかかる時間は，80×30×25÷1500＝<b>40(分)</b>…y</p>
      </div>
    </div>
  )
}
