import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 900
const SPEED_C = 150
const SPEED_A = 250
const SPEED_B = 70
const T_MAX = 30

export default function Example4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const fracA = (SPEED_A * t) / LAP
  const fracB = (SPEED_B * t) / LAP
  const fracC = (SPEED_C * t) / LAP

  return (
    <div className="problem">
      <h2>例題4　3人の周回運動</h2>
      <div className="statement">
        <p className="setup">
          1周900ｍの公園のまわりを，Ａ君，Ｂ君，Ｃ君の3人が同じ地点を同時に出発して，それぞれ一定の速さで
          同じ方向に何周もまわりました。Ａ君は，出発してから5分後にＢ君をはじめて追いこし，その4分後にＣ君をはじめて追いこしました。
          Ｃ君の速さは分速150ｍであるとすると，Ａ君，Ｂ君の速さはそれぞれ分速何ｍですか。
        </p>
        <ol className="question-list"><li>Ａ君，Ｂ君の速さはそれぞれ分速何ｍですか。</li></ol>
      </div>

      <CircularTrackView
        label="1周900m"
        points={[
          { label: `A(${SPEED_A})`, color: '#3182ce', frac: fracA },
          { label: `B(${SPEED_B})`, color: '#dd6b20', frac: fracB },
          { label: `C(${SPEED_C})`, color: '#38a169', frac: fracC },
        ]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '5分後（AがBを追いこす）', t: 5 }, { label: '9分後（AがCを追いこす）', t: 9 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>900÷(Ａ－Ｂ)＝5(分後) より，Ａ－Ｂ＝180(ｍ/分)。900÷(Ａ－Ｃ)＝9(分後) より，Ａ－Ｃ＝100(ｍ/分)。</p>
        <p>Ｃが分速150ｍなので，Ａ＝150＋100＝<b>250(ｍ/分)</b>，Ｂ＝250－180＝<b>70(ｍ/分)</b>です。</p>
      </div>
    </div>
  )
}
