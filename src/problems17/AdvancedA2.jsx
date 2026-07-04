import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 3840
const SPEED_A = 72, SPEED_B = 60, SPEED_C = 120
const T_MAX = 45

export default function AdvancedA2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const fracA = (SPEED_A * t) / LAP
  const fracB = (SPEED_B * t) / LAP
  const fracC = (-SPEED_C * t) / LAP

  return (
    <div className="problem">
      <h2>応用問題A-2　3人の周回運動から池の周りの長さを求める</h2>
      <div className="statement">
        <p className="setup">
          ある公園には大きな池があり，池のまわりを1周できるように道路が作られています。Ａ君とＢ君とＣ君の3人は，それぞれ一定の速さで，
          この道路を何周かまわることにしました。3人はこの道路の同じ地点を同時に出発して，Ａ君とＢ君は同じ方向に歩き，Ｃ君だけは反対の方向に走ります。
          Ｃ君は出発してから20分後にＡ君とはじめてすれちがい，そこからさらに160ｍ走ったところでＢ君とすれちがいました。Ｃ君がＡ君と2回目にすれちがったのは，
          2周目に入ってから8分後で，さらにその2分40秒後にＢ君と2回目にすれちがいました。
        </p>
        <ol className="question-list">
          <li>Ｃ君は，池のまわりを1周するのに何分かかりますか。</li>
          <li>池のまわりの長さは何ｍですか。</li>
          <li>Ｂ君は，池のまわりを1周するのに何分かかりますか。</li>
        </ol>
      </div>

      <CircularTrackView label={`1周${LAP}m`} points={[
        { label: 'A(72)', color: '#3182ce', frac: fracA },
        { label: 'B(60)', color: '#dd6b20', frac: fracB },
        { label: 'C(120・逆)', color: '#38a169', frac: fracC },
      ]} />

      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[
          { label: '20分後（CとAの1回目）', t: 20 },
          { label: '21分20秒後（CとBの1回目）', t: 21 + 1 / 3 },
          { label: '40分後（CとAの2回目）', t: 40 },
          { label: '42分40秒後（CとBの2回目）', t: 42 + 2 / 3 },
        ]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａ君とＣ君は1回すれちがうごとに，合わせて池1周分進みます。これが20分なので，2回目にすれちがうのは，20×2＝40(分後)。よって，Ｃ君が1周するのにかかる時間は，40－8＝<b>32(分)</b>。</p>
        <p>(2) Ｂ君とＣ君が2回目にすれちがうのは42分40秒後なので，1回目は21分20秒後（＝Ａ君とすれちがってから1分20秒後）。この間にＣ君は160ｍ進んでいるので，Ｃ君の速さは160÷(4/3)＝120(ｍ/分)。池のまわりの長さは，120×32＝<b>3840(ｍ)</b>。</p>
        <p>(3) 3840÷(Ｂ＋120)＝21と1/3(分後) より，Ｂ君の速さは分速60ｍ。よって，Ｂ君が1周するのにかかる時間は，3840÷60＝<b>64(分)</b>。</p>
      </div>
    </div>
  )
}
