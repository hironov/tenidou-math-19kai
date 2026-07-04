import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 14400
const SPEED_A = 100, SPEED_B = 80, SPEED_C = 60
const T_MAX = 100

export default function Practice4() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const fracA = (-SPEED_A * t) / LAP
  const fracB = (SPEED_B * t) / LAP
  const fracC = (SPEED_C * t) / LAP
  const gapBC = ((SPEED_B - SPEED_C) * t) % LAP

  return (
    <div className="problem">
      <h2>練習問題4　反対方向と同じ方向がまざった3人の周回運動</h2>
      <div className="statement">
        <p className="setup">
          湖のまわりを，Ａ君は分速100ｍ，Ｂ君は分速80ｍ，Ｃ君は分速60ｍで，同じ地点から同時に出発してそれぞれ1周しました。
          Ｂ君とＣ君は同じ方向に，Ａ君だけは反対の方向に歩いたところ，Ａ君は，Ｂ君とすれちがってから10分後にＣ君とすれちがいました。
        </p>
        <ol className="question-list">
          <li>Ａ君とＢ君がすれちがったとき，Ｃ君はＢ君の何kmうしろにいましたか。</li>
          <li>湖のまわりの長さは何kmですか。</li>
        </ol>
      </div>

      <CircularTrackView label={`1周${(LAP / 1000).toFixed(1)}km`} points={[
        { label: 'A(100・逆)', color: '#3182ce', frac: fracA },
        { label: 'B(80)', color: '#dd6b20', frac: fracB },
        { label: 'C(60)', color: '#38a169', frac: fracC },
      ]} />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
        <p>ＢとＣの間の道のり：<b>{gapBC.toFixed(0)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[{ label: '80分後（AがBとすれちがう）', t: 80 }, { label: '90分後（AがCとすれちがう）', t: 90 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａ君とＢ君がすれちがってからＣ君とすれちがうまでの太線部分に10分間かかっているので，道のりは，(100＋60)×10＝1600(ｍ)＝<b>1.6km</b>。</p>
        <p>(2) ＢとＣの間の道のりが1600ｍとなるのは，出発してから1600÷(80－60)＝80(分後)。湖1周は，80分間でＡとＢが進んだ道のりの和に等しいので，(100＋80)×80＝14400(ｍ)＝<b>14.4km</b>。</p>
      </div>
    </div>
  )
}
