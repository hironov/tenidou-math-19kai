import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const CIRC = 5250
const SPEED_HANAKO = 55
const SPEED_TARO = 70

const DAYS = [
  { key: '1', label: '1日目（反対向き）', tMax: 90 },
  { key: '2', label: '2日目（同じ向き）', tMax: 90 },
  { key: '3', label: '3日目（3人）', tMax: 60 },
]

export default function Advanced8() {
  const [dayKey, setDayKey] = useState('1')
  const [x, setX] = useState(6)
  const day = DAYS.find((d) => d.key === dayKey)
  const { t, setT, playing, setPlaying } = useAnimatedTime(day.tMax)

  const fracHanako = (SPEED_HANAKO * t) / CIRC
  let points = []
  if (dayKey === '1') {
    const fracTaro = t <= 50 ? 0 : -(SPEED_TARO * (t - 50)) / CIRC
    points = [{ label: '花子', color: '#dd6b20', frac: fracHanako }, { label: '太郎', color: '#3182ce', frac: fracTaro }]
  } else if (dayKey === '2') {
    const fracTaro = t <= 15 ? 0 : (SPEED_TARO * (t - 15)) / CIRC
    points = [{ label: '花子', color: '#dd6b20', frac: fracHanako }, { label: '太郎', color: '#3182ce', frac: fracTaro }]
  } else {
    const fracJiro = t <= x ? 0 : (2310 / 36) * (t - x) / CIRC
    const fracTaro = t <= x + 3 ? 0 : (SPEED_TARO * (t - x - 3)) / CIRC
    points = [
      { label: '花子', color: '#dd6b20', frac: fracHanako },
      { label: '次郎', color: '#38a169', frac: fracJiro },
      { label: '太郎', color: '#3182ce', frac: fracTaro },
    ]
  }

  return (
    <div className="problem">
      <h2>最難関8　池のまわりを歩く3人（3日間）</h2>
      <div className="statement">
        <p className="setup">
          太郎君と花子さんは1周5250mの池のまわりを毎日1周歩くことにしました。ただし，2人はいつも同じＰ地点から歩き出し，それぞれ一定の速さで歩くことにします。
        </p>
        <p>1日目：太郎君は，花子さんが出発してから50分後に，花子さんと反対向きに歩き出しました。花子さんはＰ地点から3850m歩いたところで，太郎君とすれちがいました。</p>
        <p>2日目：太郎君は，花子さんが出発してから15分後に，花子さんと同じ向きに歩き出しました。花子さんはＰ地点から3850m歩いたところで，太郎君に追いこされました。</p>
        <ol className="question-list">
          <li>「太郎君が2日目に花子さんを追いこすまでに歩いた道のり」は，「太郎君が1日目に花子さんとすれちがうまでに歩いた道のり」よりも何m長いですか。</li>
          <li>太郎君と花子さんの速さは，それぞれ分速何mですか。</li>
        </ol>
        <p>3日目：次郎君も2人と同じようにＰ地点から1周歩くことにしました。花子さんが先に出発し，その ？ 分後に次郎君が花子さんと同じ向きに，その3分後に太郎君も2人と同じ向きに歩き出しました。太郎君が出発してから33分後に，次郎君と太郎君は花子さんを同時に追いこしました。</p>
        <ol className="question-list" start="3">
          <li>？にあてはまる数はいくつですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {DAYS.map((d) => (
          <button key={d.key} className={`jump-btn${d.key === dayKey ? ' active' : ''}`} onClick={() => { setDayKey(d.key); setT(0) }}>{d.label}</button>
        ))}
      </div>
      {dayKey === '3' && (
        <p className="readout">次郎君の出発の遅れ（？分後）：<input type="range" min={0} max={20} value={x} onChange={(e) => setX(parseInt(e.target.value, 10))} /> {x}分後</p>
      )}

      <CircularTrackView points={points} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={day.tMax} playing={playing} setPlaying={setPlaying} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 「2日目に追いこすまで」は花子さんと同じ3850m。「1日目にすれちがうまで」は，5250－3850＝1400(m)。よって，この差は，3850－1400＝<b>2450(m)</b></p>
        <p>
          (2) 1日目と2日目で太郎君が歩いた時間の差は，50－15＝35(分)。この時間で2450m分の差が出るので，太郎君の速さは，2450÷35＝<b>70(m/分)</b>。1日目で太郎君が歩いたのは，1400÷70＝20(分間)なので，花子さんが歩いたのは，20＋50＝70(分間)。よって，花子さんの速さは，3850÷70＝<b>55(m/分)</b>
        </p>
        <p>
          (3) 太郎君が花子さんに追いつくまでに進んだ道のりは，70×33＝2310(m)なので，ここまでに花子さんは，2310÷55＝42(分)かかっています。次郎君は同じ道のりを，33＋3＝36(分)で進んでいますので，花子さんと次郎君のかかった時間の差は，42－36＝<b>6(分)</b>
        </p>
      </div>
    </div>
  )
}
