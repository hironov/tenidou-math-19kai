import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

const CASES = {
  1: { dist: 750, speedA: 70, speedB: 55, tMax: 8, ans: 6 },
  2: { dist: 1200, speedA: 85, speedB: 65, tMax: 10, ans: 8 },
}

export default function Example1() {
  const [caseKey, setCaseKey] = useState('1')
  const { dist, speedA, speedB, tMax, ans } = CASES[caseKey]
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax)
  const posA = Math.min(dist, speedA * t)
  const posB = Math.max(0, dist - speedB * t)

  return (
    <div className="problem">
      <h2>例題1　出会いの基礎</h2>
      <div className="statement">
        <p className="setup">
          (1) Ａ地点とＢ地点は750ｍはなれています。姉は分速70ｍでＡ地点からＢ地点に向かって，妹は分速55ｍでＢ地点からＡ地点に向かって同時に歩き出します。
        </p>
        <p className="setup">
          (2) 分速85ｍで歩く人と分速65ｍで歩く人が，それぞれＡ地点とＢ地点から向かい合って同時に歩き出すと8分後に出会います。
        </p>
        <ol className="question-list">
          <li>(1) 2人がすれちがうのは，出発してから何分後ですか。</li>
          <li>(2) Ａ地点とＢ地点は何ｍはなれていますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${caseKey === '1' ? ' active' : ''}`} onClick={() => { setCaseKey('1'); setT(0) }}>(1) 750m・70と55</button>
        <button className={`jump-btn${caseKey === '2' ? ' active' : ''}`} onClick={() => { setCaseKey('2'); setT(0) }}>(2) 1200m・85と65</button>
      </div>

      <LinearTrackView length={dist}
        markers={[{ pos: 0, label: 'A' }, { pos: dist, label: 'B' }]}
        points={[{ label: '姉/85', color: '#3182ce', pos: posA }, { label: '妹/65', color: '#dd6b20', pos: posB }]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　道のり：{dist}m</p></div>
      <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: `すれちがい（${ans}分後）`, t: ans }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 750÷(70＋55)＝<b>6(分後)</b>。</p>
        <p>(2) □÷(85＋65)＝8(分後) より，□＝150×8＝<b>1200(ｍ)</b>。</p>
      </div>
    </div>
  )
}
