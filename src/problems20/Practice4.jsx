import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { polygonArea } from '../utils/motion'

const SIDE = 30
const SCALE = 6
const T_MAX = 15

function pingpong(dist, d) {
  const period = 2 * d
  const raw = ((dist % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posP(t) { return pingpong(5 * t, SIDE) } // Aからの距離（AD上）
function posQFromC(t) { return pingpong(3 * t, SIDE) } // Cからの距離（BC上）

export default function Practice4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const ap = posP(t)
  const qFromC = posQFromC(t)
  const qX = SIDE - qFromC // Bからの距離

  const A = { x: 0, y: 0 }
  const B = { x: 0, y: SIDE }
  const P = { x: ap, y: 0 }
  const Q = { x: qX, y: SIDE }
  const area = polygonArea([A, P, Q])
  const isRect = Math.abs(ap - qX) < 0.05

  return (
    <div className="problem">
      <h2>練習問題4　正方形の辺上を往復する2点</h2>
      <div className="statement">
        <p className="setup">
          正方形ＡＢＣＤ（1辺30cm）があります。点ＰはＡを出発して，秒速5cmで辺ＡＤ上を往復し続けます。点ＱはＣを出発して，秒速3cmで辺ＢＣ上を往復し続けます。いま，点Ｐと点Ｑが同時に出発しました。
        </p>
        <ol className="question-list">
          <li>三角形ＡＰＱの面積がはじめて正方形ＡＢＣＤの面積の半分になるのは，2点が出発してから何秒後ですか。</li>
          <li>四角形ＡＢＱＰが1回目，2回目に長方形になるのは，それぞれ2点が出発してから何秒後ですか。</li>
        </ol>
      </div>

      <svg width={SIDE * SCALE + 40} height={SIDE * SCALE + 40} className="tank-view">
        <polygon points={`20,20 ${20 + SIDE * SCALE},20 ${20 + SIDE * SCALE},${20 + SIDE * SCALE} 20,${20 + SIDE * SCALE}`} fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points={`20,20 ${20 + P.x * SCALE},20 ${20 + Q.x * SCALE},${20 + SIDE * SCALE}`} fill="#63b3ed" fillOpacity="0.5" stroke="#3182ce" strokeWidth="1.5" />
        <circle cx={20 + P.x * SCALE} cy={20} r={5} fill="#3182ce" /><text x={20 + P.x * SCALE} y={12} fontSize="11" textAnchor="middle">P</text>
        <circle cx={20 + Q.x * SCALE} cy={20 + SIDE * SCALE} r={5} fill="#dd6b20" /><text x={20 + Q.x * SCALE} y={20 + SIDE * SCALE + 16} fontSize="11" textAnchor="middle">Q</text>
        <text x={10} y={16} fontSize="12">A</text><text x={20 + SIDE * SCALE + 4} y={16} fontSize="12">D</text>
        <text x={10} y={20 + SIDE * SCALE + 4} fontSize="12">B</text><text x={20 + SIDE * SCALE + 4} y={20 + SIDE * SCALE + 4} fontSize="12">C</text>
      </svg>
      <div className="readout">
        <p>経過時間：<b>{t.toFixed(2)}</b> 秒後　／　三角形ＡＰＱの面積：<b>{area.toFixed(1)}</b> cm2</p>
        {isRect && <p className="combo-message">ＡＢＱＰが長方形になっています！</p>}
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} step={0.05}
        jumps={[{ label: '6秒後（面積が半分）', t: 6 }, { label: '3.75秒後（1回目の長方形）', t: 3.75 }, { label: '11.25秒後（2回目の長方形）', t: 11.25 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 正方形の面積は30×30＝900(cm2)なので，三角形ＡＰＱの面積が900÷2＝450(cm2)となるときを考えます。ＡＰを底辺としたとき，Ｑの位置がどこであっても，高さは30cmで一定です。
          これより，ＡＰ×30÷2＝450(cm2) より，ＡＰ＝30(cm)。30÷5＝<b>6(秒後)</b>
        </p>
        <p>(2) 練習問題2とまったく同じ状況になります。30÷(5＋3)＝<b>3.75(秒後)</b>…1回目。3.75×3＝<b>11.25(秒後)</b>…2回目</p>
      </div>
    </div>
  )
}
