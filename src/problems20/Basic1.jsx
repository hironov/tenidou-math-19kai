import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}

const CASES = [
  { key: '1', label: '(1) 反対方向・出会い', dist: 840, tMax: 8 },
  { key: '2', label: '(2) 遅れて追いかける', dist: 400, tMax: 10 },
  { key: '3', label: '(3) 往復・出会い', dist: 450, tMax: 7 },
  { key: '4', label: '(4) 往復・2回出会う', dist: 800, tMax: 16 },
]

function posFns(caseKey) {
  if (caseKey === '1') return { a: (t) => 65 * t, b: (t) => 840 - 55 * t }
  if (caseKey === '2') return { a: (t) => (t <= 6 ? 40 * t : 40 * t), b: (t) => (t <= 6 ? 0 : 120 * (t - 6)) }
  if (caseKey === '3') return { a: (t) => pingpong(80 * t, 450), b: (t) => 450 - pingpong(70 * t, 450) }
  return { a: (t) => pingpong(90 * t, 800), b: (t) => 800 - pingpong(70 * t, 800) }
}

export default function Basic1() {
  const [caseKey, setCaseKey] = useState('1')
  const c = CASES.find((x) => x.key === caseKey)
  const { a, b } = posFns(caseKey)
  const { t, setT, playing, setPlaying } = useAnimatedTime(c.tMax)

  return (
    <div className="problem">
      <h2>基本問題1　旅人算いろいろ</h2>
      <div className="statement">
        <ol className="question-list">
          <li>Ａ地点とＢ地点は840mはなれています。兄は分速65mでＡ地点からＢ地点に向かって，弟は分速55mでＢ地点からＡ地点に向かって同時に歩き出すと何分後にすれちがいますか。</li>
          <li>弟が家から分速40mで歩き出しました。その6分後に兄が家を出て，分速120mで走って弟を追いかけると，兄は何分走ったところで弟に追いつきますか。</li>
          <li>Ａ地点とＢ地点は何mはなれていますか。兄と弟はＡ地点を同時に出発して，兄は分速80m，弟は分速70mでそれぞれＡＢ間を1往復すると，2人は出発してから6分後にすれちがいます。</li>
          <li>Ａ地点とＢ地点は800mはなれています。兄はＡ地点を，弟はＢ地点を同時に出発して，それぞれＡＢ間を1往復します。兄の速さは分速90m，弟の速さは分速70mです。2人は出発してから何分後にはじめてすれちがい，何分後に2回目にすれちがいますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {CASES.map((cc) => (
          <button key={cc.key} className={`jump-btn${cc.key === caseKey ? ' active' : ''}`} onClick={() => { setCaseKey(cc.key); setT(0) }}>{cc.label}</button>
        ))}
      </div>

      <LinearTrackView length={c.dist} markers={[{ pos: 0, label: 'A' }, { pos: c.dist, label: 'B' }]}
        points={[{ label: '兄', color: '#3182ce', pos: a(t) }, { label: '弟', color: '#dd6b20', pos: b(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={c.tMax} playing={playing} setPlaying={setPlaying} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={c.tMax} yMax={c.dist} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: a }, { label: '弟', color: '#dd6b20', fn: b }]} markLines={[]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 840÷(65＋55)＝<b>7(分後)</b></p>
        <p>(2) 40×6＝240(m)…兄が家を出るときまでに弟が進んだ道のり。240÷(120－40)＝<b>3(分)</b></p>
        <p>(3) 2人がすれちがうまでに進む道のりの和は，ＡＢ間2本分なので，□×2÷(80＋70)＝6。□＝<b>450(m)</b></p>
        <p>(4) 800÷(90＋70)＝<b>5(分後)</b>…1回目。2回目に出会うまでに2人が進む道のりの和は，ＡＢ間3本分なので，800×3÷(90＋70)＝<b>15(分後)</b>…2回目（5×3＝15分後でも可）</p>
        <p>旅人算の基本解法：2人が同じ方向→速さの差。2人が反対方向→速さの和。道のり÷2人の速さ＝時間。</p>
      </div>
    </div>
  )
}
