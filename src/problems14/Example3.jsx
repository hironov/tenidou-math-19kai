import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'

const RATE_LOWER = 4 // cm/分（下段の上昇速度）
const RATE_UPPER = 1 // cm/分（上段の上昇速度）
const T_MAX = 16
const X = 20 // 下の円柱の高さ

function depthAt(t) {
  if (t <= 5) return RATE_LOWER * t
  return X + RATE_UPPER * (t - 5)
}

const SEGMENTS = [
  { height: 20, relWidth: 6 },
  { height: 20, relWidth: 12 },
]

export default function Example3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>例題3　円柱を組み合わせた容器</h2>
      <div className="statement">
        <p className="setup">
          円柱を組み合わせた形の容器に，一定の割合で水を入れました。グラフは，水を入れ始めてからの時間と水面の高さの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>下の円柱の部分の高さ(x)は何cmですか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '2分後（8cm）', t: 2 },
          { label: '5分後（x＝20cmに到達）', t: 5 },
          { label: '10分後（25cm）', t: 10 },
          { label: '16分後（31cm）', t: 16 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={31} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 2, label: '2' }, { t: 10, label: '10' }, { t: 16, label: '16' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          8÷2＝4(cm/分)…下段の1分間あたりの上昇量。(31－25)÷(16－10)＝1(cm/分)…上段の1分間あたりの上昇量。
          水を入れ始めてから16分間で合計31cm上昇しているので，つるかめ算を利用すると，毎分4cmで上昇した時間は，
          (31－1×16)÷(4－1)＝5(分)。したがって，下の円柱の高さ(x)は，4×5＝<b>20(cm)</b>です。
        </p>
      </div>
    </div>
  )
}
