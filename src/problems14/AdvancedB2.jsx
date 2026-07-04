import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 1000 // cm3/秒
const SEGMENTS = [
  { height: 10, area: 1000 }, // 1段目：8個の立方体（幅800cm2）
  { height: 10, area: 1300 }, // 2段目：5個
  { height: 10, area: 1500 }, // 3段目：3個
  { height: 10, area: 1600 }, // 4段目：2個
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function AdvancedB2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>応用問題B-2　積み重ねた立方体と水そう</h2>
      <div className="statement">
        <p className="setup">
          1辺10cmの立方体をいくつか用いて，面と面がぴったり重なるように4段まで積み重ねた立体があります。下から1段目は8個の立方体がならび，2段目の個数は1段目の個数以下，3段目の個数は2段目の個数以下，4段目の個数は3段目の個数以下になっています。この立体を，直方体の形の水そうの底に固定して，一定の割合で水を注ぎます。水を注ぎ始めてから，1秒後の水面の高さは1cm，35秒後の水面の高さは28cm，54秒後の水面の高さは40cmになりました。
        </p>
        <ol className="question-list">
          <li>毎秒何cm3の割合で水を注ぎましたか。</li>
          <li>立方体は全部で何個ありますか。</li>
          <li>下から2段目，3段目，4段目の立方体はそれぞれ何個ありますか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '1秒後（1cm）', t: 1 },
          { label: '10秒後（1段目通過）', t: 10 },
          { label: '35秒後（28cm）', t: 35 },
          { label: '54秒後（40cm・4段目通過）', t: 54 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={40} valueFn={depthAt} t={t} yLabel="cm" xLabel="(秒)"
          markLines={[{ t: 1, label: '1' }, { t: 35, label: '35' }, { t: 54, label: '54' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 水そうの底面積は，60×30＝1800(cm2) より，1秒後までに水が入る部分の底面積は，1800－10×10×8＝1000(cm2)。
          よって，1000×1＝<b>1000(cm3/秒)</b>の割合で水を注いだことがわかります。
        </p>
        <p>
          (2) 54秒後までに入る水の体積は，1000×54＝54000(cm3)。60×30×40－54000＝18000(cm3)…入れた立方体の体積の合計。
          18000÷(10×10×10)＝<b>18(個)</b>
        </p>
        <p>
          (3) 35秒後までに入る水の体積は，1000×35＝35000(cm3)。水面下にある立方体の体積の和は，60×30×28－35000＝15400(cm3)。
          このうち，1段目には立方体が8個あることが確定しているので，その分の体積を引くと，15400－8000＝7400(cm3)。
          10×10×10×●＋10×10×8×▲＝7400 が成り立つので，式全体を100で割ると，10×●＋8×▲＝74。
          (●，▲)＝(1，8)，(5，3)があてはまりますが，●≧▲となる必要があるので，(5，3)に決まります。
          以上より，2段目は<b>5個</b>，3段目は<b>3個</b>，4段目は，18－(8＋5＋3)＝<b>2個</b>です。
        </p>
      </div>
    </div>
  )
}
