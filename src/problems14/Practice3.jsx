import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 6000 // cm3/分（毎分6Ｌ）
const SEGMENTS = [
  { height: 50, area: 2400 }, // おもりBがある区間（容器Aの底面積6000－おもりBの底面積3600）
  { height: 25, area: 6000 }, // おもりBの高さを超えた区間
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function Practice3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>練習問題3　円柱容器の底におもり</h2>
      <div className="statement">
        <p className="setup">
          円柱の形の容器Ａの底に円柱のおもりＢが置かれています。この容器に毎分6Ｌの割合で水を入れました。グラフは，水を入れ始めてからの時間と水面の高さの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>容器Ａの底面積は何cm2ですか。</li>
          <li>おもりＢの底面積は何cm2ですか。</li>
          <li>おもりＢの高さは何cmですか。</li>
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
        jumps={[
          { label: '18分後（45cm）', t: 18 },
          { label: '20分後（おもりBの高さ50cmを通過）', t: 20 },
          { label: '27分後（57cm）', t: 27 },
          { label: '45分後（75cm）', t: 45 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={75} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 18, label: '18' }, { t: 27, label: '27' }, { t: 45, label: '45' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 円柱Ｂの高さを超えたあとの1分間あたりの水面の上昇量は，(75－57)÷(45－27)＝1(cm/分)。6Ｌ＝6000cm3 より，6000÷1＝<b>6000(cm2)</b>…容器Ａの底面積</p>
        <p>(2) 45÷18＝2.5(cm/分)…円柱Ｂの高さを超えるまでの1分間あたりの水面の上昇量。6000÷2.5＝2400(cm2)…容器Ａの底面積－容器Ｂの底面積。容器Ｂの底面積は，6000－2400＝<b>3600(cm2)</b></p>
        <p>(3) はじめは毎分2.5cm，途中から毎分1cmの速さで上昇し，45分間で合計75cm上昇するので，毎分2.5cmの速さで上昇した時間は，(75－1×45)÷(2.5－1)＝20(分)。したがって，円柱Ｂの高さは，2.5×20＝<b>50(cm)</b></p>
      </div>
    </div>
  )
}
