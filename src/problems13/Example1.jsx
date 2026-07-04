import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

const CASES = [
  { key: '1', label: '(1) 2.7kmを15分', dist: 2700, tMax: 15, unit: '分', speedLabel: '180 m/分' },
  { key: '2', label: '(2) 時速42kmで50分', dist: 35000, tMax: 50, unit: '分', speedLabel: '700 m/分（時速42km）' },
  { key: '3', label: '(3) 8kmを時速10km', dist: 8000, tMax: 48, unit: '分', speedLabel: '約166.7 m/分（時速10km）' },
]

export default function Example1() {
  const [caseKey, setCaseKey] = useState('1')
  const c = CASES.find((x) => x.key === caseKey)
  const { t, setT, playing, setPlaying } = useAnimatedTime(c.tMax)
  const speed = c.dist / c.tMax
  const pos = speed * t

  return (
    <div className="problem">
      <h2>例題1　速さ・時間・道のりの計算</h2>
      <div className="statement">
        <ol className="question-list">
          <li>2.7kmの道のりを15分で走るには，分速何ｍで走ればよいですか。</li>
          <li>時速42kmで走る自動車は，50分で何km進みますか。</li>
          <li>8kmの道のりを時速10kmの自転車で走ると，何分かかりますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {CASES.map((cc) => (
          <button key={cc.key} className={`jump-btn${cc.key === caseKey ? ' active' : ''}`} onClick={() => { setCaseKey(cc.key); setT(0) }}>{cc.label}</button>
        ))}
      </div>

      <LinearTrackView length={c.dist} markers={[{ pos: 0, label: '出発' }, { pos: c.dist, label: '到着' }]}
        points={[{ label: '●', color: '#3182ce', pos }]} />
      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> {c.unit}後　／　速さ：<b>{c.speedLabel}</b></p>
        <p>進んだ道のり：<b>{pos.toFixed(0)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={c.tMax} playing={playing} setPlaying={setPlaying} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2.7km＝2700m より，2700÷15＝<b>180(m/分)</b></p>
        <p>(2) 50分＝5/6時間 より，42×5/6＝<b>35(km)</b></p>
        <p>(3) 8÷10＝0.8時間 ⇒ 0.8×60＝<b>48(分)</b></p>
      </div>
    </div>
  )
}
