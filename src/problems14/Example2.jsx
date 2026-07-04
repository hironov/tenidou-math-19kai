import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'

const RATE1 = 200
const RATE2 = 150
const TOTAL_T = 12
const TOTAL_V = 2000
const DURATION_AT_RATE2 = (RATE1 * TOTAL_T - TOTAL_V) / (RATE1 - RATE2) // 毎分150で入れた時間
const SWITCH_T = TOTAL_T - DURATION_AT_RATE2 // 実際に切りかわる時刻

function volumeAt(t) {
  if (t <= SWITCH_T) return RATE1 * t
  return RATE1 * SWITCH_T + RATE2 * (t - SWITCH_T)
}

export default function Example2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(TOTAL_T)
  const volume = volumeAt(t)

  return (
    <div className="problem">
      <h2>例題2　2つの割合を組み合わせて入れる</h2>
      <div className="statement">
        <p className="setup">
          容積が2Ｌの容器があります。この容器が空の状態から，毎分200cm3の割合で水を入れ始め，途中からは毎分150cm3の割合で水を入れたところ，容器がいっぱいになるまでに全部で12分かかりました。
        </p>
        <ol className="question-list">
          <li>毎分150cm3の割合で水を入れた時間は何分ですか。</li>
        </ol>
      </div>

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
        <p>入った水の量：<b>{volume.toFixed(0)}</b> cm³（{(volume / 1000).toFixed(2)} Ｌ）</p>
        <p>現在の割合：<b>毎分{t <= SWITCH_T ? RATE1 : RATE2}cm3</b></p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={TOTAL_T} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: `${SWITCH_T}分後（毎分150cm3に切りかえ）`, t: SWITCH_T }, { label: '12分後（満水）', t: 12 }]} />

      <div className="graph-block">
        <h3>入った水の量のグラフ</h3>
        <ValueGraph tMax={TOTAL_T} yMax={TOTAL_V} valueFn={volumeAt} t={t} yLabel="cm³" xLabel="(分)"
          markLines={[{ t: SWITCH_T, label: `${SWITCH_T}` }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          毎分200cm3と毎分150cm3を組み合わせて12分間で2Ｌ＝2000cm3の水を入れるので，
          (200×12－2000)÷(200－150)＝<b>8(分)</b>です。
        </p>
      </div>
    </div>
  )
}
