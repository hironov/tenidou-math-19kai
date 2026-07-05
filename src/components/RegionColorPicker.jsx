import { useState } from 'react'

// となり合う領域を同じ色にせずにぬり分けられるか試せるウィジェット。
// regions: [{ id, d, labelPos: {x,y} }]（d はSVGパスのdata）
// adjacency: [[id1, id2], ...]（同じ色にしてはいけない組）
// palette: [{ key, swatch }]
export function RegionColorPicker({ regions, adjacency, palette, width = 260, height = 200 }) {
  const [colorOf, setColorOf] = useState({})

  const cycle = (id) => {
    setColorOf((prev) => {
      const order = [null, ...palette.map((p) => p.key)]
      const idx = order.indexOf(prev[id] ?? null)
      const next = order[(idx + 1) % order.length]
      return { ...prev, [id]: next }
    })
  }

  const conflicts = new Set()
  adjacency.forEach(([a, b]) => {
    if (colorOf[a] && colorOf[a] === colorOf[b]) { conflicts.add(a); conflicts.add(b) }
  })

  const usedColors = new Set(Object.values(colorOf).filter(Boolean))
  const allFilled = regions.every((r) => colorOf[r.id])

  return (
    <div>
      <svg width={width} height={height} className="tank-view">
        {regions.map((r) => {
          const swatch = palette.find((p) => p.key === colorOf[r.id])?.swatch ?? 'white'
          return (
            <g key={r.id} onClick={() => cycle(r.id)} style={{ cursor: 'pointer' }}>
              <path d={r.d} fill={swatch} stroke={conflicts.has(r.id) ? '#e53e3e' : '#4a5568'} strokeWidth={conflicts.has(r.id) ? 3 : 1.5} />
              {r.labelPos && <text x={r.labelPos.x} y={r.labelPos.y} fontSize="13" textAnchor="middle" fill="#2d3748">{r.label ?? r.id}</text>}
            </g>
          )
        })}
      </svg>
      <p className="readout" style={{ marginTop: 8 }}>
        使った色の数：<b>{usedColors.size}</b>
        {conflicts.size > 0 && <span className="combo-message" style={{ color: '#e53e3e' }}>　隣り合う部分が同じ色になっています（赤枠）</span>}
        {allFilled && conflicts.size === 0 && <span className="combo-message">　条件を満たすぬり分けです！</span>}
      </p>
      <div className="jump-row">
        {palette.map((p) => (
          <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 10 }}>
            <span className="swatch-dot" style={{ background: p.swatch }} /> {p.key}
          </span>
        ))}
      </div>
    </div>
  )
}
