import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 1200
const SPEED_ANE = 70
const SPEED_IMOTO = 50
const T_MAX = 26

export default function Basic2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const fracAne = (SPEED_ANE * t) / LAP
  const fracImoto = (-SPEED_IMOTO * t) / LAP

  return (
    <div className="problem">
      <h2>基本問題2　湖のまわりを反対方向に1周</h2>
      <div className="statement">
        <p className="setup">
          1周1.2kmの湖のまわりを，姉と妹が同じ地点を同時に出発して，それぞれ一定の速さで反対の方向に歩いて1周したところ，
          出発してから10分後に2人はすれちがいました。姉は分速70ｍで歩いたものとして，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>妹の速さは分速何ｍですか。</li>
          <li>妹は，姉とすれちがってから何分後に出発地点にもどりましたか。</li>
        </ol>
      </div>

      <CircularTrackView label="1周1200m" points={[
        { label: '姉(70)', color: '#3182ce', frac: fracAne },
        { label: '妹(50)', color: '#dd6b20', frac: fracImoto },
      ]} />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '10分後（すれちがい）', t: 10 }, { label: '24分後（妹が1周）', t: 24 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1200÷(70＋妹)＝10(分後) より，妹＝1200÷10－70＝<b>50(ｍ/分)</b>。</p>
        <p>(2) 妹が1周するのは，1200÷50＝24(分後)なので，これは姉とすれちがってから，24－10＝<b>14(分後)</b>です。</p>
      </div>
    </div>
  )
}
