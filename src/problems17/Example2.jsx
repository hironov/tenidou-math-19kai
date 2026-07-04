import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 300
const ANI_SPEED = 60
const OTOTO_SPEED = 40
const T_MAX = 20

export default function Example2() {
  const [mode, setMode] = useState('opposite')
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX, { loop: true })

  const fracAni = (ANI_SPEED * t) / LAP
  const dir = mode === 'opposite' ? -1 : 1
  const fracOtoto = (dir * OTOTO_SPEED * t) / LAP

  return (
    <div className="problem">
      <h2>例題2　すれちがい・追いこしの時間から速さを求める</h2>
      <div className="statement">
        <p className="setup">
          1周300ｍの池のまわりを，兄と弟が，それぞれ一定の速さで同じ地点から同時に歩き出します。
          2人が反対の方向に歩くと，出発してから3分後に2人ははじめてすれちがい，2人が同じ方向に歩くと，
          出発してから15分後に兄ははじめて弟を追いこします。
        </p>
        <ol className="question-list"><li>兄，弟の速さはそれぞれ分速何ｍですか。</li></ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === 'opposite' ? ' active' : ''}`} onClick={() => { setMode('opposite'); setT(3) }}>反対方向（3分後にすれちがう）</button>
        <button className={`jump-btn${mode === 'same' ? ' active' : ''}`} onClick={() => { setMode('same'); setT(15) }}>同じ方向（15分後に追いこす）</button>
      </div>

      <CircularTrackView
        label="1周300m"
        points={[
          { label: '兄(60)', color: '#3182ce', frac: fracAni },
          { label: '弟(40)', color: '#dd6b20', frac: fracOtoto },
        ]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後（兄：分速60m，弟：分速40m として検証中）</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} />

      <div className="explain">
        <h3>解説</h3>
        <p>反対方向に歩くとき，300÷(兄＋弟)＝3(分後) より，兄＋弟＝100(ｍ/分)。</p>
        <p>同じ方向に歩くとき，300÷(兄－弟)＝15(分後) より，兄－弟＝20(ｍ/分)。</p>
        <p>よって，和差算より，兄＝(100＋20)÷2＝<b>60(ｍ/分)</b>，弟＝(100－20)÷2＝<b>40(ｍ/分)</b>です。</p>
      </div>
    </div>
  )
}
