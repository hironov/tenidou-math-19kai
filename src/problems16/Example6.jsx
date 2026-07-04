import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 3360 // 解説で求まる値
const SPEED_ANI = 160
const SPEED_OTOTO = 120
const T_MAX = 30

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtoto(t) { return pingpong(SPEED_OTOTO * t, DIST) }

export default function Example6() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>例題6　折り返しの旅人算</h2>
      <div className="statement">
        <p className="setup">
          兄と弟がＡ地点を同時に出発して，兄は分速160ｍ，弟は分速120ｍでそれぞれＡ地点とＢ地点の間を1往復しました。
          弟はＢ地点の480ｍ手前で，先にＢ地点を折り返してきた兄とすれちがいました。
        </p>
        <ol className="question-list">
          <li>2人がすれちがったのは，出発してから何分後ですか。</li>
          <li>Ａ地点とＢ地点は何ｍはなれていますか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }, { pos: DIST - 480, label: '480m手前' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '24分後（すれちがい）', t: 24 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム（位置と時間の関係）</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 24, label: '24' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 兄が480ｍ進むには，480÷160＝3(分)かかります。この間，兄弟の進んだ道のりの差は，480×2＝960(ｍ)なので，960÷(160－120)＝<b>24(分後)</b>。</p>
        <p>(2) 弟は24分間で，120×24＝2880(ｍ)進むので，ＡＢ間の道のりは，2880＋480＝<b>3360(ｍ)</b>。</p>
      </div>
    </div>
  )
}
