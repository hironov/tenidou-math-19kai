import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'
import { pointAtDistance, polygonArea } from '../utils/motion'

const A = { x: 300, y: 20 }
const C = { x: 300, y: 200 }
const B = { x: 60, y: 200 }
const PATH = [A, C, B]
const T_MAX = 28

function areaAt(t) {
  const p = pointAtDistance(PATH, t, false)
  return polygonArea([A, B, p])
}

export default function Basic10() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const p = pointAtDistance(PATH, t, false)
  const area = areaAt(t)

  return (
    <div className="problem">
      <h2>基本問題10　辺上を動く点と面積</h2>
      <div className="statement">
        <p className="setup">
          直角三角形ＡＢＣがあります（ＡＣ＝12cm，ＢＣ＝16cm，Ｃが直角）。点ＰはＡを出発して，秒速1cmで辺上をＡ→Ｃ→Ｂの順に動きます。
        </p>
        <ol className="question-list">
          <li>点Ｐが出発してから5秒後の三角形ＡＢＰの面積は何cm2ですか。</li>
          <li>三角形ＡＢＰの面積がはじめて24cm2になるのは，点Ｐが出発してから何秒後ですか。</li>
          <li>三角形ＡＢＰの面積が2回目に24cm2になるのは，点Ｐが出発してから何秒後ですか。</li>
        </ol>
      </div>

      <svg width={360} height={220} className="tank-view">
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${p.x},${p.y}`} fill="#63b3ed" fillOpacity="0.5" stroke="#3182ce" strokeWidth="1.5" />
        <circle cx={p.x} cy={p.y} r={6} fill="#e53e3e" />
        <text x={A.x + 6} y={A.y} fontSize="13" fontWeight="bold">A</text>
        <text x={B.x - 16} y={B.y + 4} fontSize="13" fontWeight="bold">B</text>
        <text x={C.x + 6} y={C.y + 4} fontSize="13" fontWeight="bold">C</text>
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 秒後　／　三角形ＡＢＰの面積：<b>{area.toFixed(1)}</b> cm2</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '3秒後（はじめて24cm2）', t: 3 }, { label: '5秒後', t: 5 }, { label: '12秒後（Pが Cに到着）', t: 12 }, { label: '24秒後（2回目に24cm2）', t: 24 }]} />

      <div className="graph-block">
        <h3>面積の変化のグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={100} valueFn={areaAt} t={t} yLabel="cm²" xLabel="(秒)" markLines={[{ t: 3, label: '3' }, { t: 12, label: '12' }, { t: 24, label: '24' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1×5＝5(cm)…5秒後のＡＰの長さ。5×16÷2＝<b>40(cm2)</b></p>
        <p>(2) ＰがＡＣ上にあるとき，□×16÷2＝24(cm2) となるのは，□＝3のときです。よって，3÷1＝<b>3(秒後)</b></p>
        <p>(3) ＰがＢＣ上にあるとき，□×12÷2＝24(cm2) となるのは，□＝4のときです。これがＢＰの長さなので，Ｐが進んだ長さは，12＋16－4＝24(cm)。24÷1＝<b>24(秒後)</b></p>
      </div>
    </div>
  )
}
