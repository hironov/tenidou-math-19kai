import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 390 // 解説で求まる値
const SPEED_A = LAP * 7 / 15 // Aが7周するのに15分かかる
const SPEED_B = 130
const T_MAX = 30

export default function Example3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const fracA = (SPEED_A * t) / LAP
  const fracB = (SPEED_B * t) / LAP

  return (
    <div className="problem">
      <h2>例題3　追いこし回数から池の周の長さを求める</h2>
      <div className="statement">
        <p className="setup">
          池のまわりを，Ａ君とＢ君が同じ地点を同時に出発して，それぞれ一定の速さで同じ方向に何周も走りました。
          Ａ君がＢ君を2回目に追いこしたのは出発してから15分後で，このとき，Ａ君は池のまわりをちょうど7周して出発地点にいました。
          Ｂ君の速さが分速130ｍだとすると，池のまわりの長さは何ｍですか。
        </p>
        <ol className="question-list"><li>池のまわりの長さは何ｍですか。</li></ol>
      </div>

      <CircularTrackView
        label={`1周${LAP}m（Ａ:分速${SPEED_A.toFixed(0)}m，Ｂ:分速130m）`}
        points={[
          { label: 'A', color: '#3182ce', frac: fracA },
          { label: 'B', color: '#dd6b20', frac: fracB },
        ]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　（Ａ君は7周＝{(t / 15 * 7).toFixed(2)}周中）</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '15分後（2回目の追いこし）', t: 15 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>2回追いこす…2周おくれ，ということなので，Ａ君が7周しているとき，Ｂ君は5周しています。</p>
        <p>130×15＝1950(ｍ) が池5周分なので，池1周は，1950÷5＝<b>390(ｍ)</b>です。</p>
      </div>
    </div>
  )
}
