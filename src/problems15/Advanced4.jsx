import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const CYCLE = 5 // 分
const FWD_T = 3 // 分
const SPEED = 50 // cm/分

function pos(t) {
  const n = Math.floor(t / CYCLE)
  const r = t - n * CYCLE
  const base = n * SPEED
  if (r <= FWD_T) return base + SPEED * r
  return base + SPEED * FWD_T - SPEED * (r - FWD_T)
}

const T_MAX = 100

export default function Advanced4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>最難関問題集4　くり返し動くロボット</h2>
      <div className="statement">
        <p className="setup">
          あるロボットは，スタート地点から一直線上を，分速50cmで3分間前に進み，そのあと分速50cmで2分間後ろにもどる，という動きを何度もくり返します。
        </p>
        <ol className="question-list">
          <li>ロボットが動き始めてから30分後，ロボットはスタート地点から何m離れていますか。</li>
          <li>ロボットがスタート地点から900cmはなれた地点に初めて達するのは，動き始めてから何分後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={1000}
        markers={[{ pos: 0, label: 'スタート' }, { pos: 900, label: '900cm' }]}
        points={[{ label: '●', color: '#3182ce', pos: Math.min(1000, pos(t)) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　スタートからの距離：<b>{pos(t).toFixed(0)}</b> cm</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '30分後', t: 30 }, { label: '78分後（900cmに初到達）', t: 78 }]} />

      <div className="graph-block">
        <h3>スタートからの距離のグラフ</h3>
        <PositionDiagram tMax={T_MAX} yMax={1000} t={t} yLabel="cm" xLabel="(分)" yBottomLabel="0" yTopLabel="1000"
          series={[{ label: '●', color: '#3182ce', fn: (tt) => pos(tt) }]} markLines={[{ t: 30, label: '30' }, { t: 78, label: '78' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>1回の動き(3分前進＋2分後退＝5分)で，ロボットはスタート地点から，50×3－50×2＝<b>50(cm)</b>だけ前に進みます。</p>
        <p>(1) 30分＝5分×6(回)なので，ちょうど6回くり返した地点にいます。50×6＝300(cm)＝<b>3(m)</b></p>
        <p>
          (2) n回目の動きの「前に進みきった瞬間」に，スタート地点から最も遠くなり，その距離は，50×(n－1)＋50×3＝50×n＋100(cm)です。
          これが900cmに初めて達するのは，50×n＋100＝900 より，n＝16(回目)。16回目の前進が終わるのは，5×15＋3＝<b>78(分後)</b>です。
        </p>
      </div>
    </div>
  )
}
