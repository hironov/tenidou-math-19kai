import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

const DIST = 3600
const SPEED_A = 120
const SPEED_B = 80
const SPEED_C = 60
const T_MAX = 30

export default function Example5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const posA = Math.min(DIST, SPEED_A * t)
  const posB = Math.max(0, DIST - SPEED_B * t)
  const posC = Math.max(0, DIST - SPEED_C * t)
  const gapBC = Math.abs(posB - posC)

  return (
    <div className="problem">
      <h2>例題5　P地点・Q地点間を進む3人</h2>
      <div className="statement">
        <p className="setup">
          Ｐ地点とＱ地点は3600ｍはなれています。Ａ君はＰ地点からＱ地点に向かって，Ｂ君とＣ君はＱ地点からＰ地点に向かって，
          同時に出発してそれぞれ一定の速さで進みました。Ａ君の速さは分速120ｍで，Ｂ君の速さはＣ君の速さよりも分速20ｍだけ速いです。
          Ａ君とＢ君がすれちがったとき，Ｃ君はＢ君の360ｍ後ろにいました。
        </p>
        <ol className="question-list">
          <li>Ａ君とＢ君がすれちがったのは，出発してから何分後ですか。</li>
          <li>Ｂ君，Ｃ君の速さはそれぞれ分速何ｍですか。</li>
          <li>Ａ君とＣ君がすれちがったのは，出発してから何分後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'P' }, { pos: DIST, label: 'Q' }]}
        points={[
          { label: 'A', color: '#3182ce', pos: posA, row: 0 },
          { label: 'B', color: '#dd6b20', pos: posB, row: 1 },
          { label: 'C', color: '#38a169', pos: posC, row: 2 },
        ]}
      />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
        <p>ＢとＣの間の距離：<b>{gapBC.toFixed(0)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '(1) 18分後（AとBがすれちがう）', t: 18 }, { label: '(3) 20分後（AとCがすれちがう）', t: 20 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＡとＢがすれちがうとき，ＢとＣは360ｍはなれています。速さの差は分速20ｍなので，360÷20＝<b>18(分後)</b>。</p>
        <p>(2) Ａ君は18分で2160ｍ進むので，Ｂ君は18分で1440ｍ進みます。Ｂ君の速さは1440÷18＝<b>80(ｍ/分)</b>，Ｃ君の速さは80－20＝<b>60(ｍ/分)</b>。</p>
        <p>(3) 3600÷(120＋60)＝<b>20(分後)</b>。</p>
      </div>
    </div>
  )
}
