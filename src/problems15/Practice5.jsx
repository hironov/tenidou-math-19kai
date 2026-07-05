import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 4000 // cm3/分
const SEGMENTS = [
  { height: 20, area: 600 }, // 円柱A・Bの両方がある区間（1200－200－400）
  { height: 20, area: 800 }, // Aの高さ(20cm)を超え，Bだけが残る区間（1200－400）
  { height: 20, area: 1200 }, // Bの高さ(40cm)も超えた区間（容器全体）
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function Practice5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>練習問題5　容器の底に2本の円柱</h2>
      <div className="statement">
        <p className="setup">
          たて30cm，横40cm，高さ60cmの直方体の容器の底に，円柱の形をした2つのつつＡ(高さ20cm)，Ｂ(高さ40cm)が固定されています。Ａの底面積は200cm2です。この容器に一定の割合で水を入れたところ，水面の高さが40cmをこえてから60cm(満水)になるまでに6分かかりました。また，水を入れ始めてから3分後に水面の高さがＡの高さ(20cm)になりました。
        </p>
        <ol className="question-list">
          <li>毎分何cm3の割合で水を入れましたか。</li>
          <li>Ｂの底面積は何cm2ですか。</li>
          <li>水面の高さがＢの高さ(40cm)になるのは，水を入れ始めてから何分後ですか。</li>
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
          { label: '3分後（Aの高さ20cm）', t: 3 },
          { label: '7分後（Bの高さ40cm）', t: 7 },
          { label: '13分後（満水）', t: 13 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={60} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={[{ t: 3, label: '3' }, { t: 7, label: '7' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＡもＢもこえたあとは，容器全体(底面積1200cm2)に水がたまります。1200×(60－40)÷6＝<b>4000(cm3/分)</b></p>
        <p>(2) 深さ20cmになるまでにたまった部分の底面積は，4000×3÷20＝600(cm2)。これは，容器全体からＡとＢの底面積を引いたものなので，Ｂの底面積は，1200－(200＋600)＝<b>400(cm2)</b></p>
        <p>(3) Ａをこえてから(容器全体－Ｂ＝800cm2の部分に水がたまる)Ｂの高さになるまでの時間は，800×20÷4000＝4(分)。よって，3＋4＝<b>7(分後)</b></p>
      </div>
    </div>
  )
}
