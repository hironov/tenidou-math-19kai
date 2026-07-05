import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'
import { ValueGraph } from '../components/ValueGraph'

const DIST = 2350
const T_MAX = 47

function posOtouto(t) { return Math.min(DIST, 50 * t) }
function posAni(t) {
  if (t <= 8) return 0
  if (t <= 16) return 40 * (t - 8)
  return Math.min(DIST, 320 + 70 * (t - 16))
}
function gap(t) { return Math.abs(posAni(t) - posOtouto(t)) }

export default function Advanced2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>最難関2　速さを変えて追いこす兄</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が家から学校まで歩きました。弟は一定の速さで歩きました。兄は，弟が出発してから8分後に家を出発して，はじめは一定の速さで歩いていましたが，途中から歩く速さを1.75倍に変えて学校まで歩きました。兄は途中で弟を追いこし，弟よりも2分早く学校に着きました。
        </p>
        <ol className="question-list">
          <li>家から学校までのきょりは何mですか。</li>
          <li>兄が歩く速さを変えたのは，弟が家を出発してから何分後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '学校' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtouto(t) }]} />
      <div className="readout"><p>弟が出発してからの経過：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{gap(t).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '8分後（兄が出発）', t: 8 }, { label: '16分後（速さを変える）', t: 16 }, { label: '40分後（兄が弟を追いこす）', t: 40 }, { label: '45分後（兄が到着・きょり100m）', t: 45 }, { label: '47分後（弟が到着）', t: 47 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="学校"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtouto }]} markLines={[{ t: 8, label: '8' }, { t: 40, label: '40' }, { t: 45, label: '45' }]} />
      </div>

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={500} valueFn={gap} t={t} yLabel="m" xLabel="(分)" markLines={[{ t: 8, label: '8' }, { t: 40, label: '40' }, { t: 45, label: '45' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>兄は弟より2分速く学校に着いたので，弟が学校に着いたのは，出発してから47分後です。弟は2分間で100m進んでいますので，100÷2＝50(m/分)。家から学校までのきょりは，50×47＝<b>2350(m)</b></p>
        <p>
          40分後から45分後の5分間で，兄は弟よりも100m多く進んでいますので，100÷5＝20(m/分)…速さの差。よって，兄の速さは，50＋20＝70(m/分)。これが速さを1.75倍にしたときの速さなので，出発したときの速さは，70÷1.75＝40(m/分)。
          兄は出発から，45－8＝37(分間)で2350m進んでいますので，つるかめ算を用いて，(70×37－2350)÷(70－40)＝8(分間)が分速40mで進んだ時間です。これより，8＋8＝<b>16(分後)</b>
        </p>
      </div>
    </div>
  )
}
