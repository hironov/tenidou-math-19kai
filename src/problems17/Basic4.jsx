import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 700
const OFFSET = 100 // QはPより100m先（兄の進む方向）
const SPEED_ANI = 60
const SPEED_OTOTO = 40
const T_MAX = 45

export default function Basic4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })
  const fracAni = (SPEED_ANI * t) / LAP
  const fracOtoto = OFFSET / LAP + (SPEED_OTOTO * t) / LAP

  return (
    <div className="problem">
      <h2>基本問題4　出発点がずれている周回運動</h2>
      <div className="statement">
        <p className="setup">
          右のような池のまわりを，兄はＰ地点から分速60ｍで，弟はＱ地点から分速40ｍで，それぞれ矢印の方向に同時に歩き出しました
          （Ｐ地点からＱ地点までは，兄が進む方向に100ｍです）。
        </p>
        <ol className="question-list">
          <li>兄が弟をはじめて追いこしたのは，出発してから何分後ですか。</li>
          <li>兄が弟を2回目に追いこしたのは出発してから40分後でした。池のまわりの長さは何ｍですか。</li>
        </ol>
      </div>

      <CircularTrackView label={`P→Q 100m先／1周${LAP}m`} points={[
        { label: '兄(60)', color: '#3182ce', frac: fracAni },
        { label: '弟(40)', color: '#dd6b20', frac: fracOtoto },
      ]} />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '(1) 5分後（1回目の追いこし）', t: 5 }, { label: '(2) 40分後（2回目の追いこし）', t: 40 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 100÷(60－40)＝<b>5(分後)</b>。</p>
        <p>(2) 2回目に追いこすのは，1回目から「兄が弟を1周おくれにする」ときです。この時間が，40－5＝35(分間)なので，□÷(60－40)＝35(分後)，□＝20×35＝<b>700(ｍ)</b>。</p>
      </div>
    </div>
  )
}
