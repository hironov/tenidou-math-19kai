import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 10 // km
const T_MAX = 8

function pos(t) {
  if (t <= 2) return 4 * t
  if (t <= 3) return 8
  if (t <= 4) return 8 + 2 * (t - 3)
  if (t <= 5) return 10
  return Math.max(0, 10 - 5 * (t - 5))
}

export default function Basic3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>基本問題3　グラフをかく</h2>
      <div className="statement">
        <p className="setup">
          10kmはなれたＡ地点とＢ地点の間を1往復しました。Ａ地点から時速4kmで2時間進み，1時間休んでから，そこからＢ地点までは時速2kmで進みました。Ｂ地点でふたたび1時間休むと，帰りは途中で休まずに時速5kmで進みました。Ａ地点を出発してからの時間と，Ａ地点からのきょりの関係を表すグラフを，右の図にかきなさい。
        </p>
      </div>

      <LinearTrackView length={DIST} markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }]}
        points={[{ label: '●', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 時間後　／　Ａ地点からの道のり：<b>{pos(t).toFixed(2)}</b> km</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} step={0.05}
        jumps={[
          { label: '2時間後（8km・時速4km終了）', t: 2 },
          { label: '3時間後（休けい終了）', t: 3 },
          { label: '4時間後（Bに到着・10km）', t: 4 },
          { label: '5時間後（休けい終了・帰り出発）', t: 5 },
          { label: '7時間後（Aに帰着）', t: 7 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(km)" xLabel="時間(時間)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '●', color: '#3182ce', fn: pos }]} markLines={[{ t: 2, label: '2' }, { t: 3, label: '3' }, { t: 4, label: '4' }, { t: 5, label: '5' }, { t: 7, label: '7' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          はじめから，順に進んだ道のりを調べます。時速4kmで進んだきょりは，4×2＝8(km)。時速2kmで進んだ時間は，(10－8)÷2＝1(時間)。
          時速5kmで進んだ時間は，10÷5＝2(時間)。これらをグラフにまとめると，右の図のようになります。
        </p>
      </div>
    </div>
  )
}
