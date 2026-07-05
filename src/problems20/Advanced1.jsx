import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { ValueGraph } from '../components/ValueGraph'
import { polygonArea } from '../utils/motion'

const SCALE = 20
const A = { x: 0, y: 0 }
const D = { x: 12, y: 0 }
const B = { x: 0, y: 8 }
const C = { x: 12, y: 8 }
const T_MAX = 6

function posP(t) { return { x: 0, y: Math.min(8, 1 * t) } } // A→B
function posQ(t) { return { x: Math.max(0, 12 - 2 * t), y: 8 } } // C→B

function areaPBQD(t) {
  return polygonArea([posP(t), B, posQ(t), D])
}

export default function Advanced1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const p = posP(t)
  const q = posQ(t)
  const area = areaPBQD(t)

  return (
    <div className="problem">
      <h2>最難関1　長方形の中の四角形の面積</h2>
      <div className="statement">
        <p className="setup">
          長方形ＡＢＣＤ（ＡＤ＝12cm，ＡＢ＝8cm）があります。点Ｐは秒速1cmで辺ＡＢ上をＡからＢまで動き，点Ｑは秒速2cmで辺ＢＣ上をＣからＢまで動きます。2点が同時に出発してから点ＱがＢに着くまでの間で，四角形ＰＢＱＤの面積が長方形ＡＢＣＤの面積の半分になるのは，2点が出発してから何秒後ですか。
        </p>
      </div>

      <svg width={12 * SCALE + 40} height={8 * SCALE + 40} className="tank-view">
        <polygon points={`20,20 ${20 + 12 * SCALE},20 ${20 + 12 * SCALE},${20 + 8 * SCALE} 20,${20 + 8 * SCALE}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points={`${20 + p.x * SCALE},${20 + p.y * SCALE} 20,${20 + 8 * SCALE} ${20 + q.x * SCALE},${20 + q.y * SCALE} ${20 + 12 * SCALE},20`} fill="#63b3ed" fillOpacity="0.5" stroke="#3182ce" strokeWidth="1.5" />
        <circle cx={20 + p.x * SCALE} cy={20 + p.y * SCALE} r={5} fill="#3182ce" /><text x={20 + p.x * SCALE - 14} y={20 + p.y * SCALE + 4} fontSize="11">P</text>
        <circle cx={20 + q.x * SCALE} cy={20 + q.y * SCALE} r={5} fill="#dd6b20" /><text x={20 + q.x * SCALE} y={20 + q.y * SCALE + 16} fontSize="11">Q</text>
        <text x={10} y={16} fontSize="12">A</text><text x={20 + 12 * SCALE + 4} y={16} fontSize="12">D</text>
        <text x={10} y={20 + 8 * SCALE + 4} fontSize="12">B</text><text x={20 + 12 * SCALE + 4} y={20 + 8 * SCALE + 4} fontSize="12">C</text>
      </svg>
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 秒後　／　四角形ＰＢＱＤの面積：<b>{area.toFixed(1)}</b> cm2（半分＝48cm2）</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} step={0.02}
        jumps={[{ label: '3と3/7秒後（面積が半分）', t: 24 / 7 }]} />

      <div className="graph-block">
        <h3>四角形ＰＢＱＤの面積の変化</h3>
        <ValueGraph tMax={T_MAX} yMax={96} valueFn={areaPBQD} t={t} yLabel="cm²" xLabel="(秒)" markLines={[{ t: 24 / 7, label: '24/7' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          12×8÷2＝48(cm2) より，三角形ＡＰＤと三角形ＤＱＣの面積の和が48(cm2)になるときを考えます。これを①秒後とすると，ＡＰ＝①cm，ＣＱ＝②cm より，
          ①×12÷2＋②×8÷2＝⑭(cm2)。⑭＝48 より，①＝<b>3と3/7(秒後)</b>
        </p>
      </div>
    </div>
  )
}
