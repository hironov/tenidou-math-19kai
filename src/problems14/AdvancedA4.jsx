import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PartitionedTankView } from '../components/PartitionedTankView'
import { ValueGraph } from '../components/ValueGraph'

const WIDTHS = [8, 6, 10]
const DIVIDERS = [10, 8]
const TOTAL_H = 12
const T_MAX = 15

function levelA(t) {
  return Math.min(10, (400 / 80) * t)
}
function levelB(t) {
  if (t <= 2) return 0
  if (t <= 5) return (8 / 3) * (t - 2)
  if (t <= 10) return 8
  if (t <= 12) return 8 + 1 * (t - 10)
  return Math.min(12, 10 + (2 / 3) * (t - 12))
}
function levelC(t) {
  if (t <= 5) return 0
  if (t <= 10) return 1.6 * (t - 5)
  return levelB(t)
}

export default function AdvancedA4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const levels = [levelA(t), levelB(t), levelC(t)]

  return (
    <div className="problem">
      <h2>応用問題A-4　穴のある仕切り容器</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器があります。容器の底は，側面と平行な長方形の仕切り板でＡ，Ｂ，Ｃの3つの部分に分けられています。Ｂの部分には穴があいていて，Ｂの部分に水がたまっている間は一定の割合で水が出ていきます。グラフは，容器が空の状態から，Ａの部分に一定の割合で水を入れたときの，水を入れ始めてからの時間と，Ｂの部分の水面の高さの関係を表したものです。仕切り板の厚さは考えないものとします。
        </p>
        <ol className="question-list">
          <li>毎分何cm3の割合で水を入れましたか。また，穴からは毎分何cm3の割合で水が出ますか。</li>
          <li>満水になったところで水を入れるのをやめました。それから何分何秒後に穴から水が出なくなりますか。</li>
        </ol>
      </div>

      <div className="stage">
        <PartitionedTankView widths={WIDTHS} dividerHeights={DIVIDERS} totalHeight={TOTAL_H} levels={levels} labels={['A', 'B（穴あり）', 'C']} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>Ｂの部分の水面の高さ：<b>{levelB(t).toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '2分後（Aが満水・10cm）', t: 2 },
          { label: '5分後（Bが8cmに到達）', t: 5 },
          { label: '10分後（Cが追いつく・8cm）', t: 10 },
          { label: '12分後（B+Cが10cmに到達）', t: 12 },
          { label: '15分後（満水・12cm）', t: 15 },
        ]} />

      <div className="graph-block">
        <h3>Ｂの部分の水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={TOTAL_H} valueFn={levelB} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 2, label: '2' }, { t: 5, label: '5' }, { t: 10, label: '10' }, { t: 12, label: '12' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ア→イ→ウ→エ→オの順に水が入ります。アの部分の体積は，8×10×10(cm3)で，この部分に水を入れるのに2分かかっているので，
          1分間に入れる水の量は，8×10×10÷2＝<b>400(cm3/分)</b>。イの部分の体積は，6×10×8(cm3)で，この部分に水を入れるのに3分かかっているので，
          6×10×8÷3＝160(cm3/分)の割合で水が入ります。したがって，穴から出る水の量は，400－160＝<b>240(cm3/分)</b>
        </p>
        <p>
          (2) ウの部分の横の長さは，160×5÷(8×10)＝10(cm)。よって，容器の横の長さの和は，8＋6＋10＝24(cm)。
          満水になった後に水を入れるのをやめると，アとウ以外の部分の水が流れ出ます。イ，エ，オの部分を正面から見たときの面積の合計は，
          6×8＋16×2＋24×2＝128(cm2) より，128×10÷240＝16/3(分) → <b>5分20秒後</b>です。
        </p>
      </div>
    </div>
  )
}
