import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 1000
const SPEED_A = 100, SPEED_B = 80, SPEED_C = 120
const C_START = 2
const T_MAX = 65

export default function AdvancedB1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const fracA = (SPEED_A * t) / LAP
  const fracB = (-SPEED_B * t) / LAP
  const started = t >= C_START
  const fracC = started ? (SPEED_C * (t - C_START)) / LAP : 0

  return (
    <div className="problem">
      <h2>応用問題B-1　あとから加わる3人目の周回運動</h2>
      <div className="statement">
        <p className="setup">
          右の図のような1周1kmの円形の池があります。Ａ君は分速100ｍ，Ｂ君は分速80ｍで，Ｏ地点を同時に出発して，池のまわりを反対方向にまわり始めました。
          また，2人が出発してから2分後，Ｃ君は分速120ｍでＯ地点を出発して，Ａ君と同じ方向にまわり始めました。
        </p>
        <ol className="question-list">
          <li>Ｃ君がはじめてＢ君とすれちがった地点で，ふたたびＢ君とすれちがうのは，Ｃ君がＯ地点を出発してから何分何秒後ですか。</li>
          <li>Ｃ君がＯ地点を出発してからＡ君を2回追いこすまでの間に，Ｃ君はＢ君と何回すれちがいましたか。</li>
        </ol>
      </div>

      <CircularTrackView label="1周1000m" points={[
        { label: 'A(100)', color: '#3182ce', frac: fracA },
        { label: 'B(80・逆)', color: '#dd6b20', frac: fracB },
        ...(started ? [{ label: 'C(120)', color: '#38a169', frac: fracC }] : []),
      ]} />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(2)}</b> 分後　{started && <>／　Ｃ君の経過（出発から）：<b>{(t - C_START).toFixed(2)}</b> 分</>}</p>
        {!started && <p style={{ color: '#a0aec0' }}>（Ｃ君はまだ出発していません）</p>}
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[
          { label: '6.2分後（CとBが1回目にすれちがう）', t: 2 + 4.2 },
          { label: '12分後（CがAに1回目追いつく）', t: 2 + 10 },
          { label: '31.2分後（同じ地点で再会）', t: 2 + 29.2 },
          { label: '62分後（CがAに2回目追いつく）', t: 2 + 60 },
        ]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ｃ君が出発するまでに，Ａ君は200ｍ，Ｂ君は160ｍ進んでいます。ＢとＣがすれちがうのは，Ｃ君が出発してから，(1000－160)÷(80＋120)＝<b>4.2分後</b>。このあと2人は1000÷(80＋120)＝5分ごとにすれちがい，最初にすれちがった地点をＢ君は1000÷80＝12.5分ごとに通過するので，5と12.5の最小公倍数25分後に同じ地点で再会します。よって，4.2＋25＝<b>29分12秒後</b>。</p>
        <p>(2) ＣがＡにはじめて追いつくのは，200÷(120－100)＝10分後。2回追いこすのは，1000÷(120－100)＝50分後に2回目なので，10＋50＝60分後。この間，ＢとＣは4.2分後から5分ごとにすれちがうので，(60－4.2)÷5＝11あまり0.8分より，<b>12回</b>すれちがいます。</p>
      </div>
    </div>
  )
}
