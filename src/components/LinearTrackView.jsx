// まっすぐな道（家〜駅、P〜Q地点など）を横線で表示し、複数の点や目印を位置(m)で示す。
export function LinearTrackView({ length, points, markers = [], width = 560, height = 90 }) {
  const pad = 30
  const usable = width - pad * 2
  const toX = (pos) => pad + Math.max(0, Math.min(1, pos / length)) * usable
  const y = height / 2
  return (
    <div className="stage">
      <svg width={width} height={height}>
        <line x1={pad} y1={y} x2={width - pad} y2={y} stroke="#333" strokeWidth="2" />
        <circle cx={pad} cy={y} r={3} fill="#333" />
        <circle cx={width - pad} cy={y} r={3} fill="#333" />
        {markers.map((m, i) => (
          <g key={i}>
            <line x1={toX(m.pos)} y1={y - 8} x2={toX(m.pos)} y2={y + 8} stroke="#718096" strokeWidth="1.5" />
            <text x={toX(m.pos)} y={y + 24} fontSize="11" fill="#718096" textAnchor="middle">{m.label}</text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={toX(p.pos)} cy={y} r={6} fill={p.color} />
            <text x={toX(p.pos)} y={y - 14 - (p.row || 0) * 16} fontSize="12" fill={p.color} fontWeight="bold" textAnchor="middle">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
