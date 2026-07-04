import { useMemo, useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 600
const SPEED_A = 90
const SPEED_B = 60
const T_MAX = 45

export default function Example1() {
  const [mode, setMode] = useState('opposite') // opposite | same
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })

  const fracA = (SPEED_A * t) / LAP
  const dirB = mode === 'opposite' ? -1 : 1
  const fracB = (dirB * SPEED_B * t) / LAP

  const gap = Math.abs(SPEED_A * t - dirB * SPEED_B * t) % LAP
  const isTogether = gap < 3 || gap > LAP - 3

  return (
    <div className="problem">
      <h2>例題1　周回運動の旅人算（すれちがい・追いこし）</h2>
      <div className="statement">
        <p className="setup">
          1周600ｍの池のまわりを，Ａ君は分速90ｍ，Ｂ君は分速60ｍで，同じ地点から同時に歩き出します。
        </p>
        <ol className="question-list">
          <li>2人が反対の方向に歩く場合，2人が1回目にすれちがうのは，出発してから何分後ですか。また，2回目にすれちがうのは，出発してから何分後ですか。</li>
          <li>2人が同じ方向に歩く場合，Ａ君がＢ君を1回目に追いこすのは，出発してから何分後ですか。また，2回目に追いこすのは，出発してから何分後ですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === 'opposite' ? ' active' : ''}`} onClick={() => { setMode('opposite'); setT(0) }}>(1) 反対方向</button>
        <button className={`jump-btn${mode === 'same' ? ' active' : ''}`} onClick={() => { setMode('same'); setT(0) }}>(2) 同じ方向</button>
      </div>

      <CircularTrackView
        label="1周600m"
        points={[
          { label: 'A', color: '#3182ce', frac: fracA },
          { label: 'B', color: '#dd6b20', frac: fracB },
        ]}
      />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
        {isTogether && <p className="highlight">{mode === 'opposite' ? 'すれちがっています！' : '追いこしています！'}</p>}
      </div>

      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={mode === 'opposite'
          ? [{ label: '(1) 1回目 4分後', t: 4 }, { label: '(1) 2回目 8分後', t: 8 }]
          : [{ label: '(2) 1回目 20分後', t: 20 }, { label: '(2) 2回目 40分後', t: 40 }]}
      />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2人が進んだ道のりの和が池1周分になればよいので，600÷(90＋60)＝<b>4(分後)</b>。2回目は2周分なので，600×2÷(90＋60)＝<b>8(分後)</b>。</p>
        <p>(2) 2人が進んだ道のりの差が池1周分になればよいので，600÷(90－60)＝<b>20(分後)</b>。2回目は2周分の差なので，600×2÷(90－60)＝<b>40(分後)</b>。</p>
      </div>
    </div>
  )
}
