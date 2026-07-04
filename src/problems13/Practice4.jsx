import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const OFFICE = 1800
const T_ARRIVE = 30
const T_LEAVE = 38
const T_SWITCH = 59
const T_MAX = 67

function pos(t) {
  if (t <= T_ARRIVE) return 60 * t
  if (t <= T_LEAVE) return OFFICE
  if (t <= T_SWITCH) return OFFICE - 40 * (t - T_LEAVE)
  return Math.max(0, 960 - 120 * (t - T_SWITCH))
}

export default function Practice4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題4　郵便局への行き帰り</h2>
      <div className="statement">
        <p className="setup">
          みほさんは家から1800mはなれた郵便局まで分速60mで歩いて行きました。郵便局で用事をすませるのに8分かかり，郵便局を出ると，分速40mで家に向かって歩き始めました。しばらくすると雨が降ってきたので，途中からは分速120mで走って家に帰りました。
        </p>
        <ol className="question-list">
          <li>グラフのアにあてはまる数を求めなさい。</li>
          <li>グラフのイ，ウにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={OFFICE} markers={[{ pos: 0, label: '家' }, { pos: OFFICE, label: '郵便局' }]}
        points={[{ label: 'みほ', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '30分後（郵便局に到着）', t: 30 },
          { label: 'ア＝38分後（用事を終え出発）', t: 38 },
          { label: 'イ＝59分後（分速120mに切りかえ・ウ＝960m）', t: 59 },
          { label: '67分後（家に帰着）', t: 67 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={OFFICE} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="郵便局"
          series={[{ label: 'みほ', color: '#3182ce', fn: pos }]} markLines={[{ t: 38, label: 'ア' }, { t: 59, label: 'イ' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1800÷60＋8＝<b>38</b> …ア</p>
        <p>
          (2) 分速40mと分速120mで合わせて，67－38＝29(分間)で1800m進んでいるので，はじめにすべて分速40mで歩いたと考えます。
          40×29＝1160(m)。(1800－1160)÷(120－40)＝8(分間)。したがって，イ 67－8＝<b>59(分)</b>，ウ 120×8＝<b>960(m)</b>
        </p>
      </div>
    </div>
  )
}
