import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 1200 // cm3/分
const SEGMENTS = [
  { height: 35, area: 240 },
  { height: 21, area: 800 },
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function Example1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>例題1　水量の変化とグラフ</h2>
      <div className="statement">
        <p className="setup">
          直方体を組み合わせた形の容器が床に固定されています。この容器に一定の割合で水を入れました。グラフは，水を入れ始めてからの時間と水面の高さの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>毎分何Ｌの割合で水を入れましたか。</li>
          <li>図のxの長さ（上の段の底面積を作る一辺）は何cmですか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '7分後（下段が満水）', t: 7 }, { label: '21分後（上段まで満水）', t: 21 }]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={56} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 7, label: '7' }, { t: 21, label: '21' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 下段の部分は，35÷7＝5(cm/分)で上昇しています。よって，1分で入れる水の量は，240×5＝1200(cm3) → <b>1.2Ｌ/分</b>。</p>
        <p>(2) 上段の部分は，21÷14＝1.5(cm/分)で上昇しています。xの長さは，1200÷1.5÷16＝<b>50(cm)</b>。</p>
      </div>
    </div>
  )
}
