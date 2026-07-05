import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const CASES = [
  { key: '1', label: '(1) 反対方向・480m', circ: 480, sa: 70, sb: -50, tMax: 10 },
  { key: '2', label: '(2) 同じ方向・600m', circ: 600, sa: 85, sb: 60, tMax: 50 },
  { key: '3', label: '(3) 360m・速さを求める', circ: 360, sa: 75, sb: 45, tMax: 15 },
]

export default function Basic3() {
  const [caseKey, setCaseKey] = useState('1')
  const c = CASES.find((x) => x.key === caseKey)
  const { t, setT, playing, setPlaying } = useAnimatedTime(c.tMax)

  const fracA = (c.sa * t) / c.circ
  const fracB = (c.sb * t) / c.circ

  return (
    <div className="problem">
      <h2>基本問題3　池のまわりの旅人算</h2>
      <div className="statement">
        <ol className="question-list">
          <li>1周480mの池のまわりを，姉は分速70m，妹は分速50mで，同じ地点から同時に反対の方向に歩き出したところ，出発してから何分後にはじめてすれちがい，何分後に2回目にすれちがいますか。</li>
          <li>1周600mの池のまわりを，姉は分速85m，妹は分速60mで，同じ地点から同時に同じ方向に歩き出したところ，姉は出発してから何分後に妹をはじめて追いこし，何分後に2回目に追いこしますか。</li>
          <li>1周360mの池のまわりを，姉と妹は同じ地点から同時に歩き出します。反対方向だと3分後にはじめてすれちがい，同じ方向だと12分後に姉がはじめて妹を追いこします。姉，妹の速さはそれぞれ分速何mですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {CASES.map((cc) => (
          <button key={cc.key} className={`jump-btn${cc.key === caseKey ? ' active' : ''}`} onClick={() => { setCaseKey(cc.key); setT(0) }}>{cc.label}</button>
        ))}
      </div>

      <CircularTrackView points={[{ label: '姉', color: '#3182ce', frac: fracA }, { label: '妹', color: '#dd6b20', frac: fracB }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={c.tMax} playing={playing} setPlaying={setPlaying}
        jumps={
          c.key === '1' ? [{ label: '4分後（1回目）', t: 4 }, { label: '8分後（2回目）', t: 8 }]
          : c.key === '2' ? [{ label: '24分後（1回目）', t: 24 }, { label: '48分後（2回目）', t: 48 }]
          : [{ label: '3分後（反対方向ですれちがい）', t: 3 }]
        } />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 480÷(70＋50)＝<b>4(分後)</b>…ア。480×2÷(70＋50)＝<b>8(分後)</b>…イ（4×2＝8分後でも可）</p>
        <p>(2) 600÷(85－60)＝<b>24(分後)</b>…ア。600×2÷(85－60)＝<b>48(分後)</b>…イ（24×2＝48分後でも可）</p>
        <p>
          (3) 360÷(姉＋妹)＝3(分) より，姉＋妹＝120(m/分)。360÷(姉－妹)＝12(分) より，姉－妹＝30(m/分)。
          和差算で，姉の速さは，(120＋30)÷2＝<b>75(m/分)</b>，妹の速さは，(120－30)÷2＝<b>45(m/分)</b>
        </p>
        <p>輪の形（円とは限りません）を進むとき，2人が出会ったり追いついたりするまでの道のりは，輪1周分です。</p>
      </div>
    </div>
  )
}
