import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'

const AREA = 800 // cm2
const HEIGHT = 55 // cm
const RATE1 = 3000 // cm3/分
const RATE2 = 5000 // cm3/分
const TOTAL_T = 12
const TOTAL_V = AREA * HEIGHT // 44000cm3 = 44L
const DURATION_AT_RATE2 = (TOTAL_V - RATE1 * TOTAL_T) / (RATE2 - RATE1)
const SWITCH_T = TOTAL_T - DURATION_AT_RATE2

function depthAt(t) {
  const r1 = RATE1 / AREA
  const r2 = RATE2 / AREA
  if (t <= SWITCH_T) return r1 * t
  return r1 * SWITCH_T + r2 * (t - SWITCH_T)
}

export default function Basic3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(TOTAL_T)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>基本問題3　円柱の容器に2つの割合で注水</h2>
      <div className="statement">
        <p className="setup">底面積が800cm2，高さが55cmの円柱の形の容器について，次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>この容器の容積は何Ｌですか。</li>
          <li>この容器が空の状態から，毎分3Ｌの割合で水を入れ始め，途中からは毎分5Ｌの割合で水を入れたところ，容器がいっぱいになるまでに全部で12分かかりました。毎分5Ｌの割合で水を入れた時間は何分ですか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={[{ height: HEIGHT, relWidth: 1 }]} depth={depth} width={160} height={220} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
          <p>現在の割合：<b>毎分{t <= SWITCH_T ? 3 : 5}Ｌ</b></p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={TOTAL_T} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: `${SWITCH_T}分後（毎分5Ｌに切りかえ）`, t: SWITCH_T }, { label: '12分後（満水）', t: 12 }]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={TOTAL_T} yMax={HEIGHT} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: SWITCH_T, label: `${SWITCH_T}` }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 800×55÷1000＝<b>44(Ｌ)</b></p>
        <p>(2) 面積図より，(44－3×12)÷(5－3)＝<b>4(分)</b></p>
      </div>
    </div>
  )
}
