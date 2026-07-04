import { useState } from 'react'

// 点をクリックして選び、できる図形（三角形・四角形・一直線）を確認できるウィジェット。
// points: [{ id, x, y, label }]（SVG座標）
// isCollinear(ids): 選んだ点がすべて一直線上にあるかどうかを判定する関数
export function PointsFigure({ points, pickCount, isCollinear, width = 300, height = 220, extraLines = [] }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= pickCount) return [id]
      return [...prev, id]
    })
  }

  const selPoints = selected.map((id) => points.find((p) => p.id === id))
  const full = selected.length === pickCount
  const collinear = full && isCollinear ? isCollinear(selected) : false
  const pathD = full ? selPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + (collinear ? '' : ' Z') : ''

  return (
    <div>
      <svg width={width} height={height} className="tank-view">
        {extraLines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#cbd5e0" strokeWidth="1.5" />
        ))}
        {full && (
          <path d={pathD} fill={collinear ? 'none' : '#63b3ed'} fillOpacity="0.5" stroke={collinear ? '#e53e3e' : '#3182ce'} strokeWidth="2" />
        )}
        {points.map((p) => (
          <g key={p.id} onClick={() => toggle(p.id)} style={{ cursor: 'pointer' }}>
            <circle cx={p.x} cy={p.y} r={9} fill={selected.includes(p.id) ? '#e53e3e' : '#4a5568'} />
            <text x={p.x} y={p.y - 14} fontSize="12" textAnchor="middle" fill="#2d3748">{p.label}</text>
          </g>
        ))}
      </svg>
      <p className="readout" style={{ marginTop: 8 }}>
        {selected.length < pickCount
          ? `点を${pickCount}個クリックして選んでください（${selected.length}/${pickCount}）`
          : collinear
            ? '一直線上にならぶため、図形はできません。'
            : '図形ができました。'}
      </p>
    </div>
  )
}
