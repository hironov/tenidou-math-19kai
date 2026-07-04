import { useState } from 'react'

const A = { id: 'A', x: 150, y: 20, label: 'A' }
const D = { id: 'D', x: 120, y: 73, label: 'D' }
const E = { id: 'E', x: 90, y: 127, label: 'E' }
const B = { id: 'B', x: 60, y: 180, label: 'B' }
const F = { id: 'F', x: 120, y: 180, label: 'F' }
const G = { id: 'G', x: 180, y: 180, label: 'G' }
const C = { id: 'C', x: 240, y: 180, label: 'C' }
const H = { id: 'H', x: 210, y: 127, label: 'H' }
const I = { id: 'I', x: 180, y: 73, label: 'I' }
const POINTS = [A, D, E, B, F, G, C, H, I]

const COLLINEAR = [
  ['A', 'D', 'E'], ['A', 'D', 'B'], ['A', 'E', 'B'], ['D', 'E', 'B'],
  ['B', 'F', 'G'], ['B', 'F', 'C'], ['B', 'G', 'C'], ['F', 'G', 'C'],
  ['C', 'H', 'I'], ['C', 'H', 'A'], ['C', 'I', 'A'], ['H', 'I', 'A'],
]
const EQUILATERAL = [
  ['A', 'D', 'I'], ['B', 'F', 'E'], ['C', 'H', 'G'],
  ['A', 'E', 'H'], ['B', 'G', 'D'], ['C', 'I', 'F'],
  ['A', 'B', 'C'],
  ['D', 'F', 'H'], ['E', 'G', 'I'],
]

function setEq(a, b) {
  return a.length === b.length && [...a].sort().join() === [...b].sort().join()
}

export default function AdvancedA3() {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return [id]
      return [...prev, id]
    })
  }

  const full = selected.length === 3
  const isCollinear = full && COLLINEAR.some((s) => setEq(s, selected))
  const isEquilateral = full && EQUILATERAL.some((s) => setEq(s, selected))
  const selPoints = selected.map((id) => POINTS.find((p) => p.id === id))
  const pathD = full ? selPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + (isCollinear ? '' : ' Z') : ''

  return (
    <div className="problem">
      <h2>応用問題A-3　正三角形の中の点</h2>
      <div className="statement">
        <p className="setup">正三角形ＡＢＣの各辺を3等分する点Ｄ，Ｅ，Ｆ，Ｇ，Ｈ，Ｉをとります。点Ａ～Ｉの9個の点から3個の点を選びます。点をクリックして選んでみましょう。</p>
        <ol className="question-list">
          <li>3個の点の組み合わせは何通りありますか。</li>
          <li>選んだ3個の点が一直線上にならぶような3個の点の組み合わせは何通りありますか。</li>
          <li>選んだ3個の点を頂点とする三角形が正三角形になるような3個の点の組み合わせは何通りありますか。</li>
        </ol>
      </div>

      <svg width={300} height={200} className="tank-view">
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke="#cbd5e0" strokeWidth="1.5" strokeDasharray="4 3" />
        {full && (
          <path d={pathD} fill={isCollinear ? 'none' : isEquilateral ? '#68d391' : '#63b3ed'} fillOpacity="0.6" stroke={isCollinear ? '#e53e3e' : '#3182ce'} strokeWidth="2" />
        )}
        {POINTS.map((p) => (
          <g key={p.id} onClick={() => toggle(p.id)} style={{ cursor: 'pointer' }}>
            <circle cx={p.x} cy={p.y} r={9} fill={selected.includes(p.id) ? '#e53e3e' : '#4a5568'} />
            <text x={p.x} y={p.y - 14} fontSize="12" textAnchor="middle" fill="#2d3748">{p.label}</text>
          </g>
        ))}
      </svg>
      <p className="readout">
        {!full ? `点を3個クリックして選んでください（${selected.length}/3）` : isCollinear ? '一直線上にならぶため、図形はできません。' : isEquilateral ? '正三角形になりました！' : '三角形はできますが、正三角形ではありません。'}
      </p>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) <sub>9</sub>C<sub>3</sub>＝9×8×7÷(3×2×1)＝<b>84(通り)</b></p>
        <p>(2) 辺ＡＢ上にならぶ … <sub>4</sub>C<sub>3</sub>＝<sub>4</sub>C<sub>1</sub>＝4(通り)。これは3辺すべて等しいので，4×3＝<b>12(通り)</b></p>
        <p>
          (3) 4種類の正三角形があります。三角形ＡＤＩと同じ…3通り。三角形ＡＥＨと同じ…3通り。三角形ＡＢＣと同じ…1通り。三角形ＤＦＨと同じ…2通り。以上より，3＋3＋1＋2＝<b>9(通り)</b>
        </p>
        <p>正方形や正三角形を探す問題では，「ななめの形」に注意しましょう。</p>
      </div>
    </div>
  )
}
