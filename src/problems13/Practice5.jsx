import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 12000 // m
const SPEED = 3000 / 60 // m/分（時速3km）
const WALK_T = 50
const REST_T = 5
const CYCLE = WALK_T + REST_T
const T_MAX = 300

function pos(t) {
  const cycles = Math.floor(t / CYCLE)
  const rem = t - cycles * CYCLE
  const local = rem <= WALK_T ? SPEED * rem : SPEED * WALK_T
  return Math.min(DIST, cycles * SPEED * WALK_T + local)
}

function toClock(t) {
  const totalMin = Math.round(6 * 60 + 30 + t)
  const hh = Math.floor(totalMin / 60)
  const mm = totalMin % 60
  return `午前${hh}時${mm}分`
}

export default function Practice5() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 10 })

  return (
    <div className="problem">
      <h2>練習問題5　50分歩いて5分休む登山</h2>
      <div className="statement">
        <p className="setup">
          なおと君は午前6時30分に登山口を出発して，12kmはなれた山頂まで行くことにしました。なおと君は時速3kmで50分歩くごとに5分休みます。
        </p>
        <ol className="question-list">
          <li>午前8時30分には，登山口から何kmの地点にいますか。</li>
          <li>山頂に着く時刻は午前何時何分ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '登山口' }, { pos: DIST, label: '山頂' }]}
        points={[{ label: 'なおと', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout">
        <p>出発からの経過：<b>{t.toFixed(0)}</b> 分後　＝　<b>{toClock(t)}</b></p>
        <p>登山口からの道のり：<b>{(pos(t) / 1000).toFixed(2)}</b> km</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate} rateOptions={[1, 10, 30]}
        jumps={[{ label: '120分後（午前8時30分・5.5km）', t: 120 }, { label: '260分後（山頂に到着）', t: 260 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="登山口" yTopLabel="山頂"
          series={[{ label: 'なおと', color: '#3182ce', fn: pos }]} markLines={[{ t: 120, label: '120' }, { t: 260, label: '260' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) なおと君は，55(＝50＋5)分周期で歩きます。午前8時30分－午前6時30分＝2時間＝120分。120÷55＝2(組)あまり10(分)。
          したがって，8時30分時点で進んだ道のりは，50×2＋10＝110(分)。3×110/60＝<b>5.5(km)</b>
        </p>
        <p>
          (2) 山頂に着くまでに歩いた時間は，12÷3＝4(時間) ⇒ 240分。1つの周期で50分間歩くので，周期は，240÷50＝4(組)あまり40(分)。
          したがって，山頂に着く時刻は，午前6時30分＋55分×4＋40分＝<b>午前10時50分</b>
        </p>
      </div>
    </div>
  )
}
