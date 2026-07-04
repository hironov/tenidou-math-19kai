import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1000 // cm
const SPEED = 4 // cm/秒
const WALK_T = 20
const REST_T = 5
const CYCLE = WALK_T + REST_T
const T_MAX = 320

function pos(t) {
  const cycles = Math.floor(t / CYCLE)
  const rem = t - cycles * CYCLE
  const local = rem <= WALK_T ? SPEED * rem : SPEED * WALK_T
  return Math.min(DIST, cycles * SPEED * WALK_T + local)
}

export default function Example6() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 5 })

  return (
    <div className="problem">
      <h2>例題6　間断動作（進んでは止まる）</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は10mはなれています。はじめ，Ａ地点にロボットが置いてあり，このロボットのスイッチを入れたところ，Ｂ地点に向かって秒速4cmで20秒進んでは5秒停止することをくり返しました。
        </p>
        <ol className="question-list">
          <li>スイッチを入れてから1分20秒後，ロボットはＡ地点から何mはなれたところにありますか。</li>
          <li>ロボットがＢ地点に着くのは，スイッチを入れてから何分何秒後ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: 'ロボット', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
        <p>Ａ地点からの距離：<b>{(pos(t) / 100).toFixed(2)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate} rateOptions={[1, 5, 20]}
        jumps={[{ label: '1分20秒後（80秒・2.6m）', t: 80 }, { label: '5分10秒後（Bに到着）', t: 310 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(cm)" xLabel="時間(秒)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: 'ロボット', color: '#3182ce', fn: pos }]} markLines={[{ t: 80, label: '80' }, { t: 310, label: '310' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ロボットは，25(＝20＋5)秒周期で進みます。1分20秒間で進んだ時間は，1分20秒＝80秒。80÷25＝3(組)あまり5(秒)。20×3＋5＝65(秒)。
          したがって，Ａ地点から，4×65＝260(cm) ⇒ <b>2.6m</b> 離れたところにあります。
        </p>
        <p>
          (2) Ｂ地点に着くまでに進んだ時間の合計は，10m＝1000cm，1000÷4＝250(秒)となります。1つの周期で20秒進むので，周期は，
          250÷20＝12(組)あまり10(秒)。したがって，ロボットがＢ地点に着くのは，25×12＋10＝310(秒後) ⇒ <b>5分10秒後</b>
        </p>
      </div>
    </div>
  )
}
