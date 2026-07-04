import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 600 // cm3/分（毎分0.6Ｌ）
const SEGMENTS = [
  { height: 15, area: 240 },
  { height: 12, area: 700 },
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function Practice1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>練習問題1　水量の変化とグラフ（応用）</h2>
      <div className="statement">
        <p className="setup">
          直方体を組み合わせた形の容器が床に固定されています。この容器に毎分0.6Ｌの割合で水を入れました。グラフは，水を入れ始めてからの時間と水面の高さの関係を表したものです。(図1)のx，yの長さはそれぞれ何cmですか。
        </p>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '6分後（下段が満水・15cm）', t: 6 }, { label: '20分後（上段まで満水・27cm）', t: 20 }]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={27} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 6, label: '6' }, { t: 20, label: '20' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>図の下段の部分は，15÷6＝2.5(cm/分)で上昇しています。よって，yは，600÷2.5÷20＝<b>12(cm)</b></p>
        <p>図の上段の部分は，12÷14＝6/7(cm/分)で上昇しています。よって，xは，600÷(6/7)÷35＝<b>20(cm)</b></p>
      </div>
    </div>
  )
}
