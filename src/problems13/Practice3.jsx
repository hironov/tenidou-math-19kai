import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 2400
const SWITCH_T = 12
const T_MAX = 26

function pos(t) {
  if (t <= SWITCH_T) return (5000 / 60) * t
  return Math.min(DIST, 1000 + (6000 / 60) * (t - SWITCH_T))
}

export default function Practice3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題3　いつもより遅れて登校</h2>
      <div className="statement">
        <p className="setup">
          わかなさんの家から学校までは2.4kmあります。わかなさんは毎朝同じ時刻に家を出て，時速4kmで歩いて登校していますが，今日はねぼうをしてしまい，家を出る時刻がふだんよりも12分おそくなってしまいました。今日は家から時速5kmで歩き始め，途中からは時速6kmで走りましたが，学校に着いた時刻はふだんよりも2分おそくなりました。
        </p>
        <ol className="question-list">
          <li>今日は，家から学校まで何分かかりましたか。</li>
          <li>今日，時速5kmで歩いた道のりは何kmですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '学校' }]}
        points={[{ label: 'わかな', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '12分後（時速6kmに切りかえ・1km）', t: 12 }, { label: '26分後（学校に到着）', t: 26 }]} />

      <div className="graph-block">
        <h3>道のりのグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="学校"
          series={[{ label: 'わかな', color: '#3182ce', fn: pos }]} markLines={[{ t: 12, label: '12' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 普段，家から学校までかかる時間は，2.4÷4＝0.6(時間) ⇒ 36分間。したがって，今日，家から学校までかかった時間は，36－12＋2＝<b>26(分)</b></p>
        <p>(2) 26分すべて時速6kmで走ったとすると，6×26/60＝2.6(km)。時速5kmで歩いた時間は，(2.6－2.4)÷(6－5)＝0.2(時間)。したがって，時速5kmで歩いた道のりは，5×0.2＝<b>1(km)</b></p>
      </div>
    </div>
  )
}
