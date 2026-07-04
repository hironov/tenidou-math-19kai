import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 1440
const SPEED_OTOTO = 60
const START_ANI = 6
const SPEED_ANI = 180
const T_MAX = 60

function fracOtoto(t) { return (SPEED_OTOTO * t) / LAP }
function fracAni(t) { return t < START_ANI ? 0 : (SPEED_ANI * (t - START_ANI)) / LAP }

export default function Practice1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })

  return (
    <div className="problem">
      <h2>練習問題1　出発時刻がずれた自転車と徒歩</h2>
      <div className="statement">
        <p className="setup">
          池のまわりを，弟がＰ地点から分速60ｍで歩き出し，その6分後に，兄がＰ地点から自転車に乗って，一定の速さで弟と同じ方向に走り出しました。
          兄は出発してから3分後にはじめて弟を追いこし，その5分後にはじめてＰ地点にもどりました。
        </p>
        <ol className="question-list">
          <li>池のまわりの長さは何ｍですか。</li>
          <li>弟は池のまわりを2周しました。① 弟が兄に2回目に追いこされたのは，弟が出発してから何分後ですか。② 弟は池のまわりを2周する間に，兄に何回追いこされましたか。</li>
        </ol>
      </div>

      <CircularTrackView label={`1周${LAP}m（兄は弟の6分後に出発）`} points={[
        { label: '兄', color: '#3182ce', frac: fracAni(t) },
        { label: '弟', color: '#dd6b20', frac: fracOtoto(t) },
      ]} />

      <div className="readout"><p>経過時間（弟が出発してから）：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[
          { label: '9分後（1回目の追いこし）', t: 9 },
          { label: '(2)① 21分後（2回目）', t: 21 },
          { label: '33分後（3回目）', t: 33 },
          { label: '45分後（4回目）', t: 45 },
        ]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 兄が出発するとき，弟は360m進んでいます。360÷(兄－60)＝3(分後) より，兄の速さは，360÷3＋60＝180(ｍ/分)。兄は1周するのに3＋5＝8分かかるので，池のまわりの長さは，180×8＝<b>1440(ｍ)</b>。</p>
        <p>(2)① 兄が弟を1周おくれにするのにかかる時間は，1440÷(180－60)＝12(分間)。よって，弟が兄に2回目に追いこされるのは，弟が出発してから，6＋3＋12＝<b>21(分後)</b>。</p>
        <p>② 弟が2周するのにかかる時間は，1440×2÷60＝48(分間)。追いこしは9,21,33,45分後の<b>4回</b>です（57分後は48分を超えるため対象外）。</p>
      </div>
    </div>
  )
}
