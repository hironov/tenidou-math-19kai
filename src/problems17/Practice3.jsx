import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

const P = 0, Q = 300, R = 900
const SPEED_A = 190, SPEED_B = 130, SPEED_C = 100
const T_MAX = 22

function posA(t) { return P + SPEED_A * t }
function posB(t) { return Q + SPEED_B * t }
function posC(t) { return R + SPEED_C * t }

export default function Practice3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題3　3地点から同時に出発する3人</h2>
      <div className="statement">
        <p className="setup">
          右の図のように，まっすぐな道にそってＰ，Ｑ，Ｒの3つの地点があります（ＰＱ間300ｍ，ＱＲ間600ｍ）。
          Ａ君はＰ地点から，Ｂ君はＱ地点から，Ｃ君はＲ地点から，それぞれ一定の速さで矢印の方向に同時に走り出したところ，
          Ａ君は，出発してから5分後にＢ君を追いこし，その5分後にＣ君を追いこしました。Ｂ君は分速130ｍで走ったものとします。
        </p>
        <ol className="question-list">
          <li>Ａ君，Ｃ君の速さはそれぞれ分速何ｍですか。</li>
          <li>Ｂ君がＣ君を追いこした地点は，Ｒ地点から何kmはなれていますか。</li>
        </ol>
      </div>

      <LinearTrackView length={2500}
        markers={[{ pos: P, label: 'P' }, { pos: Q, label: 'Q' }, { pos: R, label: 'R' }]}
        points={[
          { label: 'A(190)', color: '#3182ce', pos: posA(t), row: 0 },
          { label: 'B(130)', color: '#dd6b20', pos: posB(t), row: 1 },
          { label: 'C(100)', color: '#38a169', pos: posC(t), row: 2 },
        ]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '5分後（AがBを追いこす）', t: 5 }, { label: '10分後（AがCを追いこす）', t: 10 }, { label: '20分後（BがCを追いこす）', t: 20 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 300÷(Ａ－130)＝5(分後) より，Ａ＝300÷5＋130＝<b>190(ｍ/分)</b>。(300＋600)÷(190－Ｃ)＝10(分後) より，Ｃ＝190－900÷10＝<b>100(ｍ/分)</b>。</p>
        <p>(2) Ｂ君がＣ君を追いこすのは，600÷(130－100)＝20(分後)。Ｃ君に注目して，100×20＝2000(ｍ)＝<b>2km</b>。</p>
      </div>
    </div>
  )
}
