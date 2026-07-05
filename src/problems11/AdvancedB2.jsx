import { useState } from 'react'

const EDGES = {
  A: ['B', 'D', 'E'], B: ['A', 'C', 'F'], C: ['B', 'D', 'G'], D: ['A', 'C', 'H'],
  E: ['A', 'F', 'H'], F: ['B', 'E', 'G'], G: ['C', 'F', 'H'], H: ['D', 'E', 'G'],
}
const POS = {
  A: { x: 90, y: 40 }, D: { x: 190, y: 40 }, B: { x: 40, y: 90 }, C: { x: 140, y: 90 },
  E: { x: 90, y: 150 }, H: { x: 190, y: 150 }, F: { x: 40, y: 200 }, G: { x: 140, y: 200 },
}

function computeCounts(steps) {
  let count = { A: 1, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
  for (let s = 0; s < steps; s++) {
    const next = {}
    for (const v of Object.keys(EDGES)) next[v] = 0
    for (const v of Object.keys(EDGES)) for (const n of EDGES[v]) next[n] += count[v]
    count = next
  }
  return count
}

const EDGE_LIST = [
  ['A', 'B'], ['A', 'D'], ['A', 'E'], ['B', 'C'], ['B', 'F'], ['C', 'D'], ['C', 'G'], ['D', 'H'], ['E', 'F'], ['E', 'H'], ['F', 'G'], ['G', 'H'],
]

export default function AdvancedB2() {
  const [step, setStep] = useState(0)
  const counts = computeCounts(step)

  return (
    <div className="problem">
      <h2>応用問題B-2　立方体の頂点を動く点</h2>
      <div className="statement">
        <p className="setup">
          立方体ＡＢＣＤ－ＥＦＧＨの辺上を動く点Ｐは，1回の移動で，となりのどの頂点にも移動することができます。はじめに点Ｐが頂点Ａにあるとき，移動回数を変えて確かめてみましょう。
        </p>
        <ol className="question-list">
          <li>3回の移動で，点Ｐが頂点Ｇにあるように移動する方法は何通りありますか。</li>
          <li>4回の移動で，点Ｐが頂点Ａにあるように移動する方法は何通りありますか。</li>
          <li>5回の移動で，点Ｐが頂点Ｇにあるように移動する方法は何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <button key={n} className={`jump-btn${step === n ? ' active' : ''}`} onClick={() => setStep(n)}>{n}回移動</button>
        ))}
      </div>

      <svg width={240} height={220} className="tank-view">
        {EDGE_LIST.map(([a, b], i) => (
          <line key={i} x1={POS[a].x} y1={POS[a].y} x2={POS[b].x} y2={POS[b].y} stroke="#4a5568" strokeWidth="1.5" />
        ))}
        {Object.entries(POS).map(([v, p]) => (
          <g key={v}>
            <circle cx={p.x} cy={p.y} r={14} fill={v === 'A' && step === 0 ? '#e53e3e' : 'white'} stroke="#3182ce" strokeWidth="2" />
            <text x={p.x} y={p.y + 4} fontSize="11" textAnchor="middle" fill="#2b6cb0">{counts[v]}</text>
            <text x={p.x} y={p.y - 20} fontSize="11" textAnchor="middle" fill="#2d3748">{v}</text>
          </g>
        ))}
      </svg>
      <p className="readout">{step}回の移動後の各頂点にある方法の数（○の中）</p>

      <div className="explain">
        <h3>解説</h3>
        <p>
          「戻ってもよい（遠回りしてもよい）」，「同じ点を何度通ってもよい」ときは，和の法則を用いて，1回ごとに移動する方法を調べていきます。
        </p>
        <p>(1) 3回目に頂点Ｇにある移動の方法は<b>6通り</b></p>
        <p>(2) 4回目に頂点Ａにある移動の方法は<b>21通り</b></p>
        <p>(3) 4回目の図を利用して，20＋20＋20＝<b>60(通り)</b></p>
      </div>
    </div>
  )
}
